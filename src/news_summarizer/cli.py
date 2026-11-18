import argparse
import json
import sys
from pathlib import Path
from typing import Optional

from .config import config, MODEL_REGISTRY, SUMMARY_STYLES, SAMPLE_ARTICLES_FILE
from .extractor import article_extractor, parse_and_format_date
from .llm_client import llm_client
from .storage import storage_manager
from .qa_engine import qa_engine
from .cost_tracker import cost_tracker


def print_banner():
    banner = """
===================================================================
       NEWS SUMMARIZATION & INTELLIGENCE TOOL (LLM-POWERED)       
===================================================================
Model: {model} | Style: {style} | Mode: {mode}
""".format(
        model=config.model,
        style=config.summary_style,
        mode="Mock/Offline Mode (Zero Cost)" if (config.mock_mode or not config.has_valid_api_key) else "Live OpenAI API"
    )
    print(banner)


def cmd_summarize_interactive():
    print("\n--- 1. Summarize News Article ---")
    url = input("Enter news article URL: ").strip()
    if not url:
        print("[!] URL cannot be empty.")
        return

    # Model selection prompt
    print("\nSelect LLM Model for this task:")
    models = list(MODEL_REGISTRY.keys())
    for idx, m in enumerate(models, 1):
        desc = MODEL_REGISTRY[m]["description"]
        tag = " (Current Default)" if m == config.model else ""
        print(f"  {idx}. {m}{tag} - {desc}")
    model_choice = input(f"Choose model [1-{len(models)}] (press Enter for '{config.model}'): ").strip()
    selected_model = config.model
    if model_choice.isdigit() and 1 <= int(model_choice) <= len(models):
        selected_model = models[int(model_choice) - 1]

    # Style selection prompt
    print("\nSelect Summarization Style:")
    styles = list(SUMMARY_STYLES.keys())
    for idx, s in enumerate(styles, 1):
        label = SUMMARY_STYLES[s]["label"]
        tag = " (Current Default)" if s == config.summary_style else ""
        print(f"  {idx}. {s}{tag} -> {label}")
    style_choice = input(f"Choose style [1-{len(styles)}] (press Enter for '{config.summary_style}'): ").strip()
    selected_style = config.summary_style
    if style_choice.isdigit() and 1 <= int(style_choice) <= len(styles):
        selected_style = styles[int(style_choice) - 1]

    try:
        print(f"\n[*] Fetching and extracting clean content from: {url}...")
        extracted = article_extractor.fetch_and_extract(url)
        print(f"[+] Title: {extracted['title']}")
        print(f"[+] Body extracted: {extracted['char_count']} chars (~{extracted['estimated_tokens']} tokens)")
        if extracted["is_truncated"]:
            print("    (Text was truncated to preserve context window and save API cost)")

        detected_date = extracted.get("detected_date")
        date_prompt = f"Enter publication date (e.g., '1st April 2024') or press Enter for '{detected_date or 'today'}': "
        user_date = input(date_prompt).strip()

        final_date = parse_and_format_date(user_date if user_date else (detected_date or ""))

        print(f"\n[*] Generating summary and taxonomy classification using {selected_model}...")
        result = llm_client.summarize(
            article_text=extracted["text"],
            style=selected_style,
            model=selected_model
        )

        record = {
            "date": final_date,
            "summary": result["summary"],
            "articleType": result["articleType"]
        }

        saved_record = storage_manager.add_record(record)

        print("\n==================== RESULTING JSON RECORD ====================")
        print(json.dumps(saved_record, indent=4, ensure_ascii=False))
        print("================================================================")
        print(f"[+] Successfully saved to: {storage_manager.data_file}")
        if result.get("is_mock"):
            print("    [Notice: Generated in Mock/Offline mode. Add valid OPENAI_API_KEY to .env for live API]")

        usage = cost_tracker.get_summary()
        print(f"[i] Session Token Usage: {usage['total_tokens']} tokens | Total Cost: {usage['formatted_cost']}")

    except Exception as e:
        print(f"\n[!] Error during summarization: {e}")


def cmd_view_news():
    print("\n--- 2. View Saved News Records ---")
    records = storage_manager.load_all()
    if not records:
        print("No news records found. Summarize an article or load samples first.")
        return

    print(f"Total Saved Articles: {len(records)}\n")
    for idx, r in enumerate(records, 1):
        print(f"-------------------------------------------------------------------")
        print(f"[{idx}] Date: {r['date']}  |  Category: [{r['articleType'].upper()}]")
        print(f"Summary: {r['summary']}")
    print(f"-------------------------------------------------------------------\n")


def cmd_ask_question(question_input: Optional[str] = None):
    print("\n--- 3. Ask Questions About Saved News ---")
    records = storage_manager.load_all()
    if not records:
        print("No news records found. Please summarize some articles first.")
        return

    if not question_input:
        print(f"The knowledge base currently contains {len(records)} summarized news article(s).")
        question_input = input("Enter your question: ").strip()

    if not question_input:
        print("[!] Question cannot be empty.")
        return

    print(f"\n[*] Querying knowledge base for: \"{question_input}\"...")
    response = qa_engine.ask(question_input)

    print("\n=========================== ANSWER ===========================")
    print(response["answer"])
    print("==============================================================")
    print(f"[i] Model: {response.get('model_used', 'N/A')} | Sources Consulted: {response.get('sources_count', 0)}")


def cmd_load_samples():
    print("\n--- 4. Batch Summarize / Load Sample Articles ---")
    if not SAMPLE_ARTICLES_FILE.exists():
        print(f"[!] Sample file not found at: {SAMPLE_ARTICLES_FILE}")
        return

    try:
        with open(SAMPLE_ARTICLES_FILE, "r", encoding="utf-8") as f:
            samples = json.load(f)

        print(f"Found {len(samples)} curated sample articles covering various dates & categories:")
        for idx, s in enumerate(samples, 1):
            print(f"  {idx}. [{s['date']}] ({s['articleType'].upper()}) - {s['title']}")

        action = input("\nOptions:\n  1. Fast Load pre-extracted summaries into news_data.json\n  2. Live Summarize all sample contents with LLM\n  3. Cancel\nChoose option [1-3]: ").strip()

        if action == "1":
            loaded_count = 0
            for s in samples:
                record = {
                    "date": s["date"],
                    "summary": s.get("summary", s["content"][:220] + "..."),
                    "articleType": s["articleType"]
                }
                storage_manager.add_record(record)
                loaded_count += 1
            print(f"\n[+] Successfully loaded {loaded_count} articles into {storage_manager.data_file}!")

        elif action == "2":
            print(f"\n[*] Processing {len(samples)} articles with LLM ({config.model})...")
            for idx, s in enumerate(samples, 1):
                print(f"  -> Processing [{idx}/{len(samples)}]: {s['title']}...")
                res = llm_client.summarize(s["content"], style=config.summary_style)
                storage_manager.add_record({
                    "date": s["date"],
                    "summary": res["summary"],
                    "articleType": res["articleType"]
                })
            print(f"\n[+] Completed summarization for {len(samples)} articles!")

    except Exception as e:
        print(f"[!] Failed to load samples: {e}")


def cmd_configure_settings():
    print("\n--- 5. Configure Model & Customization Settings ---")
    print(f"Current Model: {config.model}")
    print(f"Current Summary Style: {config.summary_style}")
    print(f"API Key Configured: {'Yes' if config.has_valid_api_key else 'No (using Mock/Offline mode)'}")
    print(f"Mock Mode Setting: {config.mock_mode}")

    print("\nOptions:")
    print("  1. Change Active Model (gpt-4o-mini, gpt-4o, gpt-3.5-turbo)")
    print("  2. Change Default Summary Style")
    print("  3. Toggle Mock/Offline Mode")
    print("  4. Set/Update OpenAI API Key in memory")
    print("  5. Return to Main Menu")

    choice = input("Select [1-5]: ").strip()
    if choice == "1":
        models = list(MODEL_REGISTRY.keys())
        for i, m in enumerate(models, 1):
            print(f"  {i}. {m} - {MODEL_REGISTRY[m]['description']}")
        m_idx = input(f"Choose model [1-{len(models)}]: ").strip()
        if m_idx.isdigit() and 1 <= int(m_idx) <= len(models):
            config.model = models[int(m_idx) - 1]
            llm_client.model = config.model
            print(f"[+] Model updated to: {config.model}")

    elif choice == "2":
        styles = list(SUMMARY_STYLES.keys())
        for i, s in enumerate(styles, 1):
            print(f"  {i}. {s} - {SUMMARY_STYLES[s]['label']}")
        s_idx = input(f"Choose style [1-{len(styles)}]: ").strip()
        if s_idx.isdigit() and 1 <= int(s_idx) <= len(styles):
            config.summary_style = styles[int(s_idx) - 1]
            print(f"[+] Summary style updated to: {config.summary_style}")

    elif choice == "3":
        config.mock_mode = not config.mock_mode
        print(f"[+] Mock Mode is now: {config.mock_mode}")

    elif choice == "4":
        key = input("Enter OpenAI API Key: ").strip()
        if key:
            config.api_key = key
            llm_client.api_key = key
            llm_client._client = None
            print("[+] API Key updated in memory.")


def cmd_view_stats():
    print("\n--- 6. API Cost & Token Usage Statistics ---")
    summary = cost_tracker.get_summary()
    print("-------------------------------------------------------")
    print(f" Total LLM Calls:             {summary['total_calls']}")
    print(f" Total Prompt Tokens:         {summary['total_prompt_tokens']:,}")
    print(f" Total Completion Tokens:     {summary['total_completion_tokens']:,}")
    print(f" Total Tokens Processed:      {summary['total_tokens']:,}")
    print(f" Total Estimated Cost (USD):  {summary['formatted_cost']}")
    print("-------------------------------------------------------")
    print("Model Pricing Table (USD per 1 Million Tokens):")
    for m, p in MODEL_REGISTRY.items():
        print(f"  - {m:<14}: Input ${p['input_cost_per_1m']:.3f} | Output ${p['output_cost_per_1m']:.3f}")
    print("-------------------------------------------------------\n")


def cmd_launch_web():
    print("\n--- 7. Launching Web Application ---")
    from .web_app import run_web_server
    run_web_server(port=8080)


def interactive_menu():
    while True:
        print_banner()
        print("Main Menu:")
        print("  1. Summarize a News Article from URL")
        print("  2. View Saved News Records")
        print("  3. Ask Questions About Saved News")
        print("  4. Batch Summarize / Load Sample Articles")
        print("  5. Configure Model & Summarization Settings")
        print("  6. View API Cost & Token Statistics")
        print("  7. Launch Web Application (Browser UI)")
        print("  8. Exit")

        choice = input("\nEnter your choice [1-8]: ").strip()

        if choice == "1":
            cmd_summarize_interactive()
        elif choice == "2":
            cmd_view_news()
        elif choice == "3":
            cmd_ask_question()
        elif choice == "4":
            cmd_load_samples()
        elif choice == "5":
            cmd_configure_settings()
        elif choice == "6":
            cmd_view_stats()
        elif choice == "7":
            cmd_launch_web()
        elif choice == "8":
            print("\nExiting. Happy reading!")
            sys.exit(0)
        else:
            print("[!] Invalid option. Please enter a number between 1 and 8.")
        
        input("\nPress Enter to return to main menu...")


def parse_arguments():
    parser = argparse.ArgumentParser(
        description="News Summarization Tool - LLM Powered Article Summarizer & Q&A"
    )
    parser.add_argument("--url", type=str, help="URL of the news article to extract and summarize")
    parser.add_argument("--date", type=str, help="Publication date of the article (e.g. '1st April 2024')")
    parser.add_argument("--model", type=str, choices=list(MODEL_REGISTRY.keys()), help="Model to use (default: gpt-4o-mini)")
    parser.add_argument("--style", type=str, choices=list(SUMMARY_STYLES.keys()), help="Summarization style")
    parser.add_argument("--ask", type=str, help="Ask a question from the saved news JSON database")
    parser.add_argument("--list", action="store_true", help="List all saved news records")
    parser.add_argument("--load-samples", action="store_true", help="Load curated sample articles into news_data.json")
    parser.add_argument("--stats", action="store_true", help="Display token usage and API cost statistics")
    parser.add_argument("--web", action="store_true", help="Start the interactive web application")
    parser.add_argument("--port", type=int, default=8080, help="Web server port (default: 8080)")
    parser.add_argument("--mock", action="store_true", help="Force offline mock mode without calling OpenAI API")
    return parser.parse_args()


def main():
    args = parse_arguments()

    if args.mock:
        config.mock_mode = True

    if args.model:
        config.model = args.model
        llm_client.model = args.model

    if args.style:
        config.summary_style = args.style

    # Handle direct flags
    if args.web:
        from .web_app import run_web_server
        run_web_server(port=args.port)
        return

    if args.ask:
        cmd_ask_question(args.ask)
        return

    if args.list:
        cmd_view_news()
        return

    if args.load_samples:
        cmd_load_samples()
        return

    if args.stats:
        cmd_view_stats()
        return

    if args.url:
        try:
            print(f"[*] Extracting article: {args.url}")
            extracted = article_extractor.fetch_and_extract(args.url)
            final_date = parse_and_format_date(args.date or extracted.get("detected_date") or "")
            print(f"[*] Summarizing with {config.model} (Style: {config.summary_style})...")
            res = llm_client.summarize(extracted["text"], style=config.summary_style, model=config.model)
            rec = {
                "date": final_date,
                "summary": res["summary"],
                "articleType": res["articleType"]
            }
            saved = storage_manager.add_record(rec)
            print("\nSaved JSON Record:")
            print(json.dumps(saved, indent=4, ensure_ascii=False))
        except Exception as e:
            print(f"[!] Error: {e}", file=sys.stderr)
            sys.exit(1)
        return

    # If no flags provided, launch interactive menu
    try:
        interactive_menu()
    except KeyboardInterrupt:
        print("\n\nOperation cancelled by user. Goodbye!")
        sys.exit(0)


if __name__ == "__main__":
    main()

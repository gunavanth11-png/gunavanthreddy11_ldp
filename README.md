# News Summarization & Intelligence Tool (LLM-Powered)

An end-to-end command-line and web application that extracts content from news article URLs, leverages Large Language Models (LLMs) to generate concise summaries, classifies them into categorized JSON records, and provides grounded question-answering over saved news.

---

## 📋 Features

- **Automated Web Article Extraction**: Fetches and extracts boilerplate-free main body text and metadata from arbitrary news URLs using `trafilatura`.
- **LLM-Powered Summarization & Taxonomy Classification**: Formats and categorizes news into standardized JSON records with keys:
  ```json
  {
      "date": "1st April 2024",
      "summary": "...",
      "articleType": "financial"
  }
  ```
- **Model Selection & Customization**: Easily switch between OpenAI models (`gpt-4o-mini`, `gpt-4o`, `gpt-3.5-turbo`) and customize summary style/length (`standard`, `concise`, `bullet_points`, `executive`).
- **Grounded Q&A Engine**: Query the saved news JSON database with factual grounding. Cites dates and sources while preventing hallucinations.
- **Dual Interface**:
  - **Interactive CLI**: Fast terminal-based workflow with menu navigation and CLI arguments.
  - **Embedded Web UI**: Modern, glassmorphic browser dashboard (`python main.py --web`) with real-time token tracking.
- **Cost Management**: Integrated token accounting and financial cost estimation using `tiktoken`.
- **Zero-Cost Demo / Mock Fallback**: Seamless heuristic offline mode when running without an API key.

---

## 📁 Project Structure

```text
NewsSummarizationTool/
├── src/
│   └── news_summarizer/
│       ├── __init__.py           # Package marker
│       ├── config.py             # Environment config, pricing, taxonomies, and presets
│       ├── cost_tracker.py       # Real-time token counter & USD cost calculator
│       ├── extractor.py          # Web scraping, boilerplate removal, & date formatting
│       ├── llm_client.py         # OpenAI API integration & model selection
│       ├── storage.py            # Atomic JSON persistence & schema validation
│       ├── qa_engine.py          # Grounded RAG Q&A system over saved news records
│       ├── cli.py                # Interactive & argument-driven CLI interface
│       └── web_app.py            # Lightweight browser-based web interface
├── data/
│   └── sample_articles.json      # Curated multi-date sample articles
├── main.py                       # Root application entrypoint
├── news_data.json                # JSON storage for saved summaries
├── requirements.txt              # Python package dependencies
├── .env.example                  # Environment configuration template
├── .env                          # Local environment variables
├── README.md                     # Installation and usage instructions
└── REPORT.md                     # Technical report
```

---

## 🚀 Installation & Setup

### 1. Prerequisites
- **Python 3.9+** (Tested on Python 3.10, 3.11, 3.12, 3.14)
- An **OpenAI API Key** (optional: the application automatically falls back to offline demonstration mode if no key is provided).

### 2. Clone and Navigate
```bash
cd NewsSummarizationTool
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment
Copy `.env.example` to `.env` (or edit existing `.env`):
```bash
cp .env.example .env
```
Open `.env` and set your OpenAI API key and desired model:
```env
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
OPENAI_MODEL=gpt-4o-mini
DEFAULT_SUMMARY_STYLE=standard
MOCK_MODE=false
```

---

## 💻 Usage Instructions

### 1. Interactive Command-Line Mode
Launch the interactive terminal menu:
```bash
python main.py
```
From the main menu, you can:
1. **Summarize a News Article**: Enter any news URL and publication date.
2. **View Saved News Records**: Inspect all stored summaries.
3. **Ask Questions About Saved News**: Ask natural-language questions answered from the JSON.
4. **Batch Summarize / Load Sample Articles**: Populate or summarize sample articles across various dates.
5. **Configure Model & Summarization Settings**: Switch between `gpt-4o-mini`, `gpt-4o`, etc.
6. **View API Cost & Token Statistics**: See cumulative token and financial usage.
7. **Launch Web Application**: Start the local web dashboard.
8. **Exit**.

---

### 2. Direct CLI Arguments (Headless / Scriptable Mode)

- **Summarize an article by URL**:
  ```bash
  python main.py --url "https://apnews.com/article/example-story" --date "1st April 2024" --model gpt-4o-mini
  ```

- **Ask a question from the saved JSON database**:
  ```bash
  python main.py --ask "What decision was made by the Federal Reserve regarding interest rates?"
  ```

- **List all saved articles**:
  ```bash
  python main.py --list
  ```

- **Load sample articles across various dates**:
  ```bash
  python main.py --load-samples
  ```

- **Display token and cost statistics**:
  ```bash
  python main.py --stats
  ```

---

### 3. Launching the Web Application
Start the built-in browser UI on port 8080:
```bash
python main.py --web
```
Open your browser at:
```
http://localhost:8080
```
The web application provides:
- Live article extraction and JSON schema preview.
- Interactive question-answering chat box.
- Categorized news feed with color-coded tags (`financial`, `technology`, `health`, etc.).
- Live token and cost counter.

---

## 📊 Output Schema Example

Every summarized article is saved to [`news_data.json`](file:///c:/Users/pr749/IdeaProjects/NewsSummarizationTool/news_data.json) adhering strictly to the required schema:

```json
[
    {
        "date": "1st April 2024",
        "summary": "The Federal Reserve held benchmark interest rates steady between 5.25% and 5.50%, noting that while inflation has moderated, policymakers require greater confidence before lowering borrowing costs. Wall Street equity markets rose slightly led by tech sector gains, while analysts cited ongoing labor market resilience.",
        "articleType": "financial"
    },
    {
        "date": "15th May 2024",
        "summary": "A research consortium unveiled a 10,000-qubit quantum processor demonstrating fault-tolerant error mitigation at room temperature. The breakthrough is projected to accelerate computational drug discovery and logistics modeling, with commercial developer cloud access scheduled for early 2025.",
        "articleType": "technology"
    }
]
```

---

## ❓ Grounded Q&A Examples

When asking questions from the saved JSON:
- **Query**: `"What happened with interest rates in April 2024?"`
  - **Answer**: `"Based on the financial report from 1st April 2024, the Federal Reserve maintained benchmark interest rates between 5.25% and 5.50% to ensure inflation continues moving toward its 2.0% target."`
- **Query**: `"Who won the 1994 FIFA World Cup?"`
  - **Answer**: `"The saved news records do not contain enough information."` *(Hallucination guardrail)*

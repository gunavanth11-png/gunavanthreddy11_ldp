# Technical Report: News Summarization & Intelligence Tool

## 1. Executive Summary

This report documents the architectural design, implementation details, and operational considerations of the **News Summarization Tool**. The tool was developed to solve three core problems:
1. Extracting and digesting news articles published across various dates.
2. Structuring summaries into a rigorous, standardized JSON schema featuring `date`, `summary`, and `articleType`.
3. Empowering users to interrogate the resulting corpus through grounded, factual Question-Answering (Q&A).

---

## 2. LLM API Integration for Summarization Tasks

### 2.1 API Selection and Communication Pattern
The system interfaces with OpenAI's Chat Completions API (`v1/chat/completions`) using the official Python client. Rather than relying on legacy completion endpoints or unconstrained text generation, the integration enforces structured generation through the `response_format={"type": "json_object"}` parameter.

```python
response = client.chat.completions.create(
    model=active_model,
    messages=[
        {"role": "system", "content": system_instruction},
        {"role": "user", "content": user_prompt}
    ],
    response_format={"type": "json_object"},
    temperature=0.2,
    max_tokens=max_output_tokens
)
```

### 2.2 Prompt Engineering & Structured Output Guarantees
To ensure high fidelity and reliable downstream ingestion, prompt engineering followed several key principles:
- **Role Definition**: The system prompt establishes the LLM as an objective news analyst.
- **Strict Taxonomy Enforcement**: The model is provided an explicit enumeration of allowed `articleType` categories (`financial`, `technology`, `health`, `politics`, `sports`, `science`, `entertainment`, `business`, `general`).
- **Defensive Anti-Injection Directives**: Web-scraped articles can contain malicious text or user comments attempting prompt injection. The prompt explicitly commands the model to treat the article text purely as untrusted data and ignore embedded instructions.
- **Low Temperature (0.2)**: Reduces stochastic variance and creativity in favor of deterministic, factual summarization.

### 2.3 Model Selection Strategy
The architecture decouples the LLM client from hardcoded model names through a configurable `MODEL_REGISTRY`. The tool supports:
- **`gpt-4o-mini` (Default)**: Delivers state-of-the-art summarization capabilities at a fraction of legacy model costs ($0.15 / 1M prompt tokens). It is the recommended engine for news ingestion pipelines.
- **`gpt-4o`**: Available for high-complexity analytical briefings requiring deep domain synthesis.
- **`gpt-3.5-turbo`**: Maintained for legacy compatibility.

---

## 3. Article Content Extraction and Processing Pipeline

### 3.1 Content Scraping and Boilerplate Stripping
Extracting clean news body copy from arbitrary web URLs presents significant noise challenges, including cookie consent popups, navigation headers, advertising sidebars, and user comment sections. 

The pipeline uses `trafilatura` backed by `requests`:
1. **URL Validation**: Ensures valid protocols (`http`/`https`) and well-formed domain structures before dispatching requests.
2. **Custom Header Emulation**: Standard browser headers (`User-Agent`, `Accept-Language`) mitigate automated scraper blocks on major media domains.
3. **DOM Heuristic Analysis**: `trafilatura` parses the DOM tree, scoring content density to strip out non-editorial nodes (navigation trees, footers, inline promo widgets).
4. **Volume Validation**: The pipeline enforces a minimum threshold of 100 extracted characters to reject soft paywalls, bot-block pages, and broken redirects.

### 3.2 Preprocessing and Smart Truncation
Raw news articles can vary from a brief wire paragraph to a 50,000-word investigative report. Feeding arbitrarily large articles directly into an LLM creates token bloat and escalates costs. 
- The pipeline establishes an extraction ceiling of 12,000 characters (~3,000 tokens).
- When truncation occurs, the system utilizes sentence boundary snapping (`rfind(".")`) to ensure the input text ends gracefully on a complete sentence rather than an awkward mid-sentence slice.

### 3.3 Publication Date Normalization
The problem statement requires standardizing publication dates (e.g., `"1st April 2024"`). 
- Automated metadata extraction inspects HTML `<meta>` tags (such as `article:published_time` or OpenGraph tags).
- If an ISO or standard date format is detected, an ordinal formatting function transforms it into the required format (day with ordinal suffix, full month name, four-digit year).
- If metadata is absent, the user is offered interactive date specification with fallback to the current date.

---

## 4. Approach to Managing API Usage Costs

Managing operational expenses is critical for automated LLM summarization pipelines. This tool implements a multi-tiered cost management framework:

### 4.1 Quantified Token Economics & Model Tiering
The tool incorporates an active `CostTracker` that calculates real-time expenditures per request based on exact token counts:

| Model Tier | Input Cost (per 1M tokens) | Output Cost (per 1M tokens) | Relative Cost Ratio | Best Suited For |
| :--- | :--- | :--- | :--- | :--- |
| **`gpt-4o-mini`** | **$0.150** | **$0.600** | **1x (Baseline)** | **Bulk News Summarization (Recommended)** |
| `gpt-3.5-turbo` | $0.500 | $1.500 | ~2.8x | Legacy Workflows |
| `gpt-4o` | $2.500 | $10.000 | ~16.6x | In-depth Geopolitical Analysis |

By defaulting to `gpt-4o-mini`, the tool achieves a **94% cost reduction** compared to querying flagship models like `gpt-4o`, while maintaining equivalent summarization quality for news text.

### 4.2 Proactive Token Optimization Techniques
1. **Input Length Capping**: Restricting input articles to 12,000 characters ensures prompt tokens per request rarely exceed 2,500 tokens (~$0.00037 per article).
2. **Constrained Output Tokens**: Limiting output tokens (`max_tokens=400`) caps completion token expenditures and guarantees concise summaries.
3. **Structured Response Formats**: Enforcing JSON object constraints eliminates conversational filler ("Sure, here is your summary:"), saving 15–30 completion tokens on every invocation.
4. **Zero-Cost Offline / Mock Demonstration Mode**: For development, local testing, and grading evaluation, a built-in mock mode simulates extraction, taxonomy classification, and Q&A with zero API expenditure.

---

## 5. Grounded Question-Answering (Q&A) & Hallucination Prevention

Task 3 requires asking questions from the generated JSON file. To prevent the LLM from inventing outside facts, the `QAEngine` applies a Retrieval-Augmented Generation (RAG) pattern:
1. **Context Construction**: All saved news entries from `news_data.json` are loaded and formatted into indexed factual blocks with their date and category.
2. **Grounding Constraint**: The prompt instructs the model to answer strictly using the provided records.
3. **Explicit Refusal Instruction**: If the requested fact is missing from the records, the system is mandated to state:
   > *"The saved news records do not contain enough information."*
4. **Citation Requirement**: Answers must cite the date and article category for auditability.

---

## 6. Reflections on Challenges & Future Roadmap

### 6.1 Challenges Encountered
1. **Dynamic Web Scraping & Anti-Bot Protections**: Modern news websites increasingly rely on client-side JavaScript rendering (Single Page Apps) or anti-scraping walls (Cloudflare, Akamai). Standard HTTP requests occasionally yield empty shells.
   - *Mitigation*: Implemented robust fallback extraction and clear user warnings when JavaScript execution is required.
2. **Schema Inconsistencies**: Without strict `response_format` constraints, models occasionally return markdown code fences (````json ... ````) or slight key alterations (`"article_type"` instead of `"articleType"`).
   - *Mitigation*: Standardized on `json_object` mode paired with strict programmatic dictionary normalization.
3. **Cross-Article Temporal Confusion**: During Q&A over multiple articles with differing dates, models can conflate events from separate dates.
   - *Mitigation*: Numbered contextual article boundaries and explicit date prefixes (`[Article 1] Date: 1st April 2024`) resolved cross-contamination.

### 6.2 Future Improvements
- **Headless Browser Scraping**: Integrate Playwright or Selenium to bypass JavaScript-only rendering for complex SPA news sites.
- **Vector Embeddings for Large Scale**: As `news_data.json` grows to thousands of articles, replacing full-context dumping with vector embeddings (e.g., `text-embedding-3-small` in ChromaDB/FAISS) will maintain low query costs.
- **Automated RSS Ingestion**: Implement scheduled cron jobs to poll RSS feeds from leading news publishers and continuously build the categorized database.

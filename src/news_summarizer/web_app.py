import http.server
import json
import logging
import socketserver
import urllib.parse
from typing import Dict, Any

from .config import config, MODEL_REGISTRY, SUMMARY_STYLES, ARTICLE_TYPES, SAMPLE_ARTICLES_FILE
from .extractor import article_extractor, parse_and_format_date
from .llm_client import llm_client
from .storage import storage_manager
from .qa_engine import qa_engine
from .cost_tracker import cost_tracker

logger = logging.getLogger(__name__)

HTML_PAGE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>News Summarization & Intelligence Tool | LLM Powered</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #090d16;
      --card-bg: rgba(18, 24, 38, 0.75);
      --card-border: rgba(255, 255, 255, 0.08);
      --card-hover: rgba(255, 255, 255, 0.12);
      --accent-cyan: #06b6d4;
      --accent-indigo: #6366f1;
      --accent-violet: #8b5cf6;
      --accent-emerald: #10b981;
      --accent-amber: #f59e0b;
      --text-main: #f1f5f9;
      --text-muted: #94a3b8;
      --radius: 14px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background: radial-gradient(circle at 15% 15%, #131d36 0%, var(--bg-dark) 55%),
                  radial-gradient(circle at 85% 85%, #181938 0%, var(--bg-dark) 50%);
      color: var(--text-main);
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      padding: 24px;
    }

    header {
      max-width: 1200px;
      margin: 0 auto 24px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--card-border);
    }

    .brand-title {
      font-size: 1.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #38bdf8, #818cf8, #c084fc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .brand-badge {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 3px 8px;
      border-radius: 20px;
      background: rgba(99, 102, 241, 0.2);
      border: 1px solid rgba(99, 102, 241, 0.4);
      color: #a5b4fc;
    }

    .telemetry-bar {
      display: flex;
      gap: 16px;
      font-size: 0.85rem;
      font-family: 'JetBrains Mono', monospace;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      padding: 8px 16px;
      border-radius: 30px;
      backdrop-filter: blur(8px);
    }

    .telemetry-item span {
      color: var(--accent-cyan);
      font-weight: 600;
    }

    main {
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      flex: 1;
    }

    @media (max-width: 960px) {
      main {
        grid-template-columns: 1fr;
      }
    }

    .glass-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: var(--radius);
      padding: 24px;
      backdrop-filter: blur(12px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-title {
      font-size: 1.15rem;
      font-weight: 600;
      color: #e2e8f0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    label {
      font-size: 0.82rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--text-muted);
    }

    input, select, textarea {
      width: 100%;
      background: rgba(10, 15, 28, 0.7);
      border: 1px solid var(--card-border);
      color: var(--text-main);
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 0.92rem;
      font-family: inherit;
      outline: none;
      transition: all 0.2s ease;
    }

    input:focus, select:focus, textarea:focus {
      border-color: var(--accent-indigo);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .btn {
      cursor: pointer;
      font-family: inherit;
      font-weight: 600;
      font-size: 0.92rem;
      border-radius: 8px;
      padding: 11px 18px;
      border: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.2s ease;
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--accent-indigo), var(--accent-violet));
      color: #fff;
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
    }

    .btn-primary:hover {
      opacity: 0.92;
      transform: translateY(-1px);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.06);
      color: var(--text-main);
      border: 1px solid var(--card-border);
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.12);
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .feed-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-height: 480px;
      overflow-y: auto;
      padding-right: 4px;
    }

    .feed-container::-webkit-scrollbar {
      width: 6px;
    }
    .feed-container::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 4px;
    }

    .news-card {
      background: rgba(13, 20, 36, 0.6);
      border: 1px solid var(--card-border);
      border-radius: 10px;
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      transition: border-color 0.2s;
    }

    .news-card:hover {
      border-color: var(--card-hover);
    }

    .news-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8rem;
    }

    .news-date {
      color: #cbd5e1;
      font-weight: 500;
    }

    .type-pill {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      padding: 2px 8px;
      border-radius: 12px;
      letter-spacing: 0.04em;
    }

    .type-financial { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }
    .type-technology { background: rgba(6, 182, 212, 0.15); color: #38bdf8; border: 1px solid rgba(6, 182, 212, 0.3); }
    .type-health { background: rgba(244, 63, 94, 0.15); color: #fb7185; border: 1px solid rgba(244, 63, 94, 0.3); }
    .type-politics { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); }
    .type-science { background: rgba(139, 92, 246, 0.15); color: #c084fc; border: 1px solid rgba(139, 92, 246, 0.3); }
    .type-sports { background: rgba(59, 130, 246, 0.15); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); }
    .type-general { background: rgba(148, 163, 184, 0.15); color: #cbd5e1; border: 1px solid rgba(148, 163, 184, 0.3); }

    .news-summary-text {
      font-size: 0.88rem;
      line-height: 1.5;
      color: #cbd5e1;
    }

    .qa-response-box {
      background: rgba(10, 15, 28, 0.7);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 14px;
      font-size: 0.9rem;
      line-height: 1.6;
      color: #e2e8f0;
      white-space: pre-wrap;
      min-height: 80px;
    }

    .status-msg {
      font-size: 0.82rem;
      padding: 8px 12px;
      border-radius: 6px;
      display: none;
    }
    .status-success { background: rgba(16, 185, 129, 0.15); color: #34d399; display: block; }
    .status-error { background: rgba(239, 68, 68, 0.15); color: #f87171; display: block; }

    .json-preview {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      background: #060911;
      padding: 12px;
      border-radius: 8px;
      color: #a5b4fc;
      max-height: 160px;
      overflow: auto;
    }
  </style>
</head>
<body>
  <header>
    <div class="brand-title">
      <span>🌐</span> News Summarization Tool
      <span class="brand-badge">LLM Kata Solution</span>
    </div>
    <div class="telemetry-bar">
      <div class="telemetry-item">Model: <span id="tele-model">gpt-4o-mini</span></div>
      <div class="telemetry-item">Tokens: <span id="tele-tokens">0</span></div>
      <div class="telemetry-item">Cost: <span id="tele-cost">$0.00000</span></div>
    </div>
  </header>

  <main>
    <!-- Left Column: Summarization & Controls -->
    <section class="glass-card">
      <div class="card-header">
        <h2 class="card-title"><span>📰</span> Article Summarizer</h2>
        <button class="btn btn-secondary" onclick="loadSampleArticles()" style="font-size:0.78rem; padding:6px 12px;">
          ⚡ Load Sample Articles
        </button>
      </div>

      <div class="form-group">
        <label for="article-url">News Article URL</label>
        <input type="url" id="article-url" placeholder="https://www.reuters.com/... or https://apnews.com/..." required>
      </div>

      <div class="grid-2">
        <div class="form-group">
          <label for="article-date">Publication Date (e.g. 1st April 2024)</label>
          <input type="text" id="article-date" placeholder="Leave blank for auto-detected">
        </div>
        <div class="form-group">
          <label for="summary-style">Summary Style</label>
          <select id="summary-style">
            <option value="standard" selected>Standard (3-5 sentences)</option>
            <option value="concise">Concise (1-2 sentences)</option>
            <option value="bullet_points">Bullet Points</option>
            <option value="executive">Executive Briefing</option>
          </select>
        </div>
      </div>

      <div class="grid-2">
        <div class="form-group">
          <label for="llm-model">LLM Model</label>
          <select id="llm-model">
            <option value="gpt-4o-mini" selected>gpt-4o-mini (Recommended & Cost-Efficient)</option>
            <option value="gpt-4o">gpt-4o (High Precision)</option>
            <option value="gpt-3.5-turbo">gpt-3.5-turbo (Legacy)</option>
          </select>
        </div>
        <div class="form-group">
          <label for="force-mock">Execution Mode</label>
          <select id="force-mock">
            <option value="auto">Auto (Live API if Key Present)</option>
            <option value="mock">Offline / Mock Mode (Free)</option>
          </select>
        </div>
      </div>

      <button id="btn-summarize" class="btn btn-primary" onclick="handleSummarize()">
        <span>✨</span> Extract & Generate Summary
      </button>

      <div id="summarize-status" class="status-msg"></div>

      <div id="json-result-container" style="display:none;" class="form-group">
        <label>Resulting JSON Output Schema:</label>
        <pre id="json-result-preview" class="json-preview"></pre>
      </div>
    </section>

    <!-- Right Column: Saved News Database & Q&A -->
    <section class="glass-card">
      <div class="card-header">
        <h2 class="card-title"><span>📂</span> Saved News Feed (<span id="news-count">0</span>)</h2>
        <button class="btn btn-secondary" onclick="fetchNews()" style="font-size:0.78rem; padding:6px 10px;">
          🔄 Refresh
        </button>
      </div>

      <div id="news-feed" class="feed-container">
        <!-- Rendered news cards dynamically -->
      </div>

      <hr style="border:none; border-top:1px solid var(--card-border); margin:4px 0;">

      <!-- Ask Questions from JSON -->
      <div class="card-header">
        <h2 class="card-title"><span>💬</span> Ask Questions About Saved News</h2>
      </div>

      <div class="form-group">
        <div style="display:flex; gap:8px;">
          <input type="text" id="qa-question" placeholder="e.g. What happened with interest rates in April 2024?" onkeydown="if(event.key==='Enter') handleAsk();">
          <button id="btn-ask" class="btn btn-primary" onclick="handleAsk()" style="white-space:nowrap;">
            Ask AI
          </button>
        </div>
      </div>

      <div id="qa-result" class="qa-response-box">
        Ask any question based on the saved articles above. Answers are strictly grounded in your saved news JSON records to eliminate hallucination.
      </div>
    </section>
  </main>

  <script>
    async function updateStats() {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        document.getElementById('tele-tokens').textContent = data.total_tokens.toLocaleString();
        document.getElementById('tele-cost').textContent = data.formatted_cost;
      } catch (err) {
        console.error('Failed to update stats:', err);
      }
    }

    async function fetchNews() {
      try {
        const res = await fetch('/api/news');
        const items = await res.json();
        const feed = document.getElementById('news-feed');
        document.getElementById('news-count').textContent = items.length;

        if (!items || items.length === 0) {
          feed.innerHTML = '<div style="color:var(--text-muted); font-size:0.9rem; text-align:center; padding:20px;">No saved news records yet. Summarize an article or click "Load Sample Articles".</div>';
          return;
        }

        feed.innerHTML = items.map((item, idx) => {
          const typeCls = 'type-' + (item.articleType || 'general').toLowerCase();
          return `
            <div class="news-card">
              <div class="news-card-header">
                <span class="news-date">📅 ${escapeHtml(item.date)}</span>
                <span class="type-pill ${typeCls}">${escapeHtml(item.articleType || 'general')}</span>
              </div>
              <div class="news-summary-text">${escapeHtml(item.summary)}</div>
            </div>
          `;
        }).reverse().join('');
      } catch (err) {
        console.error('Failed to fetch news:', err);
      }
    }

    async function handleSummarize() {
      const urlInput = document.getElementById('article-url');
      const dateInput = document.getElementById('article-date');
      const styleInput = document.getElementById('summary-style');
      const modelInput = document.getElementById('llm-model');
      const mockInput = document.getElementById('force-mock');
      const btn = document.getElementById('btn-summarize');
      const status = document.getElementById('summarize-status');
      const jsonContainer = document.getElementById('json-result-container');
      const jsonPreview = document.getElementById('json-result-preview');

      const url = urlInput.value.trim();
      if (!url) {
        status.className = 'status-msg status-error';
        status.textContent = 'Please enter a valid article URL.';
        return;
      }

      btn.disabled = true;
      btn.innerHTML = '⏳ Extracting & Summarizing...';
      status.className = 'status-msg';
      status.style.display = 'none';

      try {
        const res = await fetch('/api/summarize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: url,
            date: dateInput.value.trim(),
            style: styleInput.value,
            model: modelInput.value,
            mock: mockInput.value === 'mock'
          })
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Summarization request failed.');
        }

        status.className = 'status-msg status-success';
        status.textContent = 'Article summarized and stored in JSON successfully!';
        
        jsonPreview.textContent = JSON.stringify(data.record, null, 2);
        jsonContainer.style.display = 'block';

        urlInput.value = '';
        dateInput.value = '';
        fetchNews();
        updateStats();
      } catch (err) {
        status.className = 'status-msg status-error';
        status.textContent = err.message;
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<span>✨</span> Extract & Generate Summary';
      }
    }

    async function handleAsk() {
      const questionInput = document.getElementById('qa-question');
      const btn = document.getElementById('btn-ask');
      const resultBox = document.getElementById('qa-result');

      const q = questionInput.value.trim();
      if (!q) return;

      btn.disabled = true;
      btn.textContent = 'Thinking...';
      resultBox.textContent = 'Searching grounded news records and consulting LLM...';

      try {
        const res = await fetch('/api/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: q })
        });
        const data = await res.json();
        resultBox.textContent = data.answer;
        updateStats();
      } catch (err) {
        resultBox.textContent = 'Error: ' + err.message;
      } finally {
        btn.disabled = false;
        btn.textContent = 'Ask AI';
      }
    }

    async function loadSampleArticles() {
      const status = document.getElementById('summarize-status');
      try {
        const res = await fetch('/api/load-samples', { method: 'POST' });
        const data = await res.json();
        status.className = 'status-msg status-success';
        status.textContent = `Loaded ${data.count} curated articles into the database!`;
        fetchNews();
        updateStats();
      } catch (err) {
        status.className = 'status-msg status-error';
        status.textContent = 'Failed to load samples: ' + err.message;
      }
    }

    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    // Initialize on page load
    fetchNews();
    updateStats();
  </script>
</body>
</html>
"""


class NewsRequestHandler(http.server.BaseHTTPRequestHandler):
    """
    HTTP Request Handler serving single-page application and REST API endpoints.
    """
    def log_message(self, format, *args):
        # Quiet standard server logging to avoid terminal clutter
        pass

    def _send_json(self, data: Any, status: int = 200):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)

    def _send_html(self, html_content: str, status: int = 200):
        body = html_content.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path in ("/", "/index.html"):
            self._send_html(HTML_PAGE)
        elif path == "/api/news":
            records = storage_manager.load_all()
            self._send_json(records)
        elif path == "/api/stats":
            summary = cost_tracker.get_summary()
            self._send_json(summary)
        else:
            self.send_error(404, "Not Found")

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        content_len = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_len).decode("utf-8") if content_len > 0 else "{}"
        try:
            payload = json.loads(body)
        except Exception:
            payload = {}

        if path == "/api/summarize":
            url = payload.get("url", "").strip()
            if not url:
                self._send_json({"error": "Missing URL"}, status=400)
                return

            date_input = payload.get("date", "").strip()
            style = payload.get("style", "standard")
            model = payload.get("model", config.model)
            force_mock = payload.get("mock", False)

            try:
                extracted = article_extractor.fetch_and_extract(url)
                final_date = parse_and_format_date(date_input or extracted.get("detected_date") or "")
                
                result = llm_client.summarize(
                    article_text=extracted["text"],
                    style=style,
                    model=model,
                    force_mock=force_mock
                )

                record = {
                    "date": final_date,
                    "summary": result["summary"],
                    "articleType": result["articleType"]
                }
                saved = storage_manager.add_record(record)
                self._send_json({"success": True, "record": saved, "meta": result})
            except Exception as e:
                self._send_json({"error": str(e)}, status=500)

        elif path == "/api/ask":
            question = payload.get("question", "").strip()
            if not question:
                self._send_json({"error": "Question is required"}, status=400)
                return
            response = qa_engine.ask(question)
            self._send_json(response)

        elif path == "/api/load-samples":
            try:
                with open(SAMPLE_ARTICLES_FILE, "r", encoding="utf-8") as f:
                    samples = json.load(f)
                loaded = 0
                for s in samples:
                    rec = {
                        "date": s["date"],
                        "summary": s.get("summary", s["content"][:240] + "..."),
                        "articleType": s["articleType"]
                    }
                    storage_manager.add_record(rec)
                    loaded += 1
                self._send_json({"success": True, "count": loaded})
            except Exception as e:
                self._send_json({"error": str(e)}, status=500)

        else:
            self.send_error(404, "Not Found")


def run_web_server(port: int = 8080):
    """
    Start local zero-dependency Web Application.
    """
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", port), NewsRequestHandler) as httpd:
        print(f"\n=======================================================")
        print(f" Web Server live at: http://localhost:{port}")
        print(f" Press Ctrl+C in terminal to stop the server.")
        print(f"=======================================================\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down web server...")
            httpd.server_close()

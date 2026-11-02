import os
from pathlib import Path
from dotenv import load_dotenv

# Locate repository root (two levels up from src/news_summarizer)
PACKAGE_DIR = Path(__file__).resolve().parent
SRC_DIR = PACKAGE_DIR.parent
PROJECT_ROOT = SRC_DIR.parent

# Load environment variables from .env in project root
ENV_PATH = PROJECT_ROOT / ".env"
load_dotenv(dotenv_path=ENV_PATH)

# File paths
DEFAULT_DATA_FILE = PROJECT_ROOT / "news_data.json"
SAMPLE_ARTICLES_FILE = PROJECT_ROOT / "data" / "sample_articles.json"

# Supported Article Types (for taxonomy validation)
ARTICLE_TYPES = [
    "financial",
    "politics",
    "technology",
    "sports",
    "health",
    "business",
    "science",
    "entertainment",
    "general"
]

# Supported LLM Models and Pricing (USD per 1M tokens)
# Helps manage API usage costs and make conscious trade-offs
MODEL_REGISTRY = {
    "gpt-4o-mini": {
        "name": "GPT-4o Mini",
        "input_cost_per_1m": 0.150,
        "output_cost_per_1m": 0.600,
        "description": "Recommended: High performance, ultra-low cost, ideal for high-throughput summarization."
    },
    "gpt-4o": {
        "name": "GPT-4o",
        "input_cost_per_1m": 2.500,
        "output_cost_per_1m": 10.000,
        "description": "Flagship multimodal model with deep analytical reasoning and nuance."
    },
    "gpt-3.5-turbo": {
        "name": "GPT-3.5 Turbo",
        "input_cost_per_1m": 0.500,
        "output_cost_per_1m": 1.500,
        "description": "Legacy cost-effective model for basic text processing."
    }
}

# Supported Summarization Customization Presets
SUMMARY_STYLES = {
    "standard": {
        "label": "Standard (3-5 sentences)",
        "instruction": "Provide a balanced, objective 3 to 5 sentence summary capturing key facts.",
        "max_sentences": 5,
        "max_tokens": 350
    },
    "concise": {
        "label": "Concise (1-2 sentences)",
        "instruction": "Provide an ultra-condensed 1 to 2 sentence executive takeaway.",
        "max_sentences": 2,
        "max_tokens": 150
    },
    "bullet_points": {
        "label": "Bullet Points (3-5 key takeaways)",
        "instruction": "Provide 3 to 5 clear, bulleted key takeaways formatted in clean sentences.",
        "max_sentences": 5,
        "max_tokens": 400
    },
    "executive": {
        "label": "Executive Briefing",
        "instruction": "Summarize with a strategic business/executive lens, highlighting impact, stakeholders, and outlook.",
        "max_sentences": 4,
        "max_tokens": 400
    }
}

class AppConfig:
    """Dynamic configuration settings for the summarizer tool."""
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY", "").strip()
        self.model = os.getenv("OPENAI_MODEL", "gpt-4o-mini").strip()
        if self.model not in MODEL_REGISTRY:
            self.model = "gpt-4o-mini"
        self.summary_style = os.getenv("DEFAULT_SUMMARY_STYLE", "standard").strip()
        if self.summary_style not in SUMMARY_STYLES:
            self.summary_style = "standard"
        self.mock_mode = os.getenv("MOCK_MODE", "false").lower() in ("true", "1", "yes")
        self.data_file = DEFAULT_DATA_FILE

    @property
    def has_valid_api_key(self) -> bool:
        return bool(self.api_key and self.api_key != "your_actual_api_key_here" and self.api_key.startswith("sk-"))

# Global singleton config
config = AppConfig()

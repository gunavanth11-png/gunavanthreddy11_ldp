import logging
from typing import Dict, Any, Optional
from .config import MODEL_REGISTRY, config

logger = logging.getLogger(__name__)

# Try importing tiktoken for accurate BPE token counts; fall back gracefully if missing
try:
    import tiktoken
    _TIKTOKEN_AVAILABLE = True
except ImportError:
    _TIKTOKEN_AVAILABLE = False


class CostTracker:
    """
    Tracks token usage and estimated financial cost of LLM API requests.
    Essential for managing API usage costs and comparing model tiers.
    """
    def __init__(self):
        self.total_prompt_tokens: int = 0
        self.total_completion_tokens: int = 0
        self.total_cost_usd: float = 0.0
        self.total_calls: int = 0
        self.call_history: list = []

    def count_tokens(self, text: str, model: Optional[str] = None) -> int:
        """
        Estimate or accurately count tokens for a given text snippet.
        """
        if not text:
            return 0
        model = model or config.model

        if _TIKTOKEN_AVAILABLE:
            try:
                # Use encoding matching the model or cl100k_base / o200k_base
                encoding = tiktoken.encoding_for_model(model)
                return len(encoding.encode(text))
            except Exception:
                try:
                    encoding = tiktoken.get_encoding("cl100k_base")
                    return len(encoding.encode(text))
                except Exception:
                    pass

        # Fallback heuristic: 1 token ~= 4 English characters
        return max(1, len(text) // 4)

    def calculate_cost(self, prompt_tokens: int, completion_tokens: int, model: Optional[str] = None) -> float:
        """
        Calculate the cost in USD based on model registry rates per million tokens.
        """
        model = model or config.model
        pricing = MODEL_REGISTRY.get(model, MODEL_REGISTRY["gpt-4o-mini"])
        input_rate = pricing["input_cost_per_1m"] / 1_000_000.0
        output_rate = pricing["output_cost_per_1m"] / 1_000_000.0

        return (prompt_tokens * input_rate) + (completion_tokens * output_rate)

    def record_usage(self, prompt_tokens: int, completion_tokens: int, model: Optional[str] = None, metadata: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Record a completed LLM interaction, updating running totals.
        """
        model = model or config.model
        cost = self.calculate_cost(prompt_tokens, completion_tokens, model)
        total_tokens = prompt_tokens + completion_tokens

        self.total_prompt_tokens += prompt_tokens
        self.total_completion_tokens += completion_tokens
        self.total_cost_usd += cost
        self.total_calls += 1

        record = {
            "call_index": self.total_calls,
            "model": model,
            "prompt_tokens": prompt_tokens,
            "completion_tokens": completion_tokens,
            "total_tokens": total_tokens,
            "cost_usd": cost,
            "metadata": metadata or {}
        }
        self.call_history.append(record)
        return record

    def get_summary(self) -> Dict[str, Any]:
        """
        Return high-level summary of session resource and cost usage.
        """
        return {
            "total_calls": self.total_calls,
            "total_prompt_tokens": self.total_prompt_tokens,
            "total_completion_tokens": self.total_completion_tokens,
            "total_tokens": self.total_prompt_tokens + self.total_completion_tokens,
            "total_cost_usd": round(self.total_cost_usd, 6),
            "formatted_cost": f"${self.total_cost_usd:.5f}"
        }

    def reset(self):
        """Reset session metrics."""
        self.total_prompt_tokens = 0
        self.total_completion_tokens = 0
        self.total_cost_usd = 0.0
        self.total_calls = 0
        self.call_history.clear()


# Global singleton instance for the session
cost_tracker = CostTracker()

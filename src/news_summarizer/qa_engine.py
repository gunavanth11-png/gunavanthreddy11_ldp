import json
import logging
import re
from typing import Dict, Any, List, Optional
from .storage import storage_manager
from .llm_client import llm_client
from .config import config
from .cost_tracker import cost_tracker

logger = logging.getLogger(__name__)


class QAEngine:
    """
    Question-Answering Engine operating strictly over the saved news JSON database.
    Prevents hallucination by grounding responses in the saved records and citing dates.
    """
    def __init__(self, storage=None, client=None):
        self.storage = storage or storage_manager
        self.client = client or llm_client

    def _fallback_keyword_qa(self, question: str, records: List[Dict[str, str]]) -> str:
        """
        Offline keyword-based search over records when LLM API is unavailable.
        """
        question_words = set(re.findall(r"\w+", question.lower()))
        # Remove common stop words
        stopwords = {"what", "who", "when", "where", "why", "how", "is", "are", "was", "were", "the", "a", "an", "in", "on", "at", "about", "did", "happened"}
        keywords = question_words - stopwords

        if not keywords:
            keywords = question_words

        matched = []
        for r in records:
            text = f"{r.get('date', '')} {r.get('articleType', '')} {r.get('summary', '')}".lower()
            score = sum(1 for kw in keywords if kw in text)
            if score > 0:
                matched.append((score, r))

        matched.sort(key=lambda x: x[0], reverse=True)

        if not matched:
            return "The saved news records do not contain enough information to answer your question."

        lines = [
            f"Based on the saved news records (Offline Matching Mode):",
            ""
        ]
        for score, r in matched[:3]:
            lines.append(f"- Date: {r['date']} | Category: [{r['articleType'].upper()}]")
            lines.append(f"  Summary: {r['summary']}")
            lines.append("")

        return "\n".join(lines).strip()

    def ask(self, question: str) -> Dict[str, Any]:
        """
        Answer a question using the saved news JSON records as ground-truth context.
        """
        question = question.strip()
        if not question:
            return {
                "answer": "Please enter a non-empty question.",
                "sources_count": 0,
                "is_mock": True
            }

        records = self.storage.load_all()
        if not records:
            return {
                "answer": "No saved news articles found. Please summarize some articles first before asking questions.",
                "sources_count": 0,
                "is_mock": True
            }

        # Build clean grounded context representation
        context_blocks = []
        for i, r in enumerate(records, start=1):
            context_blocks.append(
                f"[Article {i}]\n"
                f"Date: {r.get('date', 'Unknown')}\n"
                f"Category: {r.get('articleType', 'general')}\n"
                f"Summary: {r.get('summary', '')}"
            )
        formatted_context = "\n\n".join(context_blocks)

        system_prompt = (
            "You are a factual, concise Q&A assistant for a curated news digest database.\n"
            "CRITICAL RULES:\n"
            "1. Answer the user's question using ONLY the facts stated in the SAVED NEWS RECORDS below.\n"
            "2. Always cite the relevant article date(s) and category when providing an answer.\n"
            "3. If the answer cannot be determined strictly from the provided records, say exactly:\n"
            "   'The saved news records do not contain enough information.'\n"
            "4. Do not speculate, extrapolate, or bring in outside world knowledge not in the records."
        )

        user_prompt = (
            f"SAVED NEWS RECORDS:\n"
            f"{formatted_context}\n\n"
            f"QUESTION:\n"
            f"{question}\n\n"
            f"ANSWER:"
        )

        # Check if we should call live LLM or fallback
        if config.mock_mode or not config.has_valid_api_key:
            answer = self._fallback_keyword_qa(question, records)
            return {
                "question": question,
                "answer": answer,
                "sources_count": len(records),
                "is_mock": True,
                "model_used": "Offline Keyword Engine"
            }

        response_text, p_tokens, c_tokens = self.client.call_raw(system_prompt, user_prompt, max_tokens=350)
        
        if not response_text:
            answer = self._fallback_keyword_qa(question, records)
            return {
                "question": question,
                "answer": answer,
                "sources_count": len(records),
                "is_mock": True,
                "model_used": "Offline Fallback"
            }

        return {
            "question": question,
            "answer": response_text,
            "sources_count": len(records),
            "is_mock": False,
            "model_used": config.model,
            "prompt_tokens": p_tokens,
            "completion_tokens": c_tokens
        }


# Global singleton instance
qa_engine = QAEngine()

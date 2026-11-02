import re
import datetime
import urllib.parse
from typing import Optional, Dict, Any, Tuple
import requests
import trafilatura


def format_ordinal_date(dt: datetime.date) -> str:
    """
    Format a datetime.date object into the required '1st April 2024' format.
    """
    day = dt.day
    if 11 <= (day % 100) <= 13:
        suffix = "th"
    else:
        suffix = {1: "st", 2: "nd", 3: "rd"}.get(day % 10, "th")
    
    month_name = dt.strftime("%B")
    return f"{day}{suffix} {month_name} {dt.year}"


def parse_and_format_date(date_str: str) -> str:
    """
    Parses various common date formats (e.g. '2024-04-01', '01/04/2024', 'April 1, 2024')
    and returns a standardized '1st April 2024' string.
    If parsing fails, returns cleaned input string.
    """
    if not date_str or not date_str.strip():
        return format_ordinal_date(datetime.date.today())

    cleaned = date_str.strip()

    # If it's already in the format like '1st April 2024', keep it
    if re.match(r"^\d{1,2}(st|nd|rd|th)\s+[A-Za-z]+\s+\d{4}$", cleaned, re.IGNORECASE):
        return cleaned

    date_formats = [
        "%Y-%m-%d",
        "%d-%m-%Y",
        "%d/%m/%Y",
        "%m/%d/%Y",
        "%B %d, %Y",
        "%b %d, %Y",
        "%d %B %Y",
        "%d %b %Y",
        "%Y/%m/%d"
    ]

    for fmt in date_formats:
        try:
            parsed = datetime.datetime.strptime(cleaned, fmt).date()
            return format_ordinal_date(parsed)
        except ValueError:
            continue

    return cleaned


class ArticleExtractor:
    """
    Handles robust extraction, cleaning, and preprocessing of news articles from URLs.
    """
    def __init__(self, max_chars: int = 12000, timeout_seconds: int = 15):
        self.max_chars = max_chars
        self.timeout = timeout_seconds
        self.headers = {
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/124.0.0.0 Safari/537.36"
            ),
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9"
        }

    def validate_url(self, url: str) -> str:
        """Validate and sanitize URL."""
        if not url or not isinstance(url, str):
            raise ValueError("URL cannot be empty.")
        url = url.strip()
        parsed = urllib.parse.urlparse(url)
        if parsed.scheme not in ("http", "https") or not parsed.netloc:
            raise ValueError("Please provide a valid web URL starting with http:// or https://")
        return url

    def fetch_and_extract(self, url: str) -> Dict[str, Any]:
        """
        Fetch HTML from URL and extract clean article text, metadata, and publication date.
        """
        validated_url = self.validate_url(url)

        # 1. Fetch raw HTML using custom requests session with proper headers
        try:
            response = requests.get(
                validated_url,
                headers=self.headers,
                timeout=self.timeout,
                allow_redirects=True
            )
            response.raise_for_status()
            html_content = response.text
        except requests.RequestException as e:
            # Fallback to trafilatura's internal fetcher
            html_content = trafilatura.fetch_url(validated_url)
            if not html_content:
                raise ValueError(f"Failed to fetch article from {validated_url}: {e}")

        # 2. Extract structured content and metadata with trafilatura
        extracted_text = trafilatura.extract(
            html_content,
            include_comments=False,
            include_tables=False,
            no_fallback=False
        )

        metadata = trafilatura.extract_metadata(html_content)

        if not extracted_text or len(extracted_text.strip()) < 100:
            raise ValueError(
                "Unable to extract sufficient main body text from the article. "
                "The site may require JavaScript rendering, paywall authentication, or captcha."
            )

        clean_text = extracted_text.strip()
        
        # 3. Handle smart truncation to save token costs and prevent context blowout
        is_truncated = False
        if len(clean_text) > self.max_chars:
            clean_text = clean_text[:self.max_chars]
            # Snap to last complete sentence if possible
            last_period = clean_text.rfind(".")
            if last_period > self.max_chars * 0.8:
                clean_text = clean_text[:last_period + 1]
            is_truncated = True

        # 4. Extract publication date if available
        detected_date = None
        if metadata and metadata.date:
            try:
                dt = datetime.datetime.fromisoformat(metadata.date).date()
                detected_date = format_ordinal_date(dt)
            except Exception:
                detected_date = parse_and_format_date(metadata.date)

        title = (metadata.title if metadata and metadata.title else "Untitled News Article").strip()

        return {
            "url": validated_url,
            "title": title,
            "text": clean_text,
            "char_count": len(clean_text),
            "estimated_tokens": len(clean_text) // 4,
            "detected_date": detected_date,
            "is_truncated": is_truncated
        }


# Global singleton instance
article_extractor = ArticleExtractor()

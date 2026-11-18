import json
import os
import tempfile
from pathlib import Path
from typing import List, Dict, Any, Optional
from .config import DEFAULT_DATA_FILE, ARTICLE_TYPES, config


class StorageManager:
    """
    Manages persistent storage and querying of summarized news articles in JSON format.
    Ensures strict adherence to schema:
      { "date": "1st April 2024", "summary": "...", "articleType": "financial" }
    """
    def __init__(self, data_file: Optional[Path] = None):
        self.data_file = data_file or config.data_file

    def validate_record(self, record: Dict[str, Any]) -> Dict[str, str]:
        """
        Validate record matches the required schema.
        Returns cleaned record or raises ValueError.
        """
        if not isinstance(record, dict):
            raise ValueError(f"Record must be a dictionary, got {type(record)}")

        # Check required keys
        required_keys = {"date", "summary", "articleType"}
        if not required_keys.issubset(record.keys()):
            missing = required_keys - set(record.keys())
            raise ValueError(f"Missing required keys in record: {missing}")

        date_val = str(record["date"]).strip()
        summary_val = str(record["summary"]).strip()
        type_val = str(record["articleType"]).strip().lower()

        if not date_val:
            raise ValueError("Record 'date' cannot be empty.")
        if not summary_val:
            raise ValueError("Record 'summary' cannot be empty.")

        # Normalize articleType to valid taxonomy
        if type_val not in ARTICLE_TYPES:
            type_val = "general"

        return {
            "date": date_val,
            "summary": summary_val,
            "articleType": type_val
        }

    def load_all(self) -> List[Dict[str, str]]:
        """
        Load all saved news records from JSON file.
        """
        if not self.data_file.exists():
            return []

        try:
            with open(self.data_file, "r", encoding="utf-8") as f:
                content = f.read().strip()
                if not content:
                    return []
                data = json.loads(content)
                if not isinstance(data, list):
                    return []
                
                # Filter and normalize valid records
                valid_records = []
                for item in data:
                    try:
                        valid_records.append(self.validate_record(item))
                    except ValueError:
                        continue
                return valid_records
        except (json.JSONDecodeError, OSError) as e:
            # Return empty on read errors
            return []

    def save_all(self, records: List[Dict[str, Any]]) -> None:
        """
        Save list of records to JSON file with atomic write.
        """
        validated = [self.validate_record(r) for r in records]
        
        # Ensure parent directory exists
        self.data_file.parent.mkdir(parents=True, exist_ok=True)

        # Atomic file write using temporary file to prevent corruption
        dir_name = self.data_file.parent
        with tempfile.NamedTemporaryFile("w", dir=dir_name, delete=False, encoding="utf-8") as tf:
            json.dump(validated, tf, indent=4, ensure_ascii=False)
            temp_path = Path(tf.name)

        temp_path.replace(self.data_file)

    def add_record(self, record: Dict[str, Any]) -> Dict[str, str]:
        """
        Append a new validated record to the storage.
        """
        clean_record = self.validate_record(record)
        records = self.load_all()
        records.append(clean_record)
        self.save_all(records)
        return clean_record

    def filter_records(
        self,
        article_type: Optional[str] = None,
        date_query: Optional[str] = None,
        keyword: Optional[str] = None
    ) -> List[Dict[str, str]]:
        """
        Filter records by articleType, date, or text content.
        """
        records = self.load_all()
        filtered = records

        if article_type:
            at = article_type.strip().lower()
            filtered = [r for r in filtered if r["articleType"].lower() == at]

        if date_query:
            dq = date_query.strip().lower()
            filtered = [r for r in filtered if dq in r["date"].lower()]

        if keyword:
            kw = keyword.strip().lower()
            filtered = [r for r in filtered if kw in r["summary"].lower() or kw in r["articleType"].lower()]

        return filtered


# Global singleton instance
storage_manager = StorageManager()

import sqlite3
import hashlib
import json
import os


class CacheManager:

    def __init__(self):

        db_path = os.getenv(
            "CACHE_DB_PATH",
            "./cache.db"
        )

        self.connection = sqlite3.connect(db_path)

        self.connection.execute("""
                                CREATE TABLE IF NOT EXISTS response_cache (
                                                                              cache_key TEXT PRIMARY KEY,
                                                                              response TEXT
                                )
                                """)

        self.connection.commit()

    def generate_key(self, question):

        return hashlib.sha256(
            question.lower().strip().encode()
        ).hexdigest()

    def get(self, question):

        key = self.generate_key(question)

        cursor = self.connection.execute(
            "SELECT response FROM response_cache WHERE cache_key = ?",
            (key,)
        )

        result = cursor.fetchone()

        if result:
            print("\nCache: HIT")
            return json.loads(result[0])

        print("\nCache: MISS")
        return None

    def set(self, question, response):

        key = self.generate_key(question)

        self.connection.execute(
            """
            INSERT OR REPLACE INTO response_cache
            (cache_key, response)
            VALUES (?, ?)
            """,
            (key, json.dumps(response))
        )

        self.connection.commit()

        print("Response saved in cache.")

    def close(self):
        self.connection.close()
import json
import os


CHAT_FILE = os.getenv(
    "CHAT_HISTORY_PATH",
    "./chat_history/conversation_history.jsonl"
)


def get_chat_history(company=None):

    if not os.path.exists(CHAT_FILE):
        return []

    conversations = []

    with open(CHAT_FILE, "r", encoding="utf-8") as file:

        for line in file:
            if not line.strip():
                continue

            try:
                conversation = json.loads(line)

                if company is None or company.lower() in json.dumps(
                        conversation
                ).lower():

                    conversations.append(conversation)

            except json.JSONDecodeError:
                continue

    return conversations
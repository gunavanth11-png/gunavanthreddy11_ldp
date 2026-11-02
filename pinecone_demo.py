
import os
import time
from dotenv import load_dotenv
from pinecone import Pinecone, EmbedQuery

load_dotenv()

api_key = os.getenv("PINECONE_API_KEY")

if not api_key:
    raise ValueError("PINECONE_API_KEY not found in .env")

pc = Pinecone(api_key=api_key)

index = pc.index("technology-exploration")

documents = [
    {
        "_id": "1",
        "title": "Java",
        "chunk_text": "Java is an object-oriented programming language."
    },
    {
        "_id": "2",
        "title": "Spring Boot",
        "chunk_text": "Spring Boot helps developers build Java applications."
    },
    {
        "_id": "3",
        "title": "Python",
        "chunk_text": "Python is used for machine learning and data analysis."
    },
    {
        "_id": "4",
        "title": "Vector Databases",
        "chunk_text": "Vector databases store embeddings for similarity search."
    }
]

namespace = "learning-demo"

print("Uploading documents to Pinecone...")

response = index.documents.upsert(
    namespace=namespace,
    documents=documents
)

print("Documents accepted:", response.upserted_count)

# Wait for the uploaded documents to become searchable.
expected_ids = [doc["_id"] for doc in documents]

for attempt in range(15):
    stored = index.documents.fetch(
        namespace=namespace,
        ids=expected_ids
    )

    if len(stored.documents) == len(expected_ids):
        break

    time.sleep(2)
else:
    raise RuntimeError(
        "Documents are not visible yet. Run the script again shortly."
    )

question = "Which technology helps build Java applications?"

print("\nQuestion:", question)
print("\nPINECONE SEARCH RESULTS")

results = index.documents.search(
    namespace=namespace,
    top_k=2,
    score_by=[
        EmbedQuery(
            field="chunk_text",
            query=question
        )
    ],
    include_fields=["title", "chunk_text"]
)

matches = results.matches

if not matches:
    print("No search results found. Try running the script again.")
else:
    for match in matches:
        print("\nTitle:", match.title)
        print("Text:", match.chunk_text)
        print("Score:", round(match.score, 4))

import chromadb
from sample_data import documents, get_embeddings

client = chromadb.PersistentClient(path="./chroma_data")

collection = client.get_or_create_collection(
    name="technology_docs"
)

embeddings = get_embeddings(documents)

collection.upsert(
    ids=["1", "2", "3", "4"],
    documents=documents,
    embeddings=embeddings
)

question = "Which technology helps build Java applications?"
query_embedding = get_embeddings([question])

results = collection.query(
    query_embeddings=query_embedding,
    n_results=2
)

print("\nCHROMADB SEARCH RESULTS")

for document in results["documents"][0]:
    print("-", document)

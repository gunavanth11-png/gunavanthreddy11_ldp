
from qdrant_client import QdrantClient, models
from sample_data import documents, get_embeddings

client = QdrantClient(":memory:")

collection_name = "technology_docs"

embeddings = get_embeddings(documents)

client.create_collection(
    collection_name=collection_name,
    vectors_config=models.VectorParams(
        size=384,
        distance=models.Distance.COSINE
    )
)

client.upsert(
    collection_name=collection_name,
    points=[
        models.PointStruct(
            id=i + 1,
            vector=embeddings[i],
            payload={"text": documents[i]}
        )
        for i in range(len(documents))
    ]
)

question = "Which technology helps build Java applications?"
query_embedding = get_embeddings([question])[0]

results = client.query_points(
    collection_name=collection_name,
    query=query_embedding,
    limit=2,
    with_payload=True
)

print("\nQDRANT SEARCH RESULTS")

for point in results.points:
    print("-", point.payload["text"])
    print("  Score:", round(point.score, 4))

client.close()

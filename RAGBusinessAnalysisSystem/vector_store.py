from pymilvus import MilvusClient
from sentence_transformers import SentenceTransformer

from chunking import split_into_chunks


COLLECTION_NAME = "business_documents"
DB_PATH = "./milvus_business.db"
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"


class BusinessVectorStore:

    def __init__(self):
        self.model = SentenceTransformer(EMBEDDING_MODEL)
        self.dimension = self.model.get_sentence_embedding_dimension()

        self.client = MilvusClient(DB_PATH)

        if self.client.has_collection(
                collection_name=COLLECTION_NAME
        ):
            self.client.drop_collection(
                collection_name=COLLECTION_NAME
            )

        self.client.create_collection(
            collection_name=COLLECTION_NAME,
            dimension=self.dimension,
            metric_type="COSINE",
            auto_id=True,
            enable_dynamic_field=True
        )

    def index_documents(self, documents):
        records = []
        chunk_number = 0

        for document in documents:
            chunks = split_into_chunks(document["content"])

            for chunk in chunks:
                records.append({
                    "text": chunk,
                    "source": document["source"],
                    "chunk_id": f"chunk_{chunk_number}"
                })
                chunk_number += 1

        if not records:
            raise ValueError("No text chunks were created.")

        embeddings = self.model.encode(
            [record["text"] for record in records],
            normalize_embeddings=True,
            show_progress_bar=True
        )

        data = []

        for record, embedding in zip(records, embeddings):
            data.append({
                "vector": embedding.tolist(),
                "text": record["text"],
                "source": record["source"],
                "chunk_id": record["chunk_id"]
            })

        self.client.insert(
            collection_name=COLLECTION_NAME,
            data=data
        )

        print(f"Documents loaded: {len(documents)}")
        print(f"Chunks stored in Milvus: {len(data)}")

    def search(self, question, top_k=4):
        query_vector = self.model.encode(
            question,
            normalize_embeddings=True
        ).tolist()

        results = self.client.search(
            collection_name=COLLECTION_NAME,
            data=[query_vector],
            limit=top_k,
            output_fields=["text", "source", "chunk_id"]
        )

        matches = []

        for result in results[0]:
            entity = result.get("entity", {})

            matches.append({
                "text": entity.get("text", ""),
                "source": entity.get("source", "Unknown"),
                "chunk_id": entity.get("chunk_id", "Unknown"),
                "score": result.get("distance", 0.0)
            })

        return matches

    def close(self):
        self.client.close()
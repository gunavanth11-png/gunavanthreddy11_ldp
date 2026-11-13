import os
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer

load_dotenv()


class EmbeddingModel:

    def __init__(self):

        model_name = os.getenv(
            "EMBEDDING_MODEL",
            "sentence-transformers/all-MiniLM-L6-v2"
        )

        self.model = SentenceTransformer(model_name)

    def generate_embeddings(self, texts):

        return self.model.encode(
            texts,
            normalize_embeddings=True
        ).tolist()
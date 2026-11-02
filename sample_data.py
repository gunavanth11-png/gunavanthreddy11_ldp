from sentence_transformers import SentenceTransformer

documents = [
    "Java is an object-oriented programming language.",
    "Spring Boot helps developers build Java applications.",
    "Python is used for machine learning and data analysis.",
    "Vector databases store embeddings for similarity search."
]

model = SentenceTransformer("all-MiniLM-L6-v2")


def get_embeddings(texts):
    return model.encode(texts).tolist()


if __name__ == "__main__":
    embeddings = get_embeddings(documents)

    print("Number of documents:", len(documents))
    print("Embedding dimensions:", len(embeddings[0]))
    print("First embedding:", embeddings[0][:5])
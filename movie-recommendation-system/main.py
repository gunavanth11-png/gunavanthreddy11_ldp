
import os
import pandas as pd
import chromadb

from sentence_transformers import SentenceTransformer


DATASET_PATH = "movies.csv"
CHROMA_PATH = "./chroma_db"
COLLECTION_NAME = "movies"
MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
TOP_K = 5


def load_movies():

    if not os.path.exists(DATASET_PATH):
        raise FileNotFoundError(
            "movies.csv not found. Place it in the project folder."
        )

    movies = pd.read_csv(DATASET_PATH)

    movies.columns = [
        str(column).strip().lower().replace(" ", "_")
        for column in movies.columns
    ]

    column_aliases = {
        "title": ["title", "movie_title", "name"],
        "description": [
            "description",
            "overview",
            "plot",
            "summary"
        ],
        "genre": ["genre", "genres", "category"],
        "director": ["director", "directors"]
    }

    selected_columns = {}

    for standard_name, aliases in column_aliases.items():

        for alias in aliases:

            if alias in movies.columns:
                selected_columns[standard_name] = alias
                break

        if standard_name not in selected_columns:

            if standard_name in ["genre", "director"]:
                movies[standard_name] = "Unknown"
                selected_columns[standard_name] = standard_name
            else:
                raise ValueError(
                    f"Required column '{standard_name}' not found."
                )

    clean_movies = pd.DataFrame()

    for standard_name, actual_name in selected_columns.items():
        clean_movies[standard_name] = movies[actual_name]

    clean_movies = clean_movies.fillna("Unknown")

    clean_movies["title"] = clean_movies["title"].astype(str)
    clean_movies["description"] = clean_movies["description"].astype(str)
    clean_movies["genre"] = clean_movies["genre"].astype(str)
    clean_movies["director"] = clean_movies["director"].astype(str)

    clean_movies = clean_movies[
        (clean_movies["title"].str.strip() != "") &
        (clean_movies["description"].str.strip() != "") &
        (clean_movies["description"] != "Unknown")
        ]

    clean_movies = clean_movies.reset_index(drop=True)

    if clean_movies.empty:
        raise ValueError("No valid movie records found in movies.csv.")

    return clean_movies


def build_collection(movies, model):

    client = chromadb.PersistentClient(path=CHROMA_PATH)

    try:
        client.delete_collection(name=COLLECTION_NAME)
    except Exception:
        pass

    collection = client.create_collection(
        name=COLLECTION_NAME,
        metadata={"hnsw:space": "cosine"}
    )

    descriptions = movies["description"].tolist()

    embeddings = model.encode(
        descriptions,
        convert_to_numpy=True
    ).tolist()

    ids = [str(i) for i in range(len(movies))]

    metadatas = []

    for _, movie in movies.iterrows():

        metadatas.append({
            "title": str(movie["title"]),
            "genre": str(movie["genre"]),
            "director": str(movie["director"])
        })

    collection.add(
        ids=ids,
        documents=descriptions,
        embeddings=embeddings,
        metadatas=metadatas
    )

    print(
        f"\nSuccessfully stored {collection.count()} movies in ChromaDB."
    )

    return collection


def make_filter(genre=None, director=None):

    conditions = []

    if genre:
        conditions.append({
            "genre": {
                "$eq": genre
            }
        })

    if director:
        conditions.append({
            "director": {
                "$eq": director
            }
        })

    if len(conditions) == 0:
        return None

    if len(conditions) == 1:
        return conditions[0]

    return {
        "$and": conditions
    }


def recommend_movies(collection, model, query, genre=None, director=None):

    query_embedding = model.encode(
        query,
        convert_to_numpy=True
    ).tolist()

    where_filter = make_filter(genre, director)

    query_arguments = {
        "query_embeddings": [query_embedding],
        "n_results": min(TOP_K, collection.count()),
        "include": [
            "documents",
            "metadatas",
            "distances"
        ]
    }

    if where_filter:
        query_arguments["where"] = where_filter

    results = collection.query(**query_arguments)

    if not results["ids"] or not results["ids"][0]:
        print("\nNo matching movies found.")
        return

    print("\n========== TOP MOVIE RECOMMENDATIONS ==========\n")

    for index in range(len(results["ids"][0])):

        metadata = results["metadatas"][0][index]
        description = results["documents"][0][index]
        distance = results["distances"][0][index]

        similarity = max(0, (1 - distance) * 100)

        print(f"Recommendation {index + 1}")
        print("---------------------------------------")

        print("Movie:", metadata["title"])
        print("Genre:", metadata["genre"])
        print("Director:", metadata["director"])

        print(f"Similarity Score: {similarity:.2f}%")

        print("Description:", description)

        print()


def main():

    print("======================================")
    print("       MOVIE RECOMMENDATION SYSTEM")
    print("======================================")

    movies = load_movies()

    print(f"\nLoaded {len(movies)} movies from dataset.")

    print("\nLoading embedding model...")

    model = SentenceTransformer(MODEL_NAME)

    collection = build_collection(movies, model)

    print("\nEnter your movie preferences.")

    user_query = input(
        "\nDescribe the movie you want: "
    ).strip()

    if not user_query:
        print("Please enter a movie description.")
        return

    genre = input(
        "Genre filter (optional, exact value from dataset): "
    ).strip()

    director = input(
        "Director filter (optional, exact value from dataset): "
    ).strip()

    genre = genre if genre else None
    director = director if director else None

    recommend_movies(
        collection,
        model,
        user_query,
        genre,
        director
    )


if __name__ == "__main__":
    main()

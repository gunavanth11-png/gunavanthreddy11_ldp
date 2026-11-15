# Movie Recommendation System

A semantic movie recommendation engine built with **ChromaDB** and **Sentence Transformers**.

## How It Works

1. Loads movies from `movies.csv` and generates text embeddings using `sentence-transformers/all-MiniLM-L6-v2`
2. Stores embeddings in a local **ChromaDB** vector database with cosine similarity
3. Accepts a natural-language query from the user and returns the top-5 most semantically similar movies
4. Supports optional **genre** and **director** filters

## Tech Stack

| Library | Purpose |
|---|---|
| `sentence-transformers` | Text embedding model |
| `chromadb` | Vector database for semantic search |
| `pandas` | CSV data loading and cleaning |

## Setup

```bash
pip install -r requirements.txt
python main.py
```

## Usage

```
Describe the movie you want: A hero fights to save the world
Genre filter (optional): Action
Director filter (optional):
```

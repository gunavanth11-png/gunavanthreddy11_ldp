from pathlib import Path


DOCUMENTS_DIR = Path(__file__).parent / "documents"


def load_documents():
    documents = []

    if not DOCUMENTS_DIR.exists():
        raise FileNotFoundError(
            f"Documents folder not found: {DOCUMENTS_DIR}"
        )

    for file_path in sorted(DOCUMENTS_DIR.glob("*.txt")):
        content = file_path.read_text(encoding="utf-8").strip()

        if content:
            documents.append({
                "source": file_path.name,
                "content": content
            })

    if not documents:
        raise ValueError(
            "No .txt documents found inside the documents folder."
        )

    return documents
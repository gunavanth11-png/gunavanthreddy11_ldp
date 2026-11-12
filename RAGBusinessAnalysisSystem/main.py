from document_loader import load_documents
from vector_store import BusinessVectorStore
from rag_pipeline import generate_answer


def main():
    print("=" * 60)
    print("RAG-POWERED BUSINESS ANALYSIS SYSTEM")
    print("=" * 60)

    documents = load_documents()
    store = BusinessVectorStore()

    try:
        print("\nIndexing company documents...")
        store.index_documents(documents)

        print("\nSystem ready!")
        print("Ask about Microsoft revenue, business domains, AI,")
        print("cloud services, or company announcements.")
        print("Type 'exit' to stop.\n")

        while True:
            question = input("Analyst question: ").strip()

            if question.lower() in {"exit", "quit"}:
                print("Goodbye!")
                break

            if not question:
                print("Please enter a question.\n")
                continue

            matches = store.search(question, top_k=4)
            result = generate_answer(question, matches)

            print("\nANSWER")
            print("-" * 60)
            print(result["answer"])

            print("\nSOURCES")
            print("-" * 60)

            if not result["sources"]:
                print("No relevant sources were retrieved.")

            for source in result["sources"]:
                print(
                    f"[{source['id']}] {source['source']} | "
                    f"{source['chunk_id']} | "
                    f"Similarity score: {source['score']:.4f}"
                )
                print(f"Evidence: {source['text']}\n")

            print("=" * 60)

    finally:
        store.close()


if __name__ == "__main__":
    main()
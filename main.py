from dotenv import load_dotenv

from agents.research_agent import research_company
from ingestion.document_ingestion import ingest_documents
from rag.rag_pipeline import run_rag_pipeline


load_dotenv()


def main():

    print("=" * 65)
    print("       ADVANCED RAG BUSINESS ANALYSIS SYSTEM")
    print("=" * 65)

    companies = [
        "Microsoft",
        "Google",
        "Amazon"
    ]

    all_documents = []

    print("\nSTEP 1: AGENTS AND TOOLS")

    for company in companies:

        documents = research_company(company)

        all_documents.extend(documents)


    print("\nSTEP 2: DOCUMENT INGESTION")

    store = ingest_documents(all_documents)


    print("\nSTEP 3: QUERY CONSTRUCTION")

    question = input(
        "\nEnter your business analysis question: "
    )


    print("\nSTEP 4: ADVANCED RAG PIPELINE")

    response = run_rag_pipeline(
        question,
        companies,
        store
    )


    print("\n" + "=" * 65)
    print("FINAL ANSWER")
    print("=" * 65)

    print(response)

    print("\n" + "=" * 65)
    print("ADVANCED RAG EXECUTION COMPLETED")
    print("=" * 65)


if __name__ == "__main__":
    main()
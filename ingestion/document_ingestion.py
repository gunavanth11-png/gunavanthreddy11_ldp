from ingestion.document_parser import split_documents
from ingestion.metadata_manager import add_metadata
from vector_store.milvus_store import MilvusStore


def ingest_documents(documents):

    print("\nStarting document ingestion...")

    chunks = split_documents(documents)

    enriched_chunks = add_metadata(chunks)

    store = MilvusStore()

    store.create_company_partitions()

    store.insert_documents(enriched_chunks)

    print(f"Total chunks ingested: {len(enriched_chunks)}")

    return store
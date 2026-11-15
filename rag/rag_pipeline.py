from query.query_rewriter import rewrite_query
from query.query_decomposer import decompose_query
from query.query_retriever import retrieve_documents
from rag.response_generator import generate_answer
from cache.cache_manager import CacheManager
from tools.chat_history_tool import get_chat_history


def run_rag_pipeline(question, companies, store):

    cache = CacheManager()

    try:
        # Check cache
        cached_response = cache.get(question)

        if cached_response is not None:
            return cached_response

        # Retrieve previous conversations
        chat_history = []

        for company in companies:
            chat_history.extend(
                get_chat_history(company)
            )

        # Query rewriting
        rewritten_query = rewrite_query(
            question,
            chat_history
        )

        print("\nRewritten Query:")
        print(rewritten_query)

        # Query decomposition
        sub_queries = decompose_query(
            question,
            companies
        )

        print("\nGenerated Sub Queries:")

        for query in sub_queries:
            print("-", query)

        # Retrieve documents
        retrieved_documents = []

        for query in [rewritten_query] + sub_queries:

            results = retrieve_documents(
                store,
                query,
                companies
            )

            retrieved_documents.extend(results)

        # Remove duplicate results
        unique_documents = {}

        for document in retrieved_documents:

            key = (
                document["company"],
                document["source"],
                document["content"]
            )

            unique_documents[key] = document

        retrieved_documents = list(
            unique_documents.values()
        )

        # Generate final answer
        response = generate_answer(
            question,
            retrieved_documents
        )

        # Save response
        cache.set(question, response)

        return response

    finally:
        cache.close()
def retrieve_documents(store, question, companies):

    print("\nPerforming similarity search...")

    results = store.search(
        query=question,
        companies=companies,
        top_k=3
    )

    return results
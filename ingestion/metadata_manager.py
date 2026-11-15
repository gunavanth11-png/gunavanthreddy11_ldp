def add_metadata(chunks):

    enriched_chunks = []

    for index, chunk in enumerate(chunks):

        enriched_chunks.append({
            "id": index,
            "company": chunk["company"],
            "title": chunk["title"],
            "source": chunk["source"],
            "doc_type": chunk["doc_type"],
            "content": chunk["content"]
        })

    return enriched_chunks
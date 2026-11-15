def split_documents(documents, chunk_size=500, overlap=50):

    chunks = []

    for document in documents:

        content = document["content"]

        start = 0

        while start < len(content):

            end = start + chunk_size

            chunk_text = content[start:end]

            if chunk_text.strip():

                chunks.append({
                    "company": document["company"],
                    "title": document["title"],
                    "source": document["source"],
                    "doc_type": document["doc_type"],
                    "content": chunk_text
                })

            if end >= len(content):
                break

            start = end - overlap

    return chunks
def generate_answer(question, retrieved_documents):

    if not retrieved_documents:
        return "No relevant information found in the available documents."

    answer = []

    answer.append("Business Analysis Results")
    answer.append(f"\nQuestion: {question}")

    for document in retrieved_documents:

        answer.append(
            f"\nCompany: {document['company'].title()}"
        )

        answer.append(
            f"Document Type: {document['doc_type']}"
        )

        answer.append(
            f"Relevant Information: {document['content']}"
        )

        answer.append(
            f"Source: {document['source']}"
        )

    return "\n".join(answer)
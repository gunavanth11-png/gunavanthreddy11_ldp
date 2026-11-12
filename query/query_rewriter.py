def rewrite_query(question, chat_history):

    if not chat_history:
        return question

    previous_context = []

    for chat in chat_history[-3:]:

        previous_context.append(
            str(chat.get("question", ""))
        )

    context = " ".join(previous_context)

    rewritten_query = (
        f"{question}. Previous conversation context: {context}"
    )

    return rewritten_query
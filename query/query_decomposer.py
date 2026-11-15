def decompose_query(question, companies):

    sub_queries = []

    keywords = [
        "revenue",
        "financial performance",
        "business operations"
    ]

    for company in companies:

        for keyword in keywords:

            sub_queries.append(
                f"What is the {keyword} of {company}?"
            )

    return sub_queries
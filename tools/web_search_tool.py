from ddgs import DDGS


def search_web(company, max_results=5):
    query = f"{company} company revenue business financial performance"

    print(f"\nSearching web for: {company}")

    results = []

    try:
        search_results = DDGS().text(
            query,
            max_results=max_results
        )

        for item in search_results:
            results.append({
                "title": item.get("title", ""),
                "url": item.get("href", ""),
                "snippet": item.get("body", ""),
                "company": company
            })

    except Exception as error:
        print(f"Web search error: {error}")

    return results
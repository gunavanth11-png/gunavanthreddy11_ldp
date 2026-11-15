import requests
from bs4 import BeautifulSoup


def collect_documents(search_results):

    documents = []

    for result in search_results:

        url = result.get("url")

        if not url:
            continue

        try:
            response = requests.get(
                url,
                timeout=15,
                headers={
                    "User-Agent": "Mozilla/5.0"
                }
            )

            response.raise_for_status()

            soup = BeautifulSoup(
                response.text,
                "html.parser"
            )

            for element in soup(
                    ["script", "style", "nav", "footer", "header"]
            ):
                element.decompose()

            content = soup.get_text(
                separator=" ",
                strip=True
            )

            if len(content) > 100:

                documents.append({
                    "company": result["company"],
                    "title": result["title"],
                    "source": url,
                    "content": content,
                    "doc_type": "web"
                })

        except requests.RequestException as error:
            print(f"Could not read {url}: {error}")

    return documents
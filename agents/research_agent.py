from tools.web_search_tool import search_web
from tools.chat_history_tool import get_chat_history
from agents.document_agent import collect_documents


def research_company(company):

    print(f"\nResearching {company}...")


    search_results = search_web(company)


    web_documents = collect_documents(search_results)


    chat_history = get_chat_history(company)


    for chat in chat_history:

        content = (
                str(chat.get("question", "")) + " " +
                str(chat.get("answer", ""))
        )

        if content.strip():

            web_documents.append({
                "company": company,
                "title": "Stored Chat History",
                "source": "application_chat_history",
                "content": content,
                "doc_type": "chat_history"
            })

    print(f"Documents collected: {len(web_documents)}")

    return web_documents
import os
from dotenv import load_dotenv
from pinecone import Pinecone

load_dotenv()

pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

for item in pc.indexes.list():
    print("\nIndex:", item.name)

    details = pc.indexes.describe(name=item.name)
    print("Schema:", details.schema)
import os
from dotenv import load_dotenv
from pymilvus import MilvusClient, DataType

from vector_store.embedding_model import EmbeddingModel

load_dotenv()


class MilvusStore:

    COLLECTION_NAME = "company_documents"

    COMPANIES = [
        "microsoft",
        "google",
        "amazon"
    ]

    def __init__(self):

        db_path = os.getenv(
            "MILVUS_DB_PATH",
            "./milvus_demo.db"
        )

        self.client = MilvusClient(uri=db_path)

        self.embedding_model = EmbeddingModel()

        self.create_collection()

    def create_collection(self):

        if self.client.has_collection(self.COLLECTION_NAME):
            return

        schema = self.client.create_schema(
            auto_id=False,
            enable_dynamic_field=True
        )

        schema.add_field(
            field_name="id",
            datatype=DataType.INT64,
            is_primary=True
        )

        schema.add_field(
            field_name="vector",
            datatype=DataType.FLOAT_VECTOR,
            dim=384
        )

        schema.add_field(
            field_name="company",
            datatype=DataType.VARCHAR,
            max_length=100
        )

        schema.add_field(
            field_name="text",
            datatype=DataType.VARCHAR,
            max_length=60000
        )

        schema.add_field(
            field_name="source",
            datatype=DataType.VARCHAR,
            max_length=2048
        )

        schema.add_field(
            field_name="doc_type",
            datatype=DataType.VARCHAR,
            max_length=100
        )

        index_params = self.client.prepare_index_params()

        index_params.add_index(
            field_name="vector",
            metric_type="COSINE",
            index_type="AUTOINDEX"
        )

        self.client.create_collection(
            collection_name=self.COLLECTION_NAME,
            schema=schema,
            index_params=index_params
        )

        print("Milvus collection created.")

    def create_company_partitions(self):

        for company in self.COMPANIES:

            if not self.client.has_partition(
                    self.COLLECTION_NAME,
                    company
            ):

                self.client.create_partition(
                    collection_name=self.COLLECTION_NAME,
                    partition_name=company
                )

                print(f"Partition created: {company}")

    def insert_documents(self, chunks):

        if not chunks:
            print("No documents available for insertion.")
            return

        texts = [
            chunk["content"]
            for chunk in chunks
        ]

        vectors = self.embedding_model.generate_embeddings(texts)

        rows = []

        for index, (chunk, vector) in enumerate(
                zip(chunks, vectors)
        ):

            rows.append({
                "id": index,
                "vector": vector,
                "company": chunk["company"].lower(),
                "text": chunk["content"],
                "source": chunk["source"],
                "doc_type": chunk["doc_type"]
            })

        for company in self.COMPANIES:

            company_rows = [
                row for row in rows
                if row["company"] == company
            ]

            if company_rows:

                self.client.insert(
                    collection_name=self.COLLECTION_NAME,
                    partition_name=company,
                    data=company_rows
                )

        print("Documents stored successfully in Milvus.")

    def search(self, query, companies, top_k=3):

        vector = self.embedding_model.generate_embeddings(
            [query]
        )[0]

        results = []

        for company in companies:

            company = company.lower()

            if company not in self.COMPANIES:
                continue

            search_results = self.client.search(
                collection_name=self.COLLECTION_NAME,
                partition_names=[company],
                data=[vector],
                limit=top_k,
                output_fields=[
                    "company",
                    "text",
                    "source",
                    "doc_type"
                ]
            )

            for result in search_results[0]:

                entity = result["entity"]

                results.append({
                    "company": entity["company"],
                    "content": entity["text"],
                    "source": entity["source"],
                    "doc_type": entity["doc_type"],
                    "score": result["distance"]
                })

        return results
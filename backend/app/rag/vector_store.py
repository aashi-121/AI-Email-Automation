from langchain_huggingface import HuggingFaceEmbeddings
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient

from app.core.config import settings


COLLECTION_NAME = "company_docs"


embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


client = QdrantClient(
    url=settings.QDRANT_URL
)


def store_documents(chunks):

    QdrantVectorStore.from_documents(
        documents=chunks,
        embedding=embedding_model,
        url=settings.QDRANT_URL,
        collection_name=COLLECTION_NAME,
    )

    print("Documents stored successfully!")
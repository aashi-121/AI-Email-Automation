from langchain_huggingface import HuggingFaceEmbeddings
from langchain_qdrant import QdrantVectorStore

from app.core.config import settings


COLLECTION_NAME = "company_docs"

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


vector_store = QdrantVectorStore.from_existing_collection(
    embedding=embedding_model,
    url=settings.QDRANT_URL,
    collection_name=COLLECTION_NAME,
)


def search_documents(query: str):

    results = vector_store.similarity_search(
        query,
        k=3
    )

    return results
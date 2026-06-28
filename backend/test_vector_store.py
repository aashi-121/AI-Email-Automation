from app.rag.pdf_loader import load_documents, split_documents
from app.rag.vector_store import store_documents

documents = load_documents()

chunks = split_documents(documents)

store_documents(chunks)
from app.rag.pdf_loader import (
    load_documents,
    split_documents,
)

documents = load_documents()

chunks = split_documents(documents)

print(f"Documents : {len(documents)}")
print(f"Chunks    : {len(chunks)}")

print("\nFirst Chunk:\n")

print(chunks[0].page_content)
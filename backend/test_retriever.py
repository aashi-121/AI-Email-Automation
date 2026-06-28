from app.rag.retriever import search_documents

query = "Can I get a refund after buying a damaged product?"

results = search_documents(query)

print(f"Retrieved {len(results)} chunks\n")

for i, doc in enumerate(results, start=1):
    print("=" * 60)
    print(f"Chunk {i}")
    print(doc.page_content)
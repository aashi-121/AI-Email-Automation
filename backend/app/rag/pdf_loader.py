from pathlib import Path
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader



def load_documents():

    pdf_folder = Path("knowledge")

    documents = []

    for pdf in pdf_folder.glob("*.pdf"):

        loader = PyPDFLoader(str(pdf))

        documents.extend(loader.load())

    return documents

def split_documents(documents):

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100
    )

    chunks = splitter.split_documents(documents)

    return chunks
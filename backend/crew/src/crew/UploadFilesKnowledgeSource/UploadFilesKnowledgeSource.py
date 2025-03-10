from crewai.knowledge.source.base_knowledge_source import BaseKnowledgeSource
from langchain_experimental.text_splitter import SemanticChunker
from langchain_openai.embeddings import OpenAIEmbeddings
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.documents import Document
import os
from pydantic import Field



knowledge_dir = "../../../../knowledge"
pdf_files = [os.path.join(knowledge_dir, f) for f in os.listdir(knowledge_dir)]

docs = []

for file in pdf_files:
    loader = PyPDFLoader(file, mode="page")
    doc = loader.load()
    docs.append(doc)

class UploadFilesKnowledgeSource(BaseKnowledgeSource):
    """Knowledge source that loads and processes PDF files from a directory."""
    pdfs_directory: str = Field(
        default = "../../../../knowledge",
        description="Directory containing PDF files to load."
    )
    docs: list[Document] = Field(default_factory=list)

    def create_storage_from_pdfs():
        pass



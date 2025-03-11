from crewai.knowledge.source.base_knowledge_source import BaseKnowledgeSource
from langchain_experimental.text_splitter import SemanticChunker
from langchain_openai.embeddings import OpenAIEmbeddings
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.documents import Document
from langchain_huggingface import HuggingFaceEmbeddings
import os
from pydantic import Field


class UploadFilesKnowledgeSource(BaseKnowledgeSource):
    """Knowledge source that loads and processes PDF files from a directory."""
    pdfs_directory: str = Field(
        default = "/Users/yaraslausedach/Code/crewai_data_chat/backend/knowledge",
        description="Directory containing PDF files to load."
    )
    
    def validate_content(self) -> list[str]:
        """
        Validate the directory and return a list of PDF file paths.
        
        Raises ValueError if the directory does not exist or contains no PDFs.
        """
        if os.path.isdir(not self.pdfs_directory):
            raise ValueError(f"Directory '{self.pdfs_directory}' does not exist or is not a directory.")

        pdfs_paths = [os.path.join(self.pdfs_directory, f) for f in os.listdir(self.pdfs_directory) if f.lower().endswith(".pdf")]

        if not pdfs_paths:
            raise ValueError("No PDF files found in the directory")
        return pdfs_paths

    def add(self) -> None:
        """
        Create a knowledge source from the PDFs in the knowledge folder.
        """
        pdf_files_paths = self.validate_content()
        all_docs = []
        
        for pdf_file in pdf_files_paths:
            loader = PyPDFLoader(pdf_file)
            docs = loader.load()
            
            for doc in docs:
                doc.metadata = doc.metadata or {}
                doc.metadata["source"] = os.path.basename(pdf_file)
                all_docs.append(doc)
        
        # embeddings = OpenAIEmbeddings()
        embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

        
        text_splitter = SemanticChunker(
            embeddings,
            breakpoint_threshold_type="percentile",
            breakpoint_threshold_amount=75.0
        )
        
        pdf_chunks = text_splitter.split_documents(all_docs)
        
        for chunk in pdf_chunks:
            self.chunks.append(chunk.page_content)
            
        self._save_documents()


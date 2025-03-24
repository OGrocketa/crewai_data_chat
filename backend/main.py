from fastapi import FastAPI, Depends,HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from crew.src.crew.crew import Testcrew
from crewai_tools import RagTool
import uvicorn, os
import boto3
from pydantic import BaseModel
from typing import List

class MessageRequest(BaseModel):
    message: str
    files_urls: List[str]


BUCKET_NAME = "crewai-chatbot"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def load_crew():
    return Testcrew().crew()

@app.post("/respond_to_message")
async def respond_to_message(request: MessageRequest, crew = Depends(load_crew), ):
    rag_tool = RagTool()
    if request.files_urls:
        for file in request.files_urls:
            rag_tool.add(source=file)
    
    data_extractor_agent = None

    for agent in crew.agents:
        if hasattr(agent,"role") and agent.role.strip().lower() =="data extractor":
            data_extractor_agent = agent
            break
    
    if data_extractor_agent is None:
        raise HTTPException(status_code=404, detail="Data extractor agent not found")

    data_extractor_agent.tools.append(rag_tool)

    try:
        response = crew.kickoff({"query":request.message})
        return response
    except HTTPException as e:
        raise HTTPException(status_code=500, detail=f"Error processing message: {e}")


@app.post("/upload_file")
async def upload_files_create_chromadb(chat_id:str, files: list[UploadFile]=File(...)):
    
    s3_client = boto3.client('s3')
    
    uploaded_files = []
    for file in files:
        s3_key = f"{chat_id}/{file.filename}"

        try:
            file_url = f"https://crewai-chatbot.s3.eu-north-1.amazonaws.com/{s3_key}"
            response = s3_client.upload_fileobj(file.file, BUCKET_NAME, s3_key)
            uploaded_files.append(file_url)
        except Exception as e:
            print('An error occurred when trying to upload:',e)
            raise HTTPException(status_code=406, detail=f"Error uploading a file: {e}")


    return uploaded_files


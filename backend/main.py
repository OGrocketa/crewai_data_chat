from fastapi import FastAPI, Depends,HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from crew.src.crew.crew import Testcrew
import uvicorn, os

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

@app.get("/respond_to_message")
async def respond_to_message(message: str, crew = Depends(load_crew)):
    try:
        response = crew.kickoff({"query":message})
        return response
    except HTTPException as e:
        raise HTTPException(status_code=500, detail=f"Error processing message: {e}")


@app.post("/upload_file")
async def upload_files_create_chromadb(files: list[UploadFile]=File(...)):
    UPLOAD_DIR = "./knowledge"
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    
    filenames = []
    for file in files:
        try:
            knowledge_dir = os.path.join(UPLOAD_DIR, file.filename)
            contents = await file.read()
            with open(knowledge_dir, 'wb') as f :
                f.write(contents)
            filenames.append(file.filename)

        except Exception as e:
            raise HTTPException(status_code=500, detail="File upload failed")

        finally:
            await file.close()

    return {"uploaded_files": filenames}

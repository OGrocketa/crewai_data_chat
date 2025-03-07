from fastapi import FastAPI, Depends,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from crew.src.crew.crew import Testcrew
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def load_crew():
    return Testcrew().crew()

@app.get("/respond_to_message")
async def respond_to_message(message: str, crew = Depends(load_crew)):
    try:
        response = crew.kickoff({"user_question":message})
        return response
    except HTTPException as e:
        raise HTTPException(status_code=500, detail=f"Error processing message: {e}")

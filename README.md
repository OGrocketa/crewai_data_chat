# Project Setup

Below are the minimal steps to install and run both the backend (using Poetry) and the frontend (using npm).

---

## Backend

1. **Install Poetry** (if not already installed).  
   Refer to the [Poetry docs](https://python-poetry.org/docs/#installation) for details.

2. **Navigate to the backend folder and run server**:
   ```bash
   cd backend
   poetry install
   poetry shell
   poetry run python -m uvicorn main:app --reload

## Frontend Setup
    ```bash
    cd ../frontend
    npm install
    npm run dev

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from app.models import SystemInput
from app.graph import analyze_failures
import json
import yaml
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Trace backend is running"}

@app.post("/analyze")
async def analyze_system(file: UploadFile = File(...)):
    content = await file.read()
    ext = os.path.splitext(file.filename)[1].lower()

    try:
        if ext == ".json":
            data = json.loads(content)
        elif ext in [".yaml", ".yml"]:
            data = yaml.safe_load(content)
        else:
            return {"error": "Unsupported file type. Upload .json or .yaml"}

        system_input = SystemInput(**data)
        result = analyze_failures(system_input)
        return result

    except Exception as e:
        return {"error": f"Parsing or analysis failed: {str(e)}"}

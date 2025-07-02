from fastapi import FastAPI
from app.models import SystemInput
from app.graph import analyze_failures

app = FastAPI()

@app.get("/")
def root():
    return {"Message": "Trace backend is running"}


@app.post("/analyze")
def analyze_system(input_data: SystemInput):
    result = analyze_failures(input_data)
    return result


import os
import requests
from dotenv import load_dotenv

load_dotenv()
TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")

def generate_failure_summary(component,root_causes,cascades):
    prompt = f"""
You are a system reliability expert.

Component `{component}` has failed.
Root causes:
{', '.join(root_causes) if root_causes else 'None'}
Cascading failures:
{', '.join(cascades) if cascades else 'None'}

Write a professional, clear explanation of what happened and why, in under 100 words.
"""
    headers = {
        "Authorization" : f"Bearer {TOGETHER_API_KEY}",
        "Content-Type": "application/json"
    }

    body = {
        "model": "mistralai/Mistral-7B-Instruct-v0.2", 
        "max_tokens": 200,
        "temperature": 0.7,
        "messages": [
            {"role": "user", "content": prompt}
        ]
    }
    
    response = requests.post("https://api.together.xyz/v1/chat/completions", headers=headers, json=body)

    if response.status_code == 200:
        return response.json()['choices'][0]['message']['content'].strip()
    else:
        return f"Error from Together API: {response.text}"



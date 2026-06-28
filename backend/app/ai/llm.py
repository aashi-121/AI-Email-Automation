import requests


OLLAMA_URL = "http://localhost:11434/api/generate"

MODEL = "llama3.2:3b"


def ask_llm(prompt: str) -> str:
    """
    Sends a prompt to Ollama and returns the response.
    """

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": MODEL,
            "prompt": prompt,
            "stream": False
        }
    )

    response.raise_for_status()

    return response.json()["response"].strip()
import os
from dotenv import load_dotenv

# Load .env relative to this file's location (backend/.env)
dotenv_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env")
load_dotenv(dotenv_path)

class Settings:
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    PORT: int = int(os.getenv("PORT", "8000"))
    DATA_DIR: str = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "data"))

settings = Settings()
os.makedirs(settings.DATA_DIR, exist_ok=True)
os.makedirs(os.path.join(settings.DATA_DIR, "uploads"), exist_ok=True)

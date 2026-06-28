from fastapi import FastAPI


from app.db.database import engine, Base

from app.models import Email

from app.api.gmail_routes import router as gmail_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AI Email Automation",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(gmail_router)

Base.metadata.create_all(bind=engine)



@app.get("/")
def home():
    return {
        "message": "AI  Aashi Email Automation API Running 🚀"
    }



print("Models registered:", Base.metadata.tables.keys())

Base.metadata.create_all(bind=engine)

print("Tables creation attempted.")

print("Registered tables:", Base.metadata.tables.keys())
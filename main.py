from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
import models

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables in PostgreSQL
Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {"message": "Cloud Log Analytics Dashboard Running!"}
@app.get("/logs")
def get_logs():
    from database import engine
    from sqlalchemy import text

    with engine.connect() as conn:
        result = conn.execute(text("SELECT * FROM logs"))
        logs = []

        for row in result:
            logs.append({
                "id": row.id,
                "timestamp": str(row.timestamp),
                "service_name": row.service_name,
                "log_level": row.log_level,
                "message": row.message
            })

    return logs
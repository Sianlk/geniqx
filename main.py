from fastapi import FastAPI
from routes import store

app = FastAPI()
app.include_router(store.router, prefix="/api/store")

FROM python:3.11-slim
WORKDIR /app
COPY . /app
RUN pip install fastapi uvicorn python-dotenv
CMD ["python", "backend/main.py"]

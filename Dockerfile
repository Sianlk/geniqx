FROM python:3.11-slim
WORKDIR /app
COPY . /app
RUN pip install fastapi uvicorn
CMD ["python", "geni_ai_r/core_kernel.py"]

FROM python:3.11-slim
WORKDIR /app
COPY . /app
RUN pip install flask flask-cors reportlab
CMD ["python", "backend/app.py"]

FROM python:3.11-slim
WORKDIR /app
COPY . /app
RUN pip install flask flask-cors beautifulsoup4 requests
CMD ["python", "backend/app.py"]

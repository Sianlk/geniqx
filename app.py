from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/tutorium/status")
def status():
    return {"status": "Tutorium education core active"}

if __name__ == "__main__":
    app.run(debug=True)

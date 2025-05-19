from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/buildlogic/status")
def status():
    return {"status": "BuildLogic AI is operational"}

if __name__ == "__main__":
    app.run(debug=True)

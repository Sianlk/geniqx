from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/markethub/status")
def status():
    return {"status": "GENI AI.MARKETHUB system active"}

if __name__ == "__main__":
    app.run(debug=True)

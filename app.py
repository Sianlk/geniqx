from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/coreagent/status")
def status():
    return {"status": "CoreAgent AI persona system active"}

if __name__ == "__main__":
    app.run(debug=True)

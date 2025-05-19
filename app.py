from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/vaultx")
def home():
    return jsonify({
        "status": "VaultX store is live",
        "pricing": {
            "VaultX Prime": "950 CoreBits",
            "Legendary Skin": "2000 CoreBits",
            "Starter Pack": "600 CoreBits + Skin"
        }
    })

if __name__ == "__main__":
    app.run(debug=True)

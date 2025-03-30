from flask import Flask, request, jsonify
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to send requests

# Google Sheets API Setup
SERVICE_ACCOUNT_FILE = "your-service-account.json"  # Path to JSON file
SPREADSHEET_ID = "your-google-sheet-id"

# Authenticate with Google Sheets API
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name(SERVICE_ACCOUNT_FILE, scope)
client = gspread.authorize(creds)
sheet = client.open_by_key(SPREADSHEET_ID).sheet1  # Open first sheet

@app.route("/submit", methods=["POST"])
def submit_qr():
    data = request.json
    qr_code = data.get("qr_code")

    if not qr_code or len(qr_code) != 6:
        return jsonify({"error": "Invalid QR code"}), 400

    # Append QR code to the next available row
    sheet.append_row([qr_code])
    
    return jsonify({"message": "QR code saved successfully!"})

if __name__ == "__main__":
    app.run(debug=True)

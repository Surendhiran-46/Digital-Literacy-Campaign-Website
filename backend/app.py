from flask import Flask, request, jsonify
from flask_cors import CORS
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from datetime import datetime
import os
from dotenv import load_dotenv
from openai import AzureOpenAI

app = Flask(__name__)
CORS(app)

load_dotenv()

AZURE_API_KEY = os.getenv("AZURE_OPENAI_KEY")
AZURE_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT")
AZURE_DEPLOYMENT = os.getenv("AZURE_OPENAI_DEPLOYMENT")

# Set up Google Sheets
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name("service_account.json", scope)
client = gspread.authorize(creds)
sheet = client.open("DLC_FEEDBACK").sheet1  # Sheet1 is default tab

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    question = data.get('question', '').strip()
    app_name = data.get('app', 'general').strip()
    lang = data.get('lang', 'en')

    if AZURE_API_KEY and AZURE_ENDPOINT and AZURE_DEPLOYMENT:
        try:
            client = AzureOpenAI(
                api_key=AZURE_API_KEY,
                api_version="2024-05-01-preview",
                azure_endpoint=AZURE_ENDPOINT,
            )
            system_prompt = (
                f"You are a patient and friendly assistant helping an elderly user with the app"
                "Respond slowly and clearly, as if explaining to someone who is new to smartphones. "
                "Give simple, spoken-style instructions that are easy to follow. "
                "Keep it short – no more than 3 to 5 steps. "
                "Avoid all formatting, bullet points, symbols, and technical words. "
                "Do NOT include headers, markdown, or numbered lists. " 
                "Your response will be read aloud using Speech Services, so use natural spoken language, "
                "Use correct spelling and natural words as spoken in daily life. Do not use transliteration."
                "short sentences, and include brief pauses where helpful (for example, use commas or periods). "
            )

            if lang == 'ta':
                system_prompt += "Respond in Tamil using simple and respectful language."
            elif lang == 'hi':
                system_prompt += "Respond in Hindi using simple and respectful language."
            else:
                system_prompt += "Respond in English using simple and respectful language."


            response = client.chat.completions.create(
                model=AZURE_DEPLOYMENT,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": question}
                ],

                temperature=0.5,
                max_tokens=300,
            )

            gpt_reply = response.choices[0].message.content
            steps = [s.strip() for s in gpt_reply.split('\n') if s.strip()]
            return jsonify({ 'steps': steps })

        except Exception as e:
            print("GPT fallback failed:", e)
            return jsonify({'steps': ['Error: GPT service failed.']}), 500

    return jsonify({'steps': ['Configuration missing or invalid.']}), 400

@app.route('/submit-feedback', methods=['POST'])
def submit_feedback():
    data = request.get_json()

    # Extract and prepare data
    name = data.get("name", "")
    email = data.get("email", "")
    message = data.get("message", "")
    rating = data.get("rating", 0)
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Append to Google Sheet
    try:
        sheet.append_row([name, email, message, str(rating), timestamp])
        return jsonify({"status": "success", "message": "Feedback saved!"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True, port=5000)

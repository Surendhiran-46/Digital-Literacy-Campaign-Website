# 📱 Digital Literacy Campaign Platform

A smart, voice-enabled AI chatbot created for the **Digital Literacy Campaign**, designed to assist digitally less-experienced users—especially elders—in learning how to use mobile apps like WhatsApp, Paytm, and Google Maps with ease.This platform Offers step-by-step spoken guidance tailored for first-time smartphone users, Supports multiple languages including English, Hindi, and Tamil, Uses **Azure Cognitive Services** to deliver native, realistic voice output This project also includes a real-time feedback system powered by **Google Sheets API** to gather valuable user insights.

---

## ✨ Features

### 🧠 Chatbot
- 💬 **Conversational AI** interface for step-by-step guidance
- 🌍 **Multilingual support** – English, Hindi, Tamil
- 🤖 **Azure OpenAI GPT-4o fallback** with simplified, natural voice responses
- 🔈 **Text-to-Speech (TTS)** using Azure Speech SDK
- 🎤 **Voice input/output** via Web Speech API
- 📱 **App selector** – switch between WhatsApp, Paytm, Google Maps, etc.

### 📝 Feedback System
- 🧾 **Simple form** with Name, Email, Message, and Star Rating
- 📊 **Live data logging** to Google Sheets via API
- ✅ **Confirmation message** on successful submission
- 🌙 Fully responsive with **dark/light theme** support

---

## 🛠️ Tech Stack

| Tech                     | Purpose                                |
|--------------------------|----------------------------------------|
| **React Vite + Tailwind CSS** | Clean, responsive frontend UI          |
| **Flask (Python)**       | Lightweight API server + logic         |
| **Azure OpenAI**         | GPT fallback with multilingual prompts |
| **Azure Speech API**     | Natural voice output (Text-to-Speech)  |
| **Google Sheets API**    | Feedback data storage (via gspread)    |
| **Web Speech API**       | Voice input/output in browser          |
| **Render**               | Backend deployment                     |
| **Vercel**               | Frontend hosting                       |

---

## 📁 Folder Structure

```
dlc-website/
├── backend/                   # Flask backend
│   ├── venv/                  # Python virtual environment
│   ├── app.py                 # API routes and chatbot logic
│   ├── requirements.txt       # Python dependencies
│   └── service_account.json   # Google Sheets API credentials
│
├── public/                    # Static assets (e.g., icons, manifest)
├── node_modules/              # Frontend dependencies
├── src/                       # Frontend source code
│   ├── assets/                # Images, icons, Lottie files
│   ├── components/            # React UI components (Chat, Feedback, etc.)
│   ├── context/               # Global state and provider files
│   ├── locales/               # i18n language files (EN, HI, TA)
│   ├── pages/                 # Full-page components like Home, AIChat
│   ├── App.jsx                # Main app component
│   └── main.jsx               # Entry point
│
├── .env                       # API keys and environment configs
├── .gitignore
├── index.html                 # HTML template
├── package.json
├── package-lock.json
├── tailwind.config.js
├── vite.config.js
└── README.md                  # Project overview and setup instructions
```
---

## ⚙️ Backend Setup (Flask + GPT + Google Sheets)

### 1. Install Python dependencies

```bash
cd backend
python -m venv venv
source venv/bin/activate       # macOS/Linux
venv\Scripts\activate          # Windows

pip install -r requirements.txt
````

### 2. Set up your `.env` file:

```env
AZURE_OPENAI_KEY=your_azure_openai_key
AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com/
AZURE_OPENAI_DEPLOYMENT=your_deployment_name
```

### 3. Add your `service_account.json` (Google Sheets credentials)

* Create a Google Service Account
* Enable Sheets + Drive API
* Share your spreadsheet with the service account (Editor access)

### 4. Run the Flask server

```bash
python app.py
```

---

## 💻 Frontend Setup (React + Tailwind + TTS)

```bash
cd frontend
npm install
npm run dev    # or npm start depending on your setup
```

You can now visit `http://localhost:5173` to test the chatbot and feedback form locally.

---

## 📊 Feedback System via Google Sheets

| Field     | Stored As      |
| --------- | -------------- |
| Name      | User's name    |
| Email     | User's email   |
| Message   | Feedback text  |
| Rating    | 1–5 stars      |
| Timestamp | Auto-generated |

> Data is appended row-by-row to a live Google Sheet. Great for analytics or collecting improvement ideas!

---

## 🌐 Live Demo

> 🚀 [Live Chatbot Preview](https://digital-literacy-campaign-website.vercel.app/)

---

## Screenshots
![Screenshot (216)](https://github.com/user-attachments/assets/4b1de248-ca25-47e2-9d68-e9f9da2d152b)
![Screenshot (218)](https://github.com/user-attachments/assets/5a491f37-bbef-4d0a-b184-8ce3ca462c05)
![Screenshot (217)](https://github.com/user-attachments/assets/5430f6cc-6cc6-4b16-99ff-fe5f68b47b77)
![Screenshot (219)](https://github.com/user-attachments/assets/fb644708-6ba0-48d6-89dc-ca582490942e)

---

## 🧠 What I Learned

* 🧠 Using Azure AI Services (GPT + TTS) for intelligent conversations and realistic voice responses
* 🎙️ Using **Azure Cognitive Services** for multilingual **Text-to-Speech**
* 🏗️ Setting up **Google Sheets API** using `gspread` and `service_account.json`
* 🧠 Crafting **simple GPT system prompts** optimized for voice-based elderly use
* 🌐 Deploying full-stack apps with **Vercel (frontend)** and **Render (backend)**
* 🔄 Managing **CORS**, `.env`, and cross-origin API security
* 🧪 Creating real-time **feedback collectors** connected to spreadsheets

---

## 🤝 Built By

### 💖 **Surendhiran M**

> Created during the **CollegeTips.in Internship**
> Crafted with care to make the digital world simpler for everyone – especially parents and elders 🌱📱

---

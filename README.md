

# 📘 Lecture Summary

**Lecture Summary** automates transcription and summarization for lecture videos. Built during Manchester's Hack-a-Bot 2023, this tool uses OpenAI’s Whisper for transcription and GPT-3.5 for summaries, making it ideal for students looking to capture key lecture points quickly.

![image](https://user-images.githubusercontent.com/76885270/230965118-bbc7cb8e-41d8-4c2a-9e99-0a2fee1187a8.png)

## 🛠️ Technologies Used

### 🎨 Frontend
1. Next.js
2. Sass

### 🧠 API
1. OpenAI Whisper
2. GPT-3.5

## 🌟 Key Features

1. Video Transcription
2. Summarized Transcriptions
3. Local Storage of Summaries

## 🚀 How it Works

The app downloads a video from a URL, then transcribes it using Whisper. Finally, GPT-3.5 processes the transcription into a concise summary, repeating the process for each input URL as needed.

## 🛠️ Setup

1. Create an `.env.local` file:
   ```plaintext
   NEXT_PUBLIC_OPENAPI_KEY=YourOpenAIKey
   ```
2. Install dependencies and start:
   ```bash
   npm install
   npm run dev
   ```

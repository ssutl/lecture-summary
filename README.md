# Lecture-summary (UOM Hackerthon)
This was my project for manchester hack-a-bot 2023, which I ended up winning my project challenge for. Humbly, Subtly. The code is designed to summarise a video provided via a URL, specifically blackboard lectures. Students will be able to summarise lectures in different levels of detail using AI, which can greatly increase workflow and reduce risk of time wasted watching a lecture that contains information already learnt. 

![image](https://user-images.githubusercontent.com/76885270/227787156-5291b840-56ad-452c-90ea-3446c8602525.png)

# Technologies Used
### Frontend
1. Next.js
2. Sass


### API
1. Whisper-I OpenAI model
2. GPT-3.5 OpenAI model

# Features Implemented
1. Transcribing videos
2. Summarising transcription
3. Local storage of current transcriptions

# How it works
Fetch requeests are used in order to download the video from the provided video URL, and these videos are saved locally. These files are then passed into OpenAI's whisper-1 model, which then transcribes the video. Then finally we use GPT-3.5 turbo in order to summarise the transcript. Depending on the the amount of inputs we will loop this process for each link.


# How to run application<br/>
### Frontend
1. Run NPM I (to install needed dependencies)
2. npm run dev

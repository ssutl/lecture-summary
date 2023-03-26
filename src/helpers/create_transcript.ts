const fs = require("fs");
import axios from "axios";
const FormData = require("form-data");
const dotenv = require("dotenv").config();
const path = require("path");

export interface ChatCompletion {
  data: {
    text: string;
  };
}

export default async function create_transcript(i: number) {
  const filePath = `./${i}.mp4`;
  const model = "whisper-1";
  const formData = new FormData();

  formData.append("model", model);
  formData.append("file", fs.createReadStream(filePath));

  try {
    const response: ChatCompletion = await axios({
      method: "POST",
      url: "https://api.openai.com/v1/audio/transcriptions",
      headers: {
        "Content-Type": `multipart/form-data`,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAPI_KEY}`,
      },
      data: formData,
    });
    const data = await response.data.text;
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

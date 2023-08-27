const fs = require("fs");
import axios from "axios";
const FormData = require("form-data");
const dotenv = require("dotenv").config();
const path = require("path");

export interface ChatCompletion {
  data: {
    id: string;
    object: string;
    created: number;
    choices: {
      index: number;
      message: {
        role: string;
        content: string;
      };
      finish_reason: string;
    }[];
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  };
}

export default async function create_transcript(
  text: string,
  detail: "short" | "medium" | "in-depth"
) {
  const payload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `return the title (the main topic of the transcript or stated title) and summary of the transcript like this as a response: "1) insert title here 2) insert summary here". For the summary, summarise this transcript: ${text}. Make the summary ${
          detail === "short"
            ? `short & concise (approximately 100 words)`
            : detail === "medium"
            ? `medium length, not too in-depth, just focusing on key details (aproximately 250 to 300 words)`
            : `in-depth, expanding upon key details (approximately 400 to a maximum of 550 words)`
        }`,
      },
    ],
    temperature: 1.2,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 2200,
    n: 1,
  };

  try {
    const response: ChatCompletion = await axios({
      method: "POST",
      url: "https://api.openai.com/v1/chat/completions",
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAPI_KEY}`,
      },
      data: JSON.stringify(payload),
    });
    const data = await response.data.choices[0].message.content;
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

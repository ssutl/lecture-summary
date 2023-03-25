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
  detail: "short" | "medium" | "long"
) {
  const payload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Summarise this transcript: ${text}. Make the summary ${
          detail === "short"
            ? `short & concise`
            : detail === "medium"
            ? `medium length, not too long, just focusing on key details`
            : `in-depth, expanding upon key details and longish`
        }`,
      },
    ],
    temperature: 1.2,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
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

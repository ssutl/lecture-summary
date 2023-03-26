// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import fs from "fs";
import stream from "stream";
import create_transcript from "@/helpers/create_transcript";
import create_summary from "@/helpers/create_summary";
import { Console } from "console";

interface RequestBody {
  urls: string[];
  detail: "short" | "medium" | "in-depth";
}

export interface summaryArrayType {
  title: string | undefined;
  summary: string | undefined;
}

export default function handler(
  req: { body: RequestBody },
  res: NextApiResponse
) {
  //Recieve URLS on the server string[]
  const { urls, detail } = req.body;

  //Map over urls

  async function downloadFiles() {
    try {
      const promises = urls.map(async (url, i) => {
        const res = await fetch(url);
        const buffer = Buffer.from(await res.arrayBuffer());
        const fileName = `${i}.mp4`;
        return fs.promises.writeFile(fileName, buffer);
      });
      await Promise.all(promises);

      //Pass each video into the transcript converter
      const transcriptPromises = urls.map(async (eachVideo, i) => {
        const transcript = await create_transcript(i); // call function to generate transcript

        const title = `placeholder`; //give video a title

        return { title, transcript }; // return object with video title and transcript
      });

      const transcriptResults = await Promise.all(transcriptPromises); // wait for all transcripts to be generated

      const transcriptArray = transcriptResults
        .map((eachResult) => {
          return { title: eachResult.title, transcript: eachResult.transcript };
        })
        .filter(
          (eachObject) =>
            eachObject.transcript !== undefined &&
            eachObject.title !== undefined
        );

      const summaryPromises = transcriptArray.map(async (eachTranscript, i) => {
        const AIResponse = await create_summary(
          eachTranscript.transcript!,
          detail
        ); // call function to generate transcript

        console.log("Response", AIResponse);

        if (AIResponse) {
          // Find the index of the "Title" section using a regular expression

          // Find the index of the "Title" section
          let titleStart = AIResponse.indexOf("1)") + 3;
          let titleEnd = AIResponse.indexOf("2)");
          let title = AIResponse.substring(titleStart, titleEnd);

          let summaryStart = AIResponse.indexOf("2)") + 3;
          let summaryEnd = AIResponse.length;
          let summary = AIResponse.substring(summaryStart, summaryEnd);

          return { title, summary }; // return object with video title and transcript
        } else {
          return { title: undefined, summary: undefined };
        }
      });

      const summaryResults = await Promise.all(summaryPromises);

      const summaryArray: summaryArrayType[] = summaryResults
        .map((eachResult) => {
          return { title: eachResult.title, summary: eachResult.summary };
        })
        .filter(
          (eachSummarised) =>
            eachSummarised.title !== undefined &&
            eachSummarised.summary !== undefined
        );

      //We need to summarise each transcript

      res.status(200).json(summaryArray);
    } catch (err) {
      console.error(`Error downloading files: ${err}`);
      res.status(400).json("Unsuccessful download");
    }
  }

  downloadFiles();
}

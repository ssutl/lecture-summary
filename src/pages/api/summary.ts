// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import fs from "fs";
import stream from "stream";
import create_transcript from "@/helpers/create_transcript";
import create_summary from "@/helpers/create_summary";

interface RequestBody {
  urls: string[];
  detail: "short" | "medium" | "in-depth";
}

export interface summaryArrayType {
  title: number;
  summary: string | undefined;
}

export default function handler(
  req: { body: RequestBody },
  res: NextApiResponse
) {
  //Recieve URLS on the server string[]
  const { urls, detail } = req.body;
  console.log("urls", urls);

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
        console.log("transcript", transcript);

        const title = i; //give video a title

        return { title, transcript }; // return object with video title and transcript
      });

      const transcriptResults = await Promise.all(transcriptPromises); // wait for all transcripts to be generated

      const transcriptArray = transcriptResults.map((eachResult) => {
        return { title: eachResult.title, transcript: eachResult.transcript };
      });

      const summaryPromises = transcriptArray.map(async (eachTranscript, i) => {
        const summary = await create_summary(
          eachTranscript.transcript!,
          detail
        ); // call function to generate transcript
        console.log("summary", summary);

        const title = i; //give video a title

        return { title, summary }; // return object with video title and transcript
      });

      const summaryResults = await Promise.all(summaryPromises);

      const summaryArray: summaryArrayType[] = summaryResults.map(
        (eachResult) => {
          return { title: eachResult.title, summary: eachResult.summary };
        }
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

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import fs from "fs";
import stream from "stream";

type Data = {
  name: string;
};

interface RequestBody {
  urls: string[];
}

export default function handler(
  req: { body: RequestBody },
  res: NextApiResponse
) {
  //Recieve URLS on the server string[]
  const { urls } = req.body;
  console.log("urls", urls);

  //Map over urls

  async function downloadFiles() {
    try {
      const promises = urls.map(async (url) => {
        const res = await fetch(url);
        const buffer = Buffer.from(await res.arrayBuffer());
        const fileName = `./src/TempVideos/${url.split("/").pop()!}.mp4`; // extract file name from URL
        return fs.promises.writeFile(fileName, buffer);
      });
      await Promise.all(promises);

      res.status(200).json("Successful download");
    } catch (err) {
      console.error(`Error downloading files: ${err}`);
      res.status(400).json("Unsuccessful download");
    }
  }

  downloadFiles();

  //Pass each transcription into summary function

  //Pass each into transcribe function

  //Download each as mp3
}

import axios from "axios";

export default async function callMyApi(
  urls: string[],
  detail: "short" | "medium" | "in-depth"
) {
  try {
    const response = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BACKENDURL}/api/summary`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { urls, detail },
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
}

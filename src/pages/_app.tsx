import "../styles/globals.scss";
import type { AppProps } from "next/app";
// pages/_app.js
import React from "react";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="Lecture Summaries"
          content="Get summaries of your lectures within seconds"
        />
        <meta name="keywords" content="Video Summary" />
        <title>LecSum</title>
        <link rel="icon" href="/Resources/Logo.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

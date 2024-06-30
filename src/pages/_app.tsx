import "../styles/globals.scss";
import type { AppProps } from "next/app";
// pages/_app.js
import React from "react";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

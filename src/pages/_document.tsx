import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
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
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

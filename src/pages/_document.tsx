import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html className="bg-wolken min-h-screen" lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
        </Head>
        <body className="bg-transparent">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

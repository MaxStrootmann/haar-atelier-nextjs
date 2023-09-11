import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html className=" bg-bg-500 min-h-screen" lang="en">
        <Head>
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
        </Head>
        <body className="bg-wolken">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

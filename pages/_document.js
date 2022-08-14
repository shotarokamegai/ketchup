import Document, { Html, Head, Main, NextScript } from 'next/document';
// import Meta from "./components/meta";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
            <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}`} />
            <meta property="og:type" content="website" />
            <meta property="description" content="Ketchup Inc." />
            <meta property="og:title" content="Ketchup Inc." />
            <meta property="og:description" content="Ketchup Inc." />
            <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/ogp.jpg`} />
            <meta name="twitter:card" content="summary_large_image"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;


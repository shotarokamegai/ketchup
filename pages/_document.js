import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ja" dir="ltr">
        <Head />
        <body style={{'opacity': 0}}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
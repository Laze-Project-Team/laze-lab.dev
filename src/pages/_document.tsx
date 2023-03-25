import { createStylesServer, ServerStyles } from '@mantine/next';
import { randomBytes } from 'crypto';
import type { DocumentContext, DocumentInitialProps } from 'next/document';
import Document, { Head, Html, Main, NextScript } from 'next/document';

const stylesServer = createStylesServer();

type DocumentProps = {
  csp: string;
  nonce: string;
};

export default class _Document extends Document<DocumentProps> {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps & DocumentProps> {
    const initialProps = await Document.getInitialProps(ctx);

    const nonce = randomBytes(128).toString('base64');
    const csp = `object-src 'none'; base-uri 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http: 'nonce-${nonce}' 'strict-dynamic'`;

    return {
      ...initialProps,
      csp,
      nonce,
      styles: [
        initialProps.styles,
        <ServerStyles
          html={initialProps.html}
          server={stylesServer}
          key="styles"
        />,
      ],
    };
  }

  render(): JSX.Element {
    const { csp, nonce } = this.props;

    return (
      <Html lang="ja">
        <Head nonce={nonce}>
          <meta httpEquiv="Content-Security-Policy" content={csp} />

          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    );
  }
}

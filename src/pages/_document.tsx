import { randomBytes } from 'crypto';
import type { DocumentProps } from 'next/document';
import { Head, Html, Main, NextScript } from 'next/document';
import type { ComponentType } from 'react';

const Document: ComponentType<DocumentProps> = () => {
  const nonce = randomBytes(128).toString('base64');
  const csp = `object-src 'none'; base-uri 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http: 'nonce-${nonce}' 'strict-dynamic'`;

  return (
    <Html>
      <Head nonce={nonce}>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
      </Head>
      <body>
        <Main />
        <NextScript nonce={nonce} />
      </body>
    </Html>
  );
};

export default Document;

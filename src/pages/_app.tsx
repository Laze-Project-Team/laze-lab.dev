import 'ress';

import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import type { FC } from 'react';

import { globalStyle } from '@/styles/global';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Global styles={globalStyle} />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;

import 'ress';

import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import type { SSRConfig } from 'next-i18next';
import { appWithTranslation } from 'next-i18next';
import type { ComponentType } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@/lib/redux/root';
import { globalStyle } from '@/styles/global';

export const MyApp: ComponentType<
  AppProps & {
    pageProps: SSRConfig;
  }
> = ({ Component, pageProps }) => {
  return (
    <>
      <ReduxProvider store={store}>
        <Global styles={globalStyle} />
        <Component {...pageProps} />
      </ReduxProvider>
    </>
  );
};

export default appWithTranslation(MyApp);

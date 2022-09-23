import 'ress';

import { Global } from '@emotion/react';
import { ThemeProvider } from '@material-ui/core';
import type { AppProps } from 'next/app';
import type { SSRConfig } from 'next-i18next';
import { appWithTranslation } from 'next-i18next';
import type { ComponentType } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@/lib/redux/root';
import { theme } from '@/lib/theme';
import { globalStyle } from '@/styles/global';

export const MyApp: ComponentType<
  AppProps & {
    pageProps: SSRConfig;
  }
> = ({ Component, pageProps }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <Global styles={globalStyle} />
          <Component {...pageProps} />
        </ReduxProvider>
      </ThemeProvider>
    </>
  );
};

export default appWithTranslation(MyApp);

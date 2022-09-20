import 'ress';

import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@/lib/redux/root';
import { globalStyle } from '@/styles/global';

const MyApp = ({ Component, pageProps }: AppProps) => {
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

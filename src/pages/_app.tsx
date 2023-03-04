import 'ress';
import 'nprogress/nprogress.css';

import { Global } from '@emotion/react';
import type { PaletteMode } from '@mui/material';
import type { AppProps as NextAppProps } from 'next/app';
import { Noto_Sans_JP as notoSansJP } from 'next/font/google';
import type { SSRConfig } from 'next-i18next';
import { appWithTranslation } from 'next-i18next';
import nprogress from 'nprogress';
import type { ComponentType } from 'react';
import { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { ColorModeProvider } from '@/components/contexts/ColorModeContext';
import { ToastContainer } from '@/components/functional/ToastContainer';
import { store } from '@/lib/redux/root';
import { globalStyle } from '@/styles/global';

const fontFamily = notoSansJP({
  subsets: ['latin'],
  weight: ['400'],
  fallback: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
});

type AppProps = NextAppProps & {
  pageProps: SSRConfig;
  preferTheme?: PaletteMode;
};

export const MyApp: ComponentType<AppProps> = ({
  Component,
  pageProps,
  preferTheme,
}) => {
  if (typeof window !== 'undefined') {
    nprogress.start();
  }

  useEffect(() => {
    nprogress.done();
  });

  return (
    <>
      <ReduxProvider store={store}>
        <ColorModeProvider preferTheme={preferTheme}>
          <ToastContainer />
          <Global styles={globalStyle} />
          <div className={fontFamily.className}>
            <Component {...pageProps} />
          </div>
        </ColorModeProvider>
      </ReduxProvider>
    </>
  );
};

export default appWithTranslation(MyApp);

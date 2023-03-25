import 'ress';
import 'nprogress/nprogress.css';

import { Global } from '@emotion/react';
import type { ColorScheme } from '@mantine/core';
import type { AppProps as NextAppProps } from 'next/app';
import type { SSRConfig } from 'next-i18next';
import { appWithTranslation } from 'next-i18next';
import nprogress from 'nprogress';
import type { ComponentType } from 'react';
import { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { ColorModeProvider } from '@/components/contexts/ColorModeContext';
import { ToastContainer } from '@/components/functional/ToastContainer';
import { MantineProvider } from '@/components/providers/MantineProvider';
import { store } from '@/lib/redux/root';
import { globalStyle } from '@/styles/global';

type AppProps = NextAppProps & {
  pageProps: SSRConfig;
  preferTheme?: ColorScheme;
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
          <MantineProvider>
            <ToastContainer />
            <Global styles={globalStyle} />
            <div>
              <Component {...pageProps} />
            </div>
          </MantineProvider>
        </ColorModeProvider>
      </ReduxProvider>
    </>
  );
};

export default appWithTranslation(MyApp);

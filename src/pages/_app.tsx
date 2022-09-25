import 'ress';

import { Global } from '@emotion/react';
import type { PaletteMode } from '@mui/material';
import type { AppProps as NextAppProps } from 'next/app';
import type { SSRConfig } from 'next-i18next';
import { appWithTranslation } from 'next-i18next';
import type { ComponentType } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { ColorModeProvider } from '@/components/contexts/ColorModeContext';
import { store } from '@/lib/redux/root';
import { globalStyle } from '@/styles/global';

type AppProps = NextAppProps & {
  pageProps: SSRConfig;
  preferTheme?: PaletteMode;
};

export const MyApp: ComponentType<AppProps> = ({
  Component,
  pageProps,
  preferTheme,
}) => {
  return (
    <>
      <ReduxProvider store={store}>
        <ColorModeProvider preferTheme={preferTheme}>
          <Global styles={globalStyle} />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ReduxProvider>
    </>
  );
};

export default appWithTranslation(MyApp);

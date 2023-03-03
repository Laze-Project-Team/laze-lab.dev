import type { PaletteMode, Theme } from '@mui/material';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { FC, ReactNode } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { match } from 'ts-pattern';

import { getTheme } from '@/lib/theme';

export type colorModeContextType = {
  toggleColorMode: () => void;
  themePattern: <T, K>(valueWithLight: T, valueWithDark: K) => T | K;
  colorMode: PaletteMode;
  theme: Theme;
};

const colorModeContext = createContext<colorModeContextType | null>(null);

export const useColorMode = (): colorModeContextType => {
  const colorMode = useContext(colorModeContext);

  if (colorMode === null) {
    throw new Error('Please wrap component with ColorModeProvider');
  }

  return colorMode;
};

export type colorModeProviderProps = {
  children?: ReactNode;
  preferTheme?: PaletteMode;
  isLocal?: boolean;
};

export const ColorModeProvider: FC<colorModeProviderProps> = ({
  children,
  preferTheme,
  isLocal,
}) => {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // TODO: 言語を変更するとカラーモードがリセットされる
  // TODO: Changing language resets color mode
  const [mode, setMode] = useState<PaletteMode>(
    // preferTheme ?? prefersDarkMode ? 'dark' : 'light',
    preferTheme ?? 'light',
  );

  useEffect(() => {
    if (preferTheme !== undefined) {
      setMode(preferTheme);
    }
  }, [preferTheme]);

  // Update the theme only if the mode changes
  const theme = useMemo(() => getTheme(mode), [mode]);

  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      themePattern: <T, K>(valueWithLight: T, valueWithDark: K): T | K =>
        match(mode)
          .with('light', () => valueWithLight)
          .with('dark', () => valueWithDark)
          .exhaustive(),
      colorMode: mode,
      theme,
    }),
    [mode, theme],
  );

  return (
    <colorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {!isLocal && <CssBaseline />}
        {children}
      </ThemeProvider>
    </colorModeContext.Provider>
  );
};

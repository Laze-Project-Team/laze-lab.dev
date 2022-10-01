import type { PaletteMode, Theme } from '@mui/material';
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import type { FC, ReactNode } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { getTheme } from '@/lib/theme';

export type colorModeContextType = {
  toggleColorMode: () => void;
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
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<PaletteMode>(
    preferTheme ?? prefersDarkMode ? 'dark' : 'light',
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

import type { PaletteMode } from '@mui/material';
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import type { FC, ReactNode } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

import { getTheme } from '@/lib/theme';

export type colorModeContextType = {
  toggleColorMode: () => void;
  colorMode: PaletteMode;
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
};

export const ColorModeProvider: FC<colorModeProviderProps> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<PaletteMode>(
    prefersDarkMode ? 'dark' : 'light',
  );

  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      colorMode: mode,
    }),
    [mode],
  );

  // Update the theme only if the mode changes
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <colorModeContext.Provider value={colorMode}>
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </colorModeContext.Provider>
  );
};

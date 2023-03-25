import type { ColorScheme } from '@mantine/core';
import type { FC, ReactNode } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { match } from 'ts-pattern';

export type colorModeContextType = {
  toggleColorMode: () => void;
  themePattern: <T, K>(valueWithLight: T, valueWithDark: K) => T | K;
  colorMode: ColorScheme;
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
  preferTheme?: ColorScheme;
  isLocal?: boolean;
};

export const ColorModeProvider: FC<colorModeProviderProps> = ({
  children,
  preferTheme,
  isLocal: _,
}) => {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // TODO: 言語を変更するとカラーモードがリセットされる
  // TODO: Changing language resets color mode
  const [mode, setMode] = useState<ColorScheme>(
    // preferTheme ?? prefersDarkMode ? 'dark' : 'light',
    preferTheme ?? 'light',
  );

  useEffect(() => {
    if (preferTheme !== undefined) {
      setMode(preferTheme);
    }
  }, [preferTheme]);

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
    }),
    [mode],
  );

  return (
    <colorModeContext.Provider value={colorMode}>
      {children}
    </colorModeContext.Provider>
  );
};

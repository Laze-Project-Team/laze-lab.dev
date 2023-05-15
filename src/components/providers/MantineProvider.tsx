import { MantineProvider as DefaultMantineProvider } from '@mantine/core';
import type { FC, ReactNode } from 'react';

import { useColorMode } from '@/components/contexts/ColorModeContext';

type MantineProviderProps = {
  children: ReactNode;
};

export const MantineProvider: FC<MantineProviderProps> = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <DefaultMantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: colorMode,
      }}
    >
      {children}
    </DefaultMantineProvider>
  );
};

import { css } from '@emotion/react';
import { Text } from '@mantine/core';
import type { FC } from 'react';

import { useColorMode } from '@/components/contexts/ColorModeContext';

export const Paragraph: FC<JSX.IntrinsicElements['p']> = ({ children }) => {
  const { themePattern } = useColorMode();
  const color = themePattern('rgba(0, 0, 0, 0.87)', 'rgb(189, 189, 189)');

  return (
    <Text
      css={css`
        margin-bottom: 0.5rem;
        color: ${color};
        font-size: 0.9rem;
        line-height: 1.5rem;
      `}
    >
      {children}
    </Text>
  );
};

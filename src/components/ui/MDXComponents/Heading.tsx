import { css } from '@emotion/react';
import { Text } from '@mantine/core';
import type { FC } from 'react';
import { match } from 'ts-pattern';

import { useColorMode } from '@/components/contexts/ColorModeContext';
import { gray } from '@/styles/colors';

export const H1: FC<JSX.IntrinsicElements['h1']> = ({ children }) => (
  <Text
    variant="h1"
    css={css`
      padding: 0 0.25rem;
      border-bottom: solid 1px gray;
      margin-bottom: 2rem;
      font-size: 2.5rem;
    `}
  >
    {children}
  </Text>
);

export const H2: FC<JSX.IntrinsicElements['h2']> = ({ children }) => {
  const { themePattern } = useColorMode();
  const color = themePattern(gray[8], gray[3]);

  return (
    <Text
      variant="h2"
      css={css`
        margin: 2rem 0 0.5rem;
        color: ${color};
        font-size: 1rem;
        font-weight: bold;
      `}
    >
      {children}
    </Text>
  );
};

export const H3: FC<JSX.IntrinsicElements['h3']> = ({ children }) => (
  <Text variant="h3">{children}</Text>
);

export const H4: FC<JSX.IntrinsicElements['h4']> = ({ children }) => (
  <Text variant="h4">{children}</Text>
);

export const H5: FC<JSX.IntrinsicElements['h5']> = ({ children }) => (
  <Text variant="h5">{children}</Text>
);

export const H6: FC<JSX.IntrinsicElements['h6']> = ({ children }) => (
  <Text variant="h6">{children}</Text>
);

export type HeadingsProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
} & JSX.IntrinsicElements['h1'];

export const Headings: FC<HeadingsProps> = ({ level, ...props }) =>
  match(level)
    .with(1, () => <H1 {...props} />)
    .with(2, () => <H2 {...props} />)
    .with(3, () => <H3 {...props} />)
    .with(4, () => <H4 {...props} />)
    .with(5, () => <H5 {...props} />)
    .with(6, () => <H6 {...props} />)
    .exhaustive();

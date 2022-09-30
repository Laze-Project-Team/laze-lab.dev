import { css } from '@emotion/react';
import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { match } from 'ts-pattern';

export const H1: FC<JSX.IntrinsicElements['h1']> = ({ children }) => (
  <Typography
    variant="h1"
    css={css`
      padding: 0 0.25rem;
      border-bottom: solid 1px gray;
      margin-bottom: 2rem;
      font-size: 2.5rem;
    `}
  >
    {children}
  </Typography>
);

export const H2: FC<JSX.IntrinsicElements['h2']> = ({ children }) => (
  <Typography
    variant="h2"
    css={css`
      margin: 2rem 0 0.5rem;
      color: ${grey['800']};
      font-size: 1rem;
      font-weight: bold;
    `}
  >
    {children}
  </Typography>
);

export const H3: FC<JSX.IntrinsicElements['h3']> = ({ children }) => (
  <Typography variant="h3">{children}</Typography>
);

export const H4: FC<JSX.IntrinsicElements['h4']> = ({ children }) => (
  <Typography variant="h4">{children}</Typography>
);

export const H5: FC<JSX.IntrinsicElements['h5']> = ({ children }) => (
  <Typography variant="h5">{children}</Typography>
);

export const H6: FC<JSX.IntrinsicElements['h6']> = ({ children }) => (
  <Typography variant="h6">{children}</Typography>
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

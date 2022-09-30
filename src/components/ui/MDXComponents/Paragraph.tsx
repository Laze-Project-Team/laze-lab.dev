import { css } from '@emotion/react';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

export const Paragraph: FC<JSX.IntrinsicElements['p']> = ({ children }) => (
  <Typography
    variant="body1"
    css={css`
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      line-height: 1.5rem;
    `}
  >
    {children}
  </Typography>
);

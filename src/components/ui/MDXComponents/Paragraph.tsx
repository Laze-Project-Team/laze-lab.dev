import Typography from '@mui/material/Typography';
import type { FC } from 'react';

export const Paragraph: FC<JSX.IntrinsicElements['p']> = ({ children }) => (
  <Typography variant="body1">{children}</Typography>
);

import { css } from '@emotion/react';
import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import type { FC } from 'react';

export const authIconStyle = css`
  width: 1.5rem;
  height: 1.5rem;
`;

export type authButtonBaseProps = ButtonProps;

export const AuthButtonBase: FC<authButtonBaseProps> = (props) => (
  <Button variant="outlined" {...props} sx={{ textTransform: 'none' }} />
);

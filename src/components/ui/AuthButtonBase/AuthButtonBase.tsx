import { css } from '@emotion/react';
import type { ButtonProps } from '@mantine/core';
import { Button } from '@mantine/core';
import type { ButtonHTMLAttributes, FC } from 'react';

export const authIconStyle = css`
  width: 1.5rem;
  height: 1.5rem;
`;

export type authButtonBaseProps = ButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

export const AuthButtonBase: FC<authButtonBaseProps> = (props) => (
  <Button variant="outline" {...props} />
);

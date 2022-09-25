import { css } from '@emotion/react';
import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import { useTranslation } from 'next-i18next';
import type { FC, MouseEventHandler, ReactNode } from 'react';
import { useCallback } from 'react';

import type { authMethod, authType } from '@/components/hooks/useAuth';
import { useAuth } from '@/components/hooks/useAuth';
import { useAuthError } from '@/components/layouts/LoginLayout/useAuthError';

export const authIconStyle = css`
  width: 1.5rem;
  height: 1.5rem;
`;
export type authButtonProps = {
  type: authType;
  method: authMethod;
  icon?: ReactNode;
} & Omit<ButtonProps, 'type'>;

export type presentialAuthButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
} & authButtonProps;

export const PresentialAuthButton: FC<presentialAuthButtonProps> = ({
  onClick,
  type,
  method,
  icon,
  ...props
}) => {
  const [t] = useTranslation(type);

  return (
    <>
      <Button
        variant="outlined"
        onClick={onClick}
        startIcon={icon}
        {...props}
        sx={{ textTransform: 'none' }}
      >
        {t('authwith', { method })}
      </Button>
    </>
  );
};

export const AuthButton: FC<authButtonProps> = (props) => {
  const { authenticate } = useAuth(props.method);
  const { handleError } = useAuthError();

  const onClick = useCallback(() => {
    authenticate().catch(handleError);
  }, [authenticate, handleError]);

  return <PresentialAuthButton onClick={onClick} {...props} />;
};

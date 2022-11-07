import { css } from '@emotion/react';
import type { ButtonProps } from '@mui/material/Button';
import { useTranslation } from 'next-i18next';
import type { FC, MouseEventHandler } from 'react';
import { useCallback } from 'react';

import type { authMethod, authType } from '@/components/hooks/useAuth';
import { useAuth } from '@/components/hooks/useAuth';
import { useAuthError } from '@/components/layouts/LoginLayout/useAuthError';
import {
  GitHubAuthButtonBase,
  GoogleAuthButtonBase,
  TwitterAuthButtonBase,
} from '@/components/ui/AuthButtonBase';
import type { authButtonBaseProps } from '@/components/ui/AuthButtonBase/AuthButtonBase';

export const authIconStyle = css`
  width: 1.5rem;
  height: 1.5rem;
`;
export type authButtonProps = {
  authType: authType;
  method: authMethod;
} & ButtonProps;

export type presentialAuthButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
} & authButtonProps;

const AuthButtonBases: Record<authMethod, FC<authButtonBaseProps>> = {
  Google: GoogleAuthButtonBase,
  Twitter: TwitterAuthButtonBase,
  GitHub: GitHubAuthButtonBase,
};

export const PresentialAuthButton: FC<presentialAuthButtonProps> = ({
  onClick,
  authType,
  method,
  ...props
}) => {
  const [t] = useTranslation(authType);

  const AuthButtonBase = AuthButtonBases[method];

  return (
    <>
      <AuthButtonBase onClick={onClick} {...props}>
        {t('authwith', { method })}
      </AuthButtonBase>
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

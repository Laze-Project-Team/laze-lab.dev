import { css } from '@emotion/react';
import type { FC } from 'react';

import { useColorMode } from '@/components/contexts/ColorModeContext';
import type { authType } from '@/components/hooks/useAuth';
import { GoogleIcon } from '@/components/ui/icons/GoogleIcon';

import { AuthButton, authIconStyle } from './AuthButton';

export type googleAuthButtonProps = {
  type: authType;
};

export const GoogleAuthButton: FC<googleAuthButtonProps> = ({ type }) => {
  const { themePattern } = useColorMode();

  const hoverBgColor = themePattern('#f2f2f2', '#e6e6e6');

  return (
    <AuthButton
      type={type}
      method="Google"
      color="inherit"
      icon={<GoogleIcon css={authIconStyle} />}
      css={css`
        && {
          border-color: lightgray;
          background-color: white;
          color: black;
        }

        &:hover {
          background-color: ${hoverBgColor};
        }
      `}
    />
  );
};

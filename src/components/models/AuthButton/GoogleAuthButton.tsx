import { css } from '@emotion/react';
import type { FC } from 'react';
import { match } from 'ts-pattern';

import { useColorMode } from '@/components/contexts/ColorModeContext';
import type { authType } from '@/components/hooks/useAuth';
import { GoogleIcon } from '@/components/ui/icons/GoogleIcon';

import { AuthButton, authIconStyle } from './AuthButton';

export type googleAuthButtonProps = {
  type: authType;
};

export const GoogleAuthButton: FC<googleAuthButtonProps> = ({ type }) => {
  const { colorMode } = useColorMode();

  const hoverBgColor = match(colorMode)
    .with('light', () => '#f2f2f2')
    .with('dark', () => '#e6e6e6')
    .exhaustive();

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

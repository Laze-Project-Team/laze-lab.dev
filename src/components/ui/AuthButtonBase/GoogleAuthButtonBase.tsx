import { css } from '@emotion/react';
import type { FC } from 'react';

import { useColorMode } from '@/components/contexts/ColorModeContext';
import type { authButtonBaseProps } from '@/components/ui/AuthButtonBase/AuthButtonBase';
import {
  AuthButtonBase,
  authIconStyle,
} from '@/components/ui/AuthButtonBase/AuthButtonBase';
import { GoogleIcon } from '@/components/ui/icons/GoogleIcon';

const googleAuthButtonStyle = css`
  && {
    border-color: lightgray;
    background-color: white;
    color: black;
  }
`;

export const GoogleAuthButtonBase: FC<authButtonBaseProps> = (props) => {
  const { themePattern } = useColorMode();
  const hoverBgColor = themePattern('#f2f2f2', '#e6e6e6');

  return (
    <AuthButtonBase
      {...props}
      leftIcon={<GoogleIcon css={authIconStyle} />}
      css={css`
        ${googleAuthButtonStyle};

        &:hover {
          background-color: ${hoverBgColor};
        }
      `}
    />
  );
};

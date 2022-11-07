import { css } from '@emotion/react';
import TwitterIcon from '@mui/icons-material/Twitter';
import type { FC } from 'react';

import type { authButtonBaseProps } from '@/components/ui/AuthButtonBase/AuthButtonBase';
import {
  AuthButtonBase,
  authIconStyle,
} from '@/components/ui/AuthButtonBase/AuthButtonBase';

const twitterIconStyle = css`
  ${authIconStyle};

  color: white;
`;

const twitterAuthButtonStyle = css`
  && {
    border-color: transparent;
    background-color: #1da1f2;
    color: white;
  }

  &&:hover {
    background-color: #3eaef4;
  }
`;

export const TwitterAuthButtonBase: FC<authButtonBaseProps> = (props) => {
  return (
    <AuthButtonBase
      {...props}
      startIcon={<TwitterIcon css={twitterIconStyle} />}
      css={twitterAuthButtonStyle}
    />
  );
};

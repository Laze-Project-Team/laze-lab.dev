import { css } from '@emotion/react';
import TwitterIcon from '@mui/icons-material/Twitter';
import type { FC } from 'react';

import type { authType } from '@/components/hooks/useAuth';

import { AuthButton, authIconStyle } from './AuthButton';

export type twitterAuthButtonProps = {
  type: authType;
};

export const TwitterAuthButton: FC<twitterAuthButtonProps> = ({ type }) => {
  return (
    <AuthButton
      type={type}
      method="Twitter"
      icon={
        <TwitterIcon
          css={css`
            ${authIconStyle};

            color: white;
          `}
        />
      }
      css={css`
        && {
          border-color: transparent;
          background-color: #1da1f2;
          color: white;
        }

        &&:hover {
          background-color: #3eaef4;
        }
      `}
    />
  );
};

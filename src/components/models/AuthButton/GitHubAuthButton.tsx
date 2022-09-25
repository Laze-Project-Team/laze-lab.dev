import { css } from '@emotion/react';
import GitHubIcon from '@mui/icons-material/GitHub';
import type { FC } from 'react';

import type { authType } from '@/components/hooks/useAuth';

import { AuthButton, authIconStyle } from './AuthButton';

export type githubAuthButtonProps = {
  type: authType;
};

export const GitHubAuthButton: FC<githubAuthButtonProps> = ({ type }) => {
  return (
    <AuthButton
      type={type}
      method="GitHub"
      icon={
        <GitHubIcon
          css={css`
            ${authIconStyle};

            color: white;
          `}
        />
      }
      css={css`
        && {
          border-color: transparent;
          background-color: #1d1d1d;
          color: white;
        }

        &&:hover {
          background-color: #333;
        }
      `}
    />
  );
};

import { css } from '@emotion/react';
import GitHubIcon from '@mui/icons-material/GitHub';
import type { FC } from 'react';

import type { authButtonBaseProps } from '@/components/ui/AuthButtonBase/AuthButtonBase';
import {
  AuthButtonBase,
  authIconStyle,
} from '@/components/ui/AuthButtonBase/AuthButtonBase';

const githubIconStyle = css`
  ${authIconStyle};

  color: white;
`;

const githubAuthButtonStyle = css`
  && {
    border-color: transparent;
    background-color: #1d1d1d;
    color: white;
  }

  &&:hover {
    background-color: #333;
  }
`;

export const GitHubAuthButtonBase: FC<authButtonBaseProps> = (props) => {
  return (
    <AuthButtonBase
      {...props}
      startIcon={<GitHubIcon css={githubIconStyle} />}
      css={githubAuthButtonStyle}
    />
  );
};

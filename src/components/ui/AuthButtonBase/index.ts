import type { FC } from 'react';

import type { authMethod } from '@/components/hooks/useAuth';

import type { authButtonBaseProps } from './AuthButtonBase';
import { GitHubAuthButtonBase } from './GitHubAuthButtonBase';
import { GoogleAuthButtonBase } from './GoogleAuthButtonBase';
import { TwitterAuthButtonBase } from './TwitterAuthButtonBase';

export const AuthButtonBases: Record<authMethod, FC<authButtonBaseProps>> = {
  Google: GoogleAuthButtonBase,
  Twitter: TwitterAuthButtonBase,
  GitHub: GitHubAuthButtonBase,
};

export { GitHubAuthButtonBase, GoogleAuthButtonBase, TwitterAuthButtonBase };

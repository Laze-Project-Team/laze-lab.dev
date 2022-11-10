import {
  GithubAuthProvider,
  GoogleAuthProvider,
  linkWithPopup,
  TwitterAuthProvider,
} from 'firebase/auth';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { useUserInfoContext } from '@/components/contexts/UserInfoContext';
import type { authMethod } from '@/components/hooks/useAuth';
import { AuthButtonBases } from '@/components/ui/AuthButtonBase';
import type { authButtonBaseProps } from '@/components/ui/AuthButtonBase/AuthButtonBase';

const authProviders = {
  Google: GoogleAuthProvider,
  Twitter: TwitterAuthProvider,
  GitHub: GithubAuthProvider,
} as const;

export type authEditButtonProps = {
  method: authMethod;
} & authButtonBaseProps;

export type presentialAuthEditButtonProps = {
  popupOpen: boolean;
  handleClick: () => void;
} & authEditButtonProps;

export const PresentialAuthEditButton: FC<presentialAuthEditButtonProps> = ({
  method,
  popupOpen,
  handleClick,
  ...props
}) => {
  const AuthButtonBase = AuthButtonBases[method];
  return (
    <>
      <AuthButtonBase disabled={popupOpen} onClick={handleClick} {...props} />
    </>
  );
};

export const AuthEditButton: FC<authEditButtonProps> = ({
  method,
  ...props
}) => {
  const [t] = useTranslation('profile');
  const { user, syncUser } = useUserInfoContext();

  const [popupOpen, setPopupOpen] = useState(false);

  const AuthProvider = authProviders[method];

  const handleClick = () => {
    const currentUser = user.data;
    if (!currentUser) {
      toast(t('auth.edit_failed'), { type: 'error' });
      return;
    }

    setPopupOpen(true);
    linkWithPopup(currentUser, new AuthProvider())
      .then(() => {
        toast(t('auth.edit_success'), { type: 'success' });
        syncUser();
      })
      .catch(() => {
        // TODO: error handling
        toast(t('auth.edit_failed'), { type: 'error' });
      })
      .finally(() => {
        setPopupOpen(false);
      });
  };

  return (
    <PresentialAuthEditButton
      method={method}
      popupOpen={popupOpen}
      handleClick={handleClick}
      {...props}
    />
  );
};

import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import type { UserInfo } from 'firebase/auth';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useState } from 'react';

import { EmailAuthDisplay } from './EmailAuthDisplay';
import { EmailAuthForm } from './EmailAuthForm';

export type emailAuthEditProps = {
  providerData: UserInfo[];
};

export type presentialEmailAuthEditProps = {
  isEmailAuthFormVisible: boolean;
  handleClickToggleEmailAuthFormVisibility: () => void;
} & emailAuthEditProps;

export const PresentialEmailAuthEdit: FC<presentialEmailAuthEditProps> = ({
  providerData,
  isEmailAuthFormVisible,
  handleClickToggleEmailAuthFormVisibility,
}) => {
  const [t] = useTranslation('profile');
  const isAuthedWithEmail = providerData.some(
    (data) => data.providerId === 'password',
  );

  return (
    <>
      <h3>{t('auth.auth_with_email_label')}</h3>
      {isAuthedWithEmail ? (
        <EmailAuthDisplay />
      ) : (
        <>
          <Collapse
            in={isEmailAuthFormVisible}
            style={{ transformOrigin: 'top' }}
          >
            <div>
              <EmailAuthForm />
            </div>
          </Collapse>
          <Button
            onClick={handleClickToggleEmailAuthFormVisibility}
            variant="outlined"
            fullWidth
          >
            {isEmailAuthFormVisible
              ? t('auth.hide_email_auth_form')
              : t('auth.auth_with_email')}
          </Button>
        </>
      )}
    </>
  );
};

export const EmailAuthEdit: FC<emailAuthEditProps> = ({ ...props }) => {
  const [isEmailAuthFormVisible, setIsEmailAuthFormVisible] = useState(false);

  const handleClickToggleEmailAuthFormVisibility = () => {
    setIsEmailAuthFormVisible((show) => !show);
  };

  return (
    <PresentialEmailAuthEdit
      isEmailAuthFormVisible={isEmailAuthFormVisible}
      handleClickToggleEmailAuthFormVisibility={
        handleClickToggleEmailAuthFormVisibility
      }
      {...props}
    />
  );
};

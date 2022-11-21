import { css } from '@emotion/react';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { sendEmailVerification } from 'firebase/auth';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useUserInfoContext } from '@/components/contexts/UserInfoContext';
import type { userInfo } from '@/components/hooks/useUserInfo';
import { LoadingButton } from '@/components/ui/LoadingButton';

import { AuthUnlinkButton } from './AuthUnlinkButton';

export type status = 'idle' | 'processing' | 'timeout';
export type presentialEmailAuthDisplayProps = {
  status: status;
  handleClickSendVerificationEmail: () => void;
} & Pick<userInfo, 'user'>;

export const PresentialEmailAuthDisplay: FC<
  presentialEmailAuthDisplayProps
> = ({ user, status, handleClickSendVerificationEmail }) => {
  const [t] = useTranslation('profile');

  const currentUser = user.data;
  if (!currentUser) {
    return <Skeleton variant="text" />;
  }

  return (
    <>
      <Typography
        variant="body2"
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        {currentUser.email}
        <Chip
          size="small"
          sx={{ marginLeft: '0.5rem' }}
          label={
            currentUser.emailVerified
              ? `✔${t('auth.verified')}`
              : t('auth.not_verified')
          }
        />
        <AuthUnlinkButton
          wrapperProps={{
            css: css`
              margin: 0 8px 0 auto;
            `,
          }}
          size="small"
          providerId="password"
          message={t('auth.unlink_email_confirmation', {
            email: currentUser.email,
          })}
        />
      </Typography>
      {!currentUser.emailVerified &&
        (() => {
          const button = (
            <LoadingButton
              onClick={handleClickSendVerificationEmail}
              loading={status === 'processing'}
              disabled={status === 'timeout'}
              sx={{ marginTop: '0.5rem' }}
              size="small"
              fullWidth
            >
              {t('auth.send_verification_email')}
            </LoadingButton>
          );

          if (status === 'timeout') {
            return (
              <Tooltip title={t('auth.send_verification_email_timeout')}>
                <span>{button}</span>
              </Tooltip>
            );
          }

          return button;
        })()}
    </>
  );
};

export const EmailAuthDisplay: FC = ({ ...props }) => {
  const [t] = useTranslation('profile');

  const { user } = useUserInfoContext();
  const [status, setStatus] = useState<status>('idle');

  const handleClickSendVerificationEmail = () => {
    const currentUser = user.data;

    if (!currentUser) {
      toast(t('auth.send_verification_email_failed'), { type: 'error' });
      return;
    }

    setStatus('processing');
    sendEmailVerification(currentUser)
      .then(() => {
        toast(t('auth.send_verification_email_success'), { type: 'success' });
        setStatus('timeout');
      })
      .catch((e) => {
        console.error(e);
        toast(t('auth.send_verification_email_failed'), { type: 'error' });

        setStatus('idle');
      });
  };

  useEffect(() => {
    if (status === 'timeout') {
      const timeout = setTimeout(() => {
        setStatus('idle');
      }, 30 * 1000);

      return () => clearTimeout(timeout);
    }
  }, [status, setStatus]);

  return (
    <PresentialEmailAuthDisplay
      user={user}
      status={status}
      handleClickSendVerificationEmail={handleClickSendVerificationEmail}
      {...props}
    />
  );
};

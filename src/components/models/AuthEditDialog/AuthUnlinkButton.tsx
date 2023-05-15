import { css } from '@emotion/react';
import type { ActionIconProps } from '@mantine/core';
import { ActionIcon, Button, Loader, Modal, Tooltip } from '@mantine/core';
import { IconLinkOff } from '@tabler/icons-react';
import { unlink } from 'firebase/auth';
import { useTranslation } from 'next-i18next';
import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { useUserInfoContext } from '@/components/contexts/UserInfoContext';

export type authUnlinkButtonProps = {
  providerId: string;
  message: ReactNode;
  wrapperProps?: JSX.IntrinsicElements['span'];
} & ActionIconProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

export type presentialAuthUnlinkButtonProps = {
  message: ReactNode;
  isWorking: boolean;
  isConfirmationDialogOpen: boolean;
  handleClick: () => void;
  handleCancel: () => void;
  handleConfirm: () => void;
} & Omit<authUnlinkButtonProps, 'providerId'>;

export const PresentialAuthUnlinkButton: FC<
  presentialAuthUnlinkButtonProps
> = ({
  message,
  isWorking,
  isConfirmationDialogOpen,
  handleClick,
  handleCancel,
  handleConfirm,
  wrapperProps,
  ...props
}) => {
  const [t] = useTranslation('profile');

  return (
    <>
      <Tooltip label={t('auth.unlink')} openDelay={500}>
        {/* wrapper for Tooltip (when disabled) */}
        <span {...wrapperProps} css={wrapperProps?.css}>
          <ActionIcon
            aria-label={t('auth.unlink')}
            color="error"
            disabled={isWorking}
            onClick={handleClick}
            {...props}
          >
            {isWorking ? (
              <Loader color="inherit" size="1em" />
            ) : (
              <IconLinkOff />
            )}
          </ActionIcon>
        </span>
      </Tooltip>
      <Modal
        opened={isConfirmationDialogOpen}
        onClose={handleCancel}
        title={t('auth.unlink')}
      >
        <div>{message}</div>
        <div
          css={css`
            margin-top: 32px;
          `}
        >
          <Button onClick={handleCancel}>{t('auth.unlink_cancel')}</Button>
          <Button onClick={handleConfirm} autoFocus color="error">
            {t('auth.unlink_confirm')}
          </Button>
        </div>
      </Modal>
    </>
  );
};
export const AuthUnlinkButton: FC<authUnlinkButtonProps> = ({
  providerId,
  ...props
}) => {
  const [t] = useTranslation('profile');
  const { user, syncUser } = useUserInfoContext();
  const [isWorking, setIsWorking] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);

  const handleClick = () => {
    setIsConfirmationDialogOpen(true);
  };

  const handleCancel = () => {
    setIsConfirmationDialogOpen(false);
  };

  const handleConfirm = () => {
    setIsConfirmationDialogOpen(false);

    const currentUser = user.data;
    if (!currentUser || providerId === undefined) {
      toast(t('auth.unlink_failed'), { type: 'error' });
      return;
    }

    setIsWorking(true);
    unlink(currentUser, providerId)
      .then(() => {
        toast(t('auth.unlink_success'), { type: 'success' });
        syncUser();
      })
      .catch(() => {
        toast(t('auth.unlink_failed'), { type: 'error' });
      })
      .finally(() => {
        setIsWorking(false);
      });
  };

  return (
    <PresentialAuthUnlinkButton
      isWorking={isWorking}
      isConfirmationDialogOpen={isConfirmationDialogOpen}
      handleClick={handleClick}
      handleCancel={handleCancel}
      handleConfirm={handleConfirm}
      {...props}
    />
  );
};

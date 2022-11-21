import { css } from '@emotion/react';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { IconButtonProps } from '@mui/material/IconButton';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { unlink } from 'firebase/auth';
import { useTranslation } from 'next-i18next';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { useUserInfoContext } from '@/components/contexts/UserInfoContext';

const sizeTable = {
  small: '34px',
  medium: '40px',
  large: '48px',
} as const;

export type authUnlinkButtonProps = {
  providerId: string;
  message: ReactNode;
  wrapperProps?: JSX.IntrinsicElements['span'];
} & IconButtonProps;

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

  const size = sizeTable[props.size ?? 'medium'];

  return (
    <>
      <Tooltip title={t('auth.unlink')} enterDelay={500}>
        {/* wrapper for Tooltip (when disabled) */}
        <span
          {...wrapperProps}
          css={[
            wrapperProps?.css,
            css`
              width: ${size};
              height: ${size};
            `,
          ]}
        >
          <IconButton
            edge="end"
            aria-label={t('auth.unlink')}
            color="error"
            onClick={handleClick}
            disabled={isWorking}
            {...props}
          >
            {isWorking ? (
              <CircularProgress color="inherit" size="1em" />
            ) : (
              <LinkOffIcon />
            )}
          </IconButton>
        </span>
      </Tooltip>
      <Dialog open={isConfirmationDialogOpen} onClose={handleCancel}>
        <DialogTitle>{t('auth.unlink')}</DialogTitle>
        <DialogContent>{message}</DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>{t('auth.unlink_cancel')}</Button>
          <Button onClick={handleConfirm} autoFocus color="error">
            {t('auth.unlink_confirm')}
          </Button>
        </DialogActions>
      </Dialog>
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

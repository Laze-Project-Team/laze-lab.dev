import { css } from '@emotion/react';
import Avatar from '@mui/material/Avatar';
import { grey } from '@mui/material/colors';
import Skeleton from '@mui/material/Skeleton';
import { useTranslation } from 'next-i18next';
import type { ChangeEventHandler, FC } from 'react';
import { useState } from 'react';
import Jdenticon from 'react-jdenticon';
import { toast } from 'react-toastify';

import { useColorMode } from '@/components/contexts/ColorModeContext';
import { useUserInfoContext } from '@/components/contexts/UserInfoContext';
import type { baseUserInfo } from '@/components/hooks/useUserInfo';
import { useUserManager } from '@/lib/firebase/user';

import { UploadAvatarButton } from './UploadAvatarButton';
import type { uploadConfirmationDialogProps } from './UploadConfirmationDialog';
import { UploadConfirmationDialog } from './UploadConfirmationDialog';

export type presentialUserAvatarProps = {
  handleChange: ChangeEventHandler<HTMLInputElement>;
} & baseUserInfo &
  uploadConfirmationDialogProps;

export const PresentialUserAvatar: FC<presentialUserAvatarProps> = ({
  user,
  userData,
  avatarFile,
  isAvatarUploading,
  confirmError,
  handleChange,
  handleConfirm,
  handleReject,
  handleErrorClose,
  ...props
}) => {
  const { themePattern } = useColorMode();
  const borderColor = themePattern(grey['300'], grey['800']);

  return (
    <>
      <div
        css={css`
          position: relative;
          width: 100%;
          height: 100%;
          border: solid 2px ${borderColor};
          border-radius: 50%;
        `}
        {...props}
      >
        {userData.data ? (
          <>
            {userData.data.avatarURL ? (
              <Avatar
                alt={userData.data.name}
                src={userData.data.avatarURL}
                sx={{ width: '100%', height: '100%' }}
              />
            ) : (
              <Jdenticon size="100%" value={user.data?.uid ?? 'some text'} />
            )}
            <UploadAvatarButton
              handleChange={handleChange}
              css={css`
                && {
                  border-color: ${borderColor};
                }
              `}
            />
            <UploadConfirmationDialog
              avatarFile={avatarFile}
              isAvatarUploading={isAvatarUploading}
              confirmError={confirmError}
              handleConfirm={handleConfirm}
              handleReject={handleReject}
              handleErrorClose={handleErrorClose}
            />
          </>
        ) : (
          <Skeleton variant="circular" width="100%" height="100%" />
        )}
      </div>
    </>
  );
};

export const UserAvatar: FC = ({ ...props }) => {
  const [t] = useTranslation('profile');
  const { user, userData, syncUserData } = useUserInfoContext();
  const { updateUserAvatar } = useUserManager();

  const [avatarFile, setAvatarFile] =
    useState<presentialUserAvatarProps['avatarFile']>(null);
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);
  const [confirmError, setConfirmError] =
    useState<presentialUserAvatarProps['confirmError']>(null);

  const handleChange: presentialUserAvatarProps['handleChange'] = (e) => {
    const files = e.target.files;
    if (files === null) return;

    const [file] = files;

    if (file.size > 1024 * 1024) {
      toast(t('profile.avatar.edit.size_limit'), {
        type: 'error',
      });
      return;
    }

    setAvatarFile(file);
  };

  const handleConfirm: presentialUserAvatarProps['handleConfirm'] = () => {
    setIsAvatarUploading(true);

    const currentUser = user.data;

    if (!currentUser) {
      setConfirmError(t('profile.avatar.edit.error'));
      return;
    }

    if (avatarFile === null) {
      setConfirmError(t('profile.avatar.edit.error'));
      return;
    }

    updateUserAvatar(currentUser, avatarFile)
      .then(() => {
        setAvatarFile(null);
      })
      .catch((err) => {
        setConfirmError(String(err));
      })
      .finally(() => {
        setIsAvatarUploading(false);
        syncUserData();
      });
  };

  const handleReject: presentialUserAvatarProps['handleReject'] = () => {
    setAvatarFile(null);
  };

  const handleErrorClose: presentialUserAvatarProps['handleErrorClose'] =
    () => {
      setConfirmError(null);
    };

  return (
    <PresentialUserAvatar
      user={user}
      userData={userData}
      avatarFile={avatarFile}
      isAvatarUploading={isAvatarUploading}
      confirmError={confirmError}
      handleChange={handleChange}
      handleConfirm={handleConfirm}
      handleReject={handleReject}
      handleErrorClose={handleErrorClose}
      {...props}
    />
  );
};

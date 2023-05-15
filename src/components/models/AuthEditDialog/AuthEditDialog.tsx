import { css } from '@emotion/react';
import type { ModalProps } from '@mantine/core';
import { Loader, Modal, Stack } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import { useUserInfoContext } from '@/components/contexts/UserInfoContext';
import type { userInfo } from '@/components/hooks/useUserInfo';
import { EmailAuthEdit } from '@/components/models/AuthEditDialog/EmailAuthEdit';

import { AuthEditButtons } from './AuthEditButtons';

export type authEditDialogProps = ModalProps;
export type presentialAuthEditDialogProps = Pick<userInfo, 'user'> &
  authEditDialogProps;

export const PresentialAuthEditDialog: FC<presentialAuthEditDialogProps> = ({
  user,
  ...props
}) => {
  const [t] = useTranslation('profile');
  const providerData = user.data?.providerData;

  return (
    <>
      <Modal
        title={t('auth.edit')}
        css={css`
          width: 100%;
          max-width: 480px;
        `}
        centered
        {...props}
      >
        <Stack spacing={16}>
          {providerData === undefined ? (
            <div
              css={css`
                display: flex;
                height: 10rem;
                align-items: center;
                justify-content: center;
              `}
            >
              <Loader />
            </div>
          ) : (
            <>
              <AuthEditButtons providerData={providerData} />
              <EmailAuthEdit providerData={providerData} />
            </>
          )}
        </Stack>
      </Modal>
    </>
  );
};

export const AuthEditDialog: FC<authEditDialogProps> = (props) => {
  const { user } = useUserInfoContext();
  return <PresentialAuthEditDialog user={user} {...props} />;
};

import { css } from '@emotion/react';
import type { ButtonProps } from '@mantine/core';
import { Button, Stack } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import type { ButtonHTMLAttributes, FC } from 'react';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { useUserInfoContext } from '@/components/contexts/UserInfoContext';
import {
  FormDialog,
  FormDialogSelectItem,
  FormDialogTextItem,
} from '@/components/ui/FormDialog';
import { LoadingButton } from '@/components/ui/LoadingButton';
import { localeList } from '@/const/locale';
import { useUserManager } from '@/lib/firebase/user';
import type { localeId } from '@/lib/utils/isLocale';

export type profileEditDialogButtonProps = ButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

export type presentialProfileEditDialogButtonProps = {
  opened: boolean;
  isSubmitting: boolean;
  defaultValues: profileEditFormValue;
  handleOpen: () => void;
  handleClose: () => void;
  handleSubmit: (data: profileEditFormValue) => void;
} & profileEditDialogButtonProps;

export type profileEditFormValue = {
  name: string;
  locale: localeId;
};

export const PresentialProfileEditDialogButton: FC<
  presentialProfileEditDialogButtonProps
> = ({
  opened,
  isSubmitting,
  defaultValues,
  handleOpen,
  handleClose,
  handleSubmit,
  ...props
}) => {
  const [t] = useTranslation('profile');

  return (
    <>
      <Button onClick={handleOpen} {...props}>
        {t('profile.edit')}
      </Button>

      <FormDialog<profileEditFormValue>
        id="profile-edit-dialog"
        title={t('profile.edit')}
        defaultValues={defaultValues}
        opened={opened}
        onClose={handleClose}
        handleSubmit={handleSubmit}
        css={css`
          width: 100%;
          max-width: 480px;
        `}
      >
        <div>
          <Stack spacing={32} mt={16}>
            <FormDialogTextItem
              disabled={isSubmitting}
              label={t('profile.name.label')}
              name="name"
            />
            <FormDialogSelectItem
              disabled={isSubmitting}
              label={t('profile.locale.label')}
              name="locale"
              options={Object.keys(localeList).map((key) => ({
                value: key,
                label: localeList[key as localeId],
              }))}
            />
          </Stack>
        </div>
        <div>
          <Button onClick={handleClose}>{t('profile.edit_cancel')}</Button>
          <LoadingButton
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
            autoFocus
          >
            {t('profile.edit_submit')}
          </LoadingButton>
        </div>
      </FormDialog>
    </>
  );
};

export const ProfileEditDialogButton: FC<profileEditDialogButtonProps> = ({
  ...props
}) => {
  const [t] = useTranslation('profile');
  const { user, userData, syncUserData } = useUserInfoContext();

  const { updateUserData } = useUserManager();
  const [opened, setOpened] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleOpen = () => setOpened(true);
  const handleClose = () => setOpened(false);

  const defaultValues: profileEditFormValue = useMemo(
    () => ({
      name: userData.data?.name ?? '',
      locale: userData.data?.locale ?? 'en',
    }),
    [userData.data?.locale, userData.data?.name],
  );

  const handleSubmit = (data: profileEditFormValue) => {
    setIsSubmitting(true);
    const currentUser = user.data;
    if (currentUser) {
      updateUserData(currentUser, data)
        .then(() => {
          syncUserData();
          toast(t('profile.edit_success'), { type: 'success' });
        })
        .catch(() => {
          toast(t('profile.edit_failed'), { type: 'error' });
        })
        .finally(() => {
          setIsSubmitting(false);
          setOpened(false);
        });
    } else {
      toast(t('profile.edit_failed'), { type: 'error' });
    }
  };

  return (
    <PresentialProfileEditDialogButton
      opened={opened}
      isSubmitting={isSubmitting}
      defaultValues={defaultValues}
      handleOpen={handleOpen}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      {...props}
    />
  );
};

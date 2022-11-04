import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
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

export type profileEditDialogButtonProps = ButtonProps;

export type presentialProfileEditDialogButtonProps = {
  open: boolean;
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
  open,
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

      <FormDialog
        id="profile-edit-dialog"
        defaultValues={defaultValues}
        open={open}
        onClose={handleClose}
        handleSubmit={handleSubmit}
        aria-labelledby="profile-edit-dialog-title"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="profile-edit-dialog-title">
          {t('profile.edit')}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={4} mt={2}>
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
        </DialogContent>
        <DialogActions>
          <LoadingButton
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
            autoFocus
          >
            {t('profile.edit_submit')}
          </LoadingButton>
        </DialogActions>
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
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const defaultValues: profileEditFormValue = useMemo(
    () => ({
      name: userData.data?.name ?? '',
      locale: userData.data?.locale ?? 'en',
    }),
    [userData.data?.locale, userData.data?.name],
  );

  const handleSubmit = (data: profileEditFormValue) => {
    setIsSubmitting(true);
    if (user) {
      updateUserData(user, data)
        .then(() => {
          syncUserData();
          toast(t('profile.edit_success'), { type: 'success' });
        })
        .catch(() => {
          toast(t('profile.edit_failed'), { type: 'error' });
        })
        .finally(() => {
          setIsSubmitting(false);
          setOpen(false);
        });
    } else {
      toast(t('profile.edit_failed'), { type: 'error' });
    }
  };

  return (
    <PresentialProfileEditDialogButton
      open={open}
      isSubmitting={isSubmitting}
      defaultValues={defaultValues}
      handleOpen={handleOpen}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      {...props}
    />
  );
};

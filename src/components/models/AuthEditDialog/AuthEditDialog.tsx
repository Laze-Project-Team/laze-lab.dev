import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import type { DialogProps } from '@mui/material/Dialog';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import { useUserInfoContext } from '@/components/contexts/UserInfoContext';
import type { userInfo } from '@/components/hooks/useUserInfo';

import { AuthEditButtons } from './AuthEditButtons';

export type authEditDialogProps = DialogProps;

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
      <Dialog maxWidth="xs" fullWidth {...props}>
        <DialogTitle>{t('auth.edit')}</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            {providerData === undefined ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '10rem',
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <AuthEditButtons providerData={providerData} />
            )}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const AuthEditDialog: FC<authEditDialogProps> = (props) => {
  const { user } = useUserInfoContext();
  return <PresentialAuthEditDialog user={user} {...props} />;
};

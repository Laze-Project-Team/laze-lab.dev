import { css } from '@emotion/react';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

export type uploadConfirmationDialogProps = {
  avatarFile: File | null;
  isAvatarUploading: boolean;
  confirmError: string | null;
  handleReject: () => void;
  handleConfirm: () => void;
  handleErrorClose: () => void;
};

export const UploadConfirmationDialog: FC<uploadConfirmationDialogProps> = ({
  avatarFile,
  isAvatarUploading,
  confirmError,
  handleReject,
  handleConfirm,
  handleErrorClose,
}) => {
  const [t] = useTranslation('profile');

  return (
    <>
      <Dialog
        open={!!avatarFile}
        onClose={handleReject}
        aria-labelledby="upload-confirmation-dialog-title"
        maxWidth="sm"
      >
        <Backdrop
          open={isAvatarUploading}
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <DialogTitle id="upload-confirmation-dialog-title">
          {t('profile.avatar.edit.dialog_title')}
        </DialogTitle>
        <DialogContent>
          <Collapse in={!!confirmError}>
            <Alert
              severity="error"
              onClose={handleErrorClose}
              sx={{
                marginBottom: '2rem',
                width: 'min(30rem, calc(100vw - 112px))',
              }}
            >
              {confirmError}
            </Alert>
          </Collapse>

          <div
            css={css`
              position: relative;
              width: min(30rem, calc(100vw - 112px));

              &::before {
                display: inline-block;
                padding-top: 100%;
                content: '';
              }

              &::after {
                position: absolute;
                top: 0;
                left: 0;
                display: inline-block;
                width: 100%;
                height: 100%;
                background-color: #0008;
                content: '';
                mask-image: radial-gradient(
                  transparent 71%,
                  black 0%,
                  black 60%,
                  black 0%
                );
              }
            `}
          >
            {avatarFile && (
              <img
                src={URL.createObjectURL(avatarFile)}
                alt=""
                css={css`
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                `}
              />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReject}>
            {t('profile.avatar.edit.dialog_cancel')}
          </Button>
          <Button onClick={handleConfirm} autoFocus>
            {t('profile.avatar.edit.dialog_confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

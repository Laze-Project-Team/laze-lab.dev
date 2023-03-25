import { css } from '@emotion/react';
import { Alert, Button, Collapse, LoadingOverlay, Modal } from '@mantine/core';
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
      <Modal
        title={t('profile.avatar.edit.dialog_title')}
        opened={!!avatarFile}
        onClose={handleReject}
        aria-labelledby="upload-confirmation-dialog-title"
        css={css`
          max-width: 480px;
        `}
      >
        <LoadingOverlay visible={isAvatarUploading} />

        <div>
          <Collapse in={!!confirmError}>
            <Alert
              onClose={handleErrorClose}
              css={css`
                width: min(30rem, calc(100vw - 112px));
                margin-bottom: 2rem;
              `}
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
        </div>
        <div>
          <Button onClick={handleReject}>
            {t('profile.avatar.edit.dialog_cancel')}
          </Button>
          <Button onClick={handleConfirm} autoFocus>
            {t('profile.avatar.edit.dialog_confirm')}
          </Button>
        </div>
      </Modal>
    </>
  );
};

import { css } from '@emotion/react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { blue } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'next-i18next';
import type { ChangeEventHandler, FC } from 'react';

import { useColorMode } from '@/components/contexts/ColorModeContext';

export type uploadAvatarButtonProps = {
  handleChange: ChangeEventHandler<HTMLInputElement>;
};

export const UploadAvatarButton: FC<uploadAvatarButtonProps> = ({
  handleChange,
  ...props
}) => {
  const [t] = useTranslation('profile');
  const { theme } = useColorMode();

  return (
    <Tooltip title={t('profile.avatar.edit.title')}>
      <IconButton
        aria-label={t('profile.avatar.edit.title')}
        size="small"
        component="label"
        css={css`
          && {
            position: absolute;
            top: 85%;
            left: 85%;
            border: solid 2px;
            background-color: ${theme.palette.background.default};
            transform: translate(-50%, -50%);
            transition: border-color color 0.2s;

            &:hover {
              border-color: ${blue['300']};
              color: ${blue['300']};
            }
          }
        `}
        {...props}
      >
        <input hidden accept="image/*" type="file" onChange={handleChange} />
        <FileUploadIcon color="inherit" />
      </IconButton>
    </Tooltip>
  );
};

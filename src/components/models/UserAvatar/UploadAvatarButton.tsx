import { css } from '@emotion/react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { useTranslation } from 'next-i18next';
import type { ChangeEventHandler, FC } from 'react';

import { blue, gray } from '@/styles/colors';

export type uploadAvatarButtonProps = {
  handleChange: ChangeEventHandler<HTMLInputElement>;
};

export const UploadAvatarButton: FC<uploadAvatarButtonProps> = ({
  handleChange,
  ...props
}) => {
  const [t] = useTranslation('profile');

  return (
    <Tooltip label={t('profile.avatar.edit.title')}>
      <ActionIcon
        aria-label={t('profile.avatar.edit.title')}
        size="sm"
        component="label"
        css={css`
          && {
            position: absolute;
            top: 85%;
            left: 85%;
            border: solid 2px;
            background-color: ${gray[7]};
            transform: translate(-50%, -50%);
            transition: border-color color 0.2s;

            &:hover {
              border-color: ${blue[3]};
              color: ${blue[3]};
            }
          }
        `}
        {...props}
      >
        <input hidden accept="image/*" type="file" onChange={handleChange} />
        <IconUpload color="inherit" />
      </ActionIcon>
    </Tooltip>
  );
};

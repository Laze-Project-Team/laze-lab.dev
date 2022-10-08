import { css } from '@emotion/react';
import { grey } from '@mui/material/colors';
import Skeleton from '@mui/material/Skeleton';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import type { presentialProfileProps } from '@/components/pages/Profile/Profile';
import { DefaultLink } from '@/components/ui/DefaultLink';

export type userNameProps = presentialProfileProps;

export type presentialUserNameProps = userNameProps;

export const PresentialUserName: FC<presentialUserNameProps> = ({
  userData,
}) => {
  const [t] = useTranslation('profile');

  return (
    <>
      <div>
        {userData.data ? (
          <p
            css={css`
              color: ${grey['800']};
              font-size: 1.5rem;
              font-weight: bold;
            `}
          >
            {userData.data.name}
          </p>
        ) : (
          <Skeleton
            variant="text"
            css={css`
              font-size: 1.5rem;
            `}
          />
        )}
        <p
          css={css`
            font-size: 0.8rem;
          `}
        >
          <DefaultLink href="/profile/edit">{t('profile.edit')}</DefaultLink>
        </p>
      </div>
    </>
  );
};

export const UserName: FC<userNameProps> = (props) => {
  return <PresentialUserName {...props} />;
};

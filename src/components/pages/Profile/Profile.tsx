import { css } from '@emotion/react';
import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import {
  UserInfoProvider,
  useUserInfoContext,
} from '@/components/contexts/UserInfoContext';
import { Descriptions } from '@/components/functional/Descriptions';
import type { baseUserInfo } from '@/components/hooks/useUserInfo';
import { IndexLayout } from '@/components/layouts/IndexLayout';
import { AuthEditDialogButton } from '@/components/models/AuthEditDialog';
import { ProfileEditDialogButton } from '@/components/models/ProfileEditDialogButton';
import { UserAvatar } from '@/components/models/UserAvatar';
import { UserName } from '@/components/models/UserName';
import { UserProjects } from '@/components/models/UserProjects';
import { sp } from '@/styles/media-query';

export type presentialProfileProps = baseUserInfo;

export const PresentialProfile: FC<presentialProfileProps> = ({ userData }) => {
  const [t] = useTranslation('profile');

  return (
    <>
      <Descriptions
        title={t('title', {
          name: userData?.data?.name ?? t('profile.name.undefined'),
        })}
        description={t('description')}
        noindex
      />

      <IndexLayout>
        <Grid
          container
          spacing={2}
          css={css`
            flex-wrap: nowrap;
            ${sp} {
              flex-wrap: wrap;
            }
          `}
        >
          <Grid item>
            <Stack
              spacing={2}
              css={css`
                width: 12rem;

                @media (min-width: 600px) {
                  width: 15rem;
                }
                @media (min-width: 800px) {
                  width: 20rem;
                }
              `}
            >
              <div
                css={css`
                  width: min(10rem, calc(100vw - 16px));
                  height: min(10rem, calc(100vw - 16px));
                `}
              >
                <UserAvatar />
              </div>
              <UserName />
              <ProfileEditDialogButton variant="outlined" />
              <AuthEditDialogButton variant="outlined" />
            </Stack>
          </Grid>
          <Grid
            item
            xs
            css={css`
              min-width: 15rem;
            `}
          >
            <UserProjects />
          </Grid>
        </Grid>
      </IndexLayout>
    </>
  );
};

export const UnwrappedProfile: FC = () => {
  const { user, userData } = useUserInfoContext();

  return (
    <UserInfoProvider>
      <PresentialProfile user={user} userData={userData} />
    </UserInfoProvider>
  );
};

export const Profile: FC = () => {
  return (
    <UserInfoProvider>
      <UnwrappedProfile />
    </UserInfoProvider>
  );
};

import { css } from '@emotion/react';
import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import { Descriptions } from '@/components/functional/Descriptions';
import type { userInfo } from '@/components/hooks/useUserInfo';
import { useUserInfoStrictly } from '@/components/hooks/useUserInfo';
import { IndexLayout } from '@/components/layouts/IndexLayout';
import { UserAvatar } from '@/components/models/UserAvatar';
import { UserName } from '@/components/models/UserName';
import { UserProjects } from '@/components/models/UserProjects';
import { DefaultLink } from '@/components/ui/DefaultLink';
import { sp } from '@/styles/media-query';

export type presentialProfileProps = userInfo;

export const PresentialProfile: FC<presentialProfileProps> = ({
  user,
  userData,
}) => {
  const [t] = useTranslation('profile');

  return (
    <>
      <Descriptions
        title={t('title', {
          name: userData?.data?.name ?? t('profile.displayName.undefined'),
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
                <UserAvatar user={user} userData={userData} />
              </div>
              <UserName user={user} userData={userData}></UserName>

              <p
                css={css`
                  font-size: 0.8rem;
                `}
              >
                <DefaultLink href="/profile/edit">
                  {t('profile.edit')}
                </DefaultLink>
              </p>
            </Stack>
          </Grid>
          <Grid
            item
            xs
            css={css`
              min-width: 15rem;
            `}
          >
            <UserProjects user={user} userData={userData} />
          </Grid>
        </Grid>
      </IndexLayout>
    </>
  );
};

export const Profile: FC = () => {
  const { user, userData } = useUserInfoStrictly();

  return <PresentialProfile user={user} userData={userData} />;
};

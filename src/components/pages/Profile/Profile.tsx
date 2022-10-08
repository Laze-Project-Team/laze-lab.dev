import { css } from '@emotion/react';
import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import type { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useEffect } from 'react';
import type { SWRResponse } from 'swr';
import { mutate } from 'swr';
import useSWRImmutable from 'swr/immutable';

import { Descriptions } from '@/components/functional/Descriptions';
import { IndexLayout } from '@/components/layouts/IndexLayout';
import { UserAvatar } from '@/components/models/UserAvatar';
import { UserName } from '@/components/models/UserName';
import { UserProjects } from '@/components/models/UserProjects';
import { pagesPath } from '@/lib/$path';
import { useUserManager } from '@/lib/firebase/user';
import { sp } from '@/styles/media-query';
import type { userData } from '@/typings/database';

export type presentialProfileProps = {
  user: User | null | undefined;
  userData: SWRResponse<userData | null | undefined>;
};

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
  const router = useRouter();
  const { getUser, fetchUserData } = useUserManager();
  const user = getUser();
  const userData = useSWRImmutable(
    'userData',
    () => user && fetchUserData(user),
  );

  useEffect(() => {
    // send to home when user is not logged in
    if (user === null) {
      router.push(pagesPath.$url());
    }
  }, [router, user]);

  useEffect(() => {
    // update userData when user is changed
    mutate('userData', user && fetchUserData(user));
  }, [fetchUserData, user]);

  return <PresentialProfile user={user} userData={userData} />;
};

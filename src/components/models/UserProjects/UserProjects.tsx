import { css } from '@emotion/react';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { arrayUnion } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useCallback } from 'react';
import { mutate } from 'swr';

import type { presentialProfileProps } from '@/components/pages/Profile/Profile';
import { useProjectManager } from '@/lib/firebase/project';
import { useUserManager } from '@/lib/firebase/user';
import type { userData as userDataType } from '@/typings/database';

import { UserProjectList } from './UserProjectList';

export type userProjectsProps = presentialProfileProps;

export type presentialUserProjectsProps = {
  handleClickNewProject: () => Promise<void>;
  syncUserData: (
    userDataCallback: (userData: userDataType) => userDataType,
  ) => void;
} & userProjectsProps;

export const PresentialUserProjects: FC<presentialUserProjectsProps> = ({
  userData,
  handleClickNewProject,
  syncUserData,
}) => {
  const [t] = useTranslation('profile');

  return (
    <>
      <p
        css={css`
          display: flex;
          align-items: center;
          font-size: 1.2rem;
          font-weight: bold;
        `}
      >
        <span>{t('profile.projects.title')}</span>

        <Tooltip
          title={t('profile.projects.add')}
          css={css`
            margin-left: auto;
          `}
        >
          <IconButton
            aria-label={t('profile.projects.add')}
            onClick={handleClickNewProject}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </p>

      {userData.data ? (
        <UserProjectList
          projects={userData.data.projects}
          syncUserData={syncUserData}
        />
      ) : (
        <Stack spacing={2}>
          {[0, 1, 2, 3, 4].map((val) => (
            <Skeleton
              variant="rectangular"
              sx={{ width: '100%', height: '2rem' }}
              key={val}
            />
          ))}
        </Stack>
      )}
    </>
  );
};

export const UserProjects: FC<userProjectsProps> = ({
  user,
  userData,
  ...props
}) => {
  const [t] = useTranslation('profile');
  const { locale } = useRouter();

  const { createProject } = useProjectManager();
  const { updateUserData } = useUserManager();

  const syncUserData = useCallback<presentialUserProjectsProps['syncUserData']>(
    (userDataCallback) => {
      // TODO: error handling
      const data = userData.data;
      if (!data) return;

      mutate('userData', userDataCallback(data));
    },
    [userData],
  );

  const handleClickNewProject = async () => {
    if (!user) {
      return;
    }

    const projectId = await createProject({
      owner: user.uid,
      config: {
        name: t('profile.projects.newProject'),
        description: '',
        lang: locale,
        locale,
        tags: [],
        private: true,
      },
    });

    await updateUserData(user, { projects: arrayUnion(projectId) });

    syncUserData((userData) => ({
      ...userData,
      projects: userData.projects.concat(projectId),
    }));
  };

  return (
    <PresentialUserProjects
      user={user}
      userData={userData}
      handleClickNewProject={handleClickNewProject}
      syncUserData={syncUserData}
      {...props}
    />
  );
};

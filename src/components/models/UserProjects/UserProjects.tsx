import { css } from '@emotion/react';
import { ActionIcon, Skeleton, Stack, Tooltip } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { arrayUnion } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useCallback } from 'react';

import { useUserInfoContext } from '@/components/contexts/UserInfoContext';
import type { baseUserInfo } from '@/components/hooks/useUserInfo';
import { useProjectManager } from '@/lib/firebase/project';
import { useUserManager } from '@/lib/firebase/user';
import type { userData as userDataType } from '@/typings/database';

import { UserProjectList } from './UserProjectList';

export type presentialUserProjectsProps = {
  handleClickNewProject: () => Promise<void>;
  syncUserData: (
    userDataCallback: (userData: userDataType) => userDataType,
  ) => void;
} & baseUserInfo;

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
          label={t('profile.projects.add')}
          css={css`
            margin-left: auto;
          `}
        >
          <ActionIcon
            aria-label={t('profile.projects.add')}
            onClick={handleClickNewProject}
          >
            <IconPlus />
          </ActionIcon>
        </Tooltip>
      </p>

      {userData.data ? (
        <UserProjectList
          projects={userData.data.projects}
          syncUserData={syncUserData}
        />
      ) : (
        <Stack spacing={16}>
          {[0, 1, 2, 3, 4].map((val) => (
            <Skeleton width="100%" height="2rem" radius="md" key={val} />
          ))}
        </Stack>
      )}
    </>
  );
};

export const UserProjects: FC = ({ ...props }) => {
  const [t] = useTranslation('profile');
  const { locale } = useRouter();
  const {
    user,
    userData,
    syncUserData: syncSWRUserData,
  } = useUserInfoContext();

  const { createProject } = useProjectManager();
  const { updateUserData } = useUserManager();

  const syncUserData = useCallback<presentialUserProjectsProps['syncUserData']>(
    (userDataCallback) => {
      // TODO: error handling
      const data = userData.data;
      if (!data) return;

      syncSWRUserData(userDataCallback(data));
    },
    [syncSWRUserData, userData.data],
  );

  const handleClickNewProject = async () => {
    const currentUser = user.data;

    if (!currentUser) {
      // TODO: error handling
      return;
    }

    const projectId = await createProject({
      owner: currentUser.uid,
      config: {
        name: t('profile.projects.newProject'),
        description: '',
        lang: locale,
        locale,
        tags: [],
        private: true,
      },
    });

    await updateUserData(currentUser, { projects: arrayUnion(projectId) });

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

import { Divider, List } from '@mantine/core';
import type { FC } from 'react';

import type { userData as userDataType } from '@/typings/database';

import { UserProjectItem } from './UserProjectItem';

export type userProjectListProps = {
  syncUserData: (
    userDataCallback: (userData: userDataType) => userDataType,
  ) => void;
  projects: string[];
};

export const UserProjectList: FC<userProjectListProps> = ({
  projects,
  syncUserData,
}) => {
  return (
    <List>
      <Divider />
      {projects.map((projectId) => (
        <UserProjectItem
          key={projectId}
          projectId={projectId}
          syncUserData={syncUserData}
        />
      ))}
    </List>
  );
};

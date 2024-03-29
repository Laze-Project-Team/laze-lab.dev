import type { Meta, StoryFn } from '@storybook/react';

import { mockSWRResponse } from '/__mocks__/swr';
import { userDataMock, userMock } from '/__mocks__/user';
import type { userData } from '@/typings/database';

import { PresentialUserProjects } from './UserProjects';

export default {
  title: 'models/UserProjects',
  component: PresentialUserProjects,
} as Meta<typeof PresentialUserProjects>;

const Template: StoryFn<typeof PresentialUserProjects> = (props) => (
  <PresentialUserProjects {...props} />
);

export const Primary = Template.bind({});
Primary.args = {
  user: mockSWRResponse(userMock),
  userData: mockSWRResponse({
    ...userDataMock,
    projects: [
      'test-project',
      'test-project',
      'test-project',
      'test-project',
      'test-project',
    ],
  } as userData | null | undefined),
};

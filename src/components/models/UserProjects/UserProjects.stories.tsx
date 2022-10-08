import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { getUserDataMock, userMock } from '/__mocks__/user';

import { PresentialUserProjects } from './UserProjects';

export default {
  title: 'models/UserProjects',
  component: PresentialUserProjects,
} as ComponentMeta<typeof PresentialUserProjects>;

const Template: ComponentStory<typeof PresentialUserProjects> = (props) => (
  <PresentialUserProjects {...props} />
);

export const Primary = Template.bind({});
Primary.args = {
  user: userMock,
  userData: getUserDataMock({
    projects: [
      'test-project',
      'test-project',
      'test-project',
      'test-project',
      'test-project',
    ],
  }),
};

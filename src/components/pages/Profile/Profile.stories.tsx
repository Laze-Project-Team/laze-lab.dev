import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { userDataLoadingMock, userDataMock, userMock } from '/__mocks__/user';

import { PresentialProfile } from './Profile';

export default {
  title: 'pages/Profile',
  component: PresentialProfile,
} as ComponentMeta<typeof PresentialProfile>;

const Template: ComponentStory<typeof PresentialProfile> = (props) => (
  <PresentialProfile {...props} />
);

export const Primary = Template.bind({});
Primary.args = {
  user: userMock,
  userData: userDataMock,
};

export const Loading = Template.bind({});
Loading.args = {
  user: null,
  userData: userDataLoadingMock,
};

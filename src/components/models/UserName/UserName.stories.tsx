import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { userDataLoadingMock, userDataMock, userMock } from '/__mocks__/user';

import { PresentialUserName } from './UserName';

export default {
  title: 'models/UserName',
  component: PresentialUserName,
} as ComponentMeta<typeof PresentialUserName>;

const Template: ComponentStory<typeof PresentialUserName> = (props) => (
  <PresentialUserName {...props} />
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

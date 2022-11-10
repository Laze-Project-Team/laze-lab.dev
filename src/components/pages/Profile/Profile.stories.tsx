import type { ComponentMeta, ComponentStory } from '@storybook/react';
import type { User } from 'firebase/auth';

import { mockSWRResponse } from '/__mocks__/swr';
import { userDataMock, userMock } from '/__mocks__/user';
import type { userData } from '@/typings/database';

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
  user: mockSWRResponse(userMock),
  userData: mockSWRResponse(userDataMock),
};

export const Loading = Template.bind({});
Loading.args = {
  user: mockSWRResponse(null as User | null | undefined),
  userData: mockSWRResponse(null as userData | null | undefined),
};

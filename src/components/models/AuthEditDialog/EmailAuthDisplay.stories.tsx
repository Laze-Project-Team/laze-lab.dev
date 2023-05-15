import type { Meta, StoryFn } from '@storybook/react';
import type { User } from 'firebase/auth';

import { mockSWRResponse } from '/__mocks__/swr';
import { authMock, userDataMock, userMock } from '/__mocks__/user';
import { userInfoContext } from '@/components/contexts/UserInfoContext';

import { PresentialEmailAuthDisplay } from './EmailAuthDisplay';

const userWithEmailAuth = {
  ...userMock,
  providerData: [authMock.password],
  emailVerified: false,
} as User | null | undefined;

export default {
  title: 'models/AuthEditDialog/EmailAuthDisplay',
  component: PresentialEmailAuthDisplay,
} as Meta<typeof PresentialEmailAuthDisplay>;

const Template: StoryFn<typeof PresentialEmailAuthDisplay> = (props) => (
  <userInfoContext.Provider
    value={{
      user: mockSWRResponse(userWithEmailAuth),
      userData: mockSWRResponse(userDataMock),
      syncUser: () => void 0,
      syncUserData: () => void 0,
    }}
  >
    <PresentialEmailAuthDisplay {...props} />
  </userInfoContext.Provider>
);

export const Primary = Template.bind({});
Primary.args = {
  status: 'idle',
  user: mockSWRResponse(userWithEmailAuth),
};

export const Processing = Template.bind({});
Processing.args = {
  status: 'processing',
  user: mockSWRResponse(userWithEmailAuth),
};

export const Timeout = Template.bind({});
Timeout.args = {
  status: 'timeout',
  user: mockSWRResponse(userWithEmailAuth),
};

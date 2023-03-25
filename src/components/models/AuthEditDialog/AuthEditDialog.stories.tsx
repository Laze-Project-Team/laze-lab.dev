import type { ComponentMeta, ComponentStory } from '@storybook/react';
import type { User } from 'firebase/auth';

import { mockSWRResponse } from '/__mocks__/swr';
import { authMock, userDataMock, userMock } from '/__mocks__/user';
import { userInfoContext } from '@/components/contexts/UserInfoContext';

import { PresentialAuthEditDialog } from './AuthEditDialog';

export default {
  title: 'models/AuthEditDialog',
  component: PresentialAuthEditDialog,
} as ComponentMeta<typeof PresentialAuthEditDialog>;

const Template: ComponentStory<typeof PresentialAuthEditDialog> = (props) => (
  <userInfoContext.Provider
    value={{
      user: props.user,
      userData: mockSWRResponse(userDataMock),
      syncUser: () => void 0,
      syncUserData: () => void 0,
    }}
  >
    <PresentialAuthEditDialog {...props} />
  </userInfoContext.Provider>
);

export const Primary = Template.bind({});
Primary.args = {
  opened: true,
  user: mockSWRResponse(userMock),
};

export const EmailAuthed = Template.bind({});
EmailAuthed.args = {
  opened: true,
  user: mockSWRResponse({
    ...userMock,
    providerData: [authMock.password].concat(userMock?.providerData || []),
    emailVerified: true,
  } as User | null | undefined),
};

export const EmailUnverified = Template.bind({});
EmailUnverified.args = {
  opened: true,
  user: mockSWRResponse({
    ...userMock,
    providerData: [authMock.password].concat(userMock?.providerData || []),
    emailVerified: false,
  } as User | null | undefined),
};

export const Loading = Template.bind({});
Loading.args = {
  opened: true,
  user: mockSWRResponse(undefined as User | null | undefined),
};

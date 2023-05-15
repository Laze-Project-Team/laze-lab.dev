import type { Meta, StoryFn } from '@storybook/react';
import type { User } from 'firebase/auth';
import type { FC } from 'react';

import { mockSWRResponse } from '/__mocks__/swr';
import { authMock, userDataMock, userMock } from '/__mocks__/user';
import { userInfoContext } from '@/components/contexts/UserInfoContext';
import type { userInfo } from '@/components/hooks/useUserInfo';

import type { presentialEmailAuthEditProps } from './EmailAuthEdit';
import { PresentialEmailAuthEdit } from './EmailAuthEdit';

export default {
  title: 'models/AuthEditDialog/EmailAuthEdit',
  component: PresentialEmailAuthEdit,
} as Meta<typeof PresentialEmailAuthEdit>;

const Template: StoryFn<
  FC<presentialEmailAuthEditProps & Partial<Pick<userInfo, 'user'>>>
> = ({ user, ...props }) => (
  <userInfoContext.Provider
    value={{
      user: user ?? mockSWRResponse(userMock),
      userData: mockSWRResponse(userDataMock),
      syncUser: () => void 0,
      syncUserData: () => void 0,
    }}
  >
    <PresentialEmailAuthEdit {...props} />
  </userInfoContext.Provider>
);

export const Default = Template.bind({});
Default.args = {
  providerData: [],
  isEmailAuthFormVisible: true,
};

export const FormVisible = Template.bind({});
FormVisible.args = {
  providerData: [],
  isEmailAuthFormVisible: true,
};

export const Authed = Template.bind({});
Authed.args = {
  providerData: [authMock.password],
};

export const UnverifiedEmailAuthed = Template.bind({});
UnverifiedEmailAuthed.args = {
  user: mockSWRResponse({ ...userMock, emailVerified: false } as
    | User
    | null
    | undefined),
  providerData: [authMock.password],
};

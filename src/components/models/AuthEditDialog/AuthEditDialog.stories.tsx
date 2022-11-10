import type { ComponentMeta, ComponentStory } from '@storybook/react';
import type { User } from 'firebase/auth';

import { mockSWRResponse } from '/__mocks__/swr';
import { userDataMock, userMock } from '/__mocks__/user';
import { userInfoContext } from '@/components/contexts/UserInfoContext';

import { PresentialAuthEditDialog } from './AuthEditDialog';

export default {
  title: 'models/AuthEditDialog',
  component: PresentialAuthEditDialog,
} as ComponentMeta<typeof PresentialAuthEditDialog>;

const Template: ComponentStory<typeof PresentialAuthEditDialog> = (props) => (
  <userInfoContext.Provider
    value={{
      user: mockSWRResponse(userMock),
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
  open: true,
  user: mockSWRResponse(userMock),
};

export const Loading = Template.bind({});
Loading.args = {
  open: true,
  user: mockSWRResponse(undefined as User | null | undefined),
};

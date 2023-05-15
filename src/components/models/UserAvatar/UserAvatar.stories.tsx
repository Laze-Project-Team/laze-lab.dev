import { css } from '@emotion/react';
import type { Meta, StoryFn } from '@storybook/react';
import type { User } from 'firebase/auth';

import { mockSWRResponse } from '/__mocks__/swr';
import { userDataMock, userMock } from '/__mocks__/user';
import type { userData } from '@/typings/database';

import { PresentialUserAvatar } from './UserAvatar';

export default {
  title: 'models/UserAvatar',
  component: PresentialUserAvatar,
} as Meta<typeof PresentialUserAvatar>;

const Template: StoryFn<typeof PresentialUserAvatar> = (props) => (
  <div
    css={css`
      width: 20rem;
      height: 20rem;
    `}
  >
    <PresentialUserAvatar {...props} />
  </div>
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

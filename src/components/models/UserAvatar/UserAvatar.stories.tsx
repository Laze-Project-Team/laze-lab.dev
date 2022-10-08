import { css } from '@emotion/react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { userDataLoadingMock, userDataMock, userMock } from '/__mocks__/user';

import { PresentialUserAvatar } from './UserAvatar';

export default {
  title: 'models/UserAvatar',
  component: PresentialUserAvatar,
} as ComponentMeta<typeof PresentialUserAvatar>;

const Template: ComponentStory<typeof PresentialUserAvatar> = (props) => (
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
  user: userMock,
  userData: userDataMock,
};

export const Loading = Template.bind({});
Loading.args = {
  user: null,
  userData: userDataLoadingMock,
};

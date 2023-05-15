import type { Meta, StoryFn } from '@storybook/react';

import { GitHubAuthButtonBase } from './GitHubAuthButtonBase';

export default {
  title: 'models/AuthButtonBase/GitHubAuthButtonBase',
  component: GitHubAuthButtonBase,
} as Meta<typeof GitHubAuthButtonBase>;

const Template: StoryFn<typeof GitHubAuthButtonBase> = (props) => (
  <GitHubAuthButtonBase {...props} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: 'Auth with GitHub',
};

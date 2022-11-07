import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { GitHubAuthButtonBase } from './GitHubAuthButtonBase';

export default {
  title: 'models/AuthButtonBase/GitHubAuthButtonBase',
  component: GitHubAuthButtonBase,
} as ComponentMeta<typeof GitHubAuthButtonBase>;

const Template: ComponentStory<typeof GitHubAuthButtonBase> = (props) => (
  <GitHubAuthButtonBase {...props} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: 'Auth with GitHub',
};

import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { LazeLogo } from '.';

export default {
  title: 'ui/LazeLogo',
  component: LazeLogo,
  argTypes: {},
} as ComponentMeta<typeof LazeLogo>;

const Template: ComponentStory<typeof LazeLogo> = (args) => (
  <LazeLogo {...args} />
);

export const Logo = Template.bind({});
Logo.args = {
  size: 40,
  option: 'logo',
};

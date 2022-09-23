import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { StyledLink } from '.';

export default {
  title: 'ui/StyledLink',
  component: StyledLink,
} as ComponentMeta<typeof StyledLink>;

const Template: ComponentStory<typeof StyledLink> = (args) => (
  <StyledLink {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  href: '/',
  disableIcon: false,
  children: 'This is link',
};

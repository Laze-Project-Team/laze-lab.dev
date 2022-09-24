import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { PresentialStyledLink } from './StyledLink';

export default {
  title: 'ui/StyledLink',
  component: PresentialStyledLink,
} as ComponentMeta<typeof PresentialStyledLink>;

const Template: ComponentStory<typeof PresentialStyledLink> = (props) => (
  <PresentialStyledLink {...props} />
);

export const Primary = Template.bind({});
Primary.args = {
  href: '/',
  disableIcon: false,
  children: 'This is link',
};

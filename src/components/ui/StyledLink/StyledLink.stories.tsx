import type { Meta, StoryFn } from '@storybook/react';

import { PresentialStyledLink } from './StyledLink';

export default {
  title: 'ui/StyledLink',
  component: PresentialStyledLink,
} as Meta<typeof PresentialStyledLink>;

const Template: StoryFn<typeof PresentialStyledLink> = (props) => (
  <PresentialStyledLink {...props} />
);

export const Primary = Template.bind({});
Primary.args = {
  href: '/',
  disableIcon: false,
  children: 'This is link',
};

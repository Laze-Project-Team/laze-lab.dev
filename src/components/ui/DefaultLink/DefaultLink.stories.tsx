import type { Meta, StoryFn } from '@storybook/react';

import { PresentialDefaultLink } from './DefaultLink';

export default {
  title: 'ui/DefaultLink',
  component: PresentialDefaultLink,
} as Meta<typeof PresentialDefaultLink>;

const Template: StoryFn<typeof PresentialDefaultLink> = (props) => (
  <PresentialDefaultLink {...props} />
);

export const Primary = Template.bind({});
Primary.args = {
  href: '/',
  children: "Hey! I'm a link!",
};

export const ExternalLink = Template.bind({});
ExternalLink.args = {
  href: 'https://www.google.com',
  children: "Hey! I'm an external link!",
};

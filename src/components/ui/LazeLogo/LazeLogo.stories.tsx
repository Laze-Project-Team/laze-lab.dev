import type { Meta, StoryFn } from '@storybook/react';

import { PresentialLazeLogo } from './LazeLogo';

export default {
  title: 'ui/LazeLogo',
  component: PresentialLazeLogo,
  argTypes: {},
} as Meta<typeof PresentialLazeLogo>;

const Template: StoryFn<typeof PresentialLazeLogo> = (props) => (
  <PresentialLazeLogo {...props} />
);

export const Logo = Template.bind({});
Logo.args = {
  size: 40,
  option: 'logo',
};

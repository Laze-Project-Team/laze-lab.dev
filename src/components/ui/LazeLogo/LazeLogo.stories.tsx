import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { PresentialLazeLogo } from './LazeLogo';

export default {
  title: 'ui/LazeLogo',
  component: PresentialLazeLogo,
  argTypes: {},
} as ComponentMeta<typeof PresentialLazeLogo>;

const Template: ComponentStory<typeof PresentialLazeLogo> = (props) => (
  <PresentialLazeLogo {...props} />
);

export const Logo = Template.bind({});
Logo.args = {
  size: 40,
  option: 'logo',
};

import type { Meta, StoryFn } from '@storybook/react';

import { PresentialColorModeSwitcher } from './ColorModeSwitcher';

export default {
  title: 'models/ColorModeSwitcher',
  component: PresentialColorModeSwitcher,
} as Meta<typeof PresentialColorModeSwitcher>;

const Template: StoryFn<typeof PresentialColorModeSwitcher> = (props) => (
  <PresentialColorModeSwitcher {...props} />
);

export const Dark = Template.bind({});
Dark.args = {
  handleClick: () => void 0,
};

export const Light = Template.bind({});
Light.args = {
  handleClick: () => void 0,
};

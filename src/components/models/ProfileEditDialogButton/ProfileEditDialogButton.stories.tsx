import type { Meta, StoryFn } from '@storybook/react';

import { PresentialProfileEditDialogButton } from './ProfileEditDialogButton';

export default {
  title: 'models/ProfileEditDialogButton',
  component: PresentialProfileEditDialogButton,
} as Meta<typeof PresentialProfileEditDialogButton>;

const Template: StoryFn<typeof PresentialProfileEditDialogButton> = (props) => (
  <PresentialProfileEditDialogButton {...props} />
);

export const Primary = Template.bind({});
Primary.args = {};

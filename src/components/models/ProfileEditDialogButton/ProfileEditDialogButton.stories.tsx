import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { PresentialProfileEditDialogButton } from './ProfileEditDialogButton';

export default {
  title: 'models/ProfileEditDialogButton',
  component: PresentialProfileEditDialogButton,
} as ComponentMeta<typeof PresentialProfileEditDialogButton>;

const Template: ComponentStory<typeof PresentialProfileEditDialogButton> = (
  props,
) => <PresentialProfileEditDialogButton {...props} />;

export const Primary = Template.bind({});
Primary.args = {};

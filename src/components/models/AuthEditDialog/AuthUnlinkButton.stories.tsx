import type { Meta, StoryFn } from '@storybook/react';

import { PresentialAuthUnlinkButton } from './AuthUnlinkButton';

export default {
  title: 'models/AuthEditDialog/AuthUnlinkButton',
  component: PresentialAuthUnlinkButton,
} as Meta<typeof PresentialAuthUnlinkButton>;

const Template: StoryFn<typeof PresentialAuthUnlinkButton> = (props) => (
  <PresentialAuthUnlinkButton
    {...props}
    handleClick={() => void 0}
    handleCancel={() => void 0}
    handleConfirm={() => void 0}
  />
);

export const Primary = Template.bind({});
Primary.args = {
  message: 'Auth with Google',
  isWorking: false,
  isConfirmationDialogOpen: false,
};

export const Confirmation = Template.bind({});
Confirmation.args = {
  message: 'Auth with Google',
  isWorking: false,
  isConfirmationDialogOpen: true,
};

export const Unlinking = Template.bind({});
Unlinking.args = {
  message: 'Auth with Google',
  isWorking: true,
  isConfirmationDialogOpen: false,
};

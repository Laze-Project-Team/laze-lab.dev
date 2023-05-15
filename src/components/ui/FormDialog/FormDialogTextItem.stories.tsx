import type { Meta, StoryFn } from '@storybook/react';
import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { PresentialFormDialogTextItem } from './FormDialogTextItem';

export default {
  title: 'models/FormDialogTextItem',
  component: PresentialFormDialogTextItem,
} as Meta<typeof PresentialFormDialogTextItem>;

const Template: StoryFn<typeof PresentialFormDialogTextItem> = (props) => {
  const { control } = useForm<FieldValues>({
    defaultValues: {
      text: 'sample text',
    },
  });
  return <PresentialFormDialogTextItem {...props} control={control} />;
};

export const Primary = Template.bind({});
Primary.args = {
  id: 'storybook-form-dialog',
  label: 'dialog text item',
  name: 'text',
};

import type { Meta, StoryFn } from '@storybook/react';

import { LocaleSelectButton } from './LocaleSelectButton';

export default {
  title: 'models/LanguageSelectButton',
  component: LocaleSelectButton,
} as Meta<typeof LocaleSelectButton>;

const Template: StoryFn<typeof LocaleSelectButton> = (props) => (
  <LocaleSelectButton {...props} />
);

export const Primary = Template.bind({});
Primary.args = {};

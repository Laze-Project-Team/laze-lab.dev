import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { LocaleSelectButton } from './LocaleSelectButton';

export default {
  title: 'models/LanguageSelectButton',
  component: LocaleSelectButton,
} as ComponentMeta<typeof LocaleSelectButton>;

const Template: ComponentStory<typeof LocaleSelectButton> = (props) => (
  <LocaleSelectButton {...props} />
);

export const Primary = Template.bind({});
Primary.args = {};

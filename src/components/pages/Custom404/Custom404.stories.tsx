import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { PresentialCustom404 } from './Custom404';

export default {
  title: 'pages/Custom404',
  component: PresentialCustom404,
} as ComponentMeta<typeof PresentialCustom404>;

const Template: ComponentStory<typeof PresentialCustom404> = (props) => (
  <PresentialCustom404 {...props} />
);

export const Primary = Template.bind({});
Primary.args = {};

import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { PresentialIndexFooter } from './IndexFooter';

export default {
  title: 'models/IndexFooter',
  component: PresentialIndexFooter,
} as ComponentMeta<typeof PresentialIndexFooter>;

const Template: ComponentStory<typeof PresentialIndexFooter> = (props) => (
  <PresentialIndexFooter {...props} />
);

export const Primary = Template.bind({});
Primary.args = {};

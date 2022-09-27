import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Headings } from './Heading';

export default {
  title: 'ui/MDXComponents/Heading',
  component: Headings,
} as ComponentMeta<typeof Headings>;

const Template: ComponentStory<typeof Headings> = (props) => (
  <Headings {...props} />
);

export const H1 = Template.bind({});
H1.args = {
  level: 1,
  children: 'This is h1',
};
export const H2 = Template.bind({});
H2.args = {
  level: 2,
  children: 'This is h2',
};
export const H3 = Template.bind({});
H3.args = {
  level: 3,
  children: 'This is h3',
};
export const H4 = Template.bind({});
H4.args = {
  level: 4,
  children: 'This is h4',
};
export const H5 = Template.bind({});
H5.args = {
  level: 5,
  children: 'This is h5',
};
export const H6 = Template.bind({});
H6.args = {
  level: 6,
  children: 'This is h6',
};

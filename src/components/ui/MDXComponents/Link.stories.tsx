import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Link } from './Link';

export default {
  title: 'ui/MDXComponents/Link',
  component: Link,
} as ComponentMeta<typeof Link>;

// eslint-disable-next-line jsx-a11y/alt-text
const Template: ComponentStory<typeof Link> = (props) => <Link {...props} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'This is link',
  href: '/',
};

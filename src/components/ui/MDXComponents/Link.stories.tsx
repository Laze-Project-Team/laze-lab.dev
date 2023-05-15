import type { Meta, StoryFn } from '@storybook/react';

import { Link } from './Link';

export default {
  title: 'ui/MDXComponents/Link',
  component: Link,
} as Meta<typeof Link>;

// eslint-disable-next-line jsx-a11y/alt-text
const Template: StoryFn<typeof Link> = (props) => <Link {...props} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'This is link',
  href: '/',
};

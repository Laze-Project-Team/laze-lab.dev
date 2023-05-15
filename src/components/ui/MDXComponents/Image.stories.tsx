import type { Meta, StoryFn } from '@storybook/react';

import { staticPath } from '@/lib/$path';

import { Image } from './Image';

export default {
  title: 'ui/MDXComponents/Image',
  component: Image,
} as Meta<typeof Image>;

// eslint-disable-next-line jsx-a11y/alt-text
const Template: StoryFn<typeof Image> = (props) => <Image {...props} />;

export const Primary = Template.bind({});
Primary.args = {
  src: staticPath.img.logo.logo_png,
  alt: 'logo',
};

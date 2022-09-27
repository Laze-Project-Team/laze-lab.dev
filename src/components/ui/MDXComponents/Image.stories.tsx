import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { staticPath } from '@/lib/$path';

import { Image } from './Image';

export default {
  title: 'ui/MDXComponents/Image',
  component: Image,
} as ComponentMeta<typeof Image>;

// eslint-disable-next-line jsx-a11y/alt-text
const Template: ComponentStory<typeof Image> = (props) => <Image {...props} />;

export const Primary = Template.bind({});
Primary.args = {
  src: staticPath.img.logo.logo_png,
  alt: 'logo',
};

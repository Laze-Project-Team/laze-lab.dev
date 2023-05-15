import type { Meta, StoryFn } from '@storybook/react';

import { PresentialHome } from './Home';

export default {
  title: 'pages/Home',
  component: PresentialHome,
} as Meta<typeof PresentialHome>;

const Template: StoryFn<typeof PresentialHome> = (props) => (
  <PresentialHome {...props} />
);

export const Primary = Template.bind({});
Primary.parameters = {
  nextRouter: {
    pathname: '/',
    locale: 'en',
  },
};

import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Home } from '.';

export default {
  title: 'pages/Home',
  component: Home,
} as ComponentMeta<typeof Home>;

const Template: ComponentStory<typeof Home> = (args) => <Home {...args} />;

export const Primary = Template.bind({});
Primary.parameters = {
  nextRouter: {
    pathname: '/',
    locale: 'en',
  },
};

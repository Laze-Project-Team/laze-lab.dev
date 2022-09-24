import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { PresentialHome } from './Home';

export default {
  title: 'pages/Home',
  component: PresentialHome,
} as ComponentMeta<typeof PresentialHome>;

const Template: ComponentStory<typeof PresentialHome> = (props) => (
  <PresentialHome {...props} />
);

export const Primary = Template.bind({});
Primary.parameters = {
  nextRouter: {
    pathname: '/',
    locale: 'en',
  },
};

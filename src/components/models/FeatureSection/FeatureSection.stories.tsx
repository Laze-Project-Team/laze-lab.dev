import type { ComponentMeta,ComponentStory } from '@storybook/react';

import { PresentialFeatureSection } from './FeatureSection';

export default {
  title: 'models/FeatureSection',
  component: PresentialFeatureSection,
} as ComponentMeta<typeof PresentialFeatureSection>;

const Template: ComponentStory<typeof PresentialFeatureSection> = (props) => (
  <PresentialFeatureSection {...props} />
);

export const Primary = Template.bind({});
Primary.args = {};

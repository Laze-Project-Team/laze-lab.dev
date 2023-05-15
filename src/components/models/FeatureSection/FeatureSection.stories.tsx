import type { Meta, StoryFn } from '@storybook/react';

import { PresentialFeatureSection } from './FeatureSection';

export default {
  title: 'models/FeatureSection',
  component: PresentialFeatureSection,
} as Meta<typeof PresentialFeatureSection>;

const Template: StoryFn<typeof PresentialFeatureSection> = (props) => (
  <PresentialFeatureSection {...props} />
);

export const Primary = Template.bind({});
Primary.args = {};

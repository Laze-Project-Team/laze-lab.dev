---
to: "<%- require_storybook ? `src/components/${component_type}/${h.changeCase.pascal(component_name)}/${h.changeCase.pascal(component_name)}.stories.tsx` : null %>"
---

import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { Presential<%- h.changeCase.pascal(component_name) %> } from './<%- h.changeCase.pascal(component_name) %>';

export default {
  title: '<%- component_type %>/<%- h.changeCase.pascal(component_name) %>',
  component: Presential<%- h.changeCase.pascal(component_name) %>,
} as ComponentMeta<typeof Presential<%- h.changeCase.pascal(component_name) %>>;

const Template: ComponentStory<typeof Presential<%- h.changeCase.pascal(component_name) %>> = (props) => <Presential<%- h.changeCase.pascal(component_name) %> {...props} />;

export const Primary = Template.bind({});
Primary.args = {};

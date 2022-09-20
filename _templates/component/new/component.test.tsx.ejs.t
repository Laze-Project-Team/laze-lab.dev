---
to: src/components/<%= component_type %>/<%= h.changeCase.pascal(component_name) %>/<%= h.changeCase.pascal(component_name) %>.test.tsx
---

import { <%= h.changeCase.pascal(component_name) %> } from '.';

describe("<%= component_type %>/<%= h.changeCase.pascal(component_name) %>", () => {
  // write tests here
});

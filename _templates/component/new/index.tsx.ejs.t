---
to: src/components/<%- component_type %>/<%- h.changeCase.pascal(component_name) %>/index.ts
---

<%- require_props ? `export type { ${h.changeCase.camel(component_name)}Props } from './${h.changeCase.pascal(component_name)}';` : null %>
export { <%- h.changeCase.pascal(component_name) %> } from './<%- h.changeCase.pascal(component_name) %>';

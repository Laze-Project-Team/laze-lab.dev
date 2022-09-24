---
to: src/components/<%- component_type %>/<%- h.changeCase.pascal(component_name) %>/<%- h.changeCase.pascal(component_name) %>.tsx
---

import type { FC } from 'react'

<%- require_props ? `export type ${h.changeCase.camel(component_name)}Props = {
  
};

export type presential${h.changeCase.pascal(component_name)}Props = {
  
} & ${h.changeCase.camel(component_name)}Props;` : null %>

export const Presential<%- h.changeCase.pascal(component_name) %>: FC<%- require_props ? `<presential${h.changeCase.pascal(component_name)}Props>` : null %> = (<%- require_props ? `{}` : null %>) => {
  return (
    <>
      
    </>
  );
};

export const <%- h.changeCase.pascal(component_name) %>: FC<%- require_props ? `<${h.changeCase.camel(component_name)}Props>` : null %> = (<%- require_props ? `props` : null %>) => {
  return <Presential<%- h.changeCase.pascal(component_name) %> <%- require_props ? `{...props}` : null %> />;
};

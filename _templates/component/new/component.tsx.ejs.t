---
to: src/components/<%= component_type %>/<%= h.changeCase.pascal(component_name) %>/<%= h.changeCase.pascal(component_name) %>.tsx
---

import type { FC } from 'react'

export type <%= h.changeCase.camel(component_name) %>Props = {
  
};

export const <%= h.changeCase.pascal(component_name) %>: FC<<%= h.changeCase.camel(component_name) %>Props> = ({}) => {
  return (
    <>
      
    </>
  );
};

---
to: src/components/<%= component_type %>/<%= h.changeCase.pascal(component_name) %>/<%= h.changeCase.pascal(component_name) %>.test.tsx
---

import type { FC } from 'react'

export type <%= h.changeCase.camel(name) %>Props = {

}

export const <%= h.changeCase.pascal(name) %>: FC<<%= h.changeCase.camel(name) %>Props> = ({}) => {
  return (
    <>
      
    </>
  )
}

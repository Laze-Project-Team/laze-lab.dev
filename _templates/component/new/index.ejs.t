--
to: src/components/<%= atomic %>/<%= h.changeCase.pascal(component_name) %>/index.ts
---
export {
  <%= h.changeCase.pascal(component_name) %>,
  <%= h.changeCase.camel(component_name) %>Props,
} from './<%= h.changeCase.pascal(component_name) %>'

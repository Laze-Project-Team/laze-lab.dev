import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { render } from '@/lib/test/render';

import { Li, Ol, Ul } from './List';

const unorderedList = (
  <Ul>
    <Li>item 1</Li>
    <Li>item 2</Li>
    <Li>item 3</Li>
  </Ul>
);

const orderedList = (
  <Ol>
    <Li>item 1</Li>
    <Li>item 2</Li>
    <Li>item 3</Li>
  </Ol>
);

it.each([
  ['ul', unorderedList],
  ['ol', orderedList],
])('should be rendered correctly (%s)', (name, component) => {
  const { container } = render(component);
  expect(container.firstChild).toMatchSnapshot();
});

it.each([
  ['ul', unorderedList],
  ['ol', orderedList],
])('should have "list" role (%s)', (name, component) => {
  render(component);
  expect(screen.getByRole('list')).toBeInTheDocument();
});

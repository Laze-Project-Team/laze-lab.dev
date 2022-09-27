import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { render } from '@/lib/test/render';

import { H1, H2, H3, H4, H5, H6 } from '.';

it.each([
  ['H1', <H1 key="H1" />],
  ['H2', <H2 key="H2" />],
  ['H3', <H3 key="H3" />],
  ['H4', <H4 key="H4" />],
  ['H5', <H5 key="H5" />],
  ['H6', <H6 key="H6" />],
])('should be rendered correctly (%s)', (name, component) => {
  const { container } = render(component);
  expect(container.firstChild).toMatchSnapshot();
});

it.each([
  ['H1', <H1 key="H1" />],
  ['H2', <H2 key="H2" />],
  ['H3', <H3 key="H3" />],
  ['H4', <H4 key="H4" />],
  ['H5', <H5 key="H5" />],
  ['H6', <H6 key="H6" />],
])('should have "heading" role (%s)', (name, component) => {
  render(component);
  expect(screen.getByRole('heading')).toBeInTheDocument();
});

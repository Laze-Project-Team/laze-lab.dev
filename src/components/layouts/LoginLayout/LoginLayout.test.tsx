import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { render } from '/render';

import { LoginLayout } from '.';

it('should be rendered correctly', () => {
  const { container } = render(<LoginLayout title="title" />);
  expect(container.firstChild).toMatchSnapshot();
});

it('should have "main" role', () => {
  render(<LoginLayout title="title" />);
  expect(screen.getByRole('main')).toBeInTheDocument();
});

it('should render children', () => {
  const children = "Hey I'm children";
  render(<LoginLayout title="title">{children}</LoginLayout>);
  expect(screen.getByText(children)).toBeInTheDocument();
});

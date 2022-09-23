import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { IndexLayout } from '.';

it('should be rendered correctly', () => {
  const { container } = render(<IndexLayout />);
  expect(container.firstChild).toMatchSnapshot();
});

it('should render children', () => {
  const children = "Hey I'm children";
  render(<IndexLayout>{children}</IndexLayout>);
  expect(screen.getByText(children)).toBeInTheDocument();
});

it('should render IndexHeader', () => {
  render(<IndexLayout />);
  expect(screen.getByRole('banner')).toBeInTheDocument();
});

it('should render IndexFooter', () => {
  render(<IndexLayout />);
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
});

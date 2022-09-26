import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { render } from '@/lib/test/render';

import { StyledLink } from '.';

it('should be rendered correctly', () => {
  const { container } = render(<StyledLink href="/" />);
  expect(container.firstChild).toMatchSnapshot();
});

it('should have "link" role', () => {
  render(<StyledLink href="/" />);
  expect(screen.getByRole('link')).toBeInTheDocument();
});

it('should render children', () => {
  const children = "Hey I'm children";
  render(<StyledLink href="/">{children}</StyledLink>);
  expect(screen.getByText(children)).toBeInTheDocument();
});

it('should be passed href', () => {
  const href = '/ref_to_somewhere';
  render(<StyledLink href={href} />);
  expect(screen.getByRole('link').closest('a')).toHaveAttribute('href', href);
});

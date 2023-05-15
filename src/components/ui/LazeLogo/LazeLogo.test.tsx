import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { render } from '@/lib/test/render';

import { LazeLogo } from '.';

it('should be rendered correctly', () => {
  const { container } = render(<LazeLogo size={40} option="logo" alt="" />);
  expect(container.firstChild).toMatchSnapshot();
});

it('should have "presentation" role', () => {
  render(<LazeLogo size={40} option="logo" alt="" />);
  expect(screen.getByRole('presentation')).toBeInTheDocument();
});

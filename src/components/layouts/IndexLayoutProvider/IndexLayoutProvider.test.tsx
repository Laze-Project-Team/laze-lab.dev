import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { render } from '@/lib/test/render';

import { IndexLayoutProvider } from '.';

it('should be rendered correctly', () => {
  const { container } = render(<IndexLayoutProvider />);
  expect(container.firstChild).toMatchSnapshot();
});

it('should have "???" role', () => {
  render(<IndexLayoutProvider />);
  expect(screen.getByRole('???')).toBeInTheDocument();
});

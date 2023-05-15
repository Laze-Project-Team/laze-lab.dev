import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { render } from '@/lib/test/render';

import { AuthEditDialog } from '.';

it('should be rendered correctly', () => {
  const { container } = render(<AuthEditDialog opened />);
  expect(container.firstChild).toMatchSnapshot();
});

it('should have "dialog" role', () => {
  render(<AuthEditDialog opened />);
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

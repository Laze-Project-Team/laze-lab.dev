import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { render } from '@/lib/test/render';

import { LoadingButton } from '.';

it('should be rendered correctly', () => {
  const { container } = render(<LoadingButton />);
  expect(container.firstChild).toMatchSnapshot();
});

it('should have "button" role', () => {
  render(<LoadingButton />);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

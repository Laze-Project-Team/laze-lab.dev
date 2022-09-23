import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { TwitterIcon } from '.';

it('should be rendered correctly', () => {
  const { container } = render(<TwitterIcon />);
  expect(container.firstChild).toMatchSnapshot();
});

it('should have "presentation" role', () => {
  render(<TwitterIcon />);
  expect(screen.getByRole('presentation')).toBeInTheDocument();
});

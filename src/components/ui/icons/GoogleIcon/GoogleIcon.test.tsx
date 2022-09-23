import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { GoogleIcon } from '.';

it('should be rendered correctly', () => {
  const { container } = render(<GoogleIcon />);
  expect(container.firstChild).toMatchSnapshot();
});

it('should have "presentation" role', () => {
  render(<GoogleIcon />);
  expect(screen.getByRole('presentation')).toBeInTheDocument();
});

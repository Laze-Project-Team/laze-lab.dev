import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { QiitaIcon } from '.';

it('should be rendered correctly', () => {
  const { container } = render(<QiitaIcon />);
  expect(container.firstChild).toMatchSnapshot();
});

it('should have "graphics-document" role', () => {
  render(<QiitaIcon />);
  expect(screen.getByRole('graphics-document')).toBeInTheDocument();
});

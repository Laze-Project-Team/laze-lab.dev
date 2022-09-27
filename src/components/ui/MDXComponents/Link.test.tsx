import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { render } from '@/lib/test/render';

import { Link } from './Link';

it('should be rendered correctly', () => {
  const { container } = render(<Link href="/" />);
  expect(container.firstChild).toMatchSnapshot();
});

it('should have "link" role', () => {
  render(<Link href="/" />);
  expect(screen.getByRole('link')).toBeInTheDocument();
});

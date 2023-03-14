import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { render } from '@/lib/test/render';

import { WaitlistForm } from '.';

it('should be rendered correctly', () => {
  const { container } = render(<WaitlistForm />);
  expect(container.firstChild).toMatchSnapshot();
});

it('should have "???" role', () => {
  render(<WaitlistForm />);
  expect(screen.getByRole('???')).toBeInTheDocument();
});

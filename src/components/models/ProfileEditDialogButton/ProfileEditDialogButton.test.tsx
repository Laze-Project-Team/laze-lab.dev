import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { render } from '@/lib/test/render';

import { ProfileEditDialogButton } from '.';

it('should be rendered correctly', () => {
  const { container } = render(<ProfileEditDialogButton />);
  expect(container.firstChild).toMatchSnapshot();
});

it('should have "button" role', () => {
  render(<ProfileEditDialogButton />);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

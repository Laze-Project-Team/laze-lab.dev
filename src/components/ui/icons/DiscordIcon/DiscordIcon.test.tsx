import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { render } from '@/lib/test/render';

import { DiscordIcon } from '.';

it('should be rendered correctly', () => {
  const { container } = render(<DiscordIcon />);
  expect(container.firstChild).toMatchSnapshot();
});

it('should have "presentation" role', () => {
  render(<DiscordIcon />);
  expect(screen.getByRole('presentation')).toBeInTheDocument();
});

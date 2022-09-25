import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { render } from '/render';

import { IndexFooter } from '.';

it('should be rendered correctly', () => {
  const { container } = render(<IndexFooter />);
  expect(container.firstChild).toMatchSnapshot();
});

it('should have "contentinfo" role', () => {
  render(<IndexFooter />);
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
});

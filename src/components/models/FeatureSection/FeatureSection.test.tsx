import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { render } from '@/lib/test/render';

import { FeatureSection } from '.';

it('should be rendered correctly', () => {
  const { container } = render(<FeatureSection />);
  expect(container.firstChild).toMatchSnapshot();
});

it('should have "???" role', () => {
  render(<FeatureSection />);
  expect(screen.getByRole('???')).toBeInTheDocument();
});

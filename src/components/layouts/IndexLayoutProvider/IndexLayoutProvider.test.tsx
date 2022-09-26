import '@testing-library/jest-dom';

import { expect, it } from 'vitest';

import { render } from '@/lib/test/render';

import { IndexLayoutProvider } from '.';

it('should be rendered correctly', () => {
  const { container } = render(<IndexLayoutProvider />);
  expect(container.firstChild).toMatchSnapshot();
});

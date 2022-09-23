import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import { Home } from '.';

afterEach(() => {
  vi.restoreAllMocks();
});

it('should be rendered correctly', () => {
  vi.mock('next/router', () => ({
    useRouter: () => {
      return {
        pathname: '/',
        locale: 'en',
      };
    },
  }));

  const { container } = render(<Home />);
  expect(container.firstChild).toMatchSnapshot();
});

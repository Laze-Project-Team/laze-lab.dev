import '@testing-library/jest-dom';

import { expect, it, vi } from 'vitest';

import { render } from '/render';

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

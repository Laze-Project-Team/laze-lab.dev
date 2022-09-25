import '@testing-library/jest-dom';

import { expect, it, vi } from 'vitest';

import { render } from '/render';
import { ColorModeProvider } from '@/components/contexts/ColorModeContext';

import { Login } from '.';

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

  const { container } = render(<Login />, { wrapper: ColorModeProvider });
  expect(container.firstChild).toMatchSnapshot();
});

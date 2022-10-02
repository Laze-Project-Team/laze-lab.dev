import '@testing-library/jest-dom';

import { fireEvent, screen } from '@testing-library/react';
import { beforeEach, expect, it, vi } from 'vitest';

import { render } from '@/lib/test/render';

import { ColorModeSwitcher } from '.';

const useColorModeMock = {
  colorMode: 'dark',
  toggleColorMode: vi.fn(),
  themePattern: (_light: unknown, dark: unknown) => dark,
};

beforeEach(() => {
  vi.mock('@/components/contexts/ColorModeContext', async () => {
    const context = (await vi.importActual(
      '@/components/contexts/ColorModeContext',
    )) as Record<string, unknown>;

    return {
      ...context,
      useColorMode: () => useColorModeMock,
    };
  });
});

it('should be rendered correctly', () => {
  const { container } = render(<ColorModeSwitcher />);
  expect(container.firstChild).toMatchSnapshot();
});

it('should have "button" role', () => {
  render(<ColorModeSwitcher />);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

it('can change colormode', () => {
  render(<ColorModeSwitcher />);
  const button = screen.getByRole('button');

  fireEvent.click(button);

  expect(useColorModeMock.toggleColorMode).toHaveBeenCalledOnce();
});

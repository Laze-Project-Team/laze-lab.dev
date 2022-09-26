import '@testing-library/jest-dom';

import { renderHook, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { expect, it, vi } from 'vitest';

import { render } from '/render';

import { AuthError, AuthErrorProvider } from './AuthError';
import * as AuthErrorNS from './useAuthError';
import { useAuthError } from './useAuthError';

const error = 'This is error message!';
const err = {
  code: 'error-code-400',
  message: 'Something went wrong (code: error-code-400)',
};

it('should render correctly', () => {
  vi.spyOn(AuthErrorNS, 'useAuthError').mockImplementation(() => ({
    error,
    setError: vi.fn(),
    handleError: vi.fn(),
  }));

  const { container, rerender } = render(<AuthError />);
  rerender(<AuthError />);

  expect(container.firstChild).toMatchSnapshot();
  expect(screen.getByText(error)).toBeInTheDocument();
});

it('should work correctly', () => {
  const { result, rerender } = renderHook(() => useAuthError(), {
    wrapper: AuthErrorProvider,
  });

  rerender();

  expect(result.current.error).toBe(null);

  act(() => {
    result.current.setError(error);
  });
  expect(result.current.error).toBe(error);

  act(() => {
    result.current.handleError(err);
  });
  expect(result.current.error).toBe(err.message);
});

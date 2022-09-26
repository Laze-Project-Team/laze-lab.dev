import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import type { authMethod, authType } from '@/components/hooks/useAuth';
import { AuthErrorProvider } from '@/components/layouts/LoginLayout/AuthError';
import { render } from '@/lib/test/render';

import { AuthButton } from '.';

it('should be rendered correctly', () => {
  const methods: authMethod[] = ['Google', 'Twitter', 'GitHub'];
  const types: authType[] = ['login', 'signup'];

  for (const method of methods) {
    for (const type of types) {
      const { container } = render(<AuthButton method={method} type={type} />, {
        wrapper: AuthErrorProvider,
      });
      expect(container.firstChild).toMatchSnapshot();
    }
  }
});

it('should have "button" role', () => {
  render(<AuthButton method="Google" type="login" />, {
    wrapper: AuthErrorProvider,
  });
  expect(screen.getByRole('button')).toBeInTheDocument();
});

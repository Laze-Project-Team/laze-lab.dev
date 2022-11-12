import '@testing-library/jest-dom';

import { fireEvent, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { mockEachRouter } from '/__mocks__/router';
import { AuthErrorProvider } from '@/components/layouts/LoginLayout/AuthError';
import { render } from '@/lib/test/render';

import { SignupForm } from '.';

mockEachRouter();

it('should be rendered correctly', () => {
  const { container } = render(<SignupForm />, { wrapper: AuthErrorProvider });
  expect(container.firstChild).toMatchSnapshot();
});

it('should have "form" role', () => {
  render(<SignupForm />, { wrapper: AuthErrorProvider });
  expect(screen.getByRole('form')).toBeInTheDocument();
});

it('should work as login form', () => {
  const form = render(<SignupForm />, { wrapper: AuthErrorProvider });

  const emailInput = form.getByRole('textbox', {
    name: 'form.email.label',
  }) as HTMLInputElement;
  const emailValue = 'aaa-bbb-ccc@example.com';
  fireEvent.change(emailInput, {
    target: { value: emailValue },
  });
  expect(emailInput.value).toBe(emailValue);

  const passwordInput = form.getByRole('textbox', {
    name: 'form.password.label',
  }) as HTMLInputElement;
  const passwordValue = 'this is password';
  fireEvent.change(passwordInput, {
    target: { value: passwordValue },
  });
  expect(passwordInput.value).toBe(passwordValue);
});

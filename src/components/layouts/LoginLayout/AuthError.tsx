import { Alert } from '@mantine/core';
import type { FC, ReactNode } from 'react';
import { createContext, useState } from 'react';

import { useAuthError } from '@/components/layouts/LoginLayout/useAuthError';

export type authErrorContextType = {
  error: string | null;
  setError: (error: string | null) => void;
};

export const authErrorContext = createContext<authErrorContextType | null>(
  null,
);

export type authError = {
  code: string;
  message: string;
};

export type authErrorsProviderProps = {
  children: ReactNode;
};

export const AuthErrorProvider: FC<authErrorsProviderProps> = ({
  children,
}) => {
  const [error, setError] = useState<string | null>(null);

  return (
    <authErrorContext.Provider value={{ error, setError }}>
      {children}
    </authErrorContext.Provider>
  );
};

export const AuthError: FC = () => {
  const { error, setError } = useAuthError();

  return <>{error && <Alert onClose={() => setError(null)}>{error}</Alert>}</>;
};

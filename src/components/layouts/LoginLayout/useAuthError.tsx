import { useContext } from 'react';

import type { authError } from './AuthError';
import { authErrorContext } from './AuthError';

export type authErrorHandlers = {
  error: string | null;
  setError: (errorMessage: string | null) => void;
  handleError: (error: authError) => void;
};

export const useAuthError = (): authErrorHandlers => {
  const authCtx = useContext(authErrorContext);

  if (authCtx === null) {
    throw new Error('Please wrap the component with AuthErrorProvider');
  }

  const { error, setError } = authCtx;

  return {
    error,
    setError: (errorMessage) => {
      setError(errorMessage);
    },
    handleError: (err) => {
      setError(err.message);
    },
  };
};

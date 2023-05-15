import type { OAuthCredential, UserCredential } from 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
  TwitterAuthProvider,
} from 'firebase/auth';
import { useCallback } from 'react';
import { match } from 'ts-pattern';

import { useFirebase } from '@/lib/firebase';

export type authType = 'login' | 'signup';
export type authMethod = 'Google' | 'Twitter' | 'GitHub';

const providers = {
  Google: GoogleAuthProvider,
  Twitter: TwitterAuthProvider,
  GitHub: GithubAuthProvider,
} as const;

export type authObject<T extends authMethod> = {
  provider: (typeof providers)[T];
  authenticate: () => Promise<OAuthCredential | null>;
};

export const useAuth = <T extends authMethod>(method: T): authObject<T> => {
  const { auth } = useFirebase();

  const Provider = providers[method];

  const authenticate = useCallback(async () => {
    const result = await signInWithRedirect(auth, new Provider());
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = Provider.credentialFromResult(result);
    return credential;
  }, [Provider, auth]);

  return {
    provider: Provider,
    authenticate,
  };
};

export type emailAuthObject = {
  authenticate: (
    email: string,
    password: string,
  ) => Promise<UserCredential | null>;
};

export const useEmailAuth = (type: authType): emailAuthObject => {
  const { auth } = useFirebase();

  return match(type)
    .with('login', () => ({
      authenticate: async (email: string, password: string) => {
        const credential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );

        return credential;
      },
    }))
    .with('signup', () => ({
      authenticate: async (email: string, password: string) => {
        const credential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

        return credential;
      },
    }))
    .exhaustive();
};

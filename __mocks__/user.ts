import type { User } from 'firebase/auth';
import type { SWRResponse } from 'swr';

import type { userData } from '@/typings/database';

export const userMock: User = {
  uid: 'unique-id',
  delete: async () => void 0,
  displayName: 'Laze Project Team',
  email: 'laze@example.com',
  emailVerified: true,
  getIdToken: async () => 'token',
  getIdTokenResult: async () => ({
    authTime: new Date().toISOString(),
    expirationTime: new Date().toISOString(),
    issuedAtTime: new Date().toISOString(),
    signInProvider: null,
    signInSecondFactor: null,
    token: 'token',
    claims: {},
  }),
  isAnonymous: false,
  metadata: {},
  phoneNumber: null,
  photoURL: null,
  providerData: [],
  providerId: 'email',
  refreshToken: 'token',
  reload: async () => void 0,
  tenantId: null,
  toJSON: () => ({}),
};

export const userDataMock: SWRResponse<userData | null | undefined> = {
  isValidating: false,
  mutate: async (_a: unknown, _b: unknown) => void 0,
  data: {
    name: 'Laze Project Team',
    avatarURL: 'https://laze.ddns.net/img/logo/logo.png',
    locale: 'ja',
    projects: [],
    createdAt: new Date(),
  },
};

export const getUserDataMock = <T extends Partial<userData>>(
  data: T,
): SWRResponse<userData | null | undefined> => ({
  isValidating: false,
  mutate: async (_a: unknown, _b: unknown) => void 0,
  data: {
    name: 'Laze Project Team',
    avatarURL: 'https://laze.ddns.net/img/logo/logo.png',
    locale: 'ja',
    projects: [],
    createdAt: new Date(),
    ...data,
  },
});

export const userDataLoadingMock: SWRResponse<userData | null | undefined> = {
  isValidating: false,
  mutate: async (_a: unknown, _b: unknown) => void 0,
  data: null,
};

import type { User } from 'firebase/auth';

import type { userData } from '@/typings/database';

export const userMock: User | null | undefined = {
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

export const userDataMock: userData | null | undefined = {
  name: 'Laze Project Team',
  avatarURL: 'https://laze.ddns.net/img/logo/logo.png',
  locale: 'ja',
  projects: [],
  createdAt: new Date(),
};

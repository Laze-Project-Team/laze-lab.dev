import type { FC, ReactNode } from 'react';
import { vi } from 'vitest';

import { userDataMock, userMock } from '/__mocks__/user';
import { userInfoContext } from '@/components/contexts/UserInfoContext';

export const syncUserDataMock = vi.fn();

export const UserInfoProvider: FC<{ children?: ReactNode }> = ({
  children,
}) => (
  <userInfoContext.Provider
    value={{
      user: userMock,
      userData: userDataMock,
      syncUserData: syncUserDataMock,
    }}
  >
    {children}
  </userInfoContext.Provider>
);

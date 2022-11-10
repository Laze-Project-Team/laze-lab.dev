import type { FC, ReactNode } from 'react';
import { vi } from 'vitest';

import { mockSWRResponse } from '/__mocks__/swr';
import { userDataMock, userMock } from '/__mocks__/user';
import { userInfoContext } from '@/components/contexts/UserInfoContext';

export const syncUserMock = vi.fn();
export const syncUserDataMock = vi.fn();

export const UserInfoProvider: FC<{ children?: ReactNode }> = ({
  children,
}) => (
  <userInfoContext.Provider
    value={{
      user: mockSWRResponse(userMock),
      userData: mockSWRResponse(userDataMock),
      syncUser: syncUserMock,
      syncUserData: syncUserDataMock,
    }}
  >
    {children}
  </userInfoContext.Provider>
);

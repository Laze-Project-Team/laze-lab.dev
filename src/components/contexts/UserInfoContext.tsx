import type { FC, ReactNode } from 'react';
import { createContext, useContext } from 'react';

import type { userInfo } from '@/components/hooks/useUserInfo';
import { useUserInfoStrictly } from '@/components/hooks/useUserInfo';

export const userInfoContext = createContext<userInfo | null>(null);

export const useUserInfoContext = (): userInfo => {
  const userInfo = useContext(userInfoContext);

  if (userInfo === null) {
    throw new Error('please wrap component with UserInfoProvider');
  }

  return userInfo;
};

export const UserInfoProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const userInfo = useUserInfoStrictly();

  return (
    <userInfoContext.Provider value={userInfo}>
      {children}
    </userInfoContext.Provider>
  );
};

import type { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import type { SWRResponse } from 'swr';
import { mutate } from 'swr';
import useSWRImmutable from 'swr/immutable';

import { pagesPath } from '@/lib/$path';
import { useUserManager } from '@/lib/firebase/user';
import type { userData } from '@/typings/database';

export type baseUserInfo = {
  user: User | null | undefined;
  userData: SWRResponse<userData | null | undefined>;
};

export type userInfo = {
  syncUserData: (data?: userData) => void;
} & baseUserInfo;

/**
 * @description get "User" and "userData" using SWR
 * @return {baseUserInfo}
 */
export const useUserInfo = (): userInfo => {
  const { getUser, fetchUserData } = useUserManager();
  const user = getUser();
  const userData = useSWRImmutable(
    'userData',
    () => user && fetchUserData(user),
  );
  const syncUserData = useCallback(
    (data?: userData) => {
      // update userData when user is changed
      mutate('userData', data ?? (user && fetchUserData(user)));
    },
    [fetchUserData, user],
  );

  useEffect(() => {
    syncUserData();
  }, [syncUserData]);

  return { user, userData, syncUserData };
};

/**
 * @description almost same as useUserInfo but push back to Home when user is not logged in
 * @return {baseUserInfo}
 */
export const useUserInfoStrictly = (): userInfo => {
  const { user, userData, syncUserData } = useUserInfo();

  const { push } = useRouter();
  useEffect(() => {
    // send to home when user is not logged in
    if (user === null) {
      push(pagesPath.$url());
    }
  }, [push, user]);

  return { user, userData, syncUserData };
};

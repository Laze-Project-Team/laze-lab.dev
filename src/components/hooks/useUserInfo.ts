import type { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { SWRResponse } from 'swr';
import { mutate } from 'swr';
import useSWRImmutable from 'swr/immutable';

import { pagesPath } from '@/lib/$path';
import { useUserManager } from '@/lib/firebase/user';
import type { userData } from '@/typings/database';

export type userInfo = {
  user: User | null | undefined;
  userData: SWRResponse<userData | null | undefined>;
};

/**
 * @description get "User" and "userData" using SWR
 * @return {userInfo}
 */
export const useUserInfo = (): userInfo => {
  const { getUser, fetchUserData } = useUserManager();
  const user = getUser();
  const userData = useSWRImmutable(
    'userData',
    () => user && fetchUserData(user),
  );

  useEffect(() => {
    // update userData when user is changed
    mutate('userData', user && fetchUserData(user));
  }, [fetchUserData, user]);

  return { user, userData };
};

/**
 * @description almost same as useUserInfo but push back to Home when user is not logged in
 * @return {userInfo}
 */
export const useUserInfoStrictly = (): userInfo => {
  const { user, userData } = useUserInfo();

  const { push } = useRouter();
  useEffect(() => {
    // send to home when user is not logged in
    if (user === null) {
      push(pagesPath.$url());
    }
  }, [push, user]);

  return { user, userData };
};

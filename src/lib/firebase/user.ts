import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import type { UpdateData } from 'firebase/firestore';
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect } from 'react';
import type { SWRResponse } from 'swr';
import { mutate } from 'swr';
import useSWRImmutable from 'swr/immutable';

import { timestampToDate } from '@/lib/firebase/TimestampToDate';
import { isLocale } from '@/lib/utils/isLocale';
import type { baseUserData, userData } from '@/typings/database';

import { useFirebase } from '.';

export type userManager = {
  getUser: () => SWRResponse<User | null | undefined>;
  syncUser: () => void;
  createUser: (user: User) => Promise<userData>;
  fetchUserData: (user: User) => Promise<userData>;
  updateUserData: (user: User, data: UpdateData<baseUserData>) => Promise<void>;
  updateUserAvatar: (user: User, avatarFile: File) => Promise<void>;
  deleteUser: (user: User) => Promise<void>;
};

export const useUserManager = (): userManager => {
  const { auth, db, storage } = useFirebase();
  const currentUser = useSWRImmutable<User | null | undefined>(
    'currentUser',
    () => auth.currentUser,
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      mutate('currentUser', user);
    });

    return unsubscribe;
  }, [auth]);

  const getUser: userManager['getUser'] = () => {
    return currentUser;
  };

  const syncUser: userManager['syncUser'] = () => {
    mutate('currentUser', undefined);
    mutate('currentUser', auth.currentUser);
  };

  const createUser: userManager['createUser'] = async (user) => {
    const userData: userData = {
      avatarURL: user.photoURL,
      locale: isLocale(auth.languageCode) ? auth.languageCode : 'en',
      name: user.displayName ?? 'user',
      projects: [],
      createdAt: new Date(),
    };

    await setDoc(doc(db, 'users', user.uid), userData);

    return userData;
  };

  const fetchUserData: userManager['fetchUserData'] = async (user) => {
    const snapshot = await getDoc(doc(db, 'users', user.uid));

    if (!snapshot.exists()) {
      return await createUser(user);
    }

    const userData = timestampToDate(snapshot.data()) as userData;

    return userData;
  };

  const updateUserData: userManager['updateUserData'] = async (user, data) => {
    await updateDoc(doc(db, 'users', user.uid), data);
  };

  const updateUserAvatar: userManager['updateUserAvatar'] = async (
    user,
    avatarFile,
  ) => {
    const avatarFileRef = ref(storage, `users/${user.uid}`);

    const { ref: uploadedRef } = await uploadBytes(avatarFileRef, avatarFile);

    const avatarURL = await getDownloadURL(uploadedRef);

    await updateUserData(user, { avatarURL });
  };

  const deleteUser: userManager['deleteUser'] = async (user) => {
    await deleteDoc(doc(db, 'users', user.uid));
  };

  return {
    getUser,
    syncUser,
    createUser,
    fetchUserData,
    updateUserData,
    updateUserAvatar,
    deleteUser,
  };
};

import type { Analytics } from 'firebase/analytics';
import { getAnalytics, isSupported } from 'firebase/analytics';
import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import { initializeApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import {
  getAuth,
  useDeviceLanguage as firebaseUseDeviceLanguage,
} from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import type { FirebasePerformance } from 'firebase/performance';
import { getPerformance } from 'firebase/performance';
import type { FirebaseStorage } from 'firebase/storage';
import { getStorage } from 'firebase/storage';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyAZSNEXg1lQEP_5OufUbJ_wpAxMTcevmio',
  authDomain: 'laze-d339e.firebaseapp.com',
  projectId: 'laze-d339e',
  storageBucket: 'laze-d339e.appspot.com',
  messagingSenderId: '280279659559',
  appId: '1:280279659559:web:a454d4625f5c92fa5a4a02',
  measurementId: 'G-EF2HM3ELZ8',
};

export type firebaseManager = {
  app: FirebaseApp;
  analytics: Promise<Analytics | null>;
  perf: FirebasePerformance | null;
  auth: Auth;
  db: Firestore;
  storage: FirebaseStorage;
};

export const useFirebase = (): firebaseManager => {
  const app = initializeApp(firebaseConfig);

  // Analytics
  const analytics = isSupported().then((supported) => {
    return supported ? getAnalytics(app) : null;
  });

  // Performance
  const perf = typeof window !== 'undefined' ? getPerformance(app) : null;

  // Authentication
  const auth = getAuth();
  firebaseUseDeviceLanguage(auth);

  // Cloud Firestore
  const db = getFirestore(app);

  // Storage
  const storage = getStorage();

  return {
    app,
    analytics,
    perf,
    auth,
    db,
    storage,
  };
};

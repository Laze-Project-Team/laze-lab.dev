import { getAnalytics, isSupported } from 'firebase/analytics';
import type { FirebaseOptions } from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getPerformance } from 'firebase/performance';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyAZSNEXg1lQEP_5OufUbJ_wpAxMTcevmio',
  authDomain: 'laze-d339e.firebaseapp.com',
  projectId: 'laze-d339e',
  storageBucket: 'laze-d339e.appspot.com',
  messagingSenderId: '280279659559',
  appId: '1:280279659559:web:a454d4625f5c92fa5a4a02',
  measurementId: 'G-EF2HM3ELZ8',
};

export const app = initializeApp(firebaseConfig);

// Analytics
export const analytics = isSupported().then((supported) => {
  return supported ? getAnalytics(app) : null;
});

// Performance
export const perf = getPerformance(app);

// Authentication
export const auth = getAuth();

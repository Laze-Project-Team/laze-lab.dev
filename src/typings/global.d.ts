declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: () => boolean;
  }
}

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

export {};

export const getHash = (): string =>
  Date.now().toString(36) + Math.random().toString(36);

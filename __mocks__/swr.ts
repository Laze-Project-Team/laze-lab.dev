import type { SWRResponse } from 'swr';

export const mockSWRResponse = <T>(data: T): SWRResponse<T> => ({
  isValidating: false,
  mutate: async () => void 0,
  data,
});

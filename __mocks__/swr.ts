import type { SWRResponse } from 'swr';
import { vi } from 'vitest';

export const mockSWRResponse = <T>(data: T): SWRResponse<T> => ({
  isValidating: false,
  mutate: vi.fn(),
  data,
});

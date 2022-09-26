import type { useRouter } from 'next/router';
import { beforeEach, vi } from 'vitest';

export const mockRouter = (): void => {
  vi.mock('next/router', () => ({
    useRouter: () => {
      const router: ReturnType<typeof useRouter> = {
        asPath: '/',
        back: vi.fn(),
        basePath: '/',
        beforePopState: vi.fn(),
        events: {
          on: vi.fn(),
          off: vi.fn(),
          emit: vi.fn(),
        },
        isFallback: false,
        isLocaleDomain: false,
        isPreview: false,
        isReady: true,
        locale: 'en',
        locales: ['en'],
        prefetch: vi.fn(),
        push: vi.fn(),
        query: {},
        reload: vi.fn(),
        replace: vi.fn(),
        route: '/',
        pathname: '/',
      };

      return router;
    },
  }));
};

export const mockEachRouter = (): void => {
  beforeEach(() => {
    mockRouter();
  });
};

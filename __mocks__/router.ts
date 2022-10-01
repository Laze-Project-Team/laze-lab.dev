import { beforeEach, vi } from 'vitest';

const router = {
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
} as const;

export const mockRouter = (): typeof router => {
  vi.mock('next/router', () => ({
    useRouter: () => router,
  }));

  return router;
};

export const mockEachRouter = (): typeof router => {
  beforeEach(() => {
    mockRouter();
  });

  return router;
};

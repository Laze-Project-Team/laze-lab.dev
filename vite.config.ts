import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    environment: 'happy-dom', // jsdomの代わりにhappy-domを設定した
    setupFiles: ['./jest.setup.js', './__mocks__/FileList.ts'],
    coverage: {
      provider: 'c8',
    },
  },
});

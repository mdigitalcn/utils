import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    coverage: {
      include: ['src/**/*.ts'],
      exclude: ['src/**/index.ts', 'src/types/**'],
    },
  },
});

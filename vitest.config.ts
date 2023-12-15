import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true, // Run cleanup after each test
    environment: 'jsdom',
    include: ['**/*spec.?(c|m)[jt]s?(x)'],
    exclude: ['node_modules/**'],
    //setupFiles: './src/setupTests.ts',
    coverage: {
      reporter: ['text', 'lcov'],
      exclude: ['node_modules/', 'src/setupTests.js'],
    },
  },
})

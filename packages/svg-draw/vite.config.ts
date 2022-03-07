import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    minify: true,
  },
  build: {
    target: 'esnext',
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      name: '@quiron/svg-draw',
    },
  },
});

import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  esbuild: {
    minify: true,
  },
  build: {
    target: 'esnext',
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      name: '@ekisa-cdk/forms',
      formats: ['es'],
      fileName: 'forms',
    },
  },
  plugins: [dts()],
});

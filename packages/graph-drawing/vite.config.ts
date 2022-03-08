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
      name: '@ekisa-cdk/graph-drawing',
      formats: ['es'],
      fileName: 'graph-drawing',
    },
  },
  plugins: [dts({ copyDtsFiles: false })],
});

import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  return {
    entry: ['src/index.ts'],
    format: ['esm'],
    dts: {
      resolve: true,
    },
    clean: !options.watch,
    minify: !options.watch,
  };
});

import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  declaration: true,
  entries: ['src/index', { input: 'src/plugins/', outDir: 'dist/plugins', format: 'esm' }],
  clean: true,
});

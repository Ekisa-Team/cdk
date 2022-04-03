import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/index', { input: 'src/plugins/', outDir: 'dist/plugins', format: 'esm' }],
  declaration: true,
  clean: true,
});

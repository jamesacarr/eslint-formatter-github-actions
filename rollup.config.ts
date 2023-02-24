import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';
import del from 'rollup-plugin-delete';
import dts from 'rollup-plugin-dts';

import packageJson from './package.json' assert { type: 'json' };

const packageExports = packageJson.exports['.'];

const EXTERNAL_PACKAGES = [
  ...Object.keys(packageJson.dependencies),
  '@actions/core/lib/command',
];

const config = defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageExports.require,
        format: 'cjs',
        sourcemap: true,
        exports: 'auto',
      },
      {
        file: packageExports.import,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      del({ targets: 'dist' }),
      typescript({
        tsconfig: './tsconfig.json',
        include: ['src/**/*.ts'],
        exclude: ['dist', 'scripts'],
      }),
    ],
    external: EXTERNAL_PACKAGES,
  },
  // Run a second build to combine the *.d.ts files, so that only the necessary
  // types are defined.
  {
    input: 'dist/types/index.d.ts',
    output: [
      {
        file: packageExports.types,
        format: 'esm',
      },
    ],
    plugins: [dts(), del({ targets: 'dist/types', hook: 'buildEnd' })],
  },
]);

export default config;

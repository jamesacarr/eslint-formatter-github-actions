/**
 * @type {import('eslint').Linter.BaseConfig}
 */
module.exports = {
  root: true,
  extends: ['xo-space', 'plugin:unicorn/recommended', 'prettier'],
  plugins: ['import'],
  env: {
    es2021: true,
    node: true,
  },
  ignorePatterns: ['**/node_modules/**', 'coverage/**', 'dist/**'],
  rules: {
    'import/default': 'error',
    'import/export': 'error',
    'import/first': 'error',
    'import/named': 'error',
    'import/namespace': ['error', { allowComputed: true }],
    'import/newline-after-import': 'error',
    'import/no-absolute-path': 'error',
    'import/no-amd': 'error',
    'import/no-anonymous-default-export': 'error',
    'import/no-cycle': ['error', { ignoreExternal: true }],
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default-member': 'error',
    'import/no-named-as-default': 'error',
    'import/no-named-default': 'error',
    'import/no-self-import': 'error',
    'import/no-unassigned-import': 'error',
    'import/no-unresolved': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        'newlines-between': 'always',
      },
    ],

    'no-warning-comments': 'off',
  },
  overrides: [
    {
      files: ['**/*.ts'],
      // Need to extend from eslint-config-prettier again, so that it disables
      // rules that conflict with prettier
      extends: ['xo-typescript/space', 'prettier'],
      rules: {
        // We're overwriting this rule because eslint-config-xo-typescript is
        // very opinionated about the `null` type i.e. it thinks they shouldn't
        // be used - ever. While there are some good points (see: https://github.com/sindresorhus/meta/issues/7)
        // it's not exactly practical in our app. Maybe we can consider
        // migrating our code to be more compatible in the future.
        '@typescript-eslint/ban-types': [
          'error',
          {
            extendDefaults: false,
            types: {
              String: {
                message: 'Use `string` instead.',
                fixWith: 'string',
              },
              Number: {
                message: 'Use `number` instead.',
                fixWith: 'number',
              },
              Boolean: {
                message: 'Use `boolean` instead.',
                fixWith: 'boolean',
              },
              Symbol: {
                message: 'Use `symbol` instead.',
                fixWith: 'symbol',
              },
              Object: {
                message:
                  'The `Object` type is mostly the same as `unknown`. You probably want `Record<string, unknown>` instead. See https://github.com/typescript-eslint/typescript-eslint/pull/848',
                fixWith: 'Record<string, unknown>',
              },
              '{}': {
                message:
                  'The `{}` type is mostly the same as `unknown`. You probably want `Record<string, unknown>` instead.',
                fixWith: 'Record<string, unknown>',
              },
              object: {
                message:
                  'The `object` type is hard to use. Use `Record<string, unknown>` instead. See: https://github.com/typescript-eslint/typescript-eslint/pull/848',
                fixWith: 'Record<string, unknown>',
              },
              Function:
                'Use a specific function type instead, like `() => void`.',
              '[]': "Don't use the empty array type `[]`. It only allows empty arrays. Use `SomeType[]` instead.",
              '[[]]':
                "Don't use `[[]]`. It only allows an array with a single element which is an empty array. Use `SomeType[][]` instead.",
              '[[[]]]': "Don't use `[[[]]]`. Use `SomeType[][][]` instead.",
            },
          },
        ],

        '@typescript-eslint/consistent-type-definitions': [
          'error',
          'interface',
        ],

        // While this would be a great rule to leave on, it's a bit too strict for
        // our use cases e.g. top-level const variables must be camelCase, rather
        // than UPPER_CASE.
        '@typescript-eslint/naming-convention': 'off',
      },
    },
  ],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
};

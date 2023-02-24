module.exports = {
  arrowParens: 'avoid', // This was changed to 'always' in prettier 2.0.0
  bracketSpacing: true,
  endOfLine: 'auto', // This was changed to 'lf' in prettier 2.0.0
  singleQuote: true,
  trailingComma: 'es5',
  overrides: [
    {
      files: '*.yml',
      options: {
        singleQuote: false,
      },
    },
  ],
};

module.exports = {
  endOfLine: 'auto',
  overrides: [
    {
      files: '.prettierrc',
      options: { parser: 'json' },
    },
    {
      files: 'document.ejs',
      options: {
        parser: 'html',
      },
    },
  ],
  printWidth: 150,
  singleQuote: true,
  trailingComma: 'all',
};

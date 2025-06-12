const prettier = require('eslint-plugin-prettier')

module.exports = [
  // ESLint 推薦的規則
  {
    languageOptions: {
      globals: {
        node: true,
        es6: true,
      },
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'no-var': 'error',
      'prefer-const': 'warn',
    },
  },
  // Prettier 規則
  {
    plugins: {
      prettier: prettier,
    },
    rules: {
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    },
  },
]

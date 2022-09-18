module.exports = {
  env: {
    es2021: true,
  },
  plugins: ['eslint-plugin-testing-library', 'jest-dom'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'google',
    'prettier',
    'plugin:jest-dom/recommended',
    'plugin:storybook/recommended',
  ],
  rules: {
    'require-jsdoc': ['off'],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    '@next/next/no-img-element': ['off'],
    'react/no-unknown-property': [
      'error',
      {
        ignore: ['css'],
      },
    ],
  },
};

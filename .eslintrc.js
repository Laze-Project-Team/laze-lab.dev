module.exports = {
  env: {
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: [
    'eslint-plugin-testing-library',
    'jest-dom',
    'react-hooks',
    'react',
    '@typescript-eslint',
    'import',
    'simple-import-sort',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next',
    'next/core-web-vitals',
    'google',
    'prettier',
    'plugin:jest-dom/recommended',
    'plugin:storybook/recommended',
  ],
  rules: {
    'require-jsdoc': ['off'],
    '@next/next/no-img-element': ['off'],
    'react/no-unknown-property': [
      'error',
      {
        ignore: ['css'],
      },
    ],
    'no-console': ['warn', { allow: ['warn', 'info', 'error'] }],
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'func-style': ['error', 'expression'],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'error',
    'react/no-unused-prop-types': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/newline-after-import': 'error',
    'import/no-default-export': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      { prefer: 'type-imports' },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ], // 未使用変数はエラー
  },
  overrides: [
    {
      files: ['src/pages/**/*.{js,ts,jsx,tsx}'], // pagesのdefault exportは仕方ないので除外
      rules: { 'import/no-default-export': 'off' },
    },
  ],
};

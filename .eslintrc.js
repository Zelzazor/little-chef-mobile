module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'standard-with-typescript',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-native'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  env: {
    'react-native/react-native': true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react-native/no-unused-styles': 'warn',
    'react-native/no-inline-styles': 'off',
    'react-native/no-raw-text': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    'react/no-unstable-nested-components': 'off',
    'react-native/no-single-element-style-arrays': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/require-array-sort-compare': [
      'error',
      {
        ignoreStringArrays: true,
      },
    ],
    'eol-last': ['error', 'always'],
    'no-multiple-empty-lines': 'error',
    indent: ['error', 2],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
  },
};

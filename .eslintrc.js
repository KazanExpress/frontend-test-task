// TSLint is deprecated and should not be used
// btw i failed to configure *prettier* without spending the amount time
// that would ultimately defaeat the purpose
module.exports = {
  root: true,
  env: {
    // node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
    '@vue/typescript/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',

    // '@vue/prettier',
    // '@vue/prettier/@typescript-eslint',
  ],

  plugins: ['import'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
  },
  rules: {
    '@typescript-eslint/member-delimiter-style': [
      2,
      {
        multiline: {
          delimiter: 'none',
          requireLast: true,
        },
        singleline: {
          requireLast: false,
        },
      },
    ],
    // You should never use default export. Really
    'import/prefer-default-export': 0,
    'linebreak-style': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-shadow': [0],
    'no-underscore-dangle': 0,
    'no-unused-expressions':
      process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: [2, 'never'],
    'vue/component-tags-order': [
      2,
      {
        order: ['docs', 'template', 'script', 'style'],
      },
    ],
    'operator-linebreak': 0,
    'class-methods-use-this': 0,
    'max-classes-per-file': 0,
    'comma-dangle': [
      2,
      {
        arrays: 'only-multiline',
        objects: 'only-multiline',
        imports: 'only-multiline',
        exports: 'only-multiline',
        functions: 'only-multiline',
      },
    ],
    'no-multi-assign': 0,
    'no-plusplus': 0,
    '@typescript-eslint/no-this-alias': 0,
    'semi-style': ['error', 'first'],
    'object-curly-newline': ['error', { consistent: true }],
  },
}

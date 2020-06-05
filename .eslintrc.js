module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  rules: {
    'arrow-body-style': 'off',
    'no-underscore-dangle': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-use-before-define': ['error', { variables: false }],
    'react/prop-types': 'off', // add proptypes at a later time
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-one-expression-per-line': 'off',
    'react/destructuring-assignment': 'off',
    'no-else-return': 'off',
    'max-len': 'off',
    'prefer-destructuring': 'off',
    'object-curly-newline': 'off',
    'prefer-template': 'off',
    'quote-props': 'off',
    'operator-linebreak': ['error', 'after'],
    'react/jsx-curly-brace-presence': 'off',
    'react/require-default-props': 'off',
    'react/sort-comp': 'off',
    'import/no-cycle': 'off',
    'no-console': 'off',
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
  },
  overrides: [
    {
      files: ['e2e/*.js', 'wdio/*.js', 'wdio/**/*.js', '**/**/__tests__/*.js'],
      rules: {
        'no-undef': 'off',
      },
    },
    {
      files: ['wdio/*.conf.js'],
      rules: {
        'no-unused-vars': 'off',
        'global-require': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
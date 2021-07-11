module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended', // recommended rules for react
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended', // react-hooks recommended rules
        'prettier', // disable formatting in eslint instead uses prettier
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'prettier', 'react-hooks'],
    rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
        'no-use-before-define': 'off', // turned OFF this rule and enable the next one due to a bug, check - https://stackoverflow.com/a/64024916/7181668
        '@typescript-eslint/no-use-before-define': ['error'],
        'prettier/prettier': 'error',
        'no-console': 'warn',
        'no-eval': 'error',
    },
}

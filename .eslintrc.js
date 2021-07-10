module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
    ],
    rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
        'no-use-before-define': 'off', // turned OFF this rule and enable the next one due to a bug, check - https://stackoverflow.com/a/64024916/7181668
        '@typescript-eslint/no-use-before-define': ['error'],
        indent: ['error', 4],
    },
};

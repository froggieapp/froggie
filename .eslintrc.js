/* eslint-env node */
module.exports = {
    extends: [
        "prettier",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended"
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['prettier', '@typescript-eslint'],
    root: true,
    rules: {
        "prettier/prettier": ["error"]
    },
};
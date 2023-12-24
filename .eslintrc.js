/* eslint-env node */
module.exports = {
    extends: [
        "prettier",
        "eslint:recommended",
        "preact",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:storybook/recommended"
    ],
    "env": {
        "browser": true,
        "es2021": true
    },
    parser: '@typescript-eslint/parser',
    plugins: ['prettier', '@typescript-eslint', "react-perf"],
    root: true,
    rules: {
        "prettier/prettier": ["error"],
        "no-console": ["error", { "allow": ["error", "warn"]}],
        "react/prop-types": 0 
    },
    settings: {
        react: {
          version: "detect",
         "fragment": "Fragment",
         "pragma": "h",
        }
     },
     "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "ecmaFeatures": {
          "jsx": true
        }
      }
};
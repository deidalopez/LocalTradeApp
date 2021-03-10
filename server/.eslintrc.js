module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        'keyword-spacing': 'error',
        'linebreak-style': ['error', 'unix'],
        'no-undef': 0,
        'no-unsued-vars': 0,
        'quotes': ['error', 'single'],
        'react/prop-types': 0,
        'react/display-name': 0,
        'semi': ['error', 'always'],
        'space-before-blocks': 'error',
        'space-before-function-paren': 'error'
    }
};

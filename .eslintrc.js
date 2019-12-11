module.exports = {
    root: true,
    extends: '@react-native-community',
    'env': {
        'es6': true,
        'node': true,
        'jasmine': true,
    },
    'extends': ['eslint:recommended', "plugin:react/recommended"],
    "plugins": [
        "react-hooks"
    ],
    "parser": "babel-eslint",
    'parserOptions': {
        "sourceType": "module"
    },
    'rules': {
        'no-else-return': 'error',
        'no-multi-spaces': 'error',
        'no-whitespace-before-property': 'error',
        'camelcase': 'error',
        'new-cap': 'error',
        "no-console": "off",
        'comma-dangle': 0,
        'no-var': 'error',
        "react/prop-types": 0,
        'indent': ['error', 4, {'SwitchCase': 1}],
        'quotes': [
            'error',
            'single',
        ],
        'semi': [
            'error',
            'always',
        ],
        "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
        "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
    },
};

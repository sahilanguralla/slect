module.exports = {
    extends: ['airbnb-base', 'prettier'],
    env: {
        browser: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
    },
    rules: {
        'no-console': 'off',
        'no-underscore-dangle': 0,
        'no-param-reassign': [
            'error',
            {
                props: false
            }
        ],
        'prettier/prettier': [
            'error',
            {
                singleQuote: true
            }
        ],
        'import/prefer-default-export': 0,
        'no-case-declarations': 0,
        'no-loop-func': 0,
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never'
            }
        ],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    'webpack/*.js',
                    '**/*.test.js',
                    '**/*.spec.js'
                ]
            }
        ]
    },
    settings: {
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true
            }
        }
    },
    plugins: ['@typescript-eslint', 'prettier'],
    overrides: [
        {
            files: ['**/*.ts'],
            parser: '@typescript-eslint/parser',
            rules: {
                'no-undef': 'off',
                'no-unused-vars': 'off'
            }
        }
    ]
};

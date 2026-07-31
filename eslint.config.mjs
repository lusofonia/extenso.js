// @ts-check
import tseslint from 'typescript-eslint'

export default tseslint.config(
    {
        rules: {
            'comma-dangle': ['error', 'always-multiline'],
            'eol-last': ['error', 'always'],
            'func-style': ['error', 'expression'],
            'indent': ['error', 4],
            'keyword-spacing': ['error', { before: true, after: true }],
            'max-lines': ['error', { 'max': 300, 'skipBlankLines': true, 'skipComments': true }],
            'no-implicit-globals': 'error',
            'no-trailing-spaces': 'error',
            'no-unused-vars': 'error',
            'no-var': 'error',
            'prefer-const': ['error', { 'ignoreReadBeforeAssign': true }],
            'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
            'semi': ['error', 'never'],
            'space-before-blocks': ['error', 'always'],
            'space-before-function-paren': ['error', 'never'],
            'space-in-parens': ['error', 'never'],
            'strict': 'error',
        },
    },
    tseslint.configs.strict,
    tseslint.configs.stylistic,
)

import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
    includeIgnoreFile(gitignorePath),
    js.configs.recommended,
    ...ts.configs.recommended,
    ...svelte.configs.recommended,
    {
        languageOptions: {
            globals: { ...globals.browser, ...globals.node }
        },
        rules: { // typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
            // see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
            "no-undef": 'off',
            "brace-style": [
                "error",
                "allman"
            ],
            "array-bracket-newline": [
                "error",
                { "minItems": 2 }
            ],
            "array-element-newline": [
                "error",
                { "minItems": 2 }
            ],
            "object-curly-spacing": [
                "error",
                "always"
            ],
            "indent": [
                "error",
                4,
                {
                    "SwitchCase": 1,
                    "outerIIFEBody": 1,
                    "FunctionDeclaration": {
                        "parameters": "first",
                        "body": 1
                    },
                    "FunctionExpression": {
                        "parameters": "first",
                        "body": 1
                    },
                    "CallExpression": {
                        "arguments": "first"
                    },
                    "ignoredNodes": ["TemplateLiteral *"],
                    "flatTernaryExpressions": false,
                    "ignoreComments": false
                }
            ]
        }
    },
    {
        files: [
            '**/*.svelte',
            '**/*.svelte.ts',
            '**/*.svelte.js'
        ],
        languageOptions: {
            parserOptions: {
                projectService: true,
                extraFileExtensions: ['.svelte'],
                parser: ts.parser,
                svelteConfig
            },
        }
    }
);

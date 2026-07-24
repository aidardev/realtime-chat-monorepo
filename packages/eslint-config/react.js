import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import { config as baseConfig } from './base.js';

export const config = [
    ...baseConfig,

    {
        settings: {
            react: {
                version: 'detect',
            },
        },
    },

    pluginReact.configs.flat.recommended,
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,

    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.serviceworker,
            },
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        },
    },
];

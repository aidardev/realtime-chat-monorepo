import globals from 'globals';
import { config as baseConfig } from './base.js';

export const config = [
    ...baseConfig,
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
];

/// <reference types="vitest" />
import { svelte } from '@sveltejs/vite-plugin-svelte';
import * as path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [svelte()],
    test: {
        environment: 'jsdom',
        globals: true,
        include: ['src/Tests/**/*.{spec,test}.ts'],
        setupFiles: [],
    },
    resolve: {
        alias: {
            '@application': path.resolve(__dirname, './src/Application'),
            '@domain': path.resolve(__dirname, './src/Domain'),
            '@framework': path.resolve(__dirname, './src/Framework'),
            '@infrastructure': path.resolve(__dirname, './src/Infrastructure'),
            '@persistence': path.resolve(__dirname, './src/Persistence'),
            '@presentation': path.resolve(__dirname, './src/Presentation'),
            '@cli': path.resolve(__dirname, './src/Presentation/CLI'),
            '@tests': path.resolve(__dirname, './src/Tests'),
        },
    },
});

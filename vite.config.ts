import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import * as path from "node:path";
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        svelte(),
        tailwindcss()
    ],
    resolve: {
        alias: {
            '@application': path.resolve(__dirname, './src/Application'),
            '@domain': path.resolve(__dirname, './src/Domain'),
            '@svelte': path.resolve(__dirname, './src/Svelte'),
            '@infrastructure': path.resolve(__dirname, './src/Infrastructure'),
            '@persistence': path.resolve(__dirname, './src/Persistence'),
            '@presentation': path.resolve(__dirname, './src/Presentation'),
            '@cli': path.resolve(__dirname, './src/Presentation/CLI'),
            '@tests': path.resolve(__dirname, './src/Tests'),
        },
    },
})
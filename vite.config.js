import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import { wayfinder } from "@laravel/vite-plugin-wayfinder";

export default defineConfig({
    plugins: [
        wayfinder({
            base: process.env.VITE_APP_URL || 'http://localhost:5173', // Use APP_URL or a fallback
        }),

        laravel({
            input: 'resources/js/app.js',
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
});

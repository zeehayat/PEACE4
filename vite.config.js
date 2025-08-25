import { defineConfig, loadEnv } from 'vite'; // Import loadEnv
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import { wayfinder } from "@laravel/vite-plugin-wayfinder";


export default defineConfig(({ command, mode }) => { // Add command and mode
    const env = loadEnv(mode, process.cwd(), ''); // Load all environment variables

    return {
        plugins: [
            wayfinder({
                base: env.VITE_APP_URL || 'http://localhost:5173', // Use env.VITE_APP_URL
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
    };
});

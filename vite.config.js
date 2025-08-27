import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import { wayfinder } from "@laravel/vite-plugin-wayfinder";

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    // Log the VITE_APP_URL to check its value
    console.log('VITE_APP_URL:', env.VITE_APP_URL);

    return {
        // Explicitly set the base URL to use HTTPS
        base: env.VITE_APP_URL || 'https://peace.zeehayat.com',

        plugins: [
            wayfinder({
                base: env.VITE_APP_URL || 'https://peace.zeehayat.com',
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

import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/laravel/jetstream/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Manrope', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: '#11d45f',
                'background-light': '#f6f8f7',
                'background-dark': '#102217',
                'surface-dark': '#1c2720',
                'surface-light': '#ffffff',
            },
            boxShadow: {
                'soft-lg': '0 20px 60px -25px rgba(0,0,0,0.25)',
            },
        },
    },

    plugins: [forms, typography,

    ],
};

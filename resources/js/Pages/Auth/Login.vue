<template>
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-indigo-200 p-4">
        <div class="w-full max-w-md mx-auto">

            <div class="text-center mb-8 animate-fade-in-down">
                <h1 class="text-4xl font-extrabold text-indigo-800">SRSP Peace 2 MIS</h1>
                <p class="text-indigo-600 mt-2">Management Information System</p>
            </div>

            <div class="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 transform transition-all duration-500 ease-in-out animate-fade-in-scale">
                <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>

                <form @submit.prevent="submit">
                    <div class="mb-4 relative">
                        <label for="email" class="block text-sm font-medium text-gray-600 sr-only">Email</label>
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M3 4a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2H3zm12 2.293l-5.293 5.293a1 1 0 01-1.414 0L3.707 6.293A.997.997 0 014 6h12a.997.997 0 01.293.293z" />
                            </svg>
                        </div>
                        <input
                            id="email"
                            v-model="form.email"
                            type="email"
                            placeholder="Email Address"
                            class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm pl-10 py-3 focus:border-indigo-500 focus:ring-indigo-500 transition duration-150 ease-in-out"
                            :disabled="form.processing"
                        />
                        <div v-if="form.errors.email" class="text-red-500 text-sm mt-1">{{ form.errors.email }}</div>
                    </div>

                    <div class="mb-6 relative">
                        <label for="password" class="block text-sm font-medium text-gray-600 sr-only">Password</label>
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <input
                            id="password"
                            v-model="form.password"
                            type="password"
                            placeholder="Password"
                            class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm pl-10 py-3 focus:border-indigo-500 focus:ring-indigo-500 transition duration-150 ease-in-out"
                            :disabled="form.processing"
                        />
                        <div v-if="form.errors.password" class="text-red-500 text-sm mt-1">{{ form.errors.password }}</div>
                    </div>

                    <button
                        type="submit"
                        class="w-full flex justify-center items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-transform duration-150 ease-in-out disabled:opacity-75 disabled:cursor-not-allowed"
                        :disabled="form.processing"
                    >
                        <svg v-if="form.processing" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>{{ form.processing ? 'Logging In...' : 'Login' }}</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useForm } from '@inertiajs/vue3';

// The form logic remains the same
const form = useForm({
    email: '',
    password: '',
});

const submit = () => {
    form.post('/login');
};
</script>

<style>
/* Add these animations to your global CSS file or in a <style> tag */
@keyframes fadeInScale {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in-scale {
    animation: fadeInScale 0.5s ease-out forwards;
}

.animate-fade-in-down {
    animation: fadeInDown 0.5s ease-out forwards;
}
</style>

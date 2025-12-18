<script setup>
import { useForm } from '@inertiajs/vue3';

const form = useForm({
    email: '',
    password: '',
});

const submit = () => {
    form.post('/login');
};
</script>

<template>
    <div class="min-h-screen bg-background-light text-gray-900">
        <div class="relative grid min-h-screen grid-cols-1 lg:grid-cols-2">
            <!-- Left: Form -->
            <div class="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-16">
                <div class="mx-auto w-full max-w-md space-y-8">
                    <div class="flex items-center gap-3">
                        <div class="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/15 text-primary">
                            <span class="material-symbols-outlined text-3xl">spa</span>
                        </div>
                        <div>
                            <p class="text-xs uppercase tracking-wide text-gray-500">SRSP PEACE 2</p>
                            <h1 class="text-2xl font-bold">Management Information System</h1>
                        </div>
                    </div>

                    <div class="space-y-2">
                        <h2 class="text-3xl font-bold">Welcome back</h2>
                        <p class="text-sm text-gray-600">Sign in to continue to your dashboard.</p>
                    </div>

                    <form @submit.prevent="submit" class="space-y-6">
                        <div class="space-y-2">
                            <label for="email" class="text-sm font-semibold text-gray-800">Email address</label>
                            <div class="relative">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                    <span class="material-symbols-outlined text-lg">mail</span>
                                </div>
                                <input
                                    id="email"
                                    v-model="form.email"
                                    type="email"
                                    placeholder="name@peacemis.com"
                                    class="w-full pl-10 pr-3 py-3"
                                    :disabled="form.processing"
                                />
                            </div>
                            <div v-if="form.errors.email" class="text-red-500 text-sm">{{ form.errors.email }}</div>
                        </div>

                        <div class="space-y-2">
                            <label for="password" class="text-sm font-semibold text-gray-800">Password</label>
                            <div class="relative">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                    <span class="material-symbols-outlined text-lg">lock</span>
                                </div>
                                <input
                                    id="password"
                                    v-model="form.password"
                                    type="password"
                                    placeholder="Enter your password"
                                    class="w-full pl-10 pr-3 py-3"
                                    :disabled="form.processing"
                                />
                            </div>
                            <div v-if="form.errors.password" class="text-red-500 text-sm">{{ form.errors.password }}</div>
                        </div>

                        <button
                            type="submit"
                            class="btn-primary w-full justify-center py-3 text-base disabled:opacity-75"
                            :disabled="form.processing"
                        >
                            <svg v-if="form.processing" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>{{ form.processing ? 'Logging In...' : 'Login' }}</span>
                        </button>
                    </form>

                    <div class="flex items-center gap-2 text-xs text-gray-500">
                        <span class="h-px flex-1 bg-gray-200"></span>
                        <span>Protected environment</span>
                        <span class="h-px flex-1 bg-gray-200"></span>
                    </div>
                </div>
            </div>

            <!-- Right: Visual Panel -->
            <div class="relative hidden lg:block">
                <div class="absolute inset-0 bg-gradient-to-br from-[#0f2a1b] via-[#123622] to-[#0c1f15]">
                    <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-30"></div>
                </div>
                <div class="relative flex h-full flex-col justify-between p-10 text-white">
                    <div class="space-y-4">
                        <p class="text-sm uppercase tracking-[0.2em] text-primary">SRSP</p>
                        <h3 class="text-3xl font-bold leading-tight">Data-driven insights for sustainable irrigation & energy projects.</h3>
                        <p class="text-sm text-gray-200 max-w-md">
                            Stitch-inspired interface with focused workflows, clear milestones, and crisp reporting.
                        </p>
                    </div>
                    <div class="grid grid-cols-3 gap-4 w-full max-w-xl">
                        <div class="rounded-xl bg-white/10 p-4 backdrop-blur border border-white/10">
                            <p class="text-xs text-gray-200">Active Schemes</p>
                            <p class="mt-2 text-2xl font-semibold">128</p>
                        </div>
                        <div class="rounded-xl bg-white/10 p-4 backdrop-blur border border-white/10">
                            <p class="text-xs text-gray-200">Communities</p>
                            <p class="mt-2 text-2xl font-semibold">46</p>
                        </div>
                        <div class="rounded-xl bg-white/10 p-4 backdrop-blur border border-white/10">
                            <p class="text-xs text-gray-200">On-time Delivery</p>
                            <p class="mt-2 text-2xl font-semibold">94%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

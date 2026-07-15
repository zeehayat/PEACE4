<script setup>
defineProps({
    userName: { type: String, default: null },
});
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-paper-50 px-6">
        <div class="max-w-md w-full text-center bg-surface border border-ink-200 rounded-2xl shadow-sm p-10">
            <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600">
                <span class="material-symbols-outlined text-5xl">block</span>
            </div>
            <h1 class="text-2xl font-bold text-ink-900 mb-3">Access Denied</h1>
            <p class="text-sm text-ink-600 leading-relaxed mb-8">
                <span v-if="userName" class="font-semibold text-ink-800">{{ userName }}</span><span v-if="userName">, y</span><span v-else>Y</span>ou don't have access to this resource. Please contact the Administrator for access rights.
            </p>
            <a
                href="/dashboard"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-600 text-white text-sm font-semibold hover:bg-accent-700 transition"
            >
                <span class="material-symbols-outlined text-lg">home</span>
                Back to Dashboard
            </a>
        </div>
    </div>
</template>

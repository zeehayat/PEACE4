<template>
    <div class="flex flex-col space-y-1">
        <label v-if="label" :for="id" class="font-medium text-sm text-ink-700">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
            <span
                v-if="help"
                :title="help"
                class="ml-1 inline-flex h-4 w-4 cursor-help items-center justify-center rounded-full bg-ink-100 text-xs text-ink-500"
                aria-hidden="true"
            >i</span>
        </label>
        <slot />
        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
    </div>
</template>

<script setup>
defineProps({
    id: String,
    label: String,
    required: Boolean,
    error: String,
    help: String,
})
</script>

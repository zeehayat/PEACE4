<template>
    <div class="flex flex-col space-y-1">
        <label v-if="label" class="font-medium text-sm text-gray-700">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>
        <slot />
        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
    </div>
</template>

<script setup>
defineProps({
    label: String,
    required: Boolean,
    error: String
})
</script>

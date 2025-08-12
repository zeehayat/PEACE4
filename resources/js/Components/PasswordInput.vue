<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        default: () => `password-input-${Math.random().toString(36).substr(2, 9)}`,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:modelValue']);

const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});
</script>

<template>
    <div class="relative">
        <input
            :id="id"
            ref="input"
            type="password"
            :value="modelValue"
            @input="emit('update:modelValue', $event.target.value)"
            class="block w-full px-4 py-2.5 rounded-lg border-gray-300 bg-white text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200"
            :disabled="disabled"
        />
        <!-- You could add a toggle for visibility here later if needed -->
    </div>
</template>

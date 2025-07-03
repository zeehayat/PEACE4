<script setup>
import { ref, watch } from 'vue'
import DatePickerLib from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'

const props = defineProps({
    modelValue: String,
    label: String,
    name: String,
    placeholder: {
        type: String,
        default: 'Select a date'
    },
    error: String,
})

const emit = defineEmits(['update:modelValue'])

const internal = ref(props.modelValue || null)

watch(() => props.modelValue, val => {
    internal.value = val
})

watch(internal, val => {
    emit('update:modelValue', val)
})
</script>

<template>
    <div class="space-y-1">
        <label v-if="label" class="font-medium text-gray-600">{{ label }}</label>
        <DatePickerLib
            v-model="internal"
            type="date"
            format="YYYY-MM-DD"
            input-class="input"
            :placeholder="placeholder"
        />
        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
    </div>
</template>

<style scoped>
.input {
    @apply w-full border border-gray-300 rounded px-2 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-sm;
}

/* override inner datepicker popper */
:deep(.mx-datepicker) {
    z-index: 50;
    font-size: 0.875rem;
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
:deep(.mx-calendar) {
    border: none;
}
:deep(.mx-input) {
    @apply w-full border border-gray-300 rounded px-2 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-sm;
}
</style>

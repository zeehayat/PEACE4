<script setup>
import { ref, watch, onMounted } from 'vue'
import DatePickerLib from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'

const props = defineProps({
    modelValue: [String, Date], // Allow both String and Date types for flexibility
    label: String,
    name: String,
    placeholder: {
        type: String,
        default: 'Select a date'
    },
    error: String,
})

const emit = defineEmits(['update:modelValue'])

// Helper function to convert various date inputs to YYYY-MM-DD string
const formatToYYYYMMDD = (dateInput) => {
    if (!dateInput) return null; // Handle null, undefined, or empty string

    let date;
    if (dateInput instanceof Date) {
        date = dateInput; // Already a Date object
    } else {
        // Attempt to parse string. Date constructor can handle ISO strings.
        date = new Date(dateInput);
    }

    if (isNaN(date.getTime())) return null; // Check if date is valid (e.g., if parsing failed)

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Initialize the internal value with the formatted prop.
// This ensures the date picker receives a correctly formatted string on first render.
const internal = ref(formatToYYYYMMDD(props.modelValue));

// Watch for changes in the `modelValue` prop from the parent component.
// This keeps the date picker synchronized if the parent updates the date programmatically.
watch(() => props.modelValue, (newVal) => {
    internal.value = formatToYYYYMMDD(newVal);
});

// Watch for changes in the internal value (from user interaction with the date picker).
// This emits the updated date back to the parent in the consistent YYYY-MM-DD format.
watch(internal, (newVal) => {
    // newVal from vue-datepicker-next might be a Date object or null
    emit('update:modelValue', formatToYYYYMMDD(newVal));
});

// Optional: For debugging or ensuring component is mounted
onMounted(() => {
    // console.log('DatePicker mounted, initial internal value:', internal.value);
});
</script>

<template>
    <div class="space-y-1">
        <label v-if="label" class="font-medium text-gray-600">{{ label }}</label>
        <DatePickerLib
            v-model:value="internal"           type="date"
            format="YYYY-MM-DD"                value-type="YYYY-MM-DD"            :input-class="['input-compact']"   :placeholder="placeholder"
        />
        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
    </div>
</template>

<style scoped>
/* Scoped styles for DatePicker component */
.input-compact {
    @apply appearance-none block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm;
}

/* Deep selectors to target internal elements of vue-datepicker-next for consistent styling */
:deep(.mx-datepicker) {
    z-index: 50; /* Ensure it appears above other elements if in a modal */
    font-size: 0.875rem; /* Matches sm:text-sm */
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for the popover */
}
:deep(.mx-calendar) {
    border: none; /* Remove default calendar border */
}
:deep(.mx-input) {
    /* Apply existing input-compact styles to the internal input element */
    @apply appearance-none block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm;
}
</style>

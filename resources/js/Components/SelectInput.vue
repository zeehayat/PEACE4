<script setup>
import { computed } from 'vue';

const props = defineProps({
    // The v-model value. Can be a String/Number for single select or an Array for multi-select.
    modelValue: [String, Number, Array],

    // The list of options to display.
    options: {
        type: [Array, Object],
        required: true,
    },

    // In UserForm.vue, you use 'name' for the label and 'id' or 'name' for the value.
    // These props make the component flexible enough to handle that.
    optionLabel: {
        type: String,
        default: 'label', // The key for the option text when options are objects.
    },
    optionValue: {
        type: String,
        default: 'value', // The key for the option value when options are objects.
    },

    // **This is the missing prop**. It determines if multiple selections are allowed.
    multiple: {
        type: Boolean,
        default: false,
    },

    id: String,
    autocomplete: String,
});

const emit = defineEmits(['update:modelValue']);

// This event handler now correctly supports both single and multiple select modes.
const handleChange = (event) => {
    if (props.multiple) {
        // For multi-select, we gather all selected options and emit an array of their values.
        const selectedValues = Array.from(event.target.selectedOptions).map(option => option.value);
        emit('update:modelValue', selectedValues);
    } else {
        // For single-select, we just emit the single value as before.
        emit('update:modelValue', event.target.value);
    }
};

// A helper to determine if the options are objects (e.g., {id: 1, name: 'Admin'})
// or primitive values (e.g., ['Admin', 'User']).
const isObjectOptions = computed(() => {
    return props.options.length > 0 && typeof props.options[0] === 'object' && props.options[0] !== null;
});
</script>

<template>
    <select
        :id="id"
        :value="modelValue"
        @change="handleChange"
        :multiple="multiple"
        class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
        :autocomplete="autocomplete"
    >
        <option v-if="!multiple && !modelValue" value="" disabled>Select an option</option>

        <template v-if="isObjectOptions">
            <option
                v-for="option in options"
                :key="option[optionValue]"
                :value="option[optionValue]"
            >
                {{ option[optionLabel] }}
            </option>
        </template>
        <template v-else>
            <option v-for="option in options" :key="option" :value="option">
                {{ option }}
            </option>
        </template>
    </select>
</template>

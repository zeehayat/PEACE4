<script setup>
import { computed } from 'vue';

const props = defineProps({
    modelValue: [String, Number], // Can be string or number for selected value
    options: {
        type: [Array, Object], // Can be an array of strings/numbers or an array of { value: ..., label: ... } objects
        required: true,
    },
    id: String, // For accessibility
    autocomplete: String, // For browser autocomplete hints
});

const emit = defineEmits(['update:modelValue']);

const isOptionObject = computed(() => {
    return props.options.length > 0 && typeof props.options[0] === 'object' && props.options[0] !== null && 'value' in props.options[0] && 'label' in props.options[0];
});

const onInput = (event) => {
    emit('update:modelValue', event.target.value);
};
</script>

<template>
    <select
        :id="id"
        :value="modelValue"
        @change="onInput"
        class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
        :autocomplete="autocomplete"
    >
        <option value="" disabled selected v-if="!modelValue">Select an option</option>
        <template v-for="option in options" :key="isOptionObject ? option.value : option">
            <option :value="isOptionObject ? option.value : option">
                {{ isOptionObject ? option.label : option }}
            </option>
        </template>
    </select>
</template>

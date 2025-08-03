<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { debounce } from 'lodash';
import axios from 'axios';

import InputLabel from '@/Components/InputLabel.vue';
import SelectInput from '@/Components/SelectInput.vue';
import InputError from '@/Components/InputError.vue';

const props = defineProps({
    modelValue: [String, Number, null],
    initialVendor: {
        type: Object,
        default: null,
    },
    errorMessage: String,
    id: String,
    label: String,
});

const emit = defineEmits(['update:modelValue']);

const searchTerm = ref('');
const vendors = ref([]); // Stores the raw API response

// A computed property for the dropdown options, formatted for a simple select input
const vendorOptions = computed(() => {
    // Start with the currently selected vendor if it exists
    const options = [];
    if (props.initialVendor && !vendors.value.some(v => v.id === props.initialVendor.id)) {
        options.push({ value: props.initialVendor.id, label: props.initialVendor.name });
    }

    // Map the fetched vendors to a { value: id, label: name } format
    const fetchedOptions = vendors.value.map(v => ({ value: v.id, label: v.name }));

    return [...options, ...fetchedOptions];
});

// Fetch vendors from the backend
const fetchVendors = debounce(async (search) => {
    try {
        const response = await axios.get(route('vendors.auto-search'), {
            params: { search: search },
        });
        vendors.value = response.data;
    } catch (error) {
        console.error('Error fetching vendors:', error);
    }
}, 300);

onMounted(() => {
    // Initial fetch to populate the dropdown
    fetchVendors();
});
</script>

<template>
    <div>
        <InputLabel v-if="label" :for="id" :value="label" />
        <!-- We directly bind v-model to the modelValue (ID) -->
        <SelectInput
            :id="id"
            :modelValue="props.modelValue"
            @update:modelValue="emit('update:modelValue', $event)"
            :options="vendorOptions"
            option-label="label"
            option-value="value"
            :error="errorMessage"
            :placeholder="'Select a Vendor'"
            @input="fetchVendors($event.target.value)"
        />
        <InputError class="mt-2" :message="errorMessage" />
    </div>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

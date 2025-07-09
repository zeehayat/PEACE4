<script setup>
import {
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
} from '@headlessui/vue'
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import { debounce } from 'lodash-es'

// The prop that receives and emits the Vendor ID
const selectedVendorId = defineModel('selectedVendorId')

// Internal ref to hold the full selected Vendor object (for displayValue in ComboboxInput)
const internalSelectedVendor = ref(null)

const query = ref('') // Text currently in the input box
const options = ref([]) // Search results for vendors
const loading = ref(false)

// Function to fetch Vendors based on query
const fetchOptions = debounce(async (newQuery) => {
    if (!newQuery || newQuery.length < 2) {
        options.value = []
        return;
    }

    loading.value = true
    try {
        // Assume a /vendors/auto-search API endpoint exists (already provided in VendorController)
        const { data } = await axios.get(route('vendor.auto-search'), { // Use route() helper
            params: { search: newQuery },
        })
        options.value = data

        // After fetching, if an ID is already set (e.g., from parent prop or previous valid selection)
        // and its name isn't already displayed, try to find and set it from the new options.
        if (selectedVendorId.value && (!internalSelectedVendor.value || internalSelectedVendor.value.id !== selectedVendorId.value)) {
            const preselected = data.find(vendor => vendor.id === selectedVendorId.value);
            if (preselected) {
                internalSelectedVendor.value = preselected;
                query.value = preselected.name; // Update query to display preselected vendor name
            }
        }

    } catch (e) {
        console.error("Error fetching Vendors:", e)
        options.value = []
    } finally {
        loading.value = false
    }
}, 300)

watch(query, (newQuery) => {
    fetchOptions(newQuery)
})

// Initialize `internalSelectedVendor` when the component mounts or `selectedVendorId` prop changes from parent.
watch(selectedVendorId, async (newId) => {
    if (newId && typeof newId === 'number' && (!internalSelectedVendor.value || internalSelectedVendor.value.id !== newId)) {
        // If we only have an ID from parent, and don't have the full object, fetch it
        try {
            // Assume a /vendors/{id}/details_minimal API endpoint exists (already provided in VendorController)
            const { data } = await axios.get(route('vendor.details.minimal', newId)); // Use route() helper
            internalSelectedVendor.value = data;
            query.value = data.name; // Set query to display selected Vendor name
        } catch (e) {
            console.error("Error fetching initial Vendor details:", e);
            internalSelectedVendor.value = { id: newId, name: `Vendor ID: ${newId} (Error loading)` }; // Fallback
        }
    } else if (!newId) {
        // If parent cleared the ID, clear local selection and query
        internalSelectedVendor.value = null;
        query.value = '';
    }
}, { immediate: true });

// Function called when a Vendor option is *explicitly selected* from the dropdown
const handleVendorSelected = (vendorObject) => {
    internalSelectedVendor.value = vendorObject;
    selectedVendorId.value = vendorObject?.id ?? null; // Emit the Vendor's ID to the parent form
    query.value = vendorObject?.name || ''; // Set the input text to the selected Vendor's name
    options.value = []; // Clear the dropdown options after selection
};

// Function called when the text in the Combobox input field changes (typing)
const handleInputChange = (event) => {
    query.value = event.target.value;
    internalSelectedVendor.value = null; // Clear active selection if user types
    selectedVendorId.value = null; // Crucially, clear the ID bound to parent immediately
    fetchOptions(query.value); // Trigger a new search
};

// Function called when the Combobox input loses focus (blurs)
const handleInputBlur = () => {
    // If there's text in the input field but no Vendor object is actually selected (internalSelectedVendor is null),
    // it means the user typed something but didn't pick a valid option from the dropdown.
    if (query.value && !internalSelectedVendor.value) {
        query.value = ''; // Clear the input text
        selectedVendorId.value = null; // Ensure the vendor_id sent to parent is null
    }
};

// Function to determine what to display in the input field
const displayVendorValue = (vendor) => {
    return vendor ? vendor.name : (internalSelectedVendor.value ? internalSelectedVendor.value.name : '');
};
</script>

<template>
    <div>
        <label class="font-bold block mb-1">Select Vendor</label>

        <Combobox
            :model-value="internalSelectedVendor"
            @update:model-value="handleVendorSelected"
            as="div"
            class="relative"
        >
            <ComboboxInput
                class="w-full border rounded p-2 input-compact"
                :displayValue="displayVendorValue"
                @change="handleInputChange"
                @blur="handleInputBlur"
                placeholder="Type to search…"
            />

            <ComboboxOptions
                v-if="query.length >= 2 && (options.length > 0 || loading)"
                class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white border shadow-lg"
            >
                <template v-if="loading">
                    <div class="p-2 text-gray-500 italic">Loading…</div>
                </template>

                <template v-else-if="options.length === 0 && query.length >= 2">
                    <div class="p-2 text-gray-500 italic">No results found</div>
                </template>

                <template v-else>
                    <ComboboxOption
                        v-for="vendor in options"
                        :key="vendor.id"
                        :value="vendor"
                        as="template"
                        v-slot="{ active, selected: optionSelected }"
                    >
                        <li
                            :class="[
                                'cursor-pointer p-2 flex justify-between',
                                active ? 'bg-blue-100' : 'bg-white',
                                optionSelected ? 'font-semibold' : ''
                            ]"
                        >
                            <span>{{ vendor.name }}</span>
                            <span v-if="optionSelected" class="text-green-500">✔</span>
                        </li>
                    </ComboboxOption>
                </template>
            </ComboboxOptions>
            <div v-else-if="query.length < 2 && selectedVendorId === null && !loading" class="p-2 text-gray-500 italic">
                Type at least 2 characters to search.
            </div>
        </Combobox>
    </div>
</template>

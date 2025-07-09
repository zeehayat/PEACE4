<script setup>
/**
 * Project/resources/js/Components/SearchableVendorSelect.vue
 *
 * This component provides a searchable dropdown (Combobox) for selecting a Vendor (Contractor).
 * It fetches vendor options from the backend via an API and supports v-model binding
 * to pass the selected vendor's ID to parent forms.
 *
 * Key features:
 * - Uses Headless UI's Combobox for accessible UI.
 * - Debounces search input to limit API calls.
 * - Handles initial value pre-population (e.g., in edit mode).
 * - Emits only the vendor ID to the parent form.
 * - Robustly handles user typing vs. selection.
 */

import {
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
} from '@headlessui/vue'
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import { debounce } from 'lodash-es' // Utility for debouncing function calls

// ---------------------------------------------------------------------
// 1. Props and Emits (v-model setup)
// ---------------------------------------------------------------------

/**
 * `defineModel` is a Vue 3.4+ macro that simplifies v-model binding.
 * It automatically creates a prop named 'selectedVendorId' (or 'modelValue' if no argument)
 * and sets up its corresponding 'update:selectedVendorId' emit.
 *
 * @type {Ref<Number|String|null>} selectedVendorId - The ID of the selected vendor.
 * This is the value that is bound to v-model (e.g., v-model:selected-vendor-id="form.vendor_id").
 */
const selectedVendorId = defineModel('selectedVendorId', {
    type: [Number, String, null], // Explicitly allow Number, String, or null
    default: null // Default value if nothing is selected initially
});

// ---------------------------------------------------------------------
// 2. Local Reactive State
// ---------------------------------------------------------------------

/**
 * @type {Ref<Object|null>} internalSelectedVendor - Holds the full vendor object
 * that is currently selected from the dropdown or pre-populated from the parent prop.
 * This is the `model-value` for Headless UI's <Combobox> component, as it works with objects.
 * (e.g., { id: 1, name: 'Vendor A' }).
 */
const internalSelectedVendor = ref(null);

/**
 * @type {Ref<string>} query - Represents the text currently typed by the user in the search input field.
 * This is used to trigger API searches and is also displayed when no `internalSelectedVendor` is set.
 */
const query = ref('');

/**
 * @type {Ref<Array<Object>>} options - The list of vendor objects returned by the search API.
 * These are the items that appear in the dropdown list for the user to select.
 */
const options = ref([]);

/**
 * @type {Ref<boolean>} loading - A flag to indicate whether an API search request is currently in progress.
 * Used to show loading indicators in the UI.
 */
const loading = ref(false);

// ---------------------------------------------------------------------
// 3. API Call Logic (Fetching Vendors)
// ---------------------------------------------------------------------

/**
 * `fetchOptions` is a debounced asynchronous function responsible for calling the backend
 * API to search for vendors based on the user's input `newQuery`.
 * Debouncing ensures that the API call is not made too frequently as the user types,
 * improving performance and reducing unnecessary server load.
 *
 * @param {string} newQuery - The current text from the search input field.
 */
const fetchOptions = debounce(async (newQuery) => {
    // Only perform a search if the query is not empty and has at least 2 characters.
    if (!newQuery || newQuery.length < 2) {
        options.value = []; // Clear previous search results
        return;
    }

    loading.value = true; // Set loading state to true
    try {
        // Make an Axios GET request to the vendor auto-search API endpoint.
        // This endpoint should be defined in your Laravel routes (e.g., 'vendor.auto-search').
        // It's expected to return an array of vendor objects, each with 'id' and 'name'.
        const { data } = await axios.get(route('vendor.auto-search'), {
            params: { search: newQuery },
        });
        options.value = data; // Update the options list with the API response

        // After fetching new options, check if `selectedVendorId.value` (from parent) is set
        // and if it doesn't already match `internalSelectedVendor.value`.
        // This handles cases where the parent prop has an ID, and we just fetched it.
        if (selectedVendorId.value && (!internalSelectedVendor.value || internalSelectedVendor.value.id !== selectedVendorId.value)) {
            const preselected = data.find(vendor => vendor.id === selectedVendorId.value);
            if (preselected) {
                internalSelectedVendor.value = preselected; // Set the full object internally
                query.value = preselected.name; // Update query to match preselected name (for display)
            }
        }

    } catch (e) {
        // Log any errors that occur during the API call
        console.error("Error fetching Vendors:", e);
        options.value = []; // Clear options on error to avoid displaying stale data
    } finally {
        loading.value = false; // Reset loading state to false
    }
}, 300); // Debounce duration: 300 milliseconds

// ---------------------------------------------------------------------
// 4. Watchers for State Synchronization
// ---------------------------------------------------------------------

/**
 * Watcher for the `query` ref.
 * Every time the user types (and `query` changes), trigger a new `fetchOptions` search.
 */
watch(query, (newQuery) => {
    fetchOptions(newQuery);
});

/**
 * Watcher for the `selectedVendorId` prop (the value bound via `v-model` from the parent).
 * This watcher is crucial for:
 * 1. Initial component setup when `selectedVendorId` has a value (e.g., in "edit" mode).
 * 2. Reacting to programmatic changes or clearing of the `selectedVendorId` from the parent.
 */
watch(selectedVendorId, async (newId) => {
    // If a new valid ID is received from the parent AND it's different from the current internal selection
    if (newId && typeof newId === 'number' && (!internalSelectedVendor.value || internalSelectedVendor.value.id !== newId)) {
        // Try to find the full vendor object in `options.value` first (if already loaded)
        let foundVendor = options.value.find(vendor => vendor.id === newId);
        if (foundVendor) {
            internalSelectedVendor.value = foundVendor;
            query.value = foundVendor.name; // Update query to reflect selected name
        } else {
            // If not found in current options, make an API call to fetch minimal vendor details by ID.
            // This is especially important for edit mode where only the ID might be passed initially.
            try {
                // `route('vendor.details.minimal', newId)` should point to a backend endpoint
                // that returns `{ id: ..., name: ... }` for a given vendor ID.
                const { data } = await axios.get(route('vendor.details.minimal', newId));
                internalSelectedVendor.value = data; // Set the full object
                query.value = data.name; // Update query to display fetched name
            } catch (e) {
                console.error("Error fetching initial Vendor details for ID:", newId, e);
                // Fallback if details can't be fetched (e.g., vendor deleted)
                internalSelectedVendor.value = { id: newId, name: `Vendor ID: ${newId} (Error loading)` };
            }
        }
    } else if (newId === null || newId === undefined || newId === '') {
        // If the parent cleared the ID (newId is null/undefined/empty string),
        // clear the local internal selection and the query text.
        internalSelectedVendor.value = null;
        query.value = '';
    }
}, { immediate: true }); // `immediate: true` ensures this watcher runs immediately on component mount

// ---------------------------------------------------------------------
// 5. Event Handlers
// ---------------------------------------------------------------------

/**
 * `handleVendorSelected` is called when a user *explicitly selects* a vendor
 * from the Combobox dropdown list (e.g., by clicking an option).
 *
 * @param {Object|null} vendorObject - The full vendor object that was selected. Can be null if selection is cleared.
 */
const handleVendorSelected = (vendorObject) => {
    internalSelectedVendor.value = vendorObject; // Store the full selected object internally
    selectedVendorId.value = vendorObject?.id ?? null; // Emit ONLY the vendor's ID (or null) back to the parent form
    query.value = vendorObject?.name || ''; // Ensure the input text matches the selected vendor's name
    options.value = []; // Clear the dropdown options list after a selection is made
};

/**
 * `handleInputChange` is called whenever the text in the Combobox input field changes (e.g., user typing).
 *
 * @param {Event} event - The DOM change event.
 */
const handleInputChange = (event) => {
    query.value = event.target.value; // Update the local query ref with the current input text

    // When the user types, it invalidates any previously explicit selection from the dropdown.
    // Clear `internalSelectedVendor` so `displayValue` correctly shows `query` text during typing.
    // Crucially, clear the ID being sent to the parent (`selectedVendorId.value`) immediately.
    // This ensures that `vendor_id` is `null` until a new, valid selection is made from the dropdown.
    // This aggressively prevents sending a stale or invalid ID if the user doesn't complete a selection.
    internalSelectedVendor.value = null;
    selectedVendorId.value = null;
    fetchOptions(query.value); // Trigger a new search based on current input
};

/**
 * `handleInputBlur` is called when the Combobox input field loses focus (e.g., user clicks outside).
 * This acts as a cleanup mechanism if the user types but doesn't explicitly select an option.
 */
const handleInputBlur = () => {
    // If there's text currently in the input field (`query.value`)
    // AND no valid vendor object has been explicitly selected (`!internalSelectedVendor.value`)
    if (query.value && !internalSelectedVendor.value) {
        query.value = ''; // Clear the text in the input field
        selectedVendorId.value = null; // Ensure the ID sent to parent is null
    }
};

/**
 * `displayVendorValue` is a computed property (or function) used by Headless UI's ComboboxInput
 * to determine what text to display in the input field.
 *
 * @param {Object} vendor - The vendor object passed by Headless UI's Combobox (if its `model-value` is set).
 * @returns {string} The text to display in the input.
 */
const displayVendorValue = (vendor) => {
    // If Headless UI provides a vendor object (meaning `model-value` is set, user made a selection)
    // OR if we have an `internalSelectedVendor` (meaning it's loaded from parent prop), display its name.
    // Otherwise, display the raw `query` text (what the user is currently typing).
    return vendor ? vendor.name : (internalSelectedVendor.value ? internalSelectedVendor.value.name : query.value);
};
</script>

<template>
    <div>
        <label class="font-bold block mb-1">Select Vendor</label>

        <Combobox
            :model-value="internalSelectedVendor"       @update:model-value="handleVendorSelected"  as="div"                                    class="relative"                            >
            <ComboboxInput
                class="w-full border rounded p-2 input-compact"
                :displayValue="displayVendorValue"       @change="handleInputChange"              @blur="handleInputBlur"                  placeholder="Type to search…"            />

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
                        :value="vendor"              as="template"                v-slot="{ active, selected: optionSelected }"
                    >
                        <li
                            :class="[
                                'cursor-pointer p-2 flex justify-between',
                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                            ]"
                        >
                            <span :class="['block truncate', optionSelected ? 'font-semibold' : 'font-normal']">
                                {{ vendor.name }}
                            </span>

                            <span v-if="optionSelected"
                                  :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600']"
                            >
                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clip-rule="evenodd" />
                                </svg>
                            </span>
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

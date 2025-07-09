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

// The prop that receives and emits the CBO ID
const selectedCboId = defineModel('selectedCboId')

// Internal ref to hold the full selected CBO object (for displayValue in ComboboxInput)
const internalSelectedCbo = ref(null)

const query = ref('') // Text currently in the input box (for user typing/search)
const options = ref([]) // Search results
const loading = ref(false)

// Function to fetch CBOs based on query
const fetchOptions = debounce(async (newQuery) => {
    if (!newQuery || newQuery.length < 2) {
        options.value = []
        return;
    }

    loading.value = true
    try {
        const { data } = await axios.get('/cbos/auto-search', {
            params: { search: newQuery },
        })
        options.value = data

        // After fetching, if the parent has an ID but internalSelectedCbo isn't set
        // or doesn't match, try to find and set it from the new options.
        if (selectedCboId.value && (!internalSelectedCbo.value || internalSelectedCbo.value.id !== selectedCboId.value)) {
            const preselected = data.find(cbo => cbo.id === selectedCboId.value);
            if (preselected) {
                internalSelectedCbo.value = preselected;
                query.value = preselected.reference_code; // Update query to display preselected CBO text
            }
        }

    } catch (e) {
        console.error("Error fetching CBOs:", e)
        options.value = []
    } finally {
        loading.value = false
    }
}, 300)

// Watch for changes in the `query` (what the user types) to trigger search
watch(query, (newQuery) => {
    fetchOptions(newQuery)
})

// Initialize `internalSelectedCbo` when the component mounts or `selectedCboId` prop changes from parent.
// This is crucial for displaying the correct CBO name in edit mode or when `cbo_id` is programmatically set.
watch(selectedCboId, async (newId) => {
    if (newId && typeof newId === 'number' && (!internalSelectedCbo.value || internalSelectedCbo.value.id !== newId)) {
        // If we only have an ID from parent, and don't have the full object, fetch it
        try {
            const { data } = await axios.get(route('cbo.details.minimal', newId)); // Fetch minimal details for the ID
            internalSelectedCbo.value = data;
            query.value = data.reference_code; // Set query to display selected CBO text
        } catch (e) {
            console.error("Error fetching initial CBO details:", e);
            // Fallback: display ID if name can't be fetched
            internalSelectedCbo.value = { id: newId, reference_code: `CBO ID: ${newId} (Error loading)` };
        }
    } else if (!newId) {
        // If parent cleared the ID, clear local selection and query
        internalSelectedCbo.value = null;
        query.value = '';
    }
}, { immediate: true }); // `immediate: true` runs this watcher on component mount

// Function called when a CBO option is *explicitly selected* from the dropdown
const handleCboSelected = (cboObject) => {
    internalSelectedCbo.value = cboObject; // Store the full CBO object internally
    selectedCboId.value = cboObject?.id ?? null; // Emit the CBO's ID to the parent form
    query.value = cboObject?.reference_code || ''; // Set the input text to the selected CBO's name
    options.value = []; // Clear the dropdown options after selection
};

// Function called when the text in the Combobox input field changes (e.g., user types)
const handleInputChange = (event) => {
    query.value = event.target.value; // Update the local query ref
    // If the user starts typing, assume previous selection might be invalid, so clear internal selection
    internalSelectedCbo.value = null;
    selectedCboId.value = null; // Crucially, clear the ID bound to the parent immediately
    fetchOptions(query.value); // Trigger a new search based on current input
};

// Function called when the Combobox input loses focus (blurs)
const handleInputBlur = () => {
    // If there's text in the input field but no CBO object is actually selected (internalSelectedCbo is null),
    // it means the user typed something but didn't pick a valid option from the dropdown.
    if (query.value && !internalSelectedCbo.value) {
        query.value = ''; // Clear the input text
        selectedCboId.value = null; // Ensure the cbo_id sent to parent is null
    }
};

// Function to determine what to display in the input field
const displayCboValue = (cbo) => {
    return cbo ? cbo.reference_code : (internalSelectedCbo.value ? internalSelectedCbo.value.reference_code : '');
};
</script>

<template>
    <div>
        <label class="font-bold block mb-1">Select CBO</label>

        <Combobox
            :model-value="internalSelectedCbo"
            @update:model-value="handleCboSelected"
            as="div"
            class="relative"
        >
            <ComboboxInput
                class="w-full border rounded p-2 input-compact"
                :displayValue="displayCboValue" @change="handleInputChange" @blur="handleInputBlur"     placeholder="Type to search…"
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
                        v-for="cbo in options"
                        :key="cbo.id"
                        :value="cbo"
                        as="template"
                        v-slot="{ active, selected: optionSelected }"
                    >
                        <li
                            :class="[
                                'cursor-pointer p-2 flex justify-between',
                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                            ]"
                        >
                            <span :class="['block truncate', optionSelected ? 'font-semibold' : 'font-normal']">
                                {{ cbo.reference_code }}
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
            <div v-else-if="query.length < 2 && selectedCboId === null && !loading" class="p-2 text-gray-500 italic">
                Type at least 2 characters to search.
            </div>
        </Combobox>
    </div>
</template>

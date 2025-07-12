<script setup>
import {
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
} from '@headlessui/vue'
import { ref, watch } from 'vue'
import axios from 'axios'
import { debounce } from 'lodash-es'

// defineModel is new in Vue 3.4. If you're on an older Vue 3 version,
// you might need to stick with props: ['modelValue'] and emit: ['update:modelValue']
const modelValue = defineModel() // This is the CBO ID (e.g., 1)

const props = defineProps({
    initialCboId: { // The initial CBO ID passed from parent
        type: [Number, String, null],
        default: null
    },
    initialCboObject: { // NEW PROP: The full CBO object for initial display
        type: Object,
        default: null
    },
    disabled: { // NEW PROP: To disable the input
        type: Boolean,
        default: false
    }
})

const query = ref('')
const options = ref([]) // Search results
const selected = ref(null) // The currently selected CBO object {id, reference_code}
const loading = ref(false)

// Function to fetch CBOs based on query
const fetchOptions = debounce(async (newQuery) => {
    if (!newQuery || newQuery.length < 2) {
        options.value = []
        return
    }

    loading.value = true
    try {
        // Ensure this endpoint returns objects with 'id' and 'reference_code'
        const { data } = await axios.get('/cbo/cbos/auto-search', { // Assuming this is the correct route
            params: { search: newQuery },
        })
        options.value = data
        // console.log('Search results:', data); // Debugging search results
    } catch (e) {
        console.error('Error fetching CBO options:', e)
        options.value = []
    } finally {
        loading.value = false
    }
}, 300)


// Watch for changes in the search query and trigger fetch
watch(query, (newQuery) => {
    fetchOptions(newQuery)
})

// Watch for initialCboId or initialCboObject prop changes
// This runs on component mount and whenever initialCboId/Object changes from parent
watch(() => [props.initialCboId, props.initialCboObject], ([newId, newObject]) => {
    // If an initialCboObject is provided, use it directly
    if (newObject && newObject.id) {
        selected.value = newObject;
        query.value = newObject.reference_code; // Set query to display value initially
    }
        // If only an ID is provided, but no object, and no current selection
    // (This is for cases where CBO object isn't pre-loaded, requiring an extra fetch)
    else if (newId && !selected.value) {
        loading.value = true;
        axios.get(`/cbo/cbos/${newId}/show`) // Assuming this is your cbo.show route
            .then(response => {
                if (response.data && response.data.id) {
                    selected.value = response.data; // Should contain {id, reference_code}
                    query.value = response.data.reference_code; // Set query to display value
                } else {
                    selected.value = null;
                    query.value = '';
                }
            })
            .catch(e => {
                console.error(`Error fetching CBO ID ${newId}:`, e);
                selected.value = null;
                query.value = '';
            })
            .finally(() => {
                loading.value = false;
            });
    }
    // If ID is null/empty, clear selection
    else if (!newId && !newObject) {
        selected.value = null;
        query.value = '';
    }
}, { immediate: true }); // Run immediately on component mount


// Watch for selected item change and update modelValue (CBO ID)
watch(selected, (newVal) => {
    modelValue.value = newVal?.id ?? null;
    // When an item is selected, close the options and update query for display
    if (newVal) {
        query.value = newVal.reference_code;
    }
})
</script>

<template>
    <div>
        <label class="font-bold block mb-1">Select CBO</label>

        <Combobox v-model="selected" :disabled="disabled"> <div class="relative">
            <ComboboxInput
                class="w-full border rounded p-2"
                :displayValue="(cbo) => cbo?.reference_code || ''"
                @input="query = $event.target.value"
                :placeholder="disabled ? '' : 'Type to search…'" :disabled="disabled" />

            <ComboboxOptions
                v-if="query && (options.length > 0 || loading) && !disabled" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white border shadow-lg"
            >
                <template v-if="loading">
                    <div class="p-2 text-gray-500 italic">Loading…</div>
                </template>

                <template v-else-if="options.length === 0">
                    <div class="p-2 text-gray-500 italic">No results found</div>
                </template>

                <template v-else>
                    <ComboboxOption
                        v-for="cbo in options"
                        :key="cbo.id"
                        :value="cbo"
                        v-slot="{ active, selected }"
                    >
                        <div
                            :class="[
                  'cursor-pointer p-2 flex justify-between',
                  active ? 'bg-blue-100' : '',
                  selected ? 'font-semibold' : ''
                ]"
                        >
                            <span>{{ cbo.reference_code }}</span>
                            <span v-if="selected" class="text-green-500">✔</span>
                        </div>
                    </ComboboxOption>
                </template>
            </ComboboxOptions>
        </div>
        </Combobox>
    </div>
</template>

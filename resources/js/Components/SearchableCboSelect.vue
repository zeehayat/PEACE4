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
import { route } from "ziggy-js"

const modelValue = defineModel()

const props = defineProps({
    initialCboId: {
        type: [Number, String, null],
        default: null
    },
    initialCboObject: { // This prop is crucial now
        type: Object, // Expected to have { id, reference_code }
        default: null
    },
    disabled: { // This prop is crucial
        type: Boolean,
        default: false
    }
})

const query = ref('')
const options = ref([])
const selected = ref(null)
const loading = ref(false)

const fetchOptions = debounce(async (newQuery) => {
    if (!newQuery || newQuery.length < 2) {
        options.value = []
        return
    }

    loading.value = true
    try {
        const { data } = await axios.get(route('cbo.cbos.auto-search', { search: newQuery })) // Using named route
        options.value = data
    } catch (e) {
        console.error('Error fetching CBO options:', e)
        options.value = []
    } finally {
        loading.value = false
    }
}, 300)

watch(query, (newQuery) => {
    if (!props.disabled) { // Only search if not disabled
        fetchOptions(newQuery)
    }
})

// Initialize 'selected' and 'query' based on initial props
onMounted(() => {
    if (props.initialCboObject && props.initialCboObject.id) {
        // Option 1: Use the directly provided object if available
        selected.value = props.initialCboObject;
        query.value = props.initialCboObject.reference_code; // Display reference_code
        // console.log('Initialized with object:', props.initialCboObject); // Debug
    } else if (props.initialCboId) {
        // Option 2: If only ID, fetch the full CBO
        loading.value = true;
        axios.get(route('cbo.cbos.show', props.initialCboId))
            .then(response => {
                if (response.data && response.data.id) {
                    selected.value = response.data; // Should contain {id, reference_code}
                    query.value = response.data.reference_code; // Display reference_code
                    // console.log('Fetched and initialized with ID:', response.data); // Debug
                } else {
                    selected.value = null;
                    query.value = '';
                    // console.log('Fetched ID but no data:', props.initialCboId); // Debug
                }
            })
            .catch(e => {
                console.error(`Error fetching CBO ID ${props.initialCboId}:`, e);
                selected.value = null;
                query.value = '';
            })
            .finally(() => {
                loading.value = false;
            });
    } else {
        // No initial value
        selected.value = null;
        query.value = '';
    }
});

// Watch for modelValue changing from parent (e.g., form.cbo_id reset to null)
// Or if the parent changes the ID programmatically to a new ID not part of initialCboObject
watch(modelValue, (newVal) => {
    // console.log('modelValue changed:', newVal); // Debug
    if (newVal === null) {
        selected.value = null;
        query.value = ''; // Clear input if modelValue becomes null
    } else if (newVal !== (selected.value?.id ?? null) && !props.initialCboObject) {
        // Only re-fetch if the ID changed and we don't have the object already
        loading.value = true;
        axios.get(route('cbo.cbos.show', newVal))
            .then(response => {
                if (response.data && response.data.id) {
                    selected.value = response.data;
                    query.value = response.data.reference_code;
                } else {
                    selected.value = null;
                    query.value = '';
                }
            })
            .catch(e => {
                console.error(`Error re-fetching CBO ID ${newVal}:`, e);
                selected.value = null;
                query.value = '';
            })
            .finally(() => {
                loading.value = false;
            });
    }
});

// Watch for selected item change and update modelValue (CBO ID emitted to parent)
watch(selected, (newVal) => {
    modelValue.value = newVal?.id ?? null;
    if (newVal && newVal.reference_code && query.value !== newVal.reference_code && !props.disabled) { // Only update query for display if not disabled
        query.value = newVal.reference_code;
    }
}, { deep: true }); // Use deep watch for nested changes if selected.value can be mutated externally
</script>

<template>
    <div>
        <label class="font-bold block mb-1">Select CBO</label>

        <Combobox v-model="selected" :disabled="disabled">
            <div class="relative">
                <ComboboxInput
                    class="w-full border rounded p-2"
                    :displayValue="(cbo) => cbo?.reference_code || ''"
                    @input="query = $event.target.value"
                    :placeholder="disabled ? (selected ? selected.reference_code : '') : 'Type to search…'"
                    :disabled="disabled"
                />

                <ComboboxOptions
                    v-if="query && (options.length > 0 || loading) && !disabled"
                    class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white border shadow-lg"
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

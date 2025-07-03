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

const modelValue = defineModel()

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
        const { data } = await axios.get('/cbos/auto-search', {
            params: { search: newQuery },
        })
        options.value = data
        console.log(data)
    } catch (e) {
        console.error(e)
        options.value = []
    } finally {
        loading.value = false
    }
}, 300)

watch(query, (newQuery) => {
    fetchOptions(newQuery)
})

watch(modelValue, (newVal) => {
    if (newVal && !selected.value) {
        selected.value = { id: newVal, name: `CBO #${newVal}` }
    }
})

watch(selected, (newVal) => {
    modelValue.value = newVal?.id ?? null
})
</script>

<template>
    <div>
        <label class="font-bold block mb-1">Select CBO</label>

        <Combobox v-model="selected">
            <div class="relative">
                <ComboboxInput
                    class="w-full border rounded p-2"
                    :displayValue="(cbo) => cbo?.reference_code || ''"
                    @input="query = $event.target.value"
                    placeholder="Type to search…"
                />

                <ComboboxOptions
                    v-if="query && (options.length > 0 || loading)"
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

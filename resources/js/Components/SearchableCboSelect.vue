<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'

const modelValue = defineModel()
const options = ref([])
const search = ref('')

watch(search, async (newSearch) => {
    if (newSearch.length < 2) return
    const { data } = await axios.get('/cbos/auto-search', { params: { search: newSearch } })
    options.value = data
})
</script>

<template>
    <div>
        <input
            v-model="search"
            placeholder="Search CBO..."
            class="input"
            type="text"
        />
        <ul v-if="options.length" class="bg-white border rounded">
            <li
                v-for="cbo in options"
                :key="cbo.id"
                @click="$emit('update:modelValue', cbo.id)"
                class="p-2 hover:bg-gray-100 cursor-pointer"
            >
                {{ cbo.name }}
            </li>
        </ul>
    </div>
</template>

<template>
    <div>
        <div class="flex justify-between items-center mb-2">
            <h2 class="text-lg font-semibold">Dialogue Records</h2>
            <button @click="$emit('add')" class="btn btn-primary">Add</button>
        </div>
        <table class="table-auto w-full">
            <thead>
            <tr><th>Date</th><th>Topic</th><th>Actions</th></tr>
            </thead>
            <tbody>
            <tr v-for="entry in entries" :key="entry.id">
                <td>{{ entry.date }}</td>
                <td>{{ entry.topic }}</td>
                <td>…</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const props = defineProps({ cboId: {
        type: [String, Number],
        required: true,
    } })
const entries = ref([])

onMounted(async () => {
    const res = await axios.get(`/cbos/${props.cboId}/dialogues`)
    entries.value = res.data
})
</script>

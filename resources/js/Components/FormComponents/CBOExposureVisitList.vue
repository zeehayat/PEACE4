<template>
    <div>
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">Exposure Visits</h2>
            <button @click="$emit('add')" class="btn btn-primary">Add Exposure Visit</button>
        </div>

        <table class="table-auto w-full text-left border">
            <thead class="bg-gray-100">
            <tr>
                <th class="px-4 py-2">Date</th>
                <th class="px-4 py-2">Description</th>
                <th class="px-4 py-2">Attachments</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="visit in visits" :key="visit.id" class="border-t">
                <td class="px-4 py-2">{{ formatDate(visit.date_of_visit) }}</td>
                <td class="px-4 py-2">{{ visit.description ?? '—' }}</td>
                <td class="px-4 py-2">
                    <ul v-if="visit.media?.length">
                        <li v-for="file in visit.media" :key="file.id">
                            <a :href="file.original_url" target="_blank" class="text-blue-600 underline">
                                {{ file.file_name }}
                            </a>
                        </li>
                    </ul>
                    <span v-else class="text-gray-500">No files</span>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import dayjs from 'dayjs'

const props = defineProps({ cboId: {
        type: [String, Number],
        required: true,
    }})
const visits = ref([])

const fetchVisits = async () => {
    const { data } = await axios.get(`/cbos/${props.cboId}/exposure-visits`)
    visits.value = data
}

const formatDate = (date) => dayjs(date).format('DD MMM YYYY')

onMounted(fetchVisits)
</script>

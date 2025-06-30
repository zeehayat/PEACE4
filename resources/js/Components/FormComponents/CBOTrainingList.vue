<template>
    <div>
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">Trainings</h2>
            <button @click="$emit('add')" class="btn btn-primary">Add Training</button>
        </div>

        <table class="table-auto w-full text-left border">
            <thead class="bg-gray-100">
            <tr>
                <th class="px-4 py-2">Date</th>
                <th class="px-4 py-2">Type</th>
                <th class="px-4 py-2">Gender</th>
                <th class="px-4 py-2">Participants</th>
                <th class="px-4 py-2">Attachments</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="training in trainings" :key="training.id" class="border-t">
                <td class="px-4 py-2">{{ formatDate(training.date_of_training) }}</td>
                <td class="px-4 py-2 capitalize">{{ training.training_type }}</td>
                <td class="px-4 py-2 capitalize">{{ training.training_gender }}</td>
                <td class="px-4 py-2">{{ training.total_participants }}</td>
                <td class="px-4 py-2">
                    <ul v-if="training.media?.length">
                        <li v-for="file in training.media" :key="file.id">
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
    } })
const trainings = ref([])

const fetchTrainings = async () => {
    const { data } = await axios.get(`/cbos/${props.cboId}/trainings`)
    trainings.value = data
}

const formatDate = (date) => dayjs(date).format('DD MMM YYYY')

onMounted(fetchTrainings)
</script>

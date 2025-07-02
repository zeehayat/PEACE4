<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold text-center mb-6">CBO Activity Report</h1>

        <!-- Filters -->
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <input v-model="filters.reference_code" type="text" class="input" placeholder="Reference Code" />
            <input v-model="filters.district" type="text" class="input" placeholder="District" />
            <select v-model="filters.gender" class="input">
                <option value="">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="mixed">Mixed</option>
            </select>
            <input v-model="filters.from" type="date" class="input" />
            <input v-model="filters.to" type="date" class="input" />
            <button @click="applyFilters" class="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700">
                <Filter class="w-4 h-4 inline-block mr-1" /> Filter
            </button>
            <button @click="exportCSV" class="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700">
                Export CSV
            </button>
        </div>

        <!-- Report -->
        <div v-for="cbo in cbos" :key="cbo.id" class="mb-10 border-b pb-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-2">CBO: {{ cbo.reference_code }}</h2>
            <p class="text-sm text-gray-600 mb-2">
                <strong>District:</strong> {{ cbo.district }} |
                <strong>Gender:</strong> {{ cbo.gender }} |
                <strong>Formed:</strong> {{ cbo.date_of_formation }}
            </p>

            <div class="ml-4">
                <!-- Dialogues -->
                <h3 class="text-md font-bold mt-4">Dialogues</h3>
                <ul v-if="cbo.dialogues.length" class="list-disc ml-6">
                    <li v-for="d in cbo.dialogues" :key="d.id">
                        {{ d.date_of_dialogue }} – {{ d.participants }} participants
                    </li>
                </ul>
                <p v-else class="text-gray-500">No dialogues</p>

                <!-- Trainings -->
                <h3 class="text-md font-bold mt-4">Trainings</h3>
                <ul v-if="cbo.trainings.length" class="list-disc ml-6">
                    <li v-for="t in cbo.trainings" :key="t.id">
                        {{ t.training_type }} – {{ t.total_participants }} participants
                    </li>
                </ul>
                <p v-else class="text-gray-500">No trainings</p>

                <!-- Exposure Visits -->
                <h3 class="text-md font-bold mt-4">Exposure Visits</h3>
                <ul v-if="cbo.exposures.length" class="list-disc ml-6">
                    <li v-for="e in cbo.exposures" :key="e.id">
                        {{ e.date_of_visit }} – {{ e.participants }} participants
                    </li>
                </ul>
                <p v-else class="text-gray-500">No exposure visits</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { router, usePage } from '@inertiajs/vue3'
import { Filter } from 'lucide-vue-next'

const props = defineProps({ cbos: Array, filters: Object })

const filters = ref({
    reference_code: props.filters?.reference_code || '',
    district: props.filters?.district || '',
    gender: props.filters?.gender || '',
    from: props.filters?.from || '',
    to: props.filters?.to || '',
})

const applyFilters = () => {
    router.get(route('cbo.report'), filters.value, {
        preserveScroll: true,
        preserveState: true,
    })
}

const exportCSV = () => {
    const query = new URLSearchParams(filters.value).toString()
    window.open(`/cbo/report/export?${query}`, '_blank')
}
</script>

<style scoped>
.input {
    @apply border border-gray-300 rounded px-3 py-2 w-full;
}
</style>

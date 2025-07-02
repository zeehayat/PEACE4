<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">CBO Activity Report</h1>

        <!-- Filters -->
        <div class="bg-white shadow rounded p-4 mb-6">
            <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
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
            </div>
            <div class="flex justify-end mt-4 gap-2">
                <button @click="applyFilters" class="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 flex items-center">
                    <Filter class="w-4 h-4 mr-1" /> Filter
                </button>
                <button @click="exportCSV" class="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700">
                    Export CSV
                </button>
            </div>
        </div>

        <!-- Report -->
        <div v-for="cbo in cbos" :key="cbo.id" class="bg-white shadow rounded-md p-6 mb-10">
            <h2 class="text-xl font-semibold text-gray-800 mb-2 border-b pb-1">CBO: {{ cbo.reference_code }}</h2>
            <p class="text-sm text-gray-700 mb-4">
                <strong>District:</strong> {{ cbo.district }} |
                <strong>Gender:</strong> {{ cbo.gender }} |
                <strong>Formed:</strong> {{ cbo.date_of_formation }}
            </p>

            <div class="space-y-6 ml-2">

                <!-- Dialogues -->
                <div>
                    <h3 class="text-lg font-bold text-blue-700">CBO Dialogues</h3>
                    <ul v-if="cbo.dialogues?.length" class="list-disc ml-6 text-gray-700 mt-1">
                        <li v-for="d in cbo.dialogues" :key="d.id">
                            {{ d.date_of_dialogue }} – {{ d.participants }} participants
                        </li>
                    </ul>
                    <p v-else class="text-gray-400 italic">No dialogues recorded</p>
                </div>

                <!-- Trainings -->
                <div>
                    <h3 class="text-lg font-bold text-green-700">CBO Trainings</h3>
                    <ul v-if="cbo.trainings?.length" class="list-disc ml-6 text-gray-700 mt-1">
                        <li v-for="t in cbo.trainings" :key="t.id">
                            {{ t.training_type }} – {{ t.total_participants }} participants
                        </li>
                    </ul>
                    <p v-else class="text-gray-400 italic">No trainings recorded</p>
                </div>

                <!-- Exposure Visits -->
                <div>
                    <h3 class="text-lg font-bold text-purple-700">CBO Exposure Visits</h3>
                    <ul v-if="cbo.exposureVisits?.length" class="list-disc ml-6 text-gray-700 mt-1">
                        <li v-for="e in cbo.exposureVisits" :key="e.id">
                            {{ e.date_of_visit }} – {{ e.participants }} participants
                        </li>
                    </ul>
                    <p v-else class="text-gray-400 italic">No exposure visits recorded</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
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

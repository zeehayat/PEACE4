<script setup>
import { ref } from 'vue'
import MhpSiteDetailsModal from '@/Components/MhpSiteDetailsModal.vue'

const props = defineProps({
    mhpSites: Object,
})

const selectedSite = ref(null)
const showDetailsModal = ref(false)

const openDetails = (site) => {
    selectedSite.value = site
    showDetailsModal.value = true
}

const closeDetails = () => {
    selectedSite.value = null
    showDetailsModal.value = false
}
</script>

<template>
    <div class="max-w-7xl mx-auto mt-6 space-y-4">
        <h1 class="text-3xl font-bold">MHP Sites</h1>

        <div class="overflow-x-auto">
            <table class="min-w-full bg-white border">
                <thead>
                <tr class="bg-gray-100">
                    <th class="p-2 border">ID</th>
                    <th class="p-2 border">CBO</th>
                    <th class="p-2 border">Status</th>
                    <th class="p-2 border">Population</th>
                    <th class="p-2 border">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="site in props.mhpSites.data"
                    :key="site.id"
                    class="hover:bg-gray-50"
                >
                    <td class="p-2 border">{{ site.id }}</td>
                    <td class="p-2 border">{{ site.cbo?.reference_code ?? 'N/A' }}</td>
                    <td class="p-2 border">{{ site.status ?? 'N/A' }}</td>
                    <td class="p-2 border">{{ site.population ?? 'N/A' }}</td>
                    <td class="p-2 border">
                        <button
                            @click="openDetails(site)"
                            class="text-indigo-600 hover:underline"
                        >
                            View Details
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <MhpSiteDetailsModal
            :show="showDetailsModal"
            :site="selectedSite"
            @close="closeDetails"
        />
    </div>
</template>

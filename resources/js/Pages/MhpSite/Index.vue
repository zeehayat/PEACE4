<script setup>
import { ref, watch } from 'vue'
import { router } from '@inertiajs/vue3'

const props = defineProps({
    flash: Object,
    mhpSites: Object, // paginated
    filters: Object
})

// reactive filters
const cboFilter = ref(props.filters.cbo ?? '')
const statusFilter = ref(props.filters.status ?? '')

watch([cboFilter, statusFilter], () => {
    router.get('/mhp-sites', {
        cbo: cboFilter.value,
        status: statusFilter.value
    }, { preserveState: true, replace: true })
})

const destroy = (id) => {
    if (confirm('Are you sure you want to delete this site?')) {
        router.delete(`/mhp-sites/${id}`)
    }
}

const showFlash = ref(true)
</script>

<template>
    <div class="max-w-7xl mx-auto mt-6 space-y-4">
        <h1 class="text-3xl font-bold">MHP Sites</h1>

        <!-- Flash messages -->
        <div v-if="flash?.success && showFlash" class="bg-green-100 text-green-800 p-2 rounded relative">
            {{ flash.success }}
            <button @click="showFlash = false" class="absolute right-2 top-1 text-xl">&times;</button>
        </div>

        <!-- Filters -->
        <div class="flex gap-2 flex-wrap">
            <input
                v-model="cboFilter"
                placeholder="Search by CBO reference"
                class="border rounded p-1"
            />
            <select v-model="statusFilter" class="border rounded p-1">
                <option value="">All Statuses</option>
                <option>New</option>
                <option>Rehab</option>
                <option>Upgradation</option>
            </select>

            <a
                href="/mhp-sites/create"
                class="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                + Add MHP Site
            </a>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white border">
                <thead>
                <tr class="bg-gray-100">
                    <th class="p-2 text-left border">ID</th>
                    <th class="p-2 text-left border">CBO</th>
                    <th class="p-2 text-left border">Status</th>
                    <th class="p-2 text-left border">Population</th>
                    <th class="p-2 text-left border">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="site in mhpSites.data"
                    :key="site.id"
                    class="hover:bg-gray-50"
                >
                    <td class="p-2 border">{{ site.id }}</td>
                    <td class="p-2 border">{{ site.cbo?.reference_code ?? 'N/A' }}</td>
                    <td class="p-2 border">{{ site.status }}</td>
                    <td class="p-2 border">{{ site.population }}</td>
                    <td class="p-2 border space-x-1">
                        <a
                            :href="`/mhp-sites/${site.id}/edit`"
                            class="text-blue-600 hover:underline"
                        >Edit</a>
                        |
                        <button
                            @click="destroy(site.id)"
                            class="text-red-600 hover:underline"
                        >Delete</button>
                    </td>
                </tr>
                <tr v-if="mhpSites.data.length === 0">
                    <td colspan="5" class="text-center p-4 text-gray-500">No MHP Sites found.</td>
                </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center space-x-2 mt-4">
            <button
                v-if="mhpSites.prev_page_url"
                @click="router.get(mhpSites.prev_page_url, {}, { preserveState: true, replace: true })"
                class="px-3 py-1 border rounded hover:bg-gray-100"
            >
                Previous
            </button>
            <span>Page {{ mhpSites.current_page }} of {{ mhpSites.last_page }}</span>
            <button
                v-if="mhpSites.next_page_url"
                @click="router.get(mhpSites.next_page_url, {}, { preserveState: true, replace: true })"
                class="px-3 py-1 border rounded hover:bg-gray-100"
            >
                Next
            </button>
        </div>
    </div>
</template>

<style scoped>
table {
    @apply border-collapse w-full;
}
th,
td {
    @apply px-3 py-2;
}
</style>

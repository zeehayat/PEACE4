<script setup>
import {ref} from 'vue';
import {router} from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import SelectInput from '@/Components/SelectInput.vue';
// Assuming MhpDetailsModal is in the correct path
import MhpDetailsModal from '@/Pages/MHP/Modals/MhpDetailsModal.vue';
import axios from 'axios';
import {route} from "ziggy-js"; // Ensure axios is available for direct API calls

const props = defineProps({
    mhpSites: Object, // Paginated results from the controller
    districts: Array,
    filters: Object,
});

const form = ref({
    district: props.filters.district || '',
    status: props.filters.status || '',
});

// Local state for the modal
const showDetailsModal = ref(false);
const selectedSite = ref(null);

const statusOptions = [
    { value: 'New', label: 'New' },
    { value: 'Approved', label: 'Approved' },
    { value: 'Under Construction', label: 'Under Construction' },
    { value: 'Completed', label: 'Completed' },
];

const applyFilters = () => {
    router.get(route('mhp.reports.index'), form.value, {
        preserveState: true,
        replace: true,
    });
};

const clearFilters = () => {
    form.value.district = '';
    form.value.status = '';
    applyFilters();
};

const exportData = () => {
    // Triggers the dedicated export controller method with current filters
    window.location.href = route('mhp.reports.export', form.value);
};

const openDetailsModal = (siteId) => {
    // Use the CORRECT route name: 'mhp.sites.details'
    const apiUrl = route('mhp.sites.details', { mhpSite: siteId });

    // Make a direct Axios GET request to fetch the detailed JSON data
    axios.get(apiUrl)
        .then(response => {
            // Assuming the controller returns data structured as { mhpSite: {...} }
            selectedSite.value = response.data.mhpSite;
            showDetailsModal.value = true;
        })
        .catch(error => {
            console.error("Error fetching site details:", error);
            // Optionally, display a user-friendly message
            // alert('Failed to load MHP details. Check console for error.');
        });
};

const closeDetailsModal = () => {
    showDetailsModal.value = false;
    selectedSite.value = null;
};
</script>

<template>
    <AppLayout title="MHP Comprehensive Report">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">MHP Comprehensive Report</h2>
        </template>

        <div class="py-12">
            <div class="max-w-full mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                    <!-- Filters and Export -->
                    <div class="flex flex-wrap items-end justify-between gap-4 mb-6 pb-4 border-b">
                        <div class="flex flex-wrap gap-4">
                            <div>
                                <label for="district" class="block text-sm font-medium text-gray-700">District</label>
                                <SelectInput
                                    id="district"
                                    v-model="form.district"
                                    :options="[{ value: '', label: 'All Districts' }, ...districts.map(d => ({ value: d, label: d }))]"
                                    class="mt-1 block w-48"
                                />
                            </div>
                            <div>
                                <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
                                <SelectInput
                                    id="status"
                                    v-model="form.status"
                                    :options="[{ value: '', label: 'All Statuses' }, ...statusOptions]"
                                    class="mt-1 block w-48"
                                />
                            </div>
                            <div class="flex items-end space-x-2">
                                <PrimaryButton @click="applyFilters" class="h-10">Apply Filters</PrimaryButton>
                                <button @click="clearFilters" type="button" class="h-10 px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300">Clear</button>
                            </div>
                        </div>

                        <PrimaryButton @click="exportData" class="h-10 bg-green-600 hover:bg-green-700">
                            <i class="mdi mdi-microsoft-excel mr-2"></i> Export to Excel/CSV
                        </PrimaryButton>
                    </div>

                    <!-- Report Table -->
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project ID</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MHP Descriptive Name</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Linked CBO Details</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity (KW)</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Civil Progress (%)</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">E&M Progress (%)</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Financial MHP (PKR)</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Financial T&D (PKR)</th>
                            </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="site in mhpSites.data" :key="site.id">
                                <!-- Details Button -->
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    <SecondaryButton @click="openDetailsModal(site.id)" class="px-3 py-1 text-xs">
                                        Details
                                    </SecondaryButton>
                                </td>

                                <!-- Existing data columns -->
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{{ site.project_identifier }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ site.site_name }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ site.cbo_name }} ({{ site.cbo_reference }})</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ site.status }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-right">{{ site.planned_capacity_kw }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-right">{{ Math.round(site.civil_progress_sum) }}%</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-right">{{ Math.round(site.eme_progress_sum) }}%</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-right">{{ Math.round(site.total_financial_mhp).toLocaleString() }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-right">{{ Math.round(site.total_financial_tandd).toLocaleString() }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div v-if="mhpSites.links.length > 3" class="mt-4">
                        <div class="flex flex-wrap -mb-1">
                            <template v-for="(link, key) in mhpSites.links" :key="key">
                                <div v-if="link.url === null" class="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded-md" v-html="link.label" />
                                <button v-else :class="{ 'bg-indigo-500 text-white': link.active }" class="mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded-md hover:bg-white focus:border-indigo-500 focus:text-indigo-500" @click="router.get(link.url)" v-html="link.label" />
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- MHP Details Modal Component -->
        <MhpDetailsModal
            :show="showDetailsModal"
            :mhpSite="selectedSite"
            @close="closeDetailsModal"
        />
    </AppLayout>
</template>

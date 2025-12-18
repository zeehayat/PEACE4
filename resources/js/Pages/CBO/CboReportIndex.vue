<script setup>
import { ref, watch } from 'vue';
import { router, Link, usePage } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import Pagination from '@/Components/Pagination.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import SelectInput from '@/Components/SelectInput.vue';
import DatePicker from '@/Components/DatePicker.vue';
import Modal from '@/Components/Modal.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';

const props = defineProps({
    reportData: Object, // Paginated CBO data with eager-loaded activities
    filters: Object,
    filterOptions: Object, // { districts: [...], tehsils: [...] }
});

// --- State Management ---
const form = ref({
    district: props.filters.district || '',
    tehsil: props.filters.tehsil || '',
    village_council: props.filters.village_council || '',
    cbo_name: props.filters.cbo_name || '',
    date_from: props.filters.date_from || null,
    date_to: props.filters.date_to || null,
});

const showDetailsModal = ref(false);
const selectedCbo = ref(null);

// --- Utility Functions ---

const formatNullableDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        return new Date(dateString).toLocaleDateString('en-GB');
    } catch (e) {
        return dateString; // Return original if formatting fails
    }
};

// --- Filter and Interaction Logic ---

const applyFilters = () => {
    router.get(route('cbo.reports.cbo.index'), form.value, {
        preserveState: true,
        replace: true,
    });
};

const clearFilters = () => {
    form.value = {
        district: '',
        tehsil: '',
        village_council: '',
        cbo_name: '',
        date_from: null,
        date_to: null,
    };
    applyFilters();
};

const goToPage = (url) => {
    // Navigate to a new page while preserving current filters
    router.get(url, form.value, {
        preserveScroll: true,
        preserveState: true,
    });
};

const exportReport = () => {
    // Generate a non-Inertia GET request to the dedicated export endpoint
    const url = route('cbo.reports.cbo.export', form.value);
    window.location.href = url;
};

const openDetailsModal = (cbo) => {
    selectedCbo.value = cbo;
    showDetailsModal.value = true;
};

const closeModal = () => {
    showDetailsModal.value = false;
    selectedCbo.value = null;
};
</script>

<template>
    <AppLayout title="CBO Activity Report">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">CBO Activity Report</h2>
        </template>

        <div class="py-12">
            <div class="max-w-full mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">

                    <!-- Filter Section -->
                    <div class="flex flex-col gap-4 mb-6 pb-4 border-b">
                        <h3 class="text-lg font-semibold text-gray-700">Filter CBOs</h3>
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">

                            <!-- District Filter -->
                            <div>
                                <label for="district" class="block text-sm font-medium text-gray-700">District</label>
                                <SelectInput
                                    id="district"
                                    v-model="form.district"
                                    :options="[{ value: '', label: 'All Districts' }, ...props.filterOptions.districts.map(d => ({ value: d, label: d }))]"
                                    class="mt-1 block w-full"
                                />
                            </div>

                            <!-- Tehsil Filter -->
                            <div>
                                <label for="tehsil" class="block text-sm font-medium text-gray-700">Tehsil</label>
                                <SelectInput
                                    id="tehsil"
                                    v-model="form.tehsil"
                                    :options="[{ value: '', label: 'All Tehsils' }, ...props.filterOptions.tehsils.map(t => ({ value: t, label: t }))]"
                                    class="mt-1 block w-full"
                                />
                            </div>

                            <!-- CBO Name Search -->
                            <div>
                                <label for="cbo_name" class="block text-sm font-medium text-gray-700">CBO Name Search</label>
                                <TextInput
                                    id="cbo_name"
                                    v-model="form.cbo_name"
                                    type="text"
                                    placeholder="Enter CBO Name"
                                    class="mt-1 block w-full"
                                />
                            </div>

                            <!-- Date From Filter -->
                            <div>
                                <label for="date_from" class="block text-sm font-medium text-gray-700">Formed After</label>
                                <DatePicker id="date_from" v-model="form.date_from" placeholder="Date From" class="mt-1 block w-full" />
                            </div>

                            <!-- Date To Filter -->
                            <div>
                                <label for="date_to" class="block text-sm font-medium text-gray-700">Formed Before</label>
                                <DatePicker id="date_to" v-model="form.date_to" placeholder="Date To" class="mt-1 block w-full" />
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex flex-wrap gap-3 mt-2 items-center">
                            <PrimaryButton @click="applyFilters" class="h-10">Apply Filters</PrimaryButton>
                            <SecondaryButton @click="clearFilters" class="h-10">Clear Filters</SecondaryButton>
                            <PrimaryButton @click="exportReport" class="h-10 bg-green-600 hover:bg-green-700">Export to Excel</PrimaryButton>
                        </div>
                    </div>

                    <!-- Main Data Table -->
                    <div class="overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CBO Name</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District / Tehsil</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">President</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Secretary</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Formed</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
                                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Dialogues</th>
                                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Trainings</th>
                                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Exp. Visits</th>
                                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                            </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="cbo in reportData.data" :key="cbo.id">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ cbo.cbo_name }} ({{ cbo.reference_code }})
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {{ cbo.district }} / {{ cbo.tehsil }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    <div class="font-semibold text-gray-900">{{ cbo.president_name ?? 'N/A' }}</div>
                                    <div class="text-xs text-gray-500">{{ cbo.president_contact ?? '—' }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    <div class="font-semibold text-gray-900">{{ cbo.secretary_name ?? 'N/A' }}</div>
                                    <div class="text-xs text-gray-500">{{ cbo.secretary_contact ?? '—' }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {{ formatNullableDate(cbo.date_of_formation) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-right">{{ cbo.total_members }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-center">{{ cbo.dialogues_count }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-center">{{ cbo.trainings_count }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-center">{{ cbo.exposure_visits_count }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    <SecondaryButton @click="openDetailsModal(cbo)" class="px-3 py-1 text-xs">
                                        View Activities
                                    </SecondaryButton>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div class="mt-4">
                        <Pagination :links="reportData.links" @page-changed="goToPage" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Activity Details Modal -->
        <Modal :show="showDetailsModal" @close="closeModal" :maxWidth="'5xl'" :title="`Activities for: ${selectedCbo?.cbo_name ?? ''}`">
            <div v-if="selectedCbo" class="p-6 space-y-6 max-h-[85vh] overflow-y-auto">

                <!-- Dialogues Section -->
                <section class="border-b pb-4">
                    <h3 class="text-lg font-bold text-indigo-700 mb-3">Community Dialogues ({{ selectedCbo.dialogues_count }})</h3>
                    <div v-if="selectedCbo.dialogues.length" class="space-y-3">
                        <div v-for="dialogue in selectedCbo.dialogues" :key="dialogue.id" class="p-3 border rounded-lg bg-indigo-50">
                            <p class="font-semibold">Date: {{ formatNullableDate(dialogue.date_of_dialogue) }} | Participants: {{ dialogue.participants }}</p>
                            <div v-if="dialogue.remarks" class="text-sm mt-1" v-html="dialogue.remarks"></div>
                            <AttachmentViewer v-if="dialogue.attachments_frontend.length" :attachments="dialogue.attachments_frontend" class="mt-2 text-xs" />
                        </div>
                    </div>
                    <p v-else class="text-sm text-gray-500">No dialogue records found.</p>
                </section>

                <!-- Trainings Section -->
                <section class="border-b pb-4">
                    <h3 class="text-lg font-bold text-teal-700 mb-3">O&M Trainings ({{ selectedCbo.trainings_count }})</h3>
                    <div v-if="selectedCbo.trainings.length" class="space-y-3">
                        <div v-for="training in selectedCbo.trainings" :key="training.id" class="p-3 border rounded-lg bg-teal-50">
                            <p class="font-semibold">Date: {{ formatNullableDate(training.date_of_training) }} | Type: {{ training.training_type }}</p>
                            <p class="text-sm">Total Participants: {{ training.total_participants }}</p>
                            <AttachmentViewer v-if="training.attachments_frontend.length" :attachments="training.attachments_frontend" class="mt-2 text-xs" />
                        </div>
                    </div>
                    <p v-else class="text-sm text-gray-500">No training records found.</p>
                </section>

                <!-- Exposure Visits Section -->
                <section class="pb-4">
                    <h3 class="text-lg font-bold text-orange-700 mb-3">Exposure Visits ({{ selectedCbo.exposure_visits_count }})</h3>
                    <div v-if="selectedCbo.exposure_visits.length" class="space-y-3">
                        <div v-for="visit in selectedCbo.exposure_visits" :key="visit.id" class="p-3 border rounded-lg bg-orange-50">
                            <p class="font-semibold">Date: {{ formatNullableDate(visit.date_of_visit) }} | Purpose: {{ visit.purpose_of_visit }}</p>
                            <p class="text-sm">Participants: {{ visit.participants }}</p>
                            <AttachmentViewer v-if="visit.attachments_frontend.length" :attachments="visit.attachments_frontend" class="mt-2 text-xs" />
                        </div>
                    </div>
                    <p v-else class="text-sm text-gray-500">No exposure visit records found.</p>
                </section>

                <div class="flex justify-end pt-4">
                    <PrimaryButton @click="closeModal">Close</PrimaryButton>
                </div>
            </div>
            <div v-else class="p-6 text-center text-gray-500">Loading details...</div>
        </Modal>
    </AppLayout>
</template>

<script setup>
import { reactive, watch, ref, computed } from 'vue';
import { router } from '@inertiajs/vue3';
import axios from 'axios';

import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';
import CboExposureVisitForm from '@/Pages/CBO/Forms/CboExposureVisitForm.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';

const props = defineProps({
    show: Boolean, // Controls modal visibility
    cbo: { // The CBO object whose exposure visits we are managing
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close', 'saved']);

const isLoadingVisits = ref(true);
const exposureVisits = ref([]); // Local state for the list of visits
const showForm = ref(false); // Controls visibility of the form within this modal
const selectedVisit = ref(null); // The visit item being edited (or null for new)
const formMode = ref('create'); // 'create' or 'update' for the form

// Helper function to format nullable dates for display
const formatNullableDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
        console.error('Error parsing date:', dateString, e);
        return 'Invalid Date';
    }
};

// Fetch exposure visits for the current CBO
const fetchExposureVisits = async () => {
    isLoadingVisits.value = true;
    try {
        const response = await axios.get(
            route('cbo.cbos.exposure-visits.index', { cbo: props.cbo.id, 'only-data': true })
        );

        // FIX: Add a nullish coalescing operator (?? []) to ensure it's always an array
        exposureVisits.value = response.data.exposureVisits ?? [];
        console.log('Fetched exposure visits via Axios:', exposureVisits.value);

    } catch (error) {
        console.error('Error fetching CBO exposure visits:', error);
    } finally {
        isLoadingVisits.value = false;
    }
};

// Watch for modal visibility to fetch data when it opens
watch(() => props.show, (newVal) => {
    if (newVal && props.cbo) {
        fetchExposureVisits();
        showForm.value = false;
        selectedVisit.value = null;
        formMode.value = 'create';
    } else {
        exposureVisits.value = []; // Clear data when modal closes
    }
});

// Handlers for managing the form state
const openCreateForm = () => {
    selectedVisit.value = null;
    formMode.value = 'create';
    showForm.value = true;
};

const openEditForm = (visit) => {
    selectedVisit.value = visit;
    formMode.value = 'update';
    showForm.value = true;
};

// NEW: Handler to open the view modal for a specific visit (optional)
const openViewVisitModal = (visit) => {
    selectedVisit.value = visit;
    // showVisitViewModal.value = true; // Placeholder for a dedicated view modal if you create one
};

const handleFormSuccess = (message) => {
    showForm.value = false;
    selectedVisit.value = null;
    fetchExposureVisits();
    emit('saved', message);
};

const handleFormCancel = () => {
    showForm.value = false;
    selectedVisit.value = null;
};

const handleDeleteVisit = (visitId) => {
    if (confirm('Are you sure you want to delete this exposure visit entry?')) {
        axios.delete(route('cbo.cbos.exposure-visits.destroy', { cbo: props.cbo.id, 'exposure_visit': visitId }))
            .then(response => {
                emit('saved', 'Exposure Visit deleted successfully!');
                fetchExposureVisits();
            })
            .catch(error => {
                console.error('Error deleting exposure visit:', error);
            });
    }
};

const closeModal = () => {
    emit('close');
};

const modalTitle = computed(() => {
    if (showForm.value) {
        return formMode.value === 'create' ? `Add Exposure Visit for CBO: ${props.cbo.reference_code}` : `Edit Exposure Visit for CBO: ${props.cbo.reference_code}`;
    }
    return `Manage Exposure Visits for CBO: ${props.cbo.reference_code}`;
});
</script>

<template>
    <Modal :show="show" @close="closeModal" :maxWidth="'5xl'" :title="modalTitle">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <div v-if="!showForm" class="space-y-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-semibold text-gray-800">Existing Exposure Visit Entries</h3>
                    <PrimaryButton @click="openCreateForm">
                        + Add New Visit
                    </PrimaryButton>
                </div>

                <div v-if="isLoadingVisits" class="text-center py-8 text-gray-500">
                    Loading exposure visit entries...
                </div>

                <div v-else-if="exposureVisits.length === 0" class="text-center py-8 text-gray-500">
                    No exposure visit entries recorded yet for this CBO.
                </div>

                <div v-else class="grid grid-cols-1 gap-4">
                    <div v-for="visit in exposureVisits" :key="visit.id" class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <p class="text-lg font-semibold text-indigo-700">Visit on {{ formatNullableDate(visit.date_of_visit) }}</p>
                                <p class="text-sm text-gray-600">Purpose: {{ visit.purpose_of_visit ?? 'N/A' }}</p>
                                <p class="text-sm text-gray-600">Participants: {{ visit.participants ?? 'N/A' }}</p>
                            </div>
                            <div class="flex space-x-2">
                                <PrimaryButton @click="openEditForm(visit)" class="px-3 py-1 text-sm">Edit</PrimaryButton>
                                <DangerButton @click="handleDeleteVisit(visit.id)" class="px-3 py-1 text-sm">Delete</DangerButton>
                            </div>
                        </div>
                        <div v-if="visit.remarks" class="text-sm text-gray-700 mt-2">
                            Remarks: <span class="text-gray-600 prose max-w-none" v-html="visit.remarks"></span>
                        </div>
                        <div v-if="visit.attachments_frontend && visit.attachments_frontend.length" class="mt-3">
                            <p class="text-sm font-semibold text-gray-700 mb-1">Attachments:</p>
                            <AttachmentViewer :attachments="visit.attachments_frontend" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- The Form is rendered conditionally -->
            <CboExposureVisitForm
                v-else
                :cbo-id="cbo.id"
                :exposure-visit="selectedVisit"
                :mode="formMode"
                @success="handleFormSuccess"
                @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

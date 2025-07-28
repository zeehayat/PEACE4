<script setup>
import { reactive, watch, ref, computed } from 'vue';
// import { router } from '@inertiajs/vue3'; // REMOVE router import
import axios from 'axios'; // <--- ADD AXIOS IMPORT

import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';
import CboTrainingForm from '@/Pages/CBO/Forms/CboTrainingForm.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';

const props = defineProps({
    show: Boolean, // Controls modal visibility
    cbo: { // The CBO object whose trainings we are managing
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close', 'saved']);

const isLoadingTrainings = ref(true);
const trainings = ref([]); // Local state for the list of trainings
const showForm = ref(false); // Controls visibility of the form within this modal
const selectedTraining = ref(null); // The training item being edited (or null for new)
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

// Fetch trainings for the current CBO
const fetchTrainings = async () => {
    isLoadingTrainings.value = true;
    try {
        // FIX: Change router.get to axios.get
        const response = await axios.get(
            route('cbo.cbos.trainings.index', { cbo: props.cbo.id, 'only-data': true })
        );

        // FIX: Access response.data directly, as it's now pure JSON
        trainings.value = response.data.trainings; // Assuming controller returns {'trainings': [...]}
        console.log('Fetched trainings via Axios:', trainings.value); // Debug log

    } catch (error) {
        console.error('Error fetching CBO trainings:', error);
    } finally {
        isLoadingTrainings.value = false;
    }
};

// Watch for modal visibility to fetch data when it opens
watch(() => props.show, (newVal) => {
    if (newVal && props.cbo) {
        fetchTrainings();
        showForm.value = false; // Start by showing the list, not the form
        selectedTraining.value = null;
        formMode.value = 'create';
    } else {
        trainings.value = []; // Clear data when modal closes
    }
});

// Handlers for managing the form state
const openCreateForm = () => {
    selectedTraining.value = null;
    formMode.value = 'create';
    showForm.value = true;
};

const openEditForm = (training) => {
    selectedTraining.value = training;
    formMode.value = 'update';
    showForm.value = true;
};

// NEW: Handler to open the view modal for a specific training (optional)
const openViewTrainingModal = (training) => {
    selectedTraining.value = training; // Set the training to view
    // showTrainingViewModal.value = true; // Placeholder for a dedicated view modal if you create one
};

const handleFormSuccess = (message) => {
    showForm.value = false; // Hide form, show list
    selectedTraining.value = null; // Clear selected item
    fetchTrainings(); // Re-fetch list to show updated data
    emit('saved', message); // Notify parent (Index.vue) for toast
};

const handleFormCancel = () => {
    showForm.value = false; // Hide form, show list
    selectedTraining.value = null; // Clear selected item
};

const handleDeleteTraining = (trainingId) => {
    if (confirm('Are you sure you want to delete this training entry?')) {
        // FIX: Change router.delete to axios.delete for pure API calls
        axios.delete(route('cbo.cbos.trainings.destroy', { cbo: props.cbo.id, training: trainingId }))
            .then(response => {
                emit('saved', 'Training deleted successfully!');
                fetchTrainings(); // Re-fetch the list
            })
            .catch(error => {
                console.error('Error deleting training:', error);
            });
    }
};

const closeModal = () => {
    emit('close');
};

const modalTitle = computed(() => {
    if (showForm.value) {
        return formMode.value === 'create' ? `Add Training for CBO: ${props.cbo.reference_code}` : `Edit Training for CBO: ${props.cbo.reference_code}`;
    }
    return `Manage Trainings for CBO: ${props.cbo.reference_code}`;
});
</script>

<template>
    <Modal :show="show" @close="closeModal" :maxWidth="'5xl'" :title="modalTitle">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <div v-if="!showForm" class="space-y-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-semibold text-gray-800">Existing Training Entries</h3>
                    <PrimaryButton @click="openCreateForm">
                        + Add New Training
                    </PrimaryButton>
                </div>

                <div v-if="isLoadingTrainings" class="text-center py-8 text-gray-500">
                    Loading training entries...
                </div>

                <div v-else-if="trainings.length === 0" class="text-center py-8 text-gray-500">
                    No training entries recorded yet for this CBO.
                </div>

                <div v-else class="grid grid-cols-1 gap-4">
                    <div v-for="training in trainings" :key="training.id" class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <p class="text-lg font-semibold text-indigo-700">Training on {{ formatNullableDate(training.date_of_training) }}</p>
                                <p class="text-sm text-gray-600">Type: {{ training.training_type ?? 'N/A' }}</p>
                                <p class="text-sm text-gray-600">Gender: {{ training.training_gender ?? 'N/A' }}</p>
                                <p class="text-sm text-gray-600">Participants: {{ training.total_participants ?? 'N/A' }}</p>
                            </div>
                            <div class="flex space-x-2">
                                <PrimaryButton @click="openEditForm(training)" class="px-3 py-1 text-sm">Edit</PrimaryButton>
                                <DangerButton @click="handleDeleteTraining(training.id)" class="px-3 py-1 text-sm">Delete</DangerButton>
                            </div>
                        </div>
                        <div v-if="training.remarks" class="text-sm text-gray-700 mt-2">
                            Remarks: <span class="text-gray-600 prose max-w-none" v-html="training.remarks"></span>
                        </div>
                        <div v-if="training.attachments_frontend && training.attachments_frontend.length" class="mt-3">
                            <p class="text-sm font-semibold text-gray-700 mb-1">Attachments:</p>
                            <AttachmentViewer :attachments="training.attachments_frontend" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- The Form is rendered conditionally -->
            <CboTrainingForm
                v-else
                :cbo-id="cbo.id"
                :training="selectedTraining"
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

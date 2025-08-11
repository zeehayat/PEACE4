<script setup>
import { reactive, watch, ref, computed } from 'vue';
import { router } from '@inertiajs/vue3';
import axios from 'axios';

import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';
import ProjectPhysicalProgressForm from '@/Pages/Irrigation/Forms/ProjectPhysicalProgressForm.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';

const props = defineProps({
    show: Boolean,
    scheme: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close', 'saved']);

const isLoadingProgress = ref(true);
const physicalProgresses = ref([]);
const showForm = ref(false);
const selectedProgress = ref(null);
const formMode = ref('create');

const formatNullableDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
        return 'Invalid Date';
    }
};

// FIX: This method will now ensure it fetches the latest data
const fetchProgresses = async () => {
    isLoadingProgress.value = true;
    try {
        const response = await axios.get(
            route('irrigation.schemes.physical-progresses.index', { scheme: props.scheme.id, 'only-data': true })
        );
        physicalProgresses.value = response.data.physicalProgresses ?? [];
        console.log('Fetched physical progress data:', physicalProgresses.value); // Debugging log
    } catch (error) {
        console.error('Error fetching physical progress:', error);
    } finally {
        isLoadingProgress.value = false;
    }
};

watch(() => props.show, (newVal) => {
    if (newVal && props.scheme) {
        fetchProgresses();
        showForm.value = false;
        selectedProgress.value = null;
        formMode.value = 'create';
    } else {
        physicalProgresses.value = [];
    }
}, { immediate: true });

const openCreateForm = () => {
    selectedProgress.value = null;
    formMode.value = 'create';
    showForm.value = true;
};
const openEditForm = (progress) => {
    selectedProgress.value = progress;
    formMode.value = 'update';
    showForm.value = true;
};
const handleFormSuccess = (message) => {
    showForm.value = false;
    selectedProgress.value = null;
    fetchProgresses(); // FIX: Call the fetch method to update the list
    emit('saved', message); // Emit saved event to the parent
};
const handleFormCancel = () => {
    showForm.value = false;
    selectedProgress.value = null;
};
const handleDeleteProgress = (progressId) => {
    if (confirm('Are you sure you want to delete this physical progress entry?')) {
        router.delete(route('irrigation.schemes.physical-progresses.destroy', { scheme: props.scheme.id, physical_progress: progressId }), {
            onSuccess: () => {
                emit('saved', 'Physical Progress deleted successfully!');
                fetchProgresses();
            },
            onError: (errors) => {
                console.error('Error deleting physical progress:', errors);
            }
        });
    }
};
const closeModal = () => {
    emit('close');
};

const modalTitle = computed(() => {
    if (showForm.value) {
        return formMode.value === 'create' ? `Add Physical Progress for Scheme: ${props.scheme.cbo?.reference_code}` : `Edit Physical Progress for Scheme: ${props.scheme.cbo?.reference_code}`;
    }
    return `Manage Physical Progress for Scheme: ${props.scheme.cbo?.reference_code}`;
});
</script>

<template>
    <Modal :show="show" @close="closeModal" :maxWidth="'5xl'" :title="modalTitle">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <div v-if="!showForm" class="space-y-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-semibold text-gray-800">Existing Physical Progress Entries</h3>
                    <PrimaryButton @click="openCreateForm">
                        + Add New Progress
                    </PrimaryButton>
                </div>

                <div v-if="isLoadingProgress" class="text-center py-8 text-gray-500">
                    Loading physical progress entries...
                </div>

                <div v-else-if="physicalProgresses.length === 0" class="text-center py-8 text-gray-500">
                    No physical progress entries recorded yet.
                </div>

                <div v-else class="grid grid-cols-1 gap-4">
                    <div v-for="progress in physicalProgresses" :key="progress.id" class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <p class="text-lg font-semibold text-indigo-700">Progress: {{ progress.progress_percentage ?? 'N/A' }}%</p>
                                <p class="text-sm text-gray-600">Date: {{ formatNullableDate(progress.progress_date) }}</p>
                                <p class="text-sm text-gray-600">Payment For: {{ progress.payment_for ?? 'N/A' }}</p>
                            </div>
                            <div class="flex space-x-2">
                                <PrimaryButton @click="openEditForm(progress)" class="px-3 py-1 text-sm">Edit</PrimaryButton>
                                <DangerButton @click="handleDeleteProgress(progress.id)" class="px-3 py-1 text-sm">Delete</DangerButton>
                            </div>
                        </div>
                        <div v-if="progress.remarks" class="text-sm text-gray-700 mt-2">
                            Remarks: <span class="text-gray-600 prose max-w-none" v-html="progress.remarks"></span>
                        </div>
                        <div v-if="progress.attachments_frontend && progress.attachments_frontend.length" class="mt-3">
                            <p class="text-sm font-semibold text-gray-700 mb-1">Attachments:</p>
                            <AttachmentViewer :attachments="progress.attachments_frontend" />
                        </div>
                    </div>
                </div>
            </div>

            <ProjectPhysicalProgressForm
                v-else
                :scheme-id="scheme.id"
                :progress="selectedProgress"
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

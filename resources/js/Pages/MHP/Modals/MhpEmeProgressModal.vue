<script setup>
import { reactive, watch, ref, computed } from 'vue';
import { router } from '@inertiajs/vue3';

import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';
import ProjectPhysicalProgressForm from '@/Pages/MHP/Forms/ProjectPhysicalProgressForm.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';

const props = defineProps({
    show: Boolean,
    site: {
        type: Object,
        required: true,
    },
    progressType: {
        type: String,
        required: true,
        validator: (value) => ['T&D', 'EME', 'Civil'].includes(value),
    },
});

const emit = defineEmits(['close', 'saved']);

const isLoadingProgress = ref(true);
const physicalProgresses = ref([]);
const showForm = ref(false);
const selectedProgress = ref(null);
const formMode = ref('create');

const fetchPhysicalProgress = async () => {
    if (!props.site || !props.site.id) {
        console.error('Error: Site object or ID is missing.');
        return;
    }
    isLoadingProgress.value = true;
    try {
        const response = await router.get(
            route('mhp.physical-progresses.index', { site: props.site.id }),
            { 'only-data': true, 'payment_for': props.progressType },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
        physicalProgresses.value = response.props.physicalProgresses;
    } catch (error) {
        console.error('API call failed to fetch physical progress:', error);
    } finally {
        isLoadingProgress.value = false;
    }
};

watch(() => props.show, (newVal) => {
    if (newVal && props.site && props.site.id) {
        fetchPhysicalProgress();
        showForm.value = false;
        selectedProgress.value = null;
        formMode.value = 'create';
    } else {
        physicalProgresses.value = [];
    }
});

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
    fetchPhysicalProgress();
    emit('saved', message);
};

const handleFormCancel = () => {
    showForm.value = false;
    selectedProgress.value = null;
};

const handleDeleteProgress = (progressId) => {
    if (confirm('Are you sure you want to delete this physical progress entry?')) {
        router.delete(route('mhp.sites.physical-progresses.destroy', { site: props.site.id, physical_progress: progressId }), {
            onSuccess: () => {
                emit('saved', 'Physical Progress deleted successfully!');
                fetchPhysicalProgress();
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
        return formMode.value === 'create' ? `Record ${props.progressType} Progress for ${props.site.project_id}` : `Edit ${props.progressType} Progress for ${props.site.project_id}`;
    }
    return `Manage ${props.progressType} Progress for ${props.site.project_id}`;
});
</script>

<template>
    <Modal :show="show" @close="closeModal" :maxWidth="'5xl'" :title="modalTitle">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <div v-if="!showForm" class="space-y-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-semibold text-gray-800">Existing {{ progressType }} Progress Entries</h3>
                    <PrimaryButton @click="openCreateForm">
                        + Record New Progress
                    </PrimaryButton>
                </div>

                <div v-if="isLoadingProgress" class="text-center py-8 text-gray-500">
                    Loading physical progress entries...
                </div>

                <div v-else-if="physicalProgresses.length === 0" class="text-center py-8 text-gray-500">
                    No physical progress entries recorded yet for this site.
                </div>

                <div v-else class="grid grid-cols-1 gap-4">
                    <div v-for="progress in physicalProgresses" :key="progress.id" class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <p class="text-lg font-semibold text-indigo-700">{{ progress.progress_percentage }}% Progress</p>
                                <p class="text-sm text-gray-600">on {{ new Date(progress.progress_date).toLocaleDateString() }}</p>
                                <p class="text-sm text-gray-500">Type: <span class="font-medium">{{ progress.payment_for }}</span></p>
                                <p v-if="progress.activity" class="text-xs text-gray-500">
                                    Activity: {{ progress.activity.name || `T&D Work #${progress.activity.id}` }}
                                </p>
                            </div>
                            <div class="flex space-x-2">
                                <PrimaryButton @click="openEditForm(progress)" class="px-3 py-1 text-sm">Edit</PrimaryButton>
                                <DangerButton @click="handleDeleteProgress(progress.id)" class="px-3 py-1 text-sm">Delete</DangerButton>
                            </div>
                        </div>
                        <p v-if="progress.remarks" class="text-sm text-gray-700 mt-2">
                            Remarks: <span class="text-gray-600">{{ progress.remarks }}</span>
                        </p>
                        <div v-if="progress.attachments_frontend && progress.attachments_frontend.length" class="mt-3">
                            <p class="text-sm font-semibold text-gray-700 mb-1">Attachments:</p>
                            <AttachmentViewer :attachments="progress.attachments_frontend" />
                        </div>
                    </div>
                </div>
            </div>

            <ProjectPhysicalProgressForm
                v-else
                :mhp-site-id="site.id"
                :progress-type="progressType"
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

<script setup>
import { reactive, watch, ref, computed } from 'vue';
import { router } from '@inertiajs/vue3';
import axios from 'axios';

import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';
import ProjectPhysicalProgressForm from '@/Pages/MHP/Forms/ProjectPhysicalProgressForm.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';

const props = defineProps({
    show: Boolean, // Controls modal visibility
    site: { // The MHP Site object whose progress we are managing
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close', 'saved']);

const isLoadingProgress = ref(true);
const physicalProgresses = ref([]); // Local state for the list of progress entries
const showForm = ref(false); // Controls visibility of the form within this modal
const selectedProgress = ref(null); // The progress item being edited (or null for new)
const formMode = ref('create'); // 'create' or 'update' for the form
const progressTypeForForm = ref('Civil'); // To hold the type for the new progress form

// Fetch physical progress for the current site
const fetchPhysicalProgress = async () => {
    isLoadingProgress.value = true;
    try {
        const { data } = await axios.get(
            // keep route params clean: ONLY the path params belong here
            route('mhp.sites.physical-progresses.index', { site: props.site.id }),
            {
                headers: { Accept: 'application/json' },   // force JSON instead of an Inertia page
                params: {
                    // optional: add a filter if you want
                    // payment_for: 'EME' | 'Civil' | 'T&D'
                },
            }
        );

        // Accept both { physicalProgresses: [...] } or a raw array
        const raw = Array.isArray(data) ? data : (data?.physicalProgresses ?? []);

        // Normalize to what your template renders
        physicalProgresses.value = raw.map(p => ({
            id: p.id,
            percentage: p.progress_percentage ?? p.percentage ?? 0,
            date: p.progress_date ?? p.date,
            type: p.payment_for ?? p.type,
            remarks: p.remarks ?? '',
            attachments: p.attachments_frontend ?? p.attachments ?? [],
            original_model: p, // keep full model for edit/delete
        }));

        // Optional: log once to verify the shape
        // console.log('Loaded physical progresses:', physicalProgresses.value);
    } catch (error) {
        console.error('API call failed to fetch physical progress:', error);
        physicalProgresses.value = [];
    } finally {
        isLoadingProgress.value = false;
    }
};



// Watch for modal visibility to fetch data when it opens
watch(() => props.show, (newVal) => {
    if (newVal && props.site) {
        fetchPhysicalProgress();
        showForm.value = false; // Start by showing the list, not the form
        selectedProgress.value = null;
        formMode.value = 'create';
    } else {
        physicalProgresses.value = []; // Clear data when modal closes
    }
});

// Handlers for managing the form state
const openCreateForm = (type) => {
    selectedProgress.value = null;
    formMode.value = 'create';
    progressTypeForForm.value = type;
    showForm.value = true;
};

const openEditForm = (progress) => {
    // The 'progress' object is from our mapped collection.
    // We need to pass the original model to the form for editing.
    selectedProgress.value = progress.original_model;
    // Set the correct type for the form
    progressTypeForForm.value = progress.type;
    formMode.value = 'update';
    showForm.value = true;
};

const handleFormSuccess = (message) => {
    showForm.value = false; // Hide form, show list
    selectedProgress.value = null; // Clear selected item
    fetchPhysicalProgress(); // Re-fetch list to show updated data
    emit('saved', message); // Notify parent (Index.vue) for toast
};

const handleFormCancel = () => {
    showForm.value = false; // Hide form, show list
    selectedProgress.value = null; // Clear selected item
};

const handleDeleteProgress = (progress) => {
    // The progress object is from our mapped collection.
    // We need the ID from the original model to send to the backend.
    const progressId = progress.original_model.id;
    const progressType = progress.type;

    if (confirm(`Are you sure you want to delete this ${progressType} progress entry?`)) {
        // The destroy route is the same for all unified progress types.
        router.delete(route('mhp.sites.physical-progresses.destroy', { physical_progress: progressId }), {
            onSuccess: () => {
                emit('saved', 'Physical Progress deleted successfully!');
                fetchPhysicalProgress(); // Re-fetch the list
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
        const action = formMode.value === 'create' ? 'Record' : 'Edit';
        return `${action} ${progressTypeForForm.value} Progress for ${props.site.project_id}`;
    }
    return `Manage Physical Progress for ${props.site.project_id}`;
});
</script>

<template>

    <Modal :show="show" @close="closeModal" :maxWidth="'5xl'">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ modalTitle }}</h2>
            <div v-if="!showForm" class="space-y-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-semibold text-gray-800">Record New Progress</h3>
                    <div class="flex space-x-2">
                        <PrimaryButton @click="openCreateForm('Civil')">+ Civil</PrimaryButton>
                        <PrimaryButton @click="openCreateForm('T&D')">+ T&D</PrimaryButton>
                        <PrimaryButton @click="openCreateForm('EME')">+ EME</PrimaryButton>
                    </div>
                </div>

                <div class="border-t border-gray-200 pt-4">
                    <h3 class="text-xl font-semibold text-gray-800 mb-4">Existing Entries</h3>
                    <div v-if="isLoadingProgress" class="text-center py-8 text-gray-500">
                        Loading physical progress entries...
                    </div>
                    <div v-else-if="physicalProgresses.length === 0" class="text-center py-8 text-gray-500">
                        No physical progress entries recorded yet for this site.
                    </div>
                    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div v-for="progress in physicalProgresses" :key="progress.id" class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                            <div class="flex justify-between items-start mb-2">
                                <div>
                                    <p class="text-lg font-semibold text-indigo-700">{{ progress.percentage }}% Progress</p>
                                    <p class="text-sm text-gray-600">on {{ new Date(progress.date).toLocaleDateString() }}</p>
                                    <p class="text-sm text-gray-500">Type: <span class="font-medium">{{ progress.type }}</span></p>
                                    <p v-if="progress.original_model.activity" class="text-xs text-gray-500">
                                        Activity: {{ progress.original_model.activity.name || `T&D Work #${progress.original_model.activity.id}` }}
                                    </p>
                                </div>
                                <div class="flex space-x-2">
                                    <PrimaryButton @click="openEditForm(progress)" class="px-3 py-1 text-sm">Edit</PrimaryButton>
                                    <DangerButton @click="handleDeleteProgress(progress)" class="px-3 py-1 text-sm">Delete</DangerButton>
                                </div>
                            </div>
                            <p v-if="progress.remarks" class="text-sm text-gray-700 mt-2">
                                Remarks: <span class="text-gray-600">{{ progress.remarks }}</span>
                            </p>
                            <div v-if="progress.attachments && progress.attachments.length" class="mt-3">
                                <p class="text-sm font-semibold text-gray-700 mb-1">Attachments:</p>
                                <AttachmentViewer :attachments="progress.attachments" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ProjectPhysicalProgressForm
                v-else
                :mhp-site-id="site.id"
                :progress="selectedProgress"
                :mode="formMode"
                :progress-type="progressTypeForForm"
                @success="handleFormSuccess"
                @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

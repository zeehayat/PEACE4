<script setup>
import { reactive, watch, ref, computed } from 'vue';
import { router } from '@inertiajs/vue3';

import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';
import CboDialogueForms from '@/Pages/CBO/Forms/CboDialogueForms.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';

const props = defineProps({
    show: Boolean, // Controls modal visibility
    cbo: { // The CBO object whose dialogues we are managing
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close', 'saved']);

const isLoadingDialogues = ref(true);
const dialogues = ref([]); // Local state for the list of dialogue entries
const showForm = ref(false); // Controls visibility of the form within this modal
const selectedDialogue = ref(null); // The dialogue item being edited (or null for new)
const formMode = ref('create'); // 'create' or 'update' for the form

// Helper function to format nullable dates for display
const formatNullableDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid Date';
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

// Fetch dialogues for the current CBO
const fetchDialogues = async () => {
    isLoadingDialogues.value = true;
    try {
        const response = await router.get(
            // FIX: Add 'only-data': true to tell the backend to return JSON
            route('cbo.cbos.dialogues.index', { cbo: props.cbo.id, 'only-data': true }),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onSuccess: (page) => {
                    // FIX: Access response.data directly, not page.props, because it's now JSON
                    dialogues.value = page.props.dialogues.data; // Assuming controller returns 'dialogues' key
                },
                onError: (errors) => {
                    console.error('Error fetching CBO dialogues:', errors);
                }
            }
        );
    } catch (error) {
        console.error('API call failed to fetch CBO dialogues:', error);
    } finally {
        isLoadingDialogues.value = false;
    }
};

// Watch for modal visibility to fetch data when it opens
watch(() => props.show, (newVal) => {
    if (newVal && props.cbo) {
        fetchDialogues();
        showForm.value = false; // Start by showing the list, not the form
        selectedDialogue.value = null;
        formMode.value = 'create';
    } else {
        dialogues.value = []; // Clear data when modal closes
    }
});

// Handlers for managing the form state
const openCreateForm = () => {
    selectedDialogue.value = null;
    formMode.value = 'create';
    showForm.value = true;
};

const openEditForm = (dialogue) => {
    selectedDialogue.value = dialogue;
    formMode.value = 'update';
    showForm.value = true;
};

const handleFormSuccess = (message) => {
    showForm.value = false; // Hide form, show list
    selectedDialogue.value = null; // Clear selected item
    fetchDialogues(); // Re-fetch list to show updated data
    emit('saved', message); // Notify parent (Index.vue) for toast
};

const handleFormCancel = () => {
    showForm.value = false; // Hide form, show list
    selectedDialogue.value = null; // Clear selected item
};

const handleDeleteDialogue = (dialogueId) => {
    if (confirm('Are you sure you want to delete this dialogue entry?')) {
        router.delete(route('cbo.cbos.dialogues.destroy', { cbo: props.cbo.id, dialogue: dialogueId }), {
            onSuccess: () => {
                emit('saved', 'Dialogue deleted successfully!');
                fetchDialogues(); // Re-fetch the list
            },
            onError: (errors) => {
                console.error('Error deleting dialogue:', errors);
            }
        });
    }
};

const closeModal = () => {
    emit('close');
};

const modalTitle = computed(() => {
    if (showForm.value) {
        return formMode.value === 'create' ? `Add Dialogue for CBO: ${props.cbo.reference_code}` : `Edit Dialogue for CBO: ${props.cbo.reference_code}`;
    }
    return `Manage Dialogues for CBO: ${props.cbo.reference_code}`;
});
</script>

<template>
    <Modal :show="show" @close="closeModal" :maxWidth="'5xl'" :title="modalTitle">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <div v-if="!showForm" class="space-y-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-semibold text-gray-800">Existing Dialogue Entries</h3>
                    <PrimaryButton @click="openCreateForm">
                        + Add New Dialogue
                    </PrimaryButton>
                </div>

                <div v-if="isLoadingDialogues" class="text-center py-8 text-gray-500">
                    Loading dialogue entries...
                </div>

                <div v-else-if="dialogues.length === 0" class="text-center py-8 text-gray-500">
                    No dialogue entries recorded yet for this CBO.
                </div>

                <div v-else class="grid grid-cols-1 gap-4">
                    <div v-for="dialogue in dialogues" :key="dialogue.id" class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <p class="text-lg font-semibold text-indigo-700">Dialogue on {{ formatNullableDate(dialogue.date_of_dialogue) }}</p>
                                <p class="text-sm text-gray-600">Participants: {{ dialogue.participants ?? 'N/A' }}</p>
                            </div>
                            <div class="flex space-x-2">
                                <PrimaryButton @click="openEditForm(dialogue)" class="px-3 py-1 text-sm">Edit</PrimaryButton>
                                <DangerButton @click="handleDeleteDialogue(dialogue.id)" class="px-3 py-1 text-sm">Delete</DangerButton>
                            </div>
                        </div>
                        <div v-if="dialogue.remarks" class="text-sm text-gray-700 mt-2">
                            Remarks: <span class="text-gray-600 prose max-w-none" v-html="dialogue.remarks"></span>
                        </div>
                        <div v-if="dialogue.attachments_frontend && dialogue.attachments_frontend.length" class="mt-3">
                            <p class="text-sm font-semibold text-gray-700 mb-1">Attachments:</p>
                            <AttachmentViewer :attachments="dialogue.attachments_frontend" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- The Form is rendered conditionally -->
            <CboDialogueForms
                v-else
                :cbo-id="cbo.id"
                :dialogue="selectedDialogue"
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

<script setup>
import { reactive, watch, ref, computed } from 'vue';
import { router } from '@inertiajs/vue3';
import axios from 'axios';

import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';
import CboDialogueForm from '@/Pages/CBO/Forms/CboDialogueForms.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';
import CboDialogueViewModal from '@/Pages/CBO/Modals/CboDialogueViewModal.vue'; // <--- ADD THIS IMPORT

const props = defineProps({
    show: Boolean,
    cbo: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close', 'saved']);

const isLoadingDialogues = ref(true);
const dialogues = ref([]);
const showForm = ref(false);
const selectedDialogue = ref(null);
const formMode = ref('create');

const showDialogueViewModal = ref(false); // <--- NEW: Flag for the view modal

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

const fetchDialogues = async () => {
    isLoadingDialogues.value = true;
    try {
        const response = await axios.get(
            route('cbo.cbos.dialogues.index', { cbo: props.cbo.id, 'only-data': true })
        );
        dialogues.value = response.data.dialogues;
    } catch (error) {
        console.error('Error fetching CBO dialogues:', error);
    } finally {
        isLoadingDialogues.value = false;
    }
};

watch(() => props.show, (newVal) => {
    if (newVal && props.cbo) {
        fetchDialogues();
        showForm.value = false;
        selectedDialogue.value = null;
        formMode.value = 'create';
        showDialogueViewModal.value = false; // Ensure view modal is closed on main modal open
    } else {
        dialogues.value = [];
    }
});

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

// NEW: Handler to open the view modal for a specific dialogue
const openViewDialogueModal = (dialogue) => {
    selectedDialogue.value = dialogue; // Set the dialogue to view
    showDialogueViewModal.value = true; // Open the view modal
};

const handleFormSuccess = (message) => {
    showForm.value = false;
    selectedDialogue.value = null;
    fetchDialogues();
    emit('saved', message);
};

const handleFormCancel = () => {
    showForm.value = false;
    selectedDialogue.value = null;
};

const handleDeleteDialogue = (dialogueId) => {
    if (confirm('Are you sure you want to delete this dialogue entry?')) {
        axios.delete(route('cbo.cbos.dialogues.destroy', { cbo: props.cbo.id, dialogue: dialogueId }))
            .then(response => {
                emit('saved', 'Dialogue deleted successfully!');
                fetchDialogues();
            })
            .catch(error => {
                console.error('Error deleting dialogue:', error);
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
                                <PrimaryButton @click="openViewDialogueModal(dialogue)" class="px-3 py-1 text-sm">View</PrimaryButton> <!-- NEW: View Button -->
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
            <CboDialogueForm
                v-else
                :cbo-id="cbo.id"
                :dialogue="selectedDialogue"
                :mode="formMode"
                @success="handleFormSuccess"
                @cancel="handleFormCancel"
            />
        </div>
    </Modal>

    <!-- NEW: CboDialogueViewModal -->
    <CboDialogueViewModal v-if="selectedDialogue" :show="showDialogueViewModal" :dialogue="selectedDialogue" @close="showDialogueViewModal = false" />
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

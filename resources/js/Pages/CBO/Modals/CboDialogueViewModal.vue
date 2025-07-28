<script setup>
import { computed } from 'vue';
import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue'; // For the close button
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue'; // For attachments

const props = defineProps({
    show: Boolean,
    dialogue: {
        type: Object, // The full CboDialogue object with loaded relationships
        required: true,
    },
});

const emit = defineEmits(['close']);

// Helper function to format nullable dates
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

// Computed properties for conditional rendering
const hasRemarks = computed(() => props.dialogue.remarks && props.dialogue.remarks.trim() !== '');
const hasAttachments = computed(() => props.dialogue.attachments_frontend && props.dialogue.attachments_frontend.length > 0);
</script>

<template>
    <Modal :show="show" @close="emit('close')" :maxWidth="'3xl'" :title="`Dialogue Details for CBO: ${dialogue.cbo?.reference_code ?? 'N/A'}`">
        <div class="p-6 overflow-y-auto max-h-[85vh] text-gray-800 print-content">
            <section class="mb-8 pb-6">
                <h2 class="text-xl font-bold mb-4">Dialogue Information</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div class="detail-item">
                        <p class="font-semibold text-gray-700">Date of Dialogue:</p>
                        <p>{{ formatNullableDate(dialogue.date_of_dialogue) }}</p>
                    </div>
                    <div class="detail-item">
                        <p class="font-semibold text-gray-700">Participants:</p>
                        <p>{{ dialogue.participants ?? 'N/A' }}</p>
                    </div>
                </div>
            </section>

            <div v-if="hasRemarks" class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h2 class="text-xl font-bold mb-4">Remarks</h2>
                <div class="text-gray-800 prose max-w-none" v-html="dialogue.remarks"></div>
            </div>

            <div v-if="hasAttachments" class="mt-6">
                <h2 class="text-xl font-bold mb-4">Attachments</h2>
                <AttachmentViewer :attachments="dialogue.attachments_frontend" />
            </div>
            <div v-else class="mt-6 text-gray-500 text-sm">
                No attachments available.
            </div>

            <div class="flex justify-end mt-6 print:hidden">
                <PrimaryButton @click="emit('close')">Close</PrimaryButton>
            </div>
        </div>
    </Modal>
</template>

<style scoped>
.detail-item p {
    margin-bottom: 0.25rem;
}
.detail-item p:last-child {
    margin-bottom: 0;
}
</style>

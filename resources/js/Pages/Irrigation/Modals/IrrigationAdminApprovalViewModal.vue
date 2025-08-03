<script setup>
import { computed } from 'vue';
import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';

const props = defineProps({
    show: Boolean,
    approval: {
        type: Object, // The full IrrigationAdminApproval object with loaded relationships
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
        return 'Invalid Date';
    }
};

const formatNullableCurrency = (value) => {
    if (value === null || value === undefined) return 'N/A';
    return `PKR ${parseFloat(value).toFixed(2)}`;
};

const hasAttachments = computed(() => props.approval.attachments_frontend && props.approval.attachments_frontend.length > 0);
const hasRevisions = computed(() => props.approval.cost_revisions && props.approval.cost_revisions.length > 0);
</script>

<template>
    <Modal :show="show" @close="emit('close')" :maxWidth="'4xl'" :title="`Admin Approval Details`">
        <div class="p-6 overflow-y-auto max-h-[85vh] text-gray-800 print-content">
            <section class="mb-8 pb-6">
                <h2 class="text-xl font-bold mb-4">Approval Information</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div class="detail-item"><p class="font-semibold text-gray-700">Scheme ID:</p><p>{{ approval.irrigation_scheme_id }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Approved Vendor:</p><p>{{ approval.approved_vendor ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Vendor ID:</p><p>{{ approval.vendor?.name ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Approved Cost:</p><p>{{ formatNullableCurrency(approval.approved_cost) }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Date of Technical Surveys:</p><p>{{ formatNullableDate(approval.date_technical_surveys) }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Design & Estimates Submission:</p><p>{{ formatNullableDate(approval.date_design_estimates_submission_psu) }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Validation Visit by PSU:</p><p>{{ formatNullableDate(approval.date_validation_visit_psu) }}</p></div>
                </div>
            </section>

            <section v-if="hasRevisions" class="mb-8 border-b pb-6">
                <h2 class="text-xl font-bold mb-4">Cost Revisions</h2>
                <div v-for="revision in approval.cost_revisions" :key="revision.id" class="p-4 border rounded-md mb-2">
                    <p class="font-semibold">Revision #{{ revision.revision_number }}</p>
                    <p class="text-sm">Cost: PKR {{ revision.revised_cost }} on {{ formatNullableDate(revision.approved_on) }}</p>
                </div>
            </section>

            <div v-if="hasAttachments" class="mt-6">
                <h2 class="text-xl font-bold mb-4">Attachments</h2>
                <AttachmentViewer :attachments="approval.attachments_frontend" />
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

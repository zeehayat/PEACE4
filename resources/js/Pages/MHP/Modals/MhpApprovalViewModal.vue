<script setup>
import { computed } from 'vue';
import Modal from '@/Components/Modal.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue'; // Assuming this exists

const props = defineProps({
    show: Boolean,
    approval: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close']);

const formatNullableDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid Date';
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const formatNullableCurrency = (value) => {
    if (value === null || value === undefined || value === '') return 'N/A';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PKR', minimumFractionDigits: 2 }).format(value);
};

const hasRemarks = computed(() => {
    return props.approval.remarks && props.approval.remarks.trim() !== '';
});
</script>

<template>
    <Modal :show="show" @close="emit('close')" :maxWidth="'3xl'" title="MHP Admin Approval Details">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div class="detail-item">
                    <p class="font-semibold text-gray-700">EU Approval Date:</p>
                    <p class="text-gray-900">{{ formatNullableDate(approval.eu_approval_date) }}</p>
                </div>
                <div class="detail-item">
                    <p class="font-semibold text-gray-700">Approved Cost:</p>
                    <p class="text-gray-900">{{ formatNullableCurrency(approval.approved_cost) }}</p>
                </div>
                <div class="detail-item">
                    <p class="font-semibold text-gray-700">Revised Cost 1:</p>
                    <p class="text-gray-900">{{ formatNullableCurrency(approval.revised_cost_1) }}</p>
                </div>
                <div class="detail-item">
                    <p class="font-semibold text-gray-700">Revised Cost 2:</p>
                    <p class="text-gray-900">{{ formatNullableCurrency(approval.revised_cost_2) }}</p>
                </div>
                <div class="detail-item">
                    <p class="font-semibold text-gray-700">Revised Cost 3:</p>
                    <p class="text-gray-900">{{ formatNullableCurrency(approval.revised_cost_3) }}</p>
                </div>
                <div class="detail-item">
                    <p class="font-semibold text-gray-700">HPP Inauguration Date:</p>
                    <p class="text-gray-900">{{ formatNullableDate(approval.hpp_inauguration_date) }}</p>
                </div>
                <div class="detail-item">
                    <p class="font-semibold text-gray-700">Technical Survey Date:</p>
                    <p class="text-gray-900">{{ formatNullableDate(approval.technical_survey_date) }}</p>
                </div>
                <div class="detail-item">
                    <p class="font-semibold text-gray-700">Date Design PSU Submission:</p>
                    <p class="text-gray-900">{{ formatNullableDate(approval.date_design_psu_submission) }}</p>
                </div>
                <div class="detail-item">
                    <p class="font-semibold text-gray-700">Head Office Review Submission Date:</p>
                    <p class="text-gray-900">{{ formatNullableDate(approval.headoffice_review_submission_date) }}</p>
                </div>
                <div class="detail-item">
                    <p class="font-semibold text-gray-700">Design Estimate Date:</p>
                    <p class="text-gray-900">{{ formatNullableDate(approval.design_estimate_date) }}</p>
                </div>
                <div class="detail-item">
                    <p class="font-semibold text-gray-700">EU Approval Submission Date:</p>
                    <p class="text-gray-900">{{ formatNullableDate(approval.eu_approval_submission_date) }}</p>
                </div>
                <div class="detail-item">
                    <p class="font-semibold text-gray-700">OPM Validation Date:</p>
                    <p class="text-gray-900">{{ formatNullableDate(approval.opm_validation_date) }}</p>
                </div>
            </div>

            <div v-if="hasRemarks" class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p class="font-semibold text-gray-700 mb-2">Remarks:</p>
                <p class="text-gray-800 whitespace-pre-wrap">{{ approval.remarks }}</p>
            </div>

            <div v-if="approval.attachments_frontend && approval.attachments_frontend.length" class="mt-6">
                <p class="font-semibold text-gray-700 mb-2">Attachments:</p>
                <AttachmentViewer :attachments="approval.attachments_frontend" />
            </div>
            <div v-else class="mt-6 text-gray-500 text-sm">
                No attachments available.
            </div>

            <div class="flex justify-end mt-6">
                <PrimaryButton @click="emit('close')">Close</PrimaryButton>
            </div>
        </div>
    </Modal>
</template>

<style scoped>
.detail-item {
    padding: 0.5rem 0;
}
</style>

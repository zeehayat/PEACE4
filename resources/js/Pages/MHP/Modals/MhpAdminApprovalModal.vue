<script setup>
import { ref, computed, watch } from 'vue';
import Modal from '@/Components/Modal.vue';
import MhpAdminApprovalForm from '@/Pages/MHP/Forms/MhpAdminApprovalForm.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';
import { formatCurrency, formatDate } from '@/Utils/formatters';

const props = defineProps({
    show: Boolean,
    mhpSiteId: {
        type: Number,
        required: true,
    },
    approval: {
        type: Object,
        default: null,
    },
    action: {
        type: String,
        default: 'create',
    },
});

const emit = defineEmits(['close', 'updated']);

const isEditing = ref(false);

// Initialize editing state based on whether approval exists or action is create/edit
watch(() => props.show, (isVisible) => {
    if (isVisible) {
        isEditing.value = !props.approval || props.action === 'update';
    }
});

const modalTitle = computed(() => {
    if (isEditing.value) {
        return props.approval ? 'Edit Administrative Approval' : 'Add Administrative Approval';
    }
    return 'Administrative Approval Details';
});

const handleFormSuccess = (message) => {
    emit('updated', message);
    emit('close');
};

const handleFormCancel = () => {
    if (props.approval) {
        isEditing.value = false;
    } else {
        emit('close');
    }
};

const hasRemarks = computed(() => {
    return props.approval?.remarks && props.approval.remarks.trim() !== '';
});
</script>

<template>
    <Modal :show="show" @close="emit('close')" :maxWidth="'4xl'" :title="modalTitle">
        <!-- Edit Mode (Form View) -->
        <div v-if="isEditing" class="p-6 max-h-[75vh] overflow-y-auto">
            <MhpAdminApprovalForm
                :mhp-site-id="mhpSiteId"
                :approval="approval"
                :action="approval ? 'update' : 'create'"
                @success="handleFormSuccess"
                @cancel="handleFormCancel"
            />
        </div>

        <!-- View Mode (Details View) -->
        <div v-else-if="approval" class="p-6 max-h-[75vh] overflow-y-auto space-y-6">
            <div class="bg-paper-50 border border-ink-200 rounded-xl p-5 space-y-4">
                <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base">task_alt</span>
                    Approval Milestones & Budgets
                </h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                    <div class="flex flex-col">
                        <span class="text-xs font-semibold text-ink-500">EU Approval Date</span>
                        <span class="text-ink-900 font-medium mt-0.5">{{ formatDate(approval.eu_approval_date) }}</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-xs font-semibold text-ink-500">Approved Cost</span>
                        <span class="text-emerald-700 font-bold mt-0.5">{{ formatCurrency(approval.approved_cost) }}</span>
                    </div>
                    <div class="flex flex-col border-t pt-2 md:border-t-0 md:pt-0">
                        <span class="text-xs font-semibold text-ink-500">Revised Cost 1</span>
                        <span class="text-ink-900 font-semibold mt-0.5">{{ formatCurrency(approval.revised_cost_1) }}</span>
                    </div>
                    <div class="flex flex-col border-t pt-2 md:border-t-0 md:pt-0">
                        <span class="text-xs font-semibold text-ink-500">Revised Cost 2</span>
                        <span class="text-ink-900 font-semibold mt-0.5">{{ formatCurrency(approval.revised_cost_2) }}</span>
                    </div>
                    <div class="flex flex-col border-t pt-2">
                        <span class="text-xs font-semibold text-ink-500">Revised Cost 3</span>
                        <span class="text-ink-900 font-semibold mt-0.5">{{ formatCurrency(approval.revised_cost_3) }}</span>
                    </div>
                    <div class="flex flex-col border-t pt-2">
                        <span class="text-xs font-semibold text-ink-500">HPP Inauguration Date</span>
                        <span class="text-ink-900 font-medium mt-0.5">{{ formatDate(approval.hpp_inauguration_date) }}</span>
                    </div>
                </div>
            </div>

            <div class="bg-paper-50 border border-ink-200 rounded-xl p-5 space-y-4">
                <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base">architecture</span>
                    Engineering & Design Submissions
                </h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                    <div class="flex flex-col">
                        <span class="text-xs font-semibold text-ink-500">Technical Survey Date</span>
                        <span class="text-ink-900 font-medium mt-0.5">{{ formatDate(approval.technical_survey_date) }}</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-xs font-semibold text-ink-500">Design PSU Submission Date</span>
                        <span class="text-ink-900 font-medium mt-0.5">{{ formatDate(approval.date_design_psu_submission) }}</span>
                    </div>
                    <div class="flex flex-col border-t pt-2 md:border-t-0 md:pt-0">
                        <span class="text-xs font-semibold text-ink-500">Head Office Review Submission Date</span>
                        <span class="text-ink-900 font-medium mt-0.5">{{ formatDate(approval.headoffice_review_submission_date) }}</span>
                    </div>
                    <div class="flex flex-col border-t pt-2 md:border-t-0 md:pt-0">
                        <span class="text-xs font-semibold text-ink-500">Design Estimate Date</span>
                        <span class="text-ink-900 font-medium mt-0.5">{{ formatDate(approval.design_estimate_date) }}</span>
                    </div>
                    <div class="flex flex-col border-t pt-2">
                        <span class="text-xs font-semibold text-ink-500">EU Approval Submission Date</span>
                        <span class="text-ink-900 font-medium mt-0.5">{{ formatDate(approval.eu_approval_submission_date) }}</span>
                    </div>
                    <div class="flex flex-col border-t pt-2">
                        <span class="text-xs font-semibold text-ink-500">OPM Validation Date</span>
                        <span class="text-ink-900 font-medium mt-0.5">{{ formatDate(approval.opm_validation_date) }}</span>
                    </div>
                </div>
            </div>

            <div v-if="hasRemarks" class="bg-paper-50 border border-ink-200 rounded-xl p-5 space-y-2">
                <h4 class="text-xs font-bold text-ink-500 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base">notes</span>
                    Remarks
                </h4>
                <div class="text-sm text-ink-800 whitespace-pre-wrap leading-relaxed pt-1" v-html="approval.remarks"></div>
            </div>

            <div v-if="approval.attachments_frontend?.length" class="bg-paper-50 border border-ink-200 rounded-xl p-5 space-y-3">
                <h4 class="text-xs font-bold text-ink-500 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base">attachment</span>
                    Attachments
                </h4>
                <div class="pt-1">
                    <AttachmentViewer :attachments="approval.attachments_frontend" />
                </div>
            </div>

            <!-- Footer view actions -->
            <div class="flex items-center justify-end gap-3 pt-2 border-t border-ink-100">
                <button
                    type="button"
                    @click="emit('close')"
                    class="inline-flex items-center px-4 py-2 bg-paper-100 border border-ink-300 rounded-lg font-semibold text-xs text-ink-700 uppercase tracking-widest hover:bg-paper-200 focus:outline-none transition shadow-sm"
                >
                    Close
                </button>
                <button
                    type="button"
                    @click="isEditing = true"
                    class="inline-flex items-center px-4 py-2 bg-emerald-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-700 focus:outline-none transition shadow-sm"
                >
                    Edit Approval
                </button>
            </div>
        </div>
    </Modal>
</template>

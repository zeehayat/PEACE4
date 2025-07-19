<script setup>
import { computed } from 'vue';
import Modal from '@/Components/Modal.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';

const props = defineProps({
    show: Boolean,
    site: {
        type: Object, // The full MhpSite object with loaded relationships
        required: true,
    },
});

const emit = defineEmits(['close']);

// Helper function to format nullable dates
const formatNullableDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid Date';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

// Helper to format currency
const formatNullableCurrency = (value) => {
    if (value === null || value === undefined || value === '') return 'N/A';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PKR', minimumFractionDigits: 2 }).format(value);
};

// Helper for displaying transformer KVA/Qty
const formatTransformers = (transformers) => {
    if (!transformers || transformers.length === 0) return 'N/A';
    // Filter out entries where kva or qty might be null/undefined/empty string from form submission
    const validTransformers = transformers.filter(t => t.kva !== null && t.kva !== '' && t.qty !== null && t.qty !== '');
    if (validTransformers.length === 0) return 'N/A';
    return validTransformers.map(t => `${t.kva} KVA x ${t.qty}`).join(', ');
};

// Computed properties for conditional rendering
const hasSiteAttachments = computed(() => props.site.attachments_frontend && props.site.attachments_frontend.length > 0);
const hasRemarks = computed(() => props.site.remarks && props.site.remarks.trim() !== '');
const hasAdminApprovalRemarks = computed(() => props.site.admin_approval?.remarks && props.site.admin_approval.remarks.trim() !== '');
const hasCompletionRemarks = computed(() => props.site.completion?.remarks && props.site.completion.remarks.trim() !== '');
const hasOperationalCosts = computed(() => props.site.operational_costs && props.site.operational_costs.length > 0);
const hasRevenueRecords = computed(() => props.site.revenue_records && props.site.revenue_records.length > 0);
const hasTAndDWorks = computed(() => props.site.t_and_d_works && props.site.t_and_d_works.length > 0);
const hasPhysicalProgress = computed(() => props.site.physical_progresses && props.site.physical_progresses.length > 0);
const hasFinancialInstallments = computed(() => props.site.financial_installments && props.site.financial_installments.length > 0);

const printDetails = () => {
    window.print();
};
</script>

<template>
    <Modal :show="show" @close="emit('close')" :maxWidth="'6xl'" :title="`MHP Site Details: ${site.project_id}`">
        <div class="p-6 overflow-y-auto max-h-[85vh] text-gray-800 print-content">

            <section class="mb-8 border-b pb-6">
                <h2 class="text-xl font-bold mb-4">General Information</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div class="detail-item"><p class="font-semibold text-gray-700">CBO:</p><p>{{ site.cbo?.reference_code ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Status:</p><p>{{ site.status ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Grid Status:</p><p>{{ site.grid_status ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Population:</p><p>{{ site.population ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Established:</p><p>{{ formatNullableDate(site.month_year_establishment) }} by {{ site.established_by || 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Existing Capacity (KW):</p><p>{{ site.existing_capacity_kw ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Planned Capacity (KW):</p><p>{{ site.planned_capacity_kw ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Head (FT):</p><p>{{ site.head_ft ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Design Discharge (Cusecs):</p><p>{{ site.design_discharge_cusecs ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Channel Length (KM):</p><p>{{ site.channel_length_km ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">TL HT (KM):</p><p>{{ site.tl_ht_km ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">TL LT (KM):</p><p>{{ site.tl_lt_km ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Turbine Type:</p><p>{{ site.turbine_type || 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Alternator Type:</p><p>{{ site.alternator_type || 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Accessible:</p><p>{{ site.accessible || 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Domestic Units:</p><p>{{ site.domestic_units ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Commercial Units:</p><p>{{ site.commercial_units ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Estimated Cost:</p><p>{{ formatNullableCurrency(site.estimated_cost) }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Per KW Cost:</p><p>{{ formatNullableCurrency(site.per_kw_cost) }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Total HH:</p><p>{{ site.total_hh ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Avg HH Size:</p><p>{{ site.avg_hh_size ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Cost Per Capita:</p><p>{{ formatNullableCurrency(site.cost_per_capita) }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Tentative Completion Date:</p><p>{{ formatNullableDate(site.tentative_completion_date) }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Financial Initiation Date:</p><p>{{ formatNullableDate(site.financial_initiation_date) }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Physical Completion Date:</p><p>{{ formatNullableDate(site.physical_completion_date) }}</p></div>
                </div>
                <div v-if="hasRemarks" class="mt-4"><p class="font-semibold text-gray-700">Remarks:</p><p class="text-gray-900 whitespace-pre-wrap">{{ site.remarks }}</p></div>
                <div v-if="hasSiteAttachments" class="mt-4">
                    <p class="font-semibold text-gray-700 mb-2">Attachments:</p>
                    <AttachmentViewer :attachments="site.attachments_frontend" />
                </div>
            </section>


            <section v-if="site.admin_approval" class="mb-8 border-b pb-6">
                <h2 class="text-xl font-bold mb-4">Admin Approval</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div class="detail-item"><p class="font-semibold text-gray-700">EU Approval Date:</p><p>{{ formatNullableDate(site.admin_approval.eu_approval_date) }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Approved Cost:</p><p>{{ formatNullableCurrency(site.admin_approval.approved_cost) }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Revised Cost 1:</p><p>{{ formatNullableCurrency(site.admin_approval.revised_cost_1) }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Revised Cost 2:</p><p>{{ formatNullableCurrency(site.admin_approval.revised_cost_2) }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Revised Cost 3:</p><p>{{ formatNullableCurrency(site.admin_approval.revised_cost_3) }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">HPP Inauguration Date:</p><p>{{ formatNullableDate(site.admin_approval.hpp_inauguration_date) }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Technical Survey Date:</p><p>{{ formatNullableDate(site.admin_approval.technical_survey_date) }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Design PSU Submission Date:</p><p>{{ formatNullableDate(site.admin_approval.date_design_psu_submission) }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Head Office Review Submission Date:</p><p>{{ formatNullableDate(site.admin_approval.headoffice_review_submission_date) }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Design Estimate Date:</p><p>{{ formatNullableDate(site.admin_approval.design_estimate_date) }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">EU Approval Submission Date:</p><p>{{ formatNullableDate(site.admin_approval.eu_approval_submission_date) }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">OPM Validation Date:</p><p>{{ formatNullableDate(site.admin_approval.opm_validation_date) }}</p></div>
                </div>
                <div v-if="hasAdminApprovalRemarks" class="mt-4"><p class="font-semibold text-gray-700">Remarks:</p><p class="text-gray-900 whitespace-pre-wrap">{{ site.admin_approval.remarks }}</p></div>
                <div v-if="site.admin_approval.attachments_frontend && site.admin_approval.attachments_frontend.length" class="mt-4">
                    <p class="font-semibold text-gray-700 mb-2">Attachments:</p>
                    <AttachmentViewer :attachments="site.admin_approval.attachments_frontend" />
                </div>
            </section>


            <section v-if="site.completion" class="mb-8 border-b pb-6">
                <h2 class="text-xl font-bold mb-4">Completion Details</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div class="detail-item"><p class="font-semibold text-gray-700">Scheme Inauguration Date:</p><p>{{ formatNullableDate(site.completion.scheme_inauguration_date) }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Testing & Commissioning Date:</p><p>{{ formatNullableDate(site.completion.testing_commissioning_date) }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Handover Date:</p><p>{{ formatNullableDate(site.completion.handover_date) }}</p></div>
                </div>
                <div v-if="hasCompletionRemarks" class="mt-4"><p class="font-semibold text-gray-700">Remarks:</p><p class="text-gray-900 whitespace-pre-wrap">{{ site.completion.remarks }}</p></div>
                <div v-if="site.completion.attachments_frontend && site.completion.attachments_frontend.length" class="mt-4">
                    <p class="font-semibold text-gray-700 mb-2">Attachments:</p>
                    <AttachmentViewer :attachments="site.completion.attachments_frontend" />
                </div>
            </section>


            <section v-if="hasTAndDWorks" class="mb-8 border-b pb-6">
                <h2 class="text-xl font-bold mb-4">T&D Works</h2>
                <div v-for="tAndD in site.t_and_d_works" :key="tAndD.id" class="mb-6 p-4 border rounded-lg bg-gray-50">
                    <h3 class="text-lg font-semibold mb-2">{{ tAndD.name || `T&D Work #${tAndD.id}` }}</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div class="detail-item"><p class="font-semibold text-gray-700">Initiation Date:</p><p>{{ formatNullableDate(tAndD.date_of_initiation) }}</p></div>
                        <div class="detail-item"><p class="font-semibold text-gray-700">HT Poles:</p><p>{{ tAndD.ht_poles_quantity ?? 'N/A' }}</p></div>
                        <div class="detail-item"><p class="font-semibold text-gray-700">LT Poles:</p><p>{{ tAndD.lt_poles_quantity ?? 'N/A' }}</p></div>
                        <div class="detail-item"><p class="font-semibold text-gray-700">HT Conductor Length (KM):</p><p>{{ tAndD.ht_conductor_length_km ?? 'N/A' }}</p></div>
                        <div class="detail-item"><p class="font-semibold text-gray-700">HT Conductor Type:</p><p>{{ tAndD.ht_conductor_type || 'N/A' }}</p></div>
                        <div class="detail-item"><p class="font-semibold text-gray-700">LT Conductor Length (KM):</p><p>{{ tAndD.lt_conductor_length_km ?? 'N/A' }}</p></div>
                        <div class="detail-item"><p class="font-semibold text-gray-700">LT Conductor Type:</p><p>{{ tAndD.lt_conductor_type || 'N/A' }}</p></div>
                        <div class="md:col-span-2">
                            <p class="font-semibold text-gray-700">Step-Up Transformers:</p>
                            <p class="text-gray-900">{{ formatTransformers(tAndD.step_up_transformers) }}</p>
                        </div>
                        <div class="md:col-span-2">
                            <p class="font-semibold text-gray-700">Step-Down Transformers:</p>
                            <p class="text-gray-900">{{ formatTransformers(tAndD.step_down_transformers) }}</p>
                        </div>
                        <div v-if="tAndD.scope_of_work" class="md:col-span-2"><p class="font-semibold text-gray-700">Scope of Work:</p><p class="text-gray-900 whitespace-pre-wrap">{{ tAndD.scope_of_work }}</p></div>
                        <div v-if="tAndD.remarks" class="md:col-span-2"><p class="font-semibold text-gray-700">Remarks:</p><p class="text-gray-900 whitespace-pre-wrap">{{ tAndD.remarks }}</p></div>
                    </div>
                    <div v-if="tAndD.attachments_frontend && tAndD.attachments_frontend.length" class="mt-4">
                        <p class="font-semibold text-gray-700 mb-2">Attachments:</p>
                        <AttachmentViewer :attachments="tAndD.attachments_frontend" />
                    </div>
                </div>
            </section>


            <section v-if="hasPhysicalProgress" class="mb-8 border-b pb-6">
                <h2 class="text-xl font-bold mb-4">Physical Progress</h2>
                <div v-for="progress in site.physical_progresses" :key="progress.id" class="mb-4 p-4 border rounded-lg bg-gray-50">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div class="detail-item"><p class="font-semibold text-gray-700">Percentage:</p><p>{{ progress.progress_percentage }}%</p></div>
                        <div class="detail-item"><p class="font-semibold text-gray-700">Date:</p><p>{{ formatNullableDate(progress.progress_date) }}</p></div>
                        <div class="detail-item"><p class="font-semibold text-gray-700">Activity Type:</p><p>{{ progress.payment_for }}</p></div>
                        <div v-if="progress.activity" class="detail-item"><p class="font-semibold text-gray-700">Linked Activity:</p><p>{{ progress.activity.name || `T&D Work #${progress.activity.id}` }}</p></div>
                        <div v-if="progress.remarks" class="md:col-span-2"><p class="font-semibold text-gray-700">Remarks:</p><p class="text-gray-900 whitespace-pre-wrap">{{ progress.remarks }}</p></div>
                    </div>
                    <div v-if="progress.attachments_frontend && progress.attachments_frontend.length" class="mt-4">
                        <p class="font-semibold text-gray-700 mb-2">Attachments:</p>
                        <AttachmentViewer :attachments="progress.attachments_frontend" />
                    </div>
                </div>
            </section>


            <section v-if="hasFinancialInstallments" class="mb-8 border-b pb-6">
                <h2 class="text-xl font-bold mb-4">Financial Installments</h2>
                <div v-for="installment in site.financial_installments" :key="installment.id" class="mb-4 p-4 border rounded-lg bg-gray-50">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div class="detail-item"><p class="font-semibold text-gray-700">Installment #:</p><p>{{ installment.installment_number }}</p></div>
                        <div class="detail-item"><p class="font-semibold text-gray-700">Date:</p><p>{{ formatNullableDate(installment.installment_date) }}</p></div>
                        <div class="detail-item"><p class="font-semibold text-gray-700">Amount:</p><p>{{ formatNullableCurrency(installment.installment_amount) }}</p></div>
                        <div class="detail-item"><p class="font-semibold text-gray-700">Category:</p><p>{{ installment.category || 'N/A' }}</p></div>
                        <div class="detail-item"><p class="font-semibold text-gray-700">Activity Type:</p><p>{{ installment.payment_for }}</p></div>
                        <div v-if="installment.activity" class="detail-item"><p class="font-semibold text-gray-700">Linked Activity:</p><p>{{ installment.activity.name || `T&D Work #${installment.activity.id}` }}</p></div>
                        <div v-if="installment.remarks" class="md:col-span-2"><p class="font-semibold text-gray-700">Remarks:</p><p class="text-gray-900 whitespace-pre-wrap">{{ installment.remarks }}</p></div>
                    </div>
                    <div v-if="installment.attachments_frontend && installment.attachments_frontend.length" class="mt-4">
                        <p class="font-semibold text-gray-700 mb-2">Attachments:</p>
                        <AttachmentViewer :attachments="installment.attachments_frontend" />
                    </div>
                </div>
            </section>


            <section v-if="hasOperationalCosts" class="mb-8 border-b pb-6">
                <h2 class="text-xl font-bold mb-4">Operational Costs</h2>
                <div v-for="cost in site.operational_costs" :key="cost.id" class="mb-4 p-4 border rounded-lg bg-gray-50">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div class="detail-item"><p class="font-semibold text-gray-700">Date:</p><p>{{ formatNullableDate(cost.cost_date) }}</p></div>
                        <div class="detail-item"><p class="font-semibold text-gray-700">Type:</p><p>{{ cost.expense_type?.name || 'N/A' }}</p></div>
                        <div class="detail-item"><p class="font-semibold text-gray-700">Amount:</p><p>{{ formatNullableCurrency(cost.amount) }}</p></div>
                        <div v-if="cost.remarks" class="md:col-span-2"><p class="font-semibold text-gray-700">Remarks:</p><p class="text-gray-900 whitespace-pre-wrap">{{ cost.remarks }}</p></div>
                    </div>
                </div>
            </section>


            <section v-if="hasRevenueRecords" class="mb-8 border-b pb-6">
                <h2 class="text-xl font-bold mb-4">Revenue Records</h2>
                <div v-for="revenue in site.revenue_records" :key="revenue.id" class="mb-4 p-4 border rounded-lg bg-gray-50">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div class="detail-item"><p class="font-semibold text-gray-700">Billing Month:</p><p>{{ formatNullableDate(revenue.billing_month) }}</p></div>
                        <div class="detail-item"><p class="font-semibold text-gray-700">Connection Charges:</p><p>{{ formatNullableCurrency(revenue.connection_charges) }}</p></div>
                        <div class="detail-item"><p class="font-semibold text-gray-700">Billing Amount:</p><p>{{ formatNullableCurrency(revenue.billing_amount) }}</p></div>
                        <div class="detail-item"><p class="font-semibold text-gray-700">Line Rent:</p><p>{{ formatNullableCurrency(revenue.line_rent_amount) }}</p></div>
                        <div class="detail-item"><p class="font-semibold text-gray-700">Late Payment Surcharge:</p><p>{{ formatNullableCurrency(revenue.late_payment_surcharge) }}</p></div>
                        <div class="detail-item"><p class="font-semibold text-gray-700">Fine/Additional Cost:</p><p>{{ formatNullableCurrency(revenue.fine_additional_cost) }}</p></div>
                    </div>
                    <div v-if="revenue.attachments_frontend && revenue.attachments_frontend.length" class="mt-4">
                        <p class="font-semibold text-gray-700 mb-2">Attachments:</p>
                        <AttachmentViewer :attachments="revenue.attachments_frontend" />
                    </div>
                </div>
            </section>

            <div class="flex justify-end mt-6 print:hidden"> <button
                type="button"
                @click="printDetails"
                class="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 mr-3"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6m-6-4v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6"/></svg>
                Print
            </button>
                <button
                    type="button"
                    @click="emit('close')"
                    class="inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                    Close
                </button>
            </div>
        </div>
    </Modal>
</template>

<style>
/* Global print styles for this component.
   Ideally these go into resources/css/app.css or a dedicated print.css. */
@media print {
    /* Hide the main page content. Assuming your Vue app is mounted on #app. */
    #app > :not(.modal-container) {
        display: none !important;
    }

    /* Ensure the modal container itself is visible and correctly positioned for print */
    .modal-container {
        position: static !important; /* Change from fixed to static for print flow */
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        width: 100% !important; /* Full width */
        height: auto !important; /* Auto height */
        max-width: none !important;
        max-height: none !important;
        overflow: visible !important; /* Important: content must not be clipped */
        transform: none !important; /* Remove any transforms */
        background: white !important; /* Ensure white background for print */
        box-shadow: none !important; /* Remove shadows */
        border-radius: 0 !important; /* Remove border-radius */
        margin: 0 !important; /* Remove margins */
        padding: 0 !important; /* Remove padding if added by modal framework */
        display: block !important; /* Ensure it's displayed */
        z-index: auto !important; /* Reset z-index */
    }

    /* Hide the modal backdrop/overlay */
    .modal-backdrop {
        display: none !important;
    }

    /* Adjust modal header/footer for print if needed */
    .modal-header {
        border-bottom: none !important; /* Remove border from header */
        padding-bottom: 0 !important;
        margin-bottom: 0 !important;
        background: none !important;
    }

    /* Adjust modal content body for print */
    .modal-content-body {
        max-height: none !important; /* Allow content to expand */
        overflow: visible !important; /* Ensure no internal scrollbars */
        padding: 1rem !important; /* Add padding back if you removed it from the outer div */
    }

    /* Hide the print button itself */
    .print\:hidden {
        display: none !important;
    }

    /* Ensure attachments are displayed well, but not gigantic images */
    .attachment-viewer img {
        max-width: 100% !important;
        height: auto !important;
    }

    /* Improve readability for text */
    h1, h2, h3, h4, h5, h6 {
        color: #000 !important; /* Ensure black headings */
    }
    p, span, div, li {
        color: #333 !important; /* Darker text for readability */
    }
    .detail-item p {
        color: inherit !important; /* Inherit color for inner elements */
    }
}
</style>

<style scoped>
/* Scoped styles for the component */
.detail-item p {
    margin-bottom: 0.25rem; /* Small space below label in detail item */
}
.detail-item p:last-child {
    margin-bottom: 0; /* No margin below the last paragraph in a detail item */
}
</style>

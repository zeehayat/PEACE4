<script setup>
import { ref, computed } from 'vue';
import Modal from '@/Components/Modal.vue';
import DetailGrid from '@/Components/Shared/DetailGrid.vue';
import DetailItem from '@/Components/Shared/DetailItem.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';
import { formatDate, formatCurrency, formatDecimal } from '@/Utils/formatters';

const props = defineProps({
    show: Boolean,
    site: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close']);
const activeTab = ref('overview');

const tabs = [
    { id: 'overview', name: 'Overview', icon: 'info' },
    { id: 'technical', name: 'Technical & T&D', icon: 'bolt' },
    { id: 'execution', name: 'Approvals & Completion', icon: 'verified' },
    { id: 'progress', name: 'Progress & Costs', icon: 'timeline' },
    { id: 'revenue', name: 'Revenue logs', icon: 'payments' },
];

// Computed properties for checks
const hasSiteAttachments = computed(() => props.site.attachments_frontend && props.site.attachments_frontend.length > 0);
const hasRemarks = computed(() => props.site.remarks && props.site.remarks.trim() !== '');
const hasAdminApprovalRemarks = computed(() => props.site.admin_approval?.remarks && props.site.admin_approval.remarks.trim() !== '');
const hasCompletionRemarks = computed(() => props.site.completion?.remarks && props.site.completion.remarks.trim() !== '');
const hasOperationalCosts = computed(() => props.site.operational_costs && props.site.operational_costs.length > 0);
const hasRevenueRecords = computed(() => props.site.revenue_records && props.site.revenue_records.length > 0);
const hasTAndDWorks = computed(() => props.site.t_and_d_works && props.site.t_and_d_works.length > 0);
const hasPhysicalProgress = computed(() => props.site.physical_progresses && props.site.physical_progresses.length > 0);
const hasFinancialInstallments = computed(() => props.site.financial_installments && props.site.financial_installments.length > 0);

const formatTransformers = (transformers) => {
    if (!transformers || transformers.length === 0) return 'N/A';
    const validTransformers = transformers.filter(t => t.kva !== null && t.kva !== '' && t.qty !== null && t.qty !== '');
    if (validTransformers.length === 0) return 'N/A';
    return validTransformers.map(t => `${t.kva} KVA x ${t.qty}`).join(', ');
};

const printDetails = () => {
    window.print();
};
</script>

<template>
    <Modal :show="show" @close="emit('close')" :maxWidth="'6xl'" :title="`MHP Site Details: ${site.project_id}`">
        <div class="flex flex-col max-h-[85vh] bg-white text-gray-800 print-content">
            
            <!-- Tabbed Header Navigation -->
            <div class="flex flex-wrap border-b border-gray-200 px-6 bg-gray-50 shrink-0 print:hidden">
                <button 
                    v-for="tab in tabs" 
                    :key="tab.id"
                    @click="activeTab = tab.id"
                    class="flex items-center gap-2 py-4 px-4 text-sm font-medium border-b-2 -mb-px transition focus:outline-none"
                    :class="activeTab === tab.id ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'"
                >
                    <span class="material-symbols-outlined text-lg">{{ tab.icon }}</span>
                    {{ tab.name }}
                </button>
            </div>

            <!-- Scrollable Tab Content Container -->
            <div class="flex-1 overflow-y-auto p-6 space-y-6">
                
                <!-- Overview Tab Panel -->
                <div v-show="activeTab === 'overview' || window?.matchMedia?.('print').matches" class="space-y-6">
                    <div>
                        <h3 class="text-base font-bold text-gray-800 border-b pb-2 mb-4">General Information</h3>
                        <DetailGrid>
                            <DetailItem label="CBO" :value="site.cbo?.reference_code" />
                            <DetailItem label="Status" :value="site.status" />
                            <DetailItem label="Grid Connection Status" :value="site.grid_status" />
                            <DetailItem label="Population" :value="site.population" />
                            <DetailItem label="Establishment Date" :value="formatDate(site.month_year_establishment)" />
                            <DetailItem label="Established By" :value="site.established_by" />
                            <DetailItem label="Estimated Cost" :value="formatCurrency(site.estimated_cost)" />
                            <DetailItem label="Per KW Cost" :value="formatCurrency(site.per_kw_cost)" />
                            <DetailItem label="Total Households (HH)" :value="site.total_hh" />
                            <DetailItem label="Average HH Size" :value="site.avg_hh_size" />
                            <DetailItem label="Cost Per Capita" :value="formatCurrency(site.cost_per_capita)" />
                            <DetailItem label="Accessible" :value="site.accessible" />
                            <DetailItem label="Domestic Units" :value="site.domestic_units" />
                            <DetailItem label="Commercial Units" :value="site.commercial_units" />
                            <DetailItem label="Validation Visit by District Engineer" :value="formatDate(site.validation_visit_date)" />
                            <DetailItem label="Recent Visit by Senior Engineer" :value="formatDate(site.recent_senior_engineer_visit_date)" />
                        </DetailGrid>
                        
                        <div v-if="hasRemarks" class="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Remarks</p>
                            <p class="text-sm text-gray-900 whitespace-pre-wrap">{{ site.remarks }}</p>
                        </div>

                        <div v-if="hasSiteAttachments" class="mt-4">
                            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Attachments</p>
                            <AttachmentViewer :attachments="site.attachments_frontend" />
                        </div>
                    </div>
                </div>

                <!-- Technical Tab Panel -->
                <div v-show="activeTab === 'technical'" class="space-y-6">
                    <div>
                        <h3 class="text-base font-bold text-gray-800 border-b pb-2 mb-4">Capacity & Specs</h3>
                        <DetailGrid>
                            <DetailItem label="Planned Capacity" :value="site.planned_capacity_kw ? `${site.planned_capacity_kw} KW` : 'N/A'" />
                            <DetailItem label="Existing Capacity" :value="site.existing_capacity_kw ? `${site.existing_capacity_kw} KW` : 'N/A'" />
                            <DetailItem label="Water Drop Height (Head)" :value="site.head_ft ? `${site.head_ft} FT` : 'N/A'" tooltip="The vertical drop of water drive height in Feet." />
                            <DetailItem label="Water Flow Rate (Discharge)" :value="site.design_discharge_cusecs ? `${site.design_discharge_cusecs} Cusecs` : 'N/A'" tooltip="The design discharge flowing volume in Cubic Feet per Second (Cusecs)." />
                            <DetailItem label="Channel Length" :value="site.channel_length_km ? `${formatDecimal(site.channel_length_km)} KM` : 'N/A'" />
                            <DetailItem label="Transmission Line HT" :value="site.tl_ht_km ? `${site.tl_ht_km} KM` : 'N/A'" />
                            <DetailItem label="Transmission Line LT" :value="site.tl_lt_km ? `${site.tl_lt_km} KM` : 'N/A'" />
                            <DetailItem label="Turbine Type" :value="site.turbine_type" />
                            <DetailItem label="Alternator Type" :value="site.alternator_type" />
                        </DetailGrid>
                    </div>

                    <!-- T&D Works -->
                    <div v-if="hasTAndDWorks" class="space-y-4">
                        <h3 class="text-base font-bold text-gray-800 border-b pb-2">Transmission & Distribution (T&D) Works</h3>
                        <div v-for="tAndD in site.t_and_d_works" :key="tAndD.id" class="p-5 border border-gray-150 rounded-xl bg-gray-50 space-y-4">
                            <h4 class="text-sm font-bold text-emerald-700 flex items-center gap-1.5">
                                <span class="material-symbols-outlined text-base">construction</span>
                                {{ tAndD.name || `T&D Work Record #${tAndD.id}` }}
                            </h4>
                            <DetailGrid>
                                <DetailItem label="Initiation Date" :value="formatDate(tAndD.date_of_initiation)" />
                                <DetailItem label="HT Poles Quantity" :value="tAndD.ht_poles_quantity" />
                                <DetailItem label="LT Poles Quantity" :value="tAndD.lt_poles_quantity" />
                                <DetailItem label="HT Conductor Length" :value="tAndD.ht_conductor_length_km ? `${tAndD.ht_conductor_length_km} KM` : 'N/A'" />
                                <DetailItem label="HT Conductor Type" :value="tAndD.ht_conductor_type" />
                                <DetailItem label="LT Conductor Length" :value="tAndD.lt_conductor_length_km ? `${tAndD.lt_conductor_length_km} KM` : 'N/A'" />
                                <DetailItem label="LT Conductor Type" :value="tAndD.lt_conductor_type" />
                            </DetailGrid>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 text-sm">
                                <div>
                                    <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Step-Up Transformers</p>
                                    <p class="text-gray-900 font-medium">{{ formatTransformers(tAndD.step_up_transformers) }}</p>
                                </div>
                                <div>
                                    <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Step-Down Transformers</p>
                                    <p class="text-gray-900 font-medium">{{ formatTransformers(tAndD.step_down_transformers) }}</p>
                                </div>
                            </div>
                            <div v-if="tAndD.scope_of_work" class="px-4 text-sm">
                                <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Scope of Work</p>
                                <p class="text-gray-900 whitespace-pre-wrap">{{ tAndD.scope_of_work }}</p>
                            </div>
                            <div v-if="tAndD.remarks" class="px-4 text-sm">
                                <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Remarks</p>
                                <p class="text-gray-900 whitespace-pre-wrap">{{ tAndD.remarks }}</p>
                            </div>
                            <div v-if="tAndD.attachments_frontend && tAndD.attachments_frontend.length" class="px-4">
                                <AttachmentViewer :attachments="tAndD.attachments_frontend" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Execution Tab Panel -->
                <div v-show="activeTab === 'execution'" class="space-y-6">
                    <!-- Admin Approval -->
                    <div v-if="site.admin_approval">
                        <h3 class="text-base font-bold text-gray-800 border-b pb-2 mb-4">Admin Approvals</h3>
                        <DetailGrid>
                            <DetailItem label="EU Approval Date" :value="formatDate(site.admin_approval.eu_approval_date)" />
                            <DetailItem label="Approved Cost" :value="formatCurrency(site.admin_approval.approved_cost)" />
                            <DetailItem label="Revised Cost 1" :value="formatCurrency(site.admin_approval.revised_cost_1)" />
                            <DetailItem label="Revised Cost 2" :value="formatCurrency(site.admin_approval.revised_cost_2)" />
                            <DetailItem label="Revised Cost 3" :value="formatCurrency(site.admin_approval.revised_cost_3)" />
                            <DetailItem label="HPP Inauguration Date" :value="formatDate(site.admin_approval.hpp_inauguration_date)" />
                            <DetailItem label="Technical Survey Date" :value="formatDate(site.admin_approval.technical_survey_date)" />
                            <DetailItem label="Design PSU Submission" :value="formatDate(site.admin_approval.date_design_psu_submission)" />
                            <DetailItem label="Head Office Review Submission" :value="formatDate(site.admin_approval.headoffice_review_submission_date)" />
                            <DetailItem label="Design Estimate Date" :value="formatDate(site.admin_approval.design_estimate_date)" />
                            <DetailItem label="EU Approval Submission" :value="formatDate(site.admin_approval.eu_approval_submission_date)" />
                            <DetailItem label="OPM Validation Date" :value="formatDate(site.admin_approval.opm_validation_date)" />
                        </DetailGrid>
                        <div v-if="hasAdminApprovalRemarks" class="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Remarks</p>
                            <p class="text-sm text-gray-900 whitespace-pre-wrap">{{ site.admin_approval.remarks }}</p>
                        </div>
                        <div v-if="site.admin_approval.attachments_frontend && site.admin_approval.attachments_frontend.length" class="mt-4">
                            <AttachmentViewer :attachments="site.admin_approval.attachments_frontend" />
                        </div>
                    </div>

                    <!-- Completion Details -->
                    <div v-if="site.completion">
                        <h3 class="text-base font-bold text-gray-800 border-b pb-2 mb-4">Completion Details</h3>
                        <DetailGrid>
                            <DetailItem label="Scheme Inauguration Date" :value="formatDate(site.completion.scheme_inauguration_date)" />
                            <DetailItem label="Testing & Commissioning Date" :value="formatDate(site.completion.testing_commissioning_date)" />
                            <DetailItem label="Handover Date" :value="formatDate(site.completion.handover_date)" />
                        </DetailGrid>
                        <div v-if="hasCompletionRemarks" class="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Remarks</p>
                            <p class="text-sm text-gray-900 whitespace-pre-wrap">{{ site.completion.remarks }}</p>
                        </div>
                        <div v-if="site.completion.attachments_frontend && site.completion.attachments_frontend.length" class="mt-4">
                            <AttachmentViewer :attachments="site.completion.attachments_frontend" />
                        </div>
                    </div>
                </div>

                <!-- Progress Tab Panel -->
                <div v-show="activeTab === 'progress'" class="space-y-6">
                    <!-- Physical Progress -->
                    <div v-if="hasPhysicalProgress">
                        <h3 class="text-base font-bold text-gray-800 border-b pb-2 mb-4">Physical Progress Records</h3>
                        <div class="space-y-3">
                            <div v-for="progress in site.physical_progresses" :key="progress.id" class="p-4 border rounded-xl bg-gray-50">
                                <DetailGrid>
                                    <DetailItem label="Progress Percentage" :value="`${progress.progress_percentage}%`" />
                                    <DetailItem label="Progress Date" :value="formatDate(progress.progress_date)" />
                                    <DetailItem label="Activity Type (Payment For)" :value="progress.payment_for" />
                                    <DetailItem label="Linked Activity" :value="progress.activity?.name || 'N/A'" />
                                </DetailGrid>
                                <div v-if="progress.remarks" class="px-4 text-sm mt-2">
                                    <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Remarks</p>
                                    <p class="text-gray-900 font-medium whitespace-pre-wrap">{{ progress.remarks }}</p>
                                </div>
                                <div v-if="progress.attachments_frontend && progress.attachments_frontend.length" class="px-4 mt-3">
                                    <AttachmentViewer :attachments="progress.attachments_frontend" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Financial Installments -->
                    <div v-if="hasFinancialInstallments">
                        <h3 class="text-base font-bold text-gray-800 border-b pb-2 mb-4">Financial Installments</h3>
                        <div class="space-y-3">
                            <div v-for="installment in site.financial_installments" :key="installment.id" class="p-4 border rounded-xl bg-gray-50">
                                <DetailGrid>
                                    <DetailItem label="Installment Number" :value="installment.installment_number" />
                                    <DetailItem label="Installment Date" :value="formatDate(installment.installment_date)" />
                                    <DetailItem label="Installment Amount" :value="formatCurrency(installment.installment_amount)" />
                                    <DetailItem label="Category" :value="installment.category" />
                                    <DetailItem label="Payment For" :value="installment.payment_for" />
                                    <DetailItem label="Linked Activity" :value="installment.activity?.name || 'N/A'" />
                                </DetailGrid>
                                <div v-if="installment.remarks" class="px-4 text-sm mt-2">
                                    <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Remarks</p>
                                    <p class="text-gray-900 font-medium whitespace-pre-wrap">{{ installment.remarks }}</p>
                                </div>
                                <div v-if="installment.attachments_frontend && installment.attachments_frontend.length" class="px-4 mt-3">
                                    <AttachmentViewer :attachments="installment.attachments_frontend" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Operational Costs -->
                    <div v-if="hasOperationalCosts">
                        <h3 class="text-base font-bold text-gray-800 border-b pb-2 mb-4">Operational Costs</h3>
                        <div class="space-y-3">
                            <div v-for="cost in site.operational_costs" :key="cost.id" class="p-4 border rounded-xl bg-gray-50">
                                <DetailGrid>
                                    <DetailItem label="Cost Date" :value="formatDate(cost.cost_date)" />
                                    <DetailItem label="Expense Type" :value="cost.expense_type?.name" />
                                    <DetailItem label="Amount" :value="formatCurrency(cost.amount)" />
                                </DetailGrid>
                                <div v-if="cost.remarks" class="px-4 text-sm mt-2">
                                    <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Remarks</p>
                                    <p class="text-gray-900 font-medium whitespace-pre-wrap">{{ cost.remarks }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Revenue Tab Panel -->
                <div v-show="activeTab === 'revenue'" class="space-y-6">
                    <div v-if="hasRevenueRecords">
                        <h3 class="text-base font-bold text-gray-800 border-b pb-2 mb-4">Revenue Records</h3>
                        <div class="space-y-3">
                            <div v-for="revenue in site.revenue_records" :key="revenue.id" class="p-4 border rounded-xl bg-gray-50">
                                <DetailGrid>
                                    <DetailItem label="Billing Month" :value="formatDate(revenue.billing_month)" />
                                    <DetailItem label="Connection Charges" :value="formatCurrency(revenue.connection_charges)" />
                                    <DetailItem label="Billing Amount" :value="formatCurrency(revenue.billing_amount)" />
                                    <DetailItem label="Line Rent" :value="formatCurrency(revenue.line_rent_amount)" />
                                    <DetailItem label="Late Payment Surcharge" :value="formatCurrency(revenue.late_payment_surcharge)" />
                                    <DetailItem label="Fine/Additional Cost" :value="formatCurrency(revenue.fine_additional_cost)" />
                                </DetailGrid>
                                <div v-if="revenue.attachments_frontend && revenue.attachments_frontend.length" class="px-4 mt-3">
                                    <AttachmentViewer :attachments="revenue.attachments_frontend" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="text-gray-400 text-sm p-4 text-center">No revenue logs or billing sheets found.</div>
                </div>
            </div>

            <!-- Footer Section -->
            <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 shrink-0 flex justify-end print:hidden">
                <button
                    type="button"
                    @click="printDetails"
                    class="inline-flex items-center px-4 py-2 bg-emerald-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-700 active:bg-emerald-800 transition mr-3"
                >
                    <span class="material-symbols-outlined text-sm mr-2">print</span>
                    Print Details
                </button>
                <PrimaryButton @click="emit('close')">Close</PrimaryButton>
            </div>
        </div>
    </Modal>
</template>

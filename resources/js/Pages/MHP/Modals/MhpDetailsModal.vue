<script setup>
import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';

const props = defineProps({
    show: Boolean,
    mhpSite: {
        type: Object,
        default: null,
    },
});

const emit = defineEmits(['close']);

const formatCurrency = (amount) => {
    return amount ? 'PKR ' + Number(amount).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'PKR 0';
};

const formatNullableDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        return new Date(dateString).toLocaleDateString();
    } catch (e) {
        return 'Invalid Date';
    }
};

const printDetails = () => {
    // Basic window print for the modal content
    window.print();
};
</script>

<template>
    <Modal :show="show" @close="emit('close')" :maxWidth="'7xl'" :title="`MHP Site Details: ${mhpSite?.cbo.cbo_name ?? 'Loading...'}`">
        <div v-if="mhpSite" class="p-6 overflow-y-auto max-h-[85vh] print-content">

            <section class="mb-8 border-b pb-4">
                <h2 class="text-xl font-bold text-indigo-700 mb-3">Core Project Information</h2>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div class="detail-item"><p class="font-semibold">Project ID:</p><p>{{ mhpSite.id }}</p></div>
                    <div class="detail-item"><p class="font-semibold">Status:</p><p>{{ mhpSite.status }}</p></div>
                    <div class="detail-item"><p class="font-semibold">Planned Capacity (KW):</p><p>{{ mhpSite.planned_capacity_kw }}</p></div>
                    <div class="detail-item"><p class="font-semibold">Linked CBO:</p><p>{{ mhpSite.cbo.cbo_name }} ({{ mhpSite.cbo.reference_code }})</p></div>
                </div>
            </section>

            <section v-if="mhpSite.admin_approval" class="mb-8 border-b pb-4">
                <h2 class="text-xl font-bold text-green-700 mb-3">Admin Approval Details</h2>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div class="detail-item"><p class="font-semibold">Approval Date:</p><p>{{ formatNullableDate(mhpSite.admin_approval.approval_date) }}</p></div>
                    <div class="detail-item"><p class="font-semibold">Approved Cost (PKR):</p><p>{{ formatCurrency(mhpSite.admin_approval.approved_cost) }}</p></div>
                    <div class="detail-item"><p class="font-semibold">Remarks:</p><p>{{ mhpSite.admin_approval.remarks ?? 'N/A' }}</p></div>
                </div>
            </section>

            <section class="mb-8 border-b pb-4">
                <h2 class="text-xl font-bold text-blue-700 mb-3">Financial Progress</h2>
                <div v-if="mhpSite.financial_installments.length" class="space-y-3">
                    <div v-for="inst in mhpSite.financial_installments" :key="inst.id" class="p-3 border rounded-md bg-blue-50">
                        <p class="font-semibold text-blue-800">{{ inst.installment_number }}. {{ inst.component }} Payment</p>
                        <p class="text-sm">Amount: {{ formatCurrency(inst.installment_amount) }} | Date: {{ formatNullableDate(inst.installment_date) }}</p>
                        <AttachmentViewer v-if="inst.attachments_frontend.length" :attachments="inst.attachments_frontend" class="mt-2" />
                    </div>
                </div>
                <p v-else class="text-gray-500 text-sm">No financial installment records found.</p>
            </section>

            <section class="mb-8 border-b pb-4">
                <h2 class="text-xl font-bold text-orange-700 mb-3">Physical Progress</h2>
                <div v-if="mhpSite.physical_progresses.length" class="space-y-3">
                    <div v-for="prog in mhpSite.physical_progresses" :key="prog.id" class="p-3 border rounded-md bg-orange-50">
                        <p class="font-semibold text-orange-800">{{ prog.progress_percentage }}% Progress ({{ prog.payment_for }})</p>
                        <p class="text-sm">Date: {{ formatNullableDate(prog.progress_date) }} | Remarks: {{ prog.remarks ?? 'N/A' }}</p>
                        <AttachmentViewer v-if="prog.attachments_frontend.length" :attachments="prog.attachments_frontend" class="mt-2" />
                        <div v-if="prog.activity" class="mt-2 text-xs border-t pt-2">
                            <p class="font-semibold">Associated Activity:</p>
                            <p>{{ prog.activity.name || `T&D Work # ${prog.activity.id}` }}</p>
                        </div>
                    </div>
                </div>
                <p v-else class="text-gray-500 text-sm">No physical progress records found.</p>
            </section>

            <section v-if="mhpSite.t_and_d_works && mhpSite.t_and_d_works.length" class="mb-8 border-b pb-4">
                <h2 class="text-xl font-bold text-purple-700 mb-3">T&D Works ({{ mhpSite.t_and_d_works.length }})</h2>
                <div v-for="td in mhpSite.t_and_d_works" :key="td.id" class="p-3 border rounded-md bg-purple-50 space-y-2">
                    <p class="font-semibold">T&D Work ID: {{ td.id }}</p>
                    <p class="text-sm">Location: {{ td.location ?? 'N/A' }} | Total Cost: {{ formatCurrency(td.total_cost) }}</p>
                </div>
            </section>


            <div class="flex justify-end mt-6 print:hidden">
                <button
                    type="button"
                    @click="printDetails"
                    class="inline-flex items-center px-4 py-2 mr-3 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                    Print Details
                </button>
                <PrimaryButton @click="closeDetailsModal">Close</PrimaryButton>
            </div>
        </div>
        <div v-else class="p-6 text-center text-gray-500">
            Loading MHP site details...
        </div>
    </Modal>
</template>

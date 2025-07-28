<script setup>
import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';

const props = defineProps({
    show: Boolean, // Controls modal visibility
    site: { // The MHP Site object for which to view the report
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close']);

// Function to handle printing the report content
const printReport = () => {
    window.print(); // Uses browser's native print functionality
};
</script>

<template>
    <Modal :show="show" @close="emit('close')" :maxWidth="'6xl'" :title="`Report for MHP Site: ${site.project_id}`">
        <div class="p-6 overflow-y-auto max-h-[85vh] text-gray-800 print-content">
            <h2 class="text-2xl font-bold mb-4">MHP Site Report Overview</h2>
            <p class="mb-4 text-gray-700">This is a placeholder for the MHP Site Report. You can customize this section to display various data, charts, or generated report content.</p>

            <div class="border p-4 rounded-lg bg-gray-50 mb-6">
                <h3 class="text-xl font-semibold mb-2">Site Basic Info</h3>
                <p><strong>Reference Code:</strong> {{ site.cbo?.reference_code ?? 'N/A' }}</p>
                <p><strong>Project ID:</strong> {{ site.project_id ?? 'N/A' }}</p>
                <p><strong>Status:</strong> {{ site.status ?? 'N/A' }}</p>
                <p><strong>Population:</strong> {{ site.population ?? 'N/A' }}</p>
                <p><strong>Remarks:</strong> <span v-html="site.remarks ?? 'N/A'"></span></p>
            </div>

            <div class="border p-4 rounded-lg bg-gray-50 mb-6">
                <h3 class="text-xl font-semibold mb-2">Latest Progress Summary</h3>
                <p v-if="site.latest_physical_progress">
                    <strong>Physical:</strong> {{ site.latest_physical_progress.progress_percentage }}% on {{ new Date(site.latest_physical_progress.progress_date).toLocaleDateString() }}
                </p>
                <p v-else>No latest physical progress.</p>
                <p v-if="site.latest_financial_installment">
                    <strong>Financial:</strong> Inst. #{{ site.latest_financial_installment.installment_number }} ({{ site.latest_financial_installment.installment_amount }}) on {{ new Date(site.latest_financial_installment.installment_date).toLocaleDateString() }}
                </p>
                <p v-else>No latest financial installment.</p>
            </div>

            <div class="flex justify-end mt-6 print:hidden">
                <PrimaryButton @click="printReport" class="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6m-6-4v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6"/></svg>
                    Print Report
                </PrimaryButton>
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

<style scoped>
/* Add any specific styles for report layout if needed */
</style>

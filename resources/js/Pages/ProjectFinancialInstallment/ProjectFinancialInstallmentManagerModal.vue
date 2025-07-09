<script setup>
import { ref, computed } from 'vue'
import Modal from '@/Components/Modal.vue'
import ProjectFinancialInstallmentModal from '@/Pages/ProjectFinancialInstallment/ProjectFinancialInstallmentModal.vue';
import { router } from '@inertiajs/vue3'

const props = defineProps({
    show: Boolean,
    site: Object, // MhpSite object with financialInstallments eager loaded
})

const emit = defineEmits(['close', 'saved'])

const showAddEditModal = ref(false)
const selectedInstallmentToEdit = ref(null)
const addEditMode = ref('create')

function openAddEditFinancialInstallment(installment = null) {
    selectedInstallmentToEdit.value = installment
    addEditMode.value = installment ? 'edit' : 'create'
    showAddEditModal.value = true
}

function handleFinancialInstallmentSaved(message) {
    emit('saved', message) // Bubble up the saved event
    showAddEditModal.value = false
    selectedInstallmentToEdit.value = null
}

function deleteFinancialInstallment(installmentId) {
    if (confirm('Are you sure you want to delete this financial installment entry?')) {
        router.delete(`/mhp/project-financial-installments/${installmentId}`, {
            onSuccess: () => {
                emit('saved', 'Financial installment deleted successfully.')
                // The main MhpSite/Index page will reload, refreshing this modal's data
            },
            onError: (errors) => {
                console.error('Error deleting financial installment:', errors)
                emit('saved', 'Failed to delete financial installment.')
            }
        })
    }
}

const sortedFinancialInstallments = computed(() => {
    return [...(props.site.financialInstallments || [])].sort((a, b) => a.installment_number - b.installment_number);
});

// Check if all 10 installments have been recorded
const isAllInstallmentsRecorded = computed(() => {
    return sortedFinancialInstallments.value.length >= 10;
});
</script>

<template>
    <Modal :show="show" @close="emit('close')" :maxWidth="'4xl'" title="Manage Financial Installments">
        <div class="p-6">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-semibold text-gray-800">Financial Installment Entries for {{ site.cbo?.reference_code }}</h3>
                <button
                    @click="openAddEditFinancialInstallment()"
                    :disabled="isAllInstallmentsRecorded"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" /></svg>
                    Add New Installment
                </button>
            </div>

            <div v-if="isAllInstallmentsRecorded && sortedFinancialInstallments.length > 0" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong class="font-bold">All 10 Installments Recorded!</strong>
                <span class="block sm:inline">No more financial installment entries can be added.</span>
            </div>

            <div v-if="sortedFinancialInstallments.length > 0" class="border border-gray-200 rounded-lg overflow-hidden">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attachments</th>
                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="installment in sortedFinancialInstallments" :key="installment.id">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{{ installment.installment_number }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ installment.installment_date }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ installment.installment_amount }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ installment.category }}</td>
                        <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{{ installment.remarks || '—' }}</td>
                        <td class="px-6 py-4 text-sm text-gray-500">
                                <span v-if="installment.attachments && installment.attachments.length">
                                    {{ installment.attachments.length }} files
                                </span>
                            <span v-else>—</span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button @click="openAddEditFinancialInstallment(installment)" class="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                            <button @click="deleteFinancialInstallment(installment.id)" class="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div v-else class="text-center text-gray-500 py-8">
                No financial installment entries found for this project.
            </div>
        </div>

        <ProjectFinancialInstallmentModal
            :show="showAddEditModal"
            :site="site"
            :project-financial-installment="selectedInstallmentToEdit"
            :mode="addEditMode"
            @close="showAddEditModal = false; selectedInstallmentToEdit = null"
            @saved="handleFinancialInstallmentSaved"
        />
    </Modal>
</template>

<script setup>
import { ref, computed } from 'vue'
import Modal from '@/Components/Modal.vue'
import IrrigationSchemeContractForm from '@/Components/Shared/Forms/IrrigationSchemeContractForm.vue';
import { router } from '@inertiajs/vue3'

const props = defineProps({
    show: Boolean,
    scheme: Object, // The IrrigationScheme object with irrigationSchemeContract eager loaded
})

const emit = defineEmits(['close', 'saved'])

const showAddEditModal = ref(false)
const selectedContractToEdit = ref(null)
const addEditMode = ref('create')

// Function to open the form modal for adding or editing a contract
function openAddEditContract(contract = null) {
    selectedContractToEdit.value = contract
    addEditMode.value = contract ? 'edit' : 'create'
    showAddEditModal.value = true
}

// Handler for when a contract is saved (from the form modal)
function handleContractSaved(message) {
    emit('saved', message) // Bubble up the saved event to parent (Index.vue)
    showAddEditModal.value = false
    selectedContractToEdit.value = null
}

// Function to delete a contract
function deleteContract(contractId) {
    if (confirm('Are you sure you want to delete this contract? This action cannot be undone.')) {
        router.delete(route('irrigation.irrigation-scheme-contracts.destroy', contractId), {
            onSuccess: () => {
                emit('saved', 'Irrigation Scheme Contract deleted successfully.')
                // The main IrrigationScheme/Index page will reload, refreshing this modal's data
            },
            onError: (errors) => {
                console.error('Error deleting contract:', errors)
                emit('saved', 'Failed to delete irrigation contract.')
            }
        })
    }
}

// Computed property to display current contract or "No contract"
const currentContract = computed(() => {
    return props.scheme.irrigationSchemeContract; // Access the eager-loaded contract directly
});
</script>

<template>
    <Modal :show="show" @close="emit('close')" :maxWidth="'3xl'" title="Manage Irrigation Scheme Contract">
        <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Contract for Scheme: {{ scheme.cbo?.reference_code ?? 'N/A' }} / IR-{{ scheme.id }}</h3>

            <div v-if="currentContract" class="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm">
                <h4 class="text-lg font-bold mb-2">Current Contract Details:</h4>
                <p class="text-gray-700"><strong>Contractor:</strong> {{ currentContract.vendor_name }}</p>
                <p class="text-gray-700"><strong>Civil Work Initiation Date:</strong> {{ currentContract.date_civil_work_initiation || '—' }}</p>
                <p class="text-gray-700"><strong>Contract Amount:</strong> {{ currentContract.contract_amount || '—' }}</p>
                <div class="mt-4 flex space-x-2">
                    <button @click="openAddEditContract(currentContract)" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Edit Contract</button>
                    <button @click="deleteContract(currentContract.id)" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete Contract</button>
                </div>
            </div>
            <div v-else class="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50 text-center">
                <p class="text-gray-500 italic">No contract recorded for this scheme.</p>
                <div class="mt-4">
                    <button @click="openAddEditContract()" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Add New Contract</button>
                </div>
            </div>
        </div>

        <Modal :show="showAddEditModal" @close="showAddEditModal = false; selectedContractToEdit = null" :maxWidth="'2xl'" :title="addEditMode === 'create' ? 'Create Scheme Contract' : 'Edit Scheme Contract'">
            <div class="p-6 overflow-y-auto max-h-[85vh]">
                <IrrigationSchemeContractForm
                    :irrigation-scheme-id="scheme.id"
                    :contract="selectedContractToEdit"
                    :mode="addEditMode"
                    @saved="handleContractSaved"
                    @cancel="showAddEditModal = false; selectedContractToEdit = null"
                />
            </div>
        </Modal>
    </Modal>
</template>

<style scoped>
/* Scoped styles for this component */
</style>

<script setup>
/**
 * Project/resources/js/Components/IrrigationSchemeContractManagerModal.vue
 *
 * This modal manages the lifecycle of a single Irrigation Scheme Contract.
 * It acts as a container for the IrrigationSchemeContractForm, allowing for
 * adding new contracts or editing existing ones via the form.
 *
 * This version is simplified for debugging the 'InvalidCharacterError'.
 */

import { ref, computed, onMounted } from 'vue' // Vue reactivity fundamentals
import Modal from '@/Components/Modal.vue' // Base Modals component
import IrrigationSchemeContractForm from '@/Components/Shared/Forms/IrrigationSchemeContractForm.vue'; // The contract form

// ---------------------------------------------------------------------
// 1. Props and Emits
// ---------------------------------------------------------------------
const props = defineProps({
    // Controls the visibility of this manager modal
    show: Boolean,
    // The parent IrrigationScheme object (needed to link the contract)
    scheme: { type: Object, required: true },
});

// Define custom events this component can emit to its parent (IrrigationScheme/Index.vue)
const emit = defineEmits(['close', 'saved']);

// ---------------------------------------------------------------------
// 2. Local Reactive State
// ---------------------------------------------------------------------

/**
 * `showAddEditModal` controls the visibility of the *nested* form modal.
 * @type {Ref<boolean>}
 */
const showAddEditModal = ref(true); // FIX: Set to true for initial rendering for debugging

/**
 * `selectedContractToEdit` holds the contract object when in 'edit' mode.
 * @type {Ref<Object|null>}
 */
const selectedContractToEdit = ref(null); // Will be null for 'Add New'

/**
 * `addEditMode` indicates the mode of the nested form ('create' or 'edit').
 * @type {Ref<string>}
 */
const addEditMode = ref('create'); // Will be 'create' for 'Add New'

// ---------------------------------------------------------------------
// 3. Event Handlers
// ---------------------------------------------------------------------

/**
 * `openAddEditContract` function. In this debugging version, it is called
 * when the manager modal first opens (due to showAddEditModal = true)
 * to immediately show the form.
 * In a full version, this would be triggered by 'Add New' or 'Edit' buttons.
 *
 * @param {Object|null} contract - The contract object to edit, or null for new.
 */
function openAddEditContract(contract = null) {
    selectedContractToEdit.value = contract;
    addEditMode.value = contract ? 'edit' : 'create';
    showAddEditModal.value = true;
}

/**
 * `handleContractSaved` is called when the nested form successfully saves a contract.
 * Bubbles up the 'saved' event to the parent Index page.
 * @param {string} message - Success message from the form.
 */
function handleContractSaved(message) {
    emit('saved', message);
    showAddEditModal.value = false; // Close the nested form modal
    selectedContractToEdit.value = null; // Clear selected contract
    emit('close'); // Close the manager modal as well for this test
}

/**
 * `handleContractCancel` is called when the nested form cancels.
 * Simply closes the nested form modal and clears selected contract.
 */
function handleContractCancel() {
    showAddEditModal.value = false;
    selectedContractToEdit.value = null;
    emit('close'); // Also close manager modal for this test
}

// ---------------------------------------------------------------------
// 4. Lifecycle Hook
// ---------------------------------------------------------------------

// On component mount, immediately open the add/edit form for initial debugging.
// In a full version, this would be removed, and 'openAddEditContract' would be called
// by buttons in the template.
onMounted(() => {
    // Call this if you want the form to appear immediately when the manager modal opens
    // (useful for debugging, but in full app, triggered by user clicks)
    // openAddEditContract(props.scheme.irrigationSchemeContract); // Pass existing contract if any for edit mode
    // If you want to force 'add new' immediately:
    openAddEditContract(null); // This line will force the form to open immediately in create mode
});

// ---------------------------------------------------------------------
// 5. Computed Properties (Optional for this minimal test)
// ---------------------------------------------------------------------

// For a full manager modal, you'd have computed properties to list all contracts, etc.
// For this test, we are focusing on rendering the form.
</script>

<template>
    <Modal :show="show" @close="emit('close')" :maxWidth="'3xl'" title="Manage Irrigation Scheme Contract">
        <div class="p-6">
            <p class="text-gray-600">Attempting to open contract form for Scheme: {{ scheme.id }}</p>
        </div>

        <Modal :show="showAddEditModal" @close="handleContractCancel" :maxWidth="'2xl'" :title="addEditMode === 'create' ? 'Create Scheme Contract' : 'Edit Scheme Contract'">
            <div class="p-6 overflow-y-auto max-h-[85vh]">
                <IrrigationSchemeContractForm
                    :irrigation-scheme-id="scheme.id"
                    :contract="selectedContractToEdit"
                    :mode="addEditMode"
                    @saved="handleContractSaved"
                    @cancel="handleContractCancel"
                />
            </div>
        </Modal>
    </Modal>
</template>

<style scoped>
/* Scoped styles for this component */
</style>

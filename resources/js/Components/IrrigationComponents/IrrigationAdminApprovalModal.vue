<script setup>
import { ref, watch } from 'vue';
import Modal from '@/Components/Modal.vue';
import IrrigationAdminApprovalForm from '@/Components/Shared/Forms/IrrigationAdminApprovalForm.vue'; // The form component

const props = defineProps({
    show: Boolean, // Controls modal visibility
    irrigationSchemeId: { type: [String, Number], required: true },
    approval: { type: Object, default: null }, // Existing approval object if in edit mode
    mode: { type: String, default: 'create' }, // 'create' or 'edit'
});

const emit = defineEmits(['close', 'saved']);

const handleFormSaved = (message) => {
    emit('saved', message); // Emit 'saved' event to parent (Index.vue)
    emit('close'); // Close the modal
};

const handleFormCancel = () => {
    emit('close'); // Close the modal
};
</script>

<template>
    <Modal :show="show" @close="handleFormCancel" :maxWidth="'3xl'" :title="mode === 'create' ? 'Add Irrigation Admin Approval' : 'Edit Irrigation Admin Approval'">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <IrrigationAdminApprovalForm
                :irrigation-scheme-id="irrigationSchemeId"
                :approval="approval"
                :mode="mode"
                @saved="handleFormSaved"
                @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

<style scoped>
/* Scoped styles specific to IrrigationAdminApprovalModal if needed */
</style>

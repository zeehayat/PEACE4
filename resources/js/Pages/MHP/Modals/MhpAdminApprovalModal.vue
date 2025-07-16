<script setup>
import Modal from '@/Components/Modal.vue'; // Global Modal component
import MhpAdminApprovalForm from '@/Pages/MHP/Forms/MhpAdminApprovalForm.vue'; // The form for MHP Admin Approval

const props = defineProps({
    show: Boolean, // Controls modal visibility
    action: { type: String, default: 'create' }, // 'create' or 'update'
    mhpSiteId: { type: [String, Number], required: true }, // The MHP Site ID
    approval: { type: Object, default: null }, // Existing approval object for edit mode
});

const emit = defineEmits(['close', 'updated']); // 'updated' event from form bubbles up

// Handle success event from MhpAdminApprovalForm
const handleFormSuccess = (message) => {
    emit('updated', message); // Pass message up to MHP/Index.vue
    emit('close'); // Close the modal
};

// Handle cancel event from MhpAdminApprovalForm
const handleFormCancel = () => {
    emit('close'); // Close the modal
};
</script>

<template>
    <Modal :show="show" @close="handleFormCancel" :maxWidth="'3xl'" :title="`${action === 'create' ? 'Add' : 'Edit'} MHP Admin Approval`">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <MhpAdminApprovalForm
                :mhp-site-id="mhpSiteId"
                :approval="approval"
                :action="action"
                @success="handleFormSuccess"
                @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

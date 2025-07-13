<script setup>
import Modal from '@/Components/Modal.vue';
import MhpAdminApprovalForm from '@/Pages/MhpAdminApproval/MhpAdminApprovalForm.vue';

const props = defineProps({
    show: Boolean,
    action: { type: String, default: 'create' },
    mhpSiteId: { type: [String, Number], required: true },
    approval: { type: Object, default: null },
    errors: Object,
});

const emit = defineEmits(['close', 'updated']);

// This function is triggered by MhpAdminApprovalForm's @success event
const handleFormSuccess = (message) => { // Message is passed from the form
    emit('updated', message); // Pass message up to MhpSite/Index.vue
    emit('close'); // Tell MhpSite/Index.vue to close THIS modal
};

const handleFormCancel = () => {
    emit('close'); // Tell MhpSite/Index.vue to close THIS modal
};
</script>

<template>
    <Modal :show="show" @close="handleFormCancel" :maxWidth="'3xl'" :title="`${action === 'create' ? 'Add' : 'Edit'} MHP Admin Approval`">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <MhpAdminApprovalForm
                :mhp-site-id="mhpSiteId"
                :approval="approval"
                :action="action"
                @success="handleFormSuccess" @cancel="handleFormCancel"   />
        </div>
    </Modal>
</template>

<style scoped>
/* ... */
</style>

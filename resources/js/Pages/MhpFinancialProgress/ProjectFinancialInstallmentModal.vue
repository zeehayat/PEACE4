<script setup>
import Modal from '@/Components/Modal.vue';
import ProjectFinancialInstallmentForm from './ProjectFinancialInstallmentForm.vue'; // Correct relative path

const props = defineProps({
    show: Boolean,
    site: { // The MhpSite object (required from MhpSite/Index.vue)
        type: Object,
        required: true,
    },
    installment: { // The specific installment object to edit (optional, for edit mode)
        type: Object,
        default: null,
    },
    mode: { // 'create' or 'edit' (passed from MhpSite/Index.vue)
        type: String,
        default: 'create',
    },
});

const emit = defineEmits(['close', 'saved']);

const handleFormSuccess = (message) => {
    emit('saved', message);
    emit('close');
};

const handleFormCancel = () => {
    emit('close');
};
</script>

<template>
    <Modal :show="show" @close="handleFormCancel" :maxWidth="'3xl'" :title="`${mode === 'create' ? 'Add' : 'Edit'} Financial Installment`">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <ProjectFinancialInstallmentForm
                :projectable-id="site.id"           :projectable-type="'App\\Models\\MhpSite'" :installment="installment"           :mode="mode"                         @success="handleFormSuccess"
                @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

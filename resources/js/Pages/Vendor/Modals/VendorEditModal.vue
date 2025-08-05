<script setup>
import Modal from '@/Components/Modal.vue';
import VendorForm from '@/Pages/Vendor/Forms/VendorForm.vue';

const props = defineProps({
    show: Boolean, // Controls modal visibility
    vendor: { // The vendor object to edit
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close', 'updated']); // 'updated' when form successfully updates

const handleFormSuccess = (message) => {
    emit('updated', message); // Pass message up to Vendor/Index.vue
    emit('close'); // Close the modal
};

const handleFormCancel = () => {
    emit('close'); // Close the modal
};
</script>

<template>
    <Modal :show="show" @close="handleFormCancel" :maxWidth="'3xl'" :title="`Edit Vendor: ${vendor.name}`">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <VendorForm
                :vendor="vendor"
            @success="handleFormSuccess"
            @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

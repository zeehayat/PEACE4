<script setup>
import Modal from '@/Components/Modal.vue';
import MhpSiteForm from '@/Pages/MHP/Forms/MhpSiteForm.vue';

const props = defineProps({
    show: Boolean, // Controls modal visibility
    site: { // The MHP Site object to edit
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close', 'updated']); // 'updated' when form successfully updates

const handleFormSuccess = (message) => {
    emit('updated', message); // Pass message up to MhpSite/Index.vue
    emit('close'); // Close the modal
};

const handleFormCancel = () => {
    emit('close'); // Close the modal
};
</script>

<template>
    <Modal :show="show" @close="handleFormCancel" :maxWidth="'5xl'" title="Edit MHP Site Info">
        <MhpSiteForm
            :site="site"
            @success="handleFormSuccess"
            @cancel="handleFormCancel"
        />
    </Modal>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

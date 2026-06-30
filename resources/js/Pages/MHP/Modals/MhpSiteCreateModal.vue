<script setup>
import Modal from '@/Components/Modal.vue';
import MhpSiteForm from '@/Pages/MHP/Forms/MhpSiteForm.vue';

const props = defineProps({
    show: Boolean, // Controls modal visibility
});

const emit = defineEmits(['close', 'saved']); // 'saved' when form successfully saves

const handleFormSuccess = (message) => {
    emit('saved', message); // Pass message up to parent (Index.vue)
    emit('close'); // Close the modal
};

const handleFormCancel = () => {
    emit('close'); // Close the modal
};
</script>

<template>
    <Modal :show="show" @close="handleFormCancel" :maxWidth="'5xl'" title="Create New MHP Site">
        <MhpSiteForm
            :site="null"
            @success="handleFormSuccess"
            @cancel="handleFormCancel"
        />
    </Modal>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

<script setup>
import Modal from '@/Components/Modal.vue'; // Assuming this exists
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
    <Modal :show="show" @close="handleFormCancel" :maxWidth="'4xl'" title="Create New MHP Site">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <MhpSiteForm
                :site="null"
            @success="handleFormSuccess"
            @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

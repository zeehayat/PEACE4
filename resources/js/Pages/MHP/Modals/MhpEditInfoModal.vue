<script setup>
import Modal from '@/Components/Modal.vue'; // Assuming this exists
import MhpSiteForm from '@/Pages/MHP/Forms/MhpSiteForm.vue';

const props = defineProps({
    show: Boolean, // Controls modal visibility
    site: { // The MHP Site object to edit
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close', 'updated']); // 'updated' when form successfully updates

// Handler for when MhpSiteEditForm successfully saves/updates
const handleFormSuccess = (message) => {
    emit('updated', message); // Pass message up to MhpSite/Index.vue
    emit('close'); // Close the modal
};

// Handler for when MhpSiteEditForm's cancel button is clicked
const handleFormCancel = () => {
    emit('close'); // Close the modal
};
</script>

<template>
    <Modal :show="show" @close="handleFormCancel" :maxWidth="'4xl'" title="Edit MHP Site Info">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <MhpSiteForm
                :site="site"
            @success="handleFormSuccess"
            @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

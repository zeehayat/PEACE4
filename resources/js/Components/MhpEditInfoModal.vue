<script setup>
import Modal from '@/Components/Modal.vue'; // Use the shared Modal component
import MhpSiteEditForm from '@/Pages/MhpSite/MhpSiteEditForm.vue'; // Import the new form component

const props = defineProps({
    show: Boolean, // Controls modal visibility
    site: { // The MHP Site object to edit
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close', 'updated']); // Emit 'close' for modal, 'updated' for parent Index.vue

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
            <MhpSiteEditForm
                :site="site"
                @success="handleFormSuccess"
                @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

<style scoped>
/* No specific scoped styles needed here, as styling is handled by Modal.vue and MhpSiteEditForm.vue */
</style>

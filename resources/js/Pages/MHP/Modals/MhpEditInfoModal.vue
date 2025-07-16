<script setup>
import Modal from '@/Components/Modal.vue'; // Global Modal component
import MhpSiteForm from '@/Pages/MHP/Forms/MhpSiteForm.vue'; // The form for MHP Sites

const props = defineProps({
    show: Boolean, // Controls modal visibility
    site: { // The MHP Site object to edit (required)
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close', 'updated']); // 'updated' event from form bubbles up

// Handle success event from MhpSiteForm
const handleFormSuccess = (message) => {
    emit('updated', message); // Pass message up to MHP/Index.vue
    emit('close'); // Close the modal
};

// Handle cancel event from MhpSiteForm
const handleFormCancel = () => {
    emit('close'); // Close the modal
};
</script>

<template>
    <Modal :show="show" @close="handleFormCancel" :maxWidth="'4xl'" title="Edit MHP Site Info">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <MhpSiteForm
                :mode="'edit'"               :site="site"                 @success="handleFormSuccess"
                @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

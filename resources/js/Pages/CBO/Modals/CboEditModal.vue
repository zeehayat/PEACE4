<script setup>
import Modal from '@/Components/Modal.vue';
import CboForm from '@/Pages/CBO/Forms/CboForm.vue';

const props = defineProps({
    show: Boolean, // Controls modal visibility
    cbo: { // The CBO object to edit
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close', 'updated']); // 'updated' when form successfully updates

const handleFormSuccess = (message) => {
    emit('updated', message); // Pass message up to CBO/Index.vue
    emit('close'); // Close the modal
};

const handleFormCancel = () => {
    emit('close'); // Close the modal
};
</script>

<template>
    <Modal :show="show" @close="handleFormCancel" :maxWidth="'4xl'" title="Edit CBO Information">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <CboForm
                :cbo="cbo"

            @success="handleFormSuccess"
            @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

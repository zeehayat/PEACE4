<script setup>
import { ref, watch } from 'vue';
import Modal from '@/Components/Modal.vue';
import IrrigationSchemeForm from '@/Components/Shared/Forms/IrrigationSchemeForm.vue'; // Irrigation Form component

const props = defineProps({
    show: Boolean, // Controls modal visibility
    errors: Object, // Prop to pass validation errors from controller
});

const emit = defineEmits(['close', 'saved']);

const handleFormSaved = (message) => {
    emit('saved', message); // Emit 'saved' event to parent (Index.vue)
    emit('close'); // Close the modal
};

const handleFormCancel = () => {
    emit('close'); // Close the modal
};
</script>

<template>
    <Modal :show="show" @close="handleFormCancel" :maxWidth="'3xl'" title="Create New Irrigation Scheme">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <IrrigationSchemeForm
                :irrigation-scheme="null"
            mode="create"
            @saved="handleFormSaved"
            @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

<style scoped>
/* Scoped styles specific to IrrigationSchemeCreateModal if needed */
</style>

<script setup>
import Modal from '@/Components/Modal.vue';
import IrrigationSchemeForm from '@/Pages/Irrigation/Forms/IrrigationSchemeForm.vue';

const props = defineProps({
    show: Boolean, // Controls modal visibility
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
    <Modal :show="show" @close="handleFormCancel" :maxWidth="'5xl'" title="Create New Irrigation Scheme">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <IrrigationSchemeForm
                :scheme="null"
                @success="handleFormSuccess"
                @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

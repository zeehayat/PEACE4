<script setup>
import Modal from '@/Components/Modal.vue';
import IrrigationSchemeForm from '@/Pages/Irrigation/Forms/IrrigationSchemeForm.vue';

const props = defineProps({
    show: Boolean,
    scheme: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close', 'updated']);

const handleFormSuccess = (message) => {
    emit('updated', message);
    emit('close');
};

const handleFormCancel = () => {
    emit('close');
};
</script>

<template>
    <Modal :show="show" @close="handleFormCancel" :maxWidth="'5xl'" :title="`Edit Irrigation Scheme: ${scheme.id}`">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <IrrigationSchemeForm
                :scheme="scheme"
                @success="handleFormSuccess"
                @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

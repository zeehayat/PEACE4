<script setup>
import { reactive, watch, ref, computed } from 'vue';
import { router } from '@inertiajs/vue3';
import axios from 'axios';

import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';
import IrrigationSchemeContractForm from '@/Pages/Irrigation/Forms/IrrigationSchemeContractForm.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';

const props = defineProps({
    show: Boolean,
    scheme: {
        type: Object,
        required: true,
    },
    contract: {
        type: Object,
        default: null,
    },
});

const emit = defineEmits(['close', 'saved']);

const isEditMode = computed(() => !!props.contract);

const handleFormSuccess = (message) => {
    emit('saved', message);
    emit('close');
};
const handleFormCancel = () => {
    emit('close');
};

const modalTitle = computed(() => {
    return isEditMode.value ? 'Edit Scheme Contract' : 'Add Scheme Contract';
});
</script>

<template>
    <Modal :show="show" @close="handleFormCancel" :maxWidth="'4xl'" :title="modalTitle">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <IrrigationSchemeContractForm
                :scheme-id="props.scheme.id"
                :contract="props.contract"
                :mode="isEditMode ? 'update' : 'create'"
                @success="handleFormSuccess"
                @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

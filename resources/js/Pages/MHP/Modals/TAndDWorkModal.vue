<script setup>
import { computed } from 'vue';
import Modal from '@/Components/Modal.vue';
import TAndDWorkForm from '@/Pages/MHP/Forms/TAndDWorkForm.vue';

const props = defineProps({
    show: Boolean, // Controls modal visibility
    mhpSiteId: {
        type: Number,
        required: true, // The MHP Site ID this T&D work belongs to
    },
    tAndDWork: {
        type: Object,
        default: null, // Existing T&D Work object for edit mode
    },
    action: {
        type: String,
        default: 'create', // 'create' or 'update'
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

const modalTitle = computed(() => {
    return props.action === 'update' ? 'Edit T&D Work' : 'Add New T&D Work';
});
</script>

<template>
    <Modal :show="show" @close="handleFormCancel" :maxWidth="'4xl'" :title="modalTitle">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <TAndDWorkForm
                :mhp-site-id="mhpSiteId"
                :t-and-d-work="tAndDWork"
                :action="action"
                @success="handleFormSuccess"
                @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

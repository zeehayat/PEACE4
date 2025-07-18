<script setup>
import { computed } from 'vue';
import Modal from '@/Components/Modal.vue';
import MhpCompletionForm from '@/Pages/MHP/Forms/MhpCompletionForm.vue';

const props = defineProps({
    show: Boolean, // Controls modal visibility
    site: { // The MHP Site object this completion belongs to (passed as 'site' from Index.vue)
        type: Object,
        required: true,
    },
    completion: {
        type: Object,
        default: null, // Existing completion object for edit mode
    },
    action: {
        type: String,
        default: 'create', // 'create' or 'update' (also 'view' if you add a view mode here)
    },
});

const emit = defineEmits(['close', 'saved']);

const handleFormSuccess = (message) => {
    emit('saved', message);
    emit('close');
};

const handleFormCancel = () => {
    emit('close');
};

const modalTitle = computed(() => {
    return props.action === 'update' ? `Edit MHP Completion for ${props.site.project_id}` : `Add MHP Completion for ${props.site.project_id}`;
});
</script>

<template>
    <Modal :show="show" @close="handleFormCancel" :maxWidth="'3xl'" :title="modalTitle">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <MhpCompletionForm
                :mhp-site-id="site.id"
                :completion="completion"
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

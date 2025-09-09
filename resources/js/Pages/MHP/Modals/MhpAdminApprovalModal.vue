<script setup>
import Modal from '@/Components/Modal.vue';
import MhpAdminApprovalForm from '@/Pages/MHP/Forms/MhpAdminApprovalForm.vue';
import {computed} from "vue";

const props = defineProps({
    show: Boolean, // Controls modal visibility
    mhpSiteId: {
        type: Number,
        required: true,
    },
    approval: {
        type: Object,
        default: null, // Existing approval object for edit mode
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
    return props.action === 'update' ? 'Edit MHP Admin Approval' : 'Add MHP Admin Approval';
});
</script>

<template>
    <Modal :show="show" @close="handleFormCancel" :maxWidth="'4xl'" :title="modalTitle">
        <Transition name="modal-drop">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <MhpAdminApprovalForm
                :mhp-site-id="mhpSiteId"
                :approval="approval"
                :action="action"
                @success="handleFormSuccess"
                @cancel="handleFormCancel"
            />
        </div>
        </Transition>
    </Modal>
</template>

<style scoped>
/* No specific scoped styles needed here */
.modal-drop-enter-from {
    opacity: 0;
    transform: translateY(-50px);
}

.modal-drop-leave-to {
    opacity: 0;
    transform: translateY(-50px);
}

.modal-drop-enter-active,
.modal-drop-leave-active {
    transition: all 0.3s ease;
}
</style>

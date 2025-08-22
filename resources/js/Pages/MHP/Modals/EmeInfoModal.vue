<script setup>
import Modal from '@/Components/Modal.vue';
import MhpAdminApprovalForm from '@/Pages/MHP/Forms/MhpAdminApprovalForm.vue';
import {computed} from "vue";
import EmeInfoForm from "@/Pages/MHP/Partials/EmeInfoForm.vue";
//import EmeInfoForm from "@/Pages/MHP/Partials/EmeInfoForm.vue";

const props = defineProps({
    show: Boolean, // Controls modal visibility
    mhpSiteId: {
        type: Number,String,
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
    return props.action === 'update' ? 'Edit Eme Profile Modal' : 'Add MHP Eme Profile';
});

</script>

<template>
    <Modal :show="show" @close="handleFormCancel" :maxWidth="'4xl'" :title="modalTitle">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <EmeInfoForm
                :mhp-site="mhpSiteId"

                @success="handleFormSuccess"
                @cancel="handleFormCancel"
             />
        </div>
    </Modal>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

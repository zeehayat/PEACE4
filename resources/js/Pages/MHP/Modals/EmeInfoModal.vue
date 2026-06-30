<script setup>
import { computed } from "vue";
import Modal from '@/Components/Modal.vue';
import EmeInfoForm from "@/Pages/MHP/Partials/EmeInfoForm.vue";

const props = defineProps({
    show: Boolean,
    mhpSite: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close', 'updated', 'success']);

const handleFormSuccess = (message) => {
    emit('success', message);
    emit('close');
};

const handleFormCancel = () => {
    emit('close');
};

const modalTitle = computed(() => {
    return props.mhpSite.eme_info ? `Edit EME Profile - ${props.mhpSite.project_id}` : `Add EME Profile - ${props.mhpSite.project_id}`;
});
</script>

<template>
    <Modal :show="show" @close="handleFormCancel" :maxWidth="'5xl'" :title="modalTitle">
        <div class="p-6 max-h-[75vh] overflow-y-auto">
            <EmeInfoForm
                :mhp-site="mhpSite"
                :eme-info="mhpSite.eme_info"
                @success="handleFormSuccess"
                @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

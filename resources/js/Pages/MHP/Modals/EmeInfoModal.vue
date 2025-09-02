<script setup>
import Modal from '@/Components/Modal.vue';
import EmeInfoForm from "@/Pages/MHP/Partials/EmeInfoForm.vue";
import { computed } from "vue";

const props = defineProps({
    show: Boolean,
    mhpSite: { // <-- Change this to mhpSite
        type: Object,
        required: true,
    },
    action: {
        type: String,
        default: 'create',
    },
});

const emit = defineEmits(['close', 'updated', 'success']);

const handleFormSuccess = (message) => {
    emit('updated', message);
    emit('close');
};

const handleFormCancel = () => {
    emit('close');
};

const modalTitle = computed(() => {
    // The presence of eme_info on the site object tells us if we are editing
    return props.mhpSite.eme_info ? 'Edit EME Profile' : 'Add New EME Profile';
});
</script>

<template>
    <Modal :show="show" @close="$emit('close')" maxWidth="4xl">
        <div class="p-6">
            <h2 class="text-2xl font-bold mb-4">{{ modalTitle }}</h2>
            <EmeInfoForm
                :mhp-site="mhpSite"
                :eme-info="mhpSite.eme_info" @success="$emit('success', 'EME Profile saved successfully!')"
                @cancel="$emit('close')" class="bg-blue-100"
            />
        </div>
    </Modal>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

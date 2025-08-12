<script setup>
import { ref, watch } from 'vue';
import Modal from '@/Components/Modal.vue';
import MhpSiteForm from '@/Pages/Shared/Forms/MhpSiteForm.vue';

const props = defineProps({
    show: Boolean, // Controls modal visibility
});

const emit = defineEmits(['close', 'saved']);

const handleFormSaved = (message) => {
    emit('saved', message);
    emit('close');
};

const handleFormCancel = () => {
    emit('close');
};
</script>

<template>
    <Modal :show="show" @close="handleFormCancel" :maxWidth="'2xl'" title="Create New MHP Site">
        <div class="overflow-y-auto max-h-[85vh]">
            <MhpSiteForm
                :mhp-site="null"
                mode="create"
                @saved="handleFormSaved"
                @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

<style scoped>
/* No specific styles needed here, as styling is primarily handled by Modals.vue and MhpSiteForm.vue */
</style>

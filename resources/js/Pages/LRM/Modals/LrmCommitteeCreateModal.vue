<script setup>
import Modal from '@/Components/Modal.vue';
import LrmCommitteeForm from '@/Pages/LRM/Forms/LrmCommitteeForm.vue';

const props = defineProps({
    show: Boolean, // Controls modal visibility
});

const emit = defineEmits(['close', 'saved']); // 'saved' when form successfully saves

const handleFormSuccess = (message) => {
    emit('saved', message); // Pass message up to parent (Index.vue)
    emit('close'); // Close the modal
};

const handleFormCancel = () => {
    emit('close'); // Close the modal
};
</script>

<template>
    <Modal :show="show" @close="handleFormCancel" :maxWidth="'4xl'" title="Create New LRM Committee">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <LrmCommitteeForm
                :lrm-committee="null"
            @success="handleFormSuccess"
            @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

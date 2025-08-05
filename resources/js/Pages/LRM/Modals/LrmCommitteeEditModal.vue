<script setup>
import Modal from '@/Components/Modal.vue';
import LrmCommitteeForm from '@/Pages/LRM/Forms/LrmCommitteeForm.vue';

const props = defineProps({
    show: Boolean, // Controls modal visibility
    lrmCommittee: { // The LRM Committee object to edit
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close', 'updated']); // 'updated' when form successfully updates

const handleFormSuccess = (message) => {
    emit('updated', message); // Pass message up to LRM/Index.vue
    emit('close'); // Close the modal
};

const handleFormCancel = () => {
    emit('close'); // Close the modal
};
</script>

<template>
    <Modal :show="show" @close="handleFormCancel" :maxWidth="'4xl'" :title="`Edit LRM Committee: ${lrmCommittee.cbo?.reference_code}`">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <LrmCommitteeForm
                :lrm-committee="lrmCommittee"
            @success="handleFormSuccess"
            @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

<script setup>
import Modal from '@/Components/Modal.vue'; // Assuming this exists
import MhpSiteForm from '@/Pages/MHP/Forms/MhpSiteForm.vue';

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
    <Modal class="bg-blue-800 shadow-2xl drop-shadow-2xl border border-b-8 border-orange-700 " :show="show" @close="handleFormCancel" title="Create New MHP Site">

        <div class="bg-orange-600 max-h-1">&nbsp;</div>
        <div class="p-6 overflow-y-auto rounded  ">
            <MhpSiteForm
                :site="null"
            @success="handleFormSuccess"
            @cancel="handleFormCancel"
                class="shadow-2xl rounded-2xl border-gray-500 border-2"
            />
        </div>
    </Modal>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

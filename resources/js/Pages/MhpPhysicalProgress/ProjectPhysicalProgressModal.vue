<script setup>
import Modal from '@/Components/Modal.vue';
import ProjectPhysicalProgressForm from '@/Pages/MhpPhysicalProgress/ProjectPhysicalProgressForm.vue';

const props = defineProps({
    show: Boolean,
    site: { // The MhpSite object (required from MhpSite/Index.vue)
        type: Object,
        required: true,
    },
    progress: { // The specific progress object to edit (optional, for edit mode)
        type: Object,
        default: null,
    },
    mode: { // 'create' or 'edit' (passed from MhpSite/Index.vue)
        type: String,
        default: 'create',
    },
});

const emit = defineEmits(['close', 'saved']);

const handleFormSuccess = (message) => {
    emit('saved', message); // Emit 'saved' up to MhpSite/Index.vue with a message
    emit('close'); // Tell MhpSite/Index.vue to close THIS modal
};

const handleFormCancel = () => {
    emit('close'); // Tell MhpSite/Index.vue to close THIS modal
};
</script>

<template>
    <Modal :show="show" @close="handleFormCancel" :maxWidth="'3xl'" :title="`${mode === 'create' ? 'Add' : 'Edit'} Physical Progress`">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <ProjectPhysicalProgressForm
                :projectable-id="site.id"           :projectable-type="'App\\Models\\MhpSite'" :progress="progress"                 :mode="mode"                         @success="handleFormSuccess"
                @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

<style scoped>
/* No specific scoped styles needed here, as styling is handled by Modal.vue and ProjectPhysicalProgressForm.vue */
</style>

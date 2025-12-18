<script setup>
import Modal from '@/Components/Modal.vue';
import UserForm from '@/Pages/Admin/Users/Forms/UserForm.vue';

const props = defineProps({
    show: Boolean,
    roles: Array,
    permissions: Array,
    districts: Array,
});

const emit = defineEmits(['close', 'saved']);

const handleFormSuccess = (message) => {
    emit('saved', message);
    emit('close');
};

const handleFormCancel = () => {
    emit('close');
};
</script>

<template>
    <Modal :show="show" @close="handleFormCancel" :maxWidth="'3xl'" title="Create New User">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <UserForm
                :user="null"
                :roles="roles"
                :permissions="permissions"
                :districts="districts"
                @success="handleFormSuccess"
                @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

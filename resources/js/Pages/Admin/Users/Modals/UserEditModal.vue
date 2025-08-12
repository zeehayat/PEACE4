<script setup>
import Modal from '@/Components/Modal.vue';
import UserForm from '@/Pages/Admin/Users/Forms/UserForm.vue';

const props = defineProps({
    show: Boolean,
    user: { type: Object, required: true },
    roles: Array,
    permissions: Array,
    districts: Array,
});

const emit = defineEmits(['close', 'updated']);

const handleFormSuccess = (message) => {
    emit('updated', message);
    emit('close');
};

const handleFormCancel = () => {
    emit('close');
};
</script>

<template>
    <Modal :show="show" @close="handleFormCancel" :maxWidth="'3xl'" :title="`Edit User: ${user.name}`">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <UserForm
                :user="user"
                :roles="roles"
                :permissions="permissions"
                :districts="districts"
                mode="update"
                @success="handleFormSuccess"
                @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

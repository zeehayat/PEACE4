<script setup>
import Modal from '@/Components/Modal.vue';
import DangerButton from '@/Components/DangerButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import { router } from '@inertiajs/vue3';

const props = defineProps({
    show: Boolean,
    user: { type: Object, required: true },
});

const emit = defineEmits(['close', 'deleted']);

const deleteUser = () => {
    router.delete(route('admin.users.destroy', props.user.id), {
        onSuccess: () => {
            emit('deleted', 'User deleted successfully!');
            emit('close');
        },
        onError: (errors) => {
            console.error('Error deleting user:', errors);
            // You might want to handle this with a toast notification
        }
    });
};

const closeModal = () => {
    emit('close');
};
</script>

<template>
    <Modal :show="show" @close="closeModal">
        <div class="p-6">
            <h2 class="text-lg font-semibold text-gray-900">Delete User</h2>
            <p class="mt-4 text-sm text-gray-600">
                Are you sure you want to delete the user <strong>{{ user.name }}</strong>? This action cannot be undone.
            </p>
            <div class="mt-6 flex justify-end space-x-2">
                <SecondaryButton @click="closeModal">
                    Cancel
                </SecondaryButton>
                <DangerButton @click="deleteUser">
                    Delete
                </DangerButton>
            </div>
        </div>
    </Modal>
</template>

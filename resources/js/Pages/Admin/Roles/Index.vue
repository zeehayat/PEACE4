<script setup>
import { ref } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import Modal from '@/Components/Modal.vue';
import RoleForm from '@/Pages/Admin/Roles/Partials/RoleForm.vue';
import DangerButton from '@/Components/DangerButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';

// The controller will pass these props
const props = defineProps({
    roles: Array,
    groupedPermissions: Object,
});

const page = usePage();
console.log('Auth Object:', page.props.auth);

// Helper to check for permission
const canManageRoles = ()=> page.props.auth.user.can.role_manage;

const showCreateModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const selectedRole = ref(null);

const form = useForm({});

const openNewRoleModal = () =>gt; {
    selectedRole.value = null;
    showCreateModal.value = true;
};

const editRole = (role) =>gt; {
    selectedRole.value = { ...role };
    showEditModal.value = true;
};

const confirmDeleteRole = (role) =>gt; {
    selectedRole.value = role;
    showDeleteModal.value = true;
};

const deleteRole = () => {
    form.delete(route('admin.roles.destroy', selectedRole.value.id), {
        onSuccess: () => showDeleteModal.value = false,
});
};

const closeModal = () => {
    showCreateModal.value = false;
    showEditModal.value = false;
    showDeleteModal.value = false;
    selectedRole.value = null;
};
</script>

<template>
    <AppLayout title="Roles &amp; Permissions">
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
                Roles &amp; Permissions
            </h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div v-if="canManageRoles()" class="mb-4">
                    <PrimaryButton @click="openNewRoleModal">
                        Create New Role
                    </PrimaryButton>
                </div>
                <div class="overflow-hidden bg-white shadow-xl sm:rounded-lg">
                    <div class="relative overflow-x-auto">
                        <table class="min-w-full text-sm text-left text-gray-500 divide-y divide-gray-200">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3">Role Name</th>
                                <th scope="col" class="px-6 py-3">Permissions</th>
                                <th v-if="canManageRoles()" scope="col" class="px-6 py-3 text-right">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="role in roles" :key="role.id" class="bg-white border-b hover:bg-gray-50">
                                <td class="px-6 py-4 font-medium text-gray-900">{{ role.name }}</td>
                                <td class="flex flex-wrap gap-1 px-6 py-4">
                                        <span v-for="permission in role.permissions" :key="permission.id" class="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                                            {{ permission.name }}
                                        </span>
                                </td>
                                <td v-if="canManageRoles()" class="px-6 py-4 text-right">
                                    <button @click="editRole(role)" class="mr-2 font-medium text-indigo-600 hover:underline">Edit</button>
                                    <button @click="confirmDeleteRole(role)" class="font-medium text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <Modal :show="showCreateModal || showEditModal" @close="closeModal">
            <RoleForm
                :role="selectedRole"
                :grouped-permissions="groupedPermissions"
                @close="closeModal"
            />
        </Modal>

        <Modal :show="showDeleteModal" @close="closeModal">
            <div class="p-6">
                <h2 class="text-lg font-medium text-gray-900">
                    Are you sure you want to delete the role "{{ selectedRole?.name }}"?
                </h2>
                <div class="flex justify-end mt-6">
                    <SecondaryButton @click="closeModal">Cancel</SecondaryButton>
                    <DangerButton class="ml-3" @click="deleteRole">Delete Role</DangerButton>
                </div>
            </div>
        </Modal>
    </AppLayout>
</template>

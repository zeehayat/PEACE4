<script setup>
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';
import AppLayout from "@/Layouts/AppLayout.vue";
import Pagination from '@/Components/Pagination.vue';
import UserCreateModal from '@/Pages/Admin/Users/Modals/UserCreateModal.vue';
import UserEditModal from '@/Pages/Admin/Users/Modals/UserEditModal.vue';
import UserDeleteModal from '@/Pages/Admin/Users/Modals/UserDeleteModal.vue';

const props = defineProps({
    users: Object,
    roles: Array,
    districts: Array,
    filters: Object,
    can: Object,
});

const searchTerm = ref(props.filters.search || '');
const showUserCreateModal = ref(false);
const showUserEditModal = ref(false);
const showUserDeleteModal = ref(false);
const selectedUser = ref(null);

if (props.filters.open === 'create') {
    showUserCreateModal.value = true;
}

const openNewUserModal = () => {
    selectedUser.value = null;
    showUserCreateModal.value = true;
};

const editUser = (user) => {
    selectedUser.value = user;
    showUserEditModal.value = true;
};

const deleteUser = (user) => {
    selectedUser.value = user;
    showUserDeleteModal.value = true;
};

const closeModal = () => {
    showUserCreateModal.value = false;
    showUserEditModal.value = false;
    showUserDeleteModal.value = false;
    selectedUser.value = null;
};

const handleSearch = () => {
    router.get(route('admin.users.index'), { search: searchTerm.value }, { preserveState: true, replace: true });
};
</script>

<template>
    <AppLayout title="User Management">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                User Management
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        v-model="searchTerm"
                        @keyup.enter="handleSearch"
                        placeholder="Search..."
                        class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                    />
                    <button v-if="can.user_manage" @click="openNewUserModal" class="px-4 py-2 bg-indigo-600 text-white rounded-md">
                        New User
                    </button>
                </div>

                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Roles</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="user in users.data" :key="user.id">
                            <td class="px-6 py-4 whitespace-nowrap">{{ user.name }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{{ user.email }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                    <span v-for="role in user.roles" :key="role.id" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 mr-1">
                                        {{ role.name }}
                                    </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" v-if="can.user_manage">
                                <button @click="editUser(user)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
                                <button @click="deleteUser(user)" class="text-red-600 hover:text-red-900 ml-4">Delete</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <Pagination :links="users.links" class="mt-6" />
            </div>
        </div>

        <UserCreateModal :show="showUserCreateModal" :roles="roles" :districts="districts" @close="closeModal" />
        <UserEditModal v-if="selectedUser" :show="showUserEditModal" :user="selectedUser" :roles="roles" :districts="districts" @close="closeModal" />
        <UserDeleteModal v-if="selectedUser" :show="showUserDeleteModal" :user="selectedUser" @close="closeModal" />
    </AppLayout>
</template>

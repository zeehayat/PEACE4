<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { router, Link, usePage } from '@inertiajs/vue3';

import SideBar from "@/Components/SideBar.vue";
import Toast from '@/Components/Toast.vue';
import Pagination from '@/Components/Pagination.vue';
import Modal from '@/Components/Modal.vue';

// User-specific components and forms
import UserForm from '@/Pages/Admin/Users/Forms/UserForm.vue';
import UserCreateModal from '@/Pages/Admin/Users/Modals/UserCreateModal.vue';
import UserEditModal from '@/Pages/Admin/Users/Modals/UserEditModal.vue';
import UserDeleteModal from '@/Pages/Admin/Users/Modals/UserDeleteModal.vue';
import AppLayout from "@/Layouts/AppLayout.vue";


const props = defineProps({
    users: Object, // Paginated data for Users
    roles: Array, // All roles from the spatie/laravel-permission package
    permissions: Array, // All permissions from the spatie/laravel-permission package
    districts: Array, // All districts for the user form
    filters: Object,
    errors: Object, // Validation errors from backend
});

const page = usePage();

// --- Reactive State Variables ---
const selectedUser = ref(null);

const toastVisible = ref(false);
const toastMessage = ref('');
const toastType = ref('success');
const searchTerm = ref(props.filters.search || '');

// Modal Visibility Control flags
const showUserCreateModal = ref(false);
const showUserEditModal = ref(false);
const showUserDeleteModal = ref(false);


// --- Centralized Handlers ---
function handleUpdated(message) {
    toastMessage.value = message;
    toastType.value = 'success';
    toastVisible.value = true;
    setTimeout(() => (toastVisible.value = false), 3000);

    router.reload({ only: ['users'], preserveState: true });
}

function closeModal() {
    showUserCreateModal.value = false;
    showUserEditModal.value = false;
    showUserDeleteModal.value = false;

    setTimeout(() => {
        selectedUser.value = null;
    }, 300);
}

// --- Handlers for User Actions ---
function handleEditUser(user) { selectedUser.value = user; showUserEditModal.value = true; }
function handleDeleteUser(user) { selectedUser.value = user; showUserDeleteModal.value = true; }
const openNewUserModal = () => { selectedUser.value = null; showUserCreateModal.value = true; };

// --- Filter and Display Helpers ---
const filteredUsers = computed(() => {
    const data = props.users?.data || [];
    if (!searchTerm.value.trim()) return data;
    const term = searchTerm.value.trim().toLowerCase();
    return data.filter(user =>
        (user.name || '').toLowerCase().includes(term) ||
        (user.email || '').toLowerCase().includes(term) ||
        user.roles.some(role => (role.name || '').toLowerCase().includes(term))
    );
});

const handlePagination = (url) => {
    router.get(url, { search: searchTerm.value }, { preserveState: true, replace: true });
};
</script>

<template>
    <AppLayout title="Dashboard">
        <template #header>
            <h2 class="text-4xl font-extrabold text-indigo-400 border-collapse">SRSP PEACE 2</h2>
        </template>

    <div class="bg-gray-50 font-sans antialiased text-gray-800 min-h-screen">
        <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <header class="mb-8 bg-white p-6 rounded-lg shadow-md">
                <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">User Management</h1>
                        <p class="mt-1 text-base text-gray-600">Create and manage user accounts, roles, and permissions.</p>
                    </div>
                    <div class="flex w-full md:w-auto items-center gap-x-3">
                        <div class="relative flex-grow">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                v-model="searchTerm"
                                @input="router.get(route('admin.users.index'), { search: searchTerm }, { preserveState: true, replace: true })"
                                placeholder="Search by Name, Email, or Role..."
                                class="block w-full rounded-lg border-gray-300 bg-white py-2.5 pl-10 pr-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200"
                            />
                        </div>
                        <button @click="openNewUserModal" class="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200 flex-shrink-0">
                            <svg class="-ml-0.5 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                            </svg>
                            <span>New User</span>
                        </button>
                    </div>
                </div>
            </header>

            <!-- Table View for Users -->
            <div class="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User Info</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Roles</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">District</th>
                        <th scope="col" class="relative px-6 py-3"><span class="sr-only">Actions</span></th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                    <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50 transition-colors duration-150 group">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">{{ user.name ?? 'N/A' }}</div>
                            <div class="text-xs text-gray-500 mt-0.5">{{ user.email ?? 'N/A' }}</div>
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex flex-wrap gap-1">
                                <span v-for="role in user.roles" :key="role.id" class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-800">
                                    {{ role.name }}
                                </span>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {{ user.district?.name ?? 'N/A' }}
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div class="flex items-center justify-end space-x-2">
                                <button @click="handleEditUser(user)" class="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-200/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-opacity">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="M15 5l4 4"/></svg>
                                </button>
                                <button @click="handleDeleteUser(user)" class="p-2 text-red-500 hover:text-red-900 rounded-full hover:bg-red-200/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-opacity">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <Pagination :links="users.links" @pagination-link-clicked="handlePagination" class="mt-8" />
        </div>
    </div>

    <!-- Toast Notification -->
    <Toast :show="toastVisible" :message="toastMessage" :type="toastType" @hide="toastVisible = false" />

    <!-- Modals -->
    <UserCreateModal
        :show="showUserCreateModal"
        :roles="roles"
        :permissions="permissions"
        :districts="districts"
        @close="closeModal"
        @saved="handleUpdated"
    />
    <UserEditModal
        v-if="selectedUser"
        :show="showUserEditModal"
        :user="selectedUser"
        :roles="roles"
        :permissions="permissions"
        :districts="districts"
        @close="closeModal"
        @updated="handleUpdated"
    />
    <UserDeleteModal
        v-if="selectedUser"
        :show="showUserDeleteModal"
        :user="selectedUser"
        @close="closeModal"
        @deleted="handleUpdated"
    />
    </AppLayout>
</template>

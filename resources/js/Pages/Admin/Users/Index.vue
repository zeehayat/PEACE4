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
        <div class="bg-gray-50 font-sans antialiased text-gray-800 min-h-screen">
            <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <header class="mb-8 bg-white p-6 rounded-lg shadow-md">
                    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <button
                            v-if="$page.props.auth.user.can.user_manage"
                            @click="openNewUserModal"
                            class="..."
                        >
                            <span>New User</span>
                        </button>
                    </div>
                </header>

                <div class="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                    <table class="min-w-full divide-y divide-gray-200">
                        <tbody class="divide-y divide-gray-200">
                        <tr v-for="user in users.data" :key="user.id" class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div class="flex items-center justify-end space-x-2">
                                    <button
                                        v-if="$page.props.auth.user.can.user_manage"
                                        @click="handleEditUser(user)"
                                        class="..."
                                    >
                                    </button>

                                    <button
                                        v-if="$page.props.auth.user.can.user_manage"
                                        @click="handleDeleteUser(user)"
                                        class="..."
                                    >
                                    </button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

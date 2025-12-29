<script setup>
import { computed, reactive, ref } from 'vue';
import { Link, router } from '@inertiajs/vue3';
import { route } from 'ziggy-js';
import AppLayout from '@/Layouts/AppLayout.vue';
import Pagination from '@/Components/Pagination.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';

const props = defineProps({
    logs: Object,
    users: Array,
    methods: Array,
    filters: Object,
    stats: Object,
});

const filters = reactive({
    user_id: props.filters?.user_id || '',
    method: props.filters?.method || '',
    search: props.filters?.search || '',
});
const showLogs = ref(props.filters?.open === 'logs');

const logRows = computed(() => props.logs?.data ?? []);

const applyFilters = () => {
    const payload = {
        ...filters,
        ...(showLogs.value ? { open: 'logs' } : {}),
    };
    router.get(route('admin.dashboard'), payload, {
        preserveState: true,
        preserveScroll: true,
    });
};

const resetFilters = () => {
    filters.user_id = '';
    filters.method = '';
    filters.search = '';
    const payload = showLogs.value ? { open: 'logs' } : {};
    router.get(route('admin.dashboard'), payload, {
        preserveState: true,
        preserveScroll: true,
    });
};

const onPaginate = (url) => {
    router.get(url, {}, {
        preserveState: true,
        preserveScroll: true,
    });
};

const toggleLogs = () => {
    showLogs.value = !showLogs.value;
};

const formatDate = (value) => {
    if (!value) return '';
    return new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(value));
};
</script>

<template>
    <AppLayout title="Admin Dashboard">
        <template #header>
            <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 class="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
                    <p class="text-sm text-gray-600">ActivityLog visibility is restricted to Admins and Roots.</p>
                </div>
                <div class="flex flex-wrap gap-2">
                    <PrimaryButton v-if="!showLogs" @click="toggleLogs">View Logs</PrimaryButton>
                    <SecondaryButton v-else @click="toggleLogs">Hide Logs</SecondaryButton>
                </div>
            </div>
        </template>

        <div class="space-y-6">
            <div class="grid gap-4 lg:grid-cols-3">
                <div class="rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-5 text-white shadow-lg">
                    <div class="text-sm uppercase tracking-wide text-gray-300">Total Events</div>
                    <div class="mt-2 flex items-baseline gap-2">
                        <span class="text-3xl font-semibold">{{ props.stats?.total ?? 0 }}</span>
                        <span class="text-xs text-gray-300">lifetime</span>
                    </div>
                </div>
                <div class="rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-700 p-5 text-white shadow-lg">
                    <div class="text-sm uppercase tracking-wide text-indigo-100">Today</div>
                    <div class="mt-2 flex items-baseline gap-2">
                        <span class="text-3xl font-semibold">{{ props.stats?.today ?? 0 }}</span>
                        <span class="text-xs text-indigo-100">new entries</span>
                    </div>
                </div>
                <div class="rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 p-5 text-white shadow-lg">
                    <div class="text-sm uppercase tracking-wide text-emerald-100">Active Users</div>
                    <div class="mt-2 flex items-baseline gap-2">
                        <span class="text-3xl font-semibold">{{ props.stats?.unique_users ?? 0 }}</span>
                        <span class="text-xs text-emerald-100">unique</span>
                    </div>
                </div>
            </div>

            <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <Link
                    :href="route('admin.dashboard', { open: 'logs' })"
                    class="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                    <div class="flex items-center gap-3">
                        <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625A2.625 2.625 0 0016.875 9h-9.75A2.625 2.625 0 004.5 11.625v2.625m15 0a2.625 2.625 0 01-2.625 2.625h-9.75A2.625 2.625 0 014.5 14.25m15 0V9.375C19.5 7.511 17.989 6 16.125 6H7.875C6.011 6 4.5 7.511 4.5 9.375v4.875m6-4.125h3" />
                            </svg>
                        </span>
                        <div>
                        <div class="text-xs uppercase tracking-wide text-gray-500">Logs</div>
                        <div class="text-base font-semibold text-gray-900">Activity Log</div>
                    </div>
                    </div>
                    <span class="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">View</span>
                </Link>
                <Link
                    :href="route('admin.users.index', { open: 'create' })"
                    class="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                    <div class="flex items-center gap-3">
                        <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM6 18.75a6 6 0 0112 0m-3-3.75h3m-1.5-1.5v3" />
                            </svg>
                        </span>
                        <div>
                        <div class="text-xs uppercase tracking-wide text-gray-500">Users</div>
                        <div class="text-base font-semibold text-gray-900">Create User</div>
                    </div>
                    </div>
                    <span class="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">New</span>
                </Link>
                <Link
                    :href="route('admin.users.index')"
                    class="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                    <div class="flex items-center gap-3">
                        <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 3c-1.375 0-2.68.463-3.728 1.243m0 0A5.971 5.971 0 006 7.5c0 1.104.3 2.178.826 3.111M6 18.719A5.971 5.971 0 015.059 15.5m.767-4.389a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477" />
                            </svg>
                        </span>
                        <div>
                        <div class="text-xs uppercase tracking-wide text-gray-500">Users</div>
                        <div class="text-base font-semibold text-gray-900">Manage Users</div>
                    </div>
                    </div>
                    <span class="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">List</span>
                </Link>
                <Link
                    :href="route('admin.access-control.index')"
                    class="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                    <div class="flex items-center gap-3">
                        <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-2.25 0h13.5a1.5 1.5 0 011.5 1.5v6.75a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V12a1.5 1.5 0 011.5-1.5z" />
                            </svg>
                        </span>
                        <div>
                        <div class="text-xs uppercase tracking-wide text-gray-500">Rights</div>
                        <div class="text-base font-semibold text-gray-900">Assign Access</div>
                    </div>
                    </div>
                    <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Assign</span>
                </Link>
                <Link
                    :href="route('admin.roles.index', { open: 'create' })"
                    class="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                    <div class="flex items-center gap-3">
                        <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </span>
                        <div>
                        <div class="text-xs uppercase tracking-wide text-gray-500">Roles</div>
                        <div class="text-base font-semibold text-gray-900">Create Role</div>
                    </div>
                    </div>
                    <span class="rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700">New</span>
                </Link>
                <Link
                    :href="route('admin.roles.index')"
                    class="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                    <div class="flex items-center gap-3">
                        <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6.75V5.625A2.625 2.625 0 0013.875 3h-3.75A2.625 2.625 0 007.5 5.625V6.75m9 0h-9m9 0h1.125A2.625 2.625 0 0120.25 9.375v7.5A2.625 2.625 0 0117.625 19.5H6.375A2.625 2.625 0 013.75 16.875v-7.5A2.625 2.625 0 016.375 6.75H7.5" />
                            </svg>
                        </span>
                        <div>
                        <div class="text-xs uppercase tracking-wide text-gray-500">Roles</div>
                        <div class="text-base font-semibold text-gray-900">Manage Roles</div>
                    </div>
                    </div>
                    <span class="rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700">Edit</span>
                </Link>
                <Link
                    :href="route('admin.access-control.index')"
                    class="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                    <div class="flex items-center gap-3">
                        <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 7.5a3 3 0 00-6 0v3m-2.25 0h10.5a1.5 1.5 0 011.5 1.5v6.75a1.5 1.5 0 01-1.5 1.5H6.75a1.5 1.5 0 01-1.5-1.5V12a1.5 1.5 0 011.5-1.5z" />
                            </svg>
                        </span>
                        <div>
                        <div class="text-xs uppercase tracking-wide text-gray-500">Permissions</div>
                        <div class="text-base font-semibold text-gray-900">District Permissions</div>
                    </div>
                    </div>
                    <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Manage</span>
                </Link>
            </div>

            <div v-if="showLogs" class="rounded-2xl bg-white shadow">
                <div class="border-b border-gray-100 px-6 py-4">
                    <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900">Activity Log</h3>
                            <p class="text-sm text-gray-600">Search by user, method, route fragment, or IP.</p>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <PrimaryButton @click="applyFilters">Refresh</PrimaryButton>
                            <SecondaryButton @click="resetFilters">Clear</SecondaryButton>
                        </div>
                    </div>
                    <div class="mt-4 grid gap-4 md:grid-cols-3">
                        <label class="text-sm text-gray-700">
                            <span class="mb-1 block text-gray-600">User</span>
                            <select v-model="filters.user_id" class="w-full rounded-lg border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                <option value="">All users</option>
                                <option v-for="user in props.users" :key="user.id" :value="user.id">
                                    {{ user.name }} — {{ user.email }}
                                </option>
                            </select>
                        </label>
                        <label class="text-sm text-gray-700">
                            <span class="mb-1 block text-gray-600">Method</span>
                            <select v-model="filters.method" class="w-full rounded-lg border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                <option value="">Any method</option>
                                <option v-for="method in props.methods" :key="method" :value="method">{{ method }}</option>
                            </select>
                        </label>
                        <label class="text-sm text-gray-700">
                            <span class="mb-1 block text-gray-600">Search</span>
                            <input
                                v-model="filters.search"
                                type="text"
                                placeholder="Route, action, or IP"
                                class="w-full rounded-lg border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </label>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">When</th>
                                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">User</th>
                                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">Action</th>
                                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">Method</th>
                                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">Status</th>
                                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">IP</th>
                                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">Route</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 bg-white">
                            <tr v-for="log in logRows" :key="log.id" class="hover:bg-indigo-50/40">
                                <td class="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{{ formatDate(log.created_at) }}</td>
                                <td class="px-4 py-3 text-sm text-gray-800">
                                    <div class="font-medium text-gray-900">{{ log.user?.name || 'System' }}</div>
                                    <div class="text-xs text-gray-500">
                                        {{ log.user?.email || 'N/A' }}
                                        <span v-if="log.district" class="ml-1 text-[11px] text-indigo-600">({{ log.district.name }})</span>
                                    </div>
                                </td>
                                <td class="px-4 py-3 text-sm text-gray-700">
                                    <div class="font-medium text-gray-900">{{ log.action }}</div>
                                    <div class="mt-1 flex flex-wrap gap-1">
                                        <span v-for="key in (log.meta?.payload_keys || [])" :key="key" class="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-600">
                                            {{ key }}
                                        </span>
                                    </div>
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    <span class="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold uppercase text-gray-700">
                                        {{ log.method }}
                                    </span>
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    <span
                                        class="rounded-full px-2 py-1 text-xs font-semibold"
                                        :class="Number(log.meta?.status) >= 400 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'"
                                    >
                                        {{ log.meta?.status ?? '—' }}
                                    </span>
                                </td>
                                <td class="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{{ log.ip }}</td>
                                <td class="px-4 py-3 text-sm text-gray-700 max-w-xs">
                                    <div class="truncate" :title="log.route">{{ log.route }}</div>
                                </td>
                            </tr>
                            <tr v-if="!logRows.length">
                                <td colspan="7" class="px-4 py-6 text-center text-sm text-gray-500">No activity found for the current filters.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Pagination v-if="props.logs?.links" :links="props.logs.links" @pagination-link-clicked="onPaginate" />
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import { computed, ref } from 'vue';
import { router, usePage } from '@inertiajs/vue3';
import { route } from 'ziggy-js';
import AppLayout from '@/Layouts/AppLayout.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';

const props = defineProps({
    users: Array,
    districts: Array,
    permissions: Array,
    auditLogs: Array,
    filters: Object,
});

const selectedUserId = ref(props.filters?.user_id || (props.users[0]?.id ?? null));
const formPermissions = ref(buildInitial());

function buildInitial() {
    const map = {};
    props.permissions.forEach((p) => {
        map[`${p.user_id}-${p.district_id}`] = p;
    });
    return props.districts.map((d) => {
        const key = `${selectedUserId.value}-${d.id}`;
        const existing = map[key];
        return {
            district_id: d.id,
            district_name: d.name,
            can_read: existing?.can_read ?? false,
            can_create: existing?.can_create ?? false,
            can_update: existing?.can_update ?? false,
            can_delete: existing?.can_delete ?? false,
        };
    });
}

const selectedUser = computed(() => props.users.find((u) => u.id === Number(selectedUserId.value)));

const toggle = (idx, field) => {
    formPermissions.value[idx][field] = !formPermissions.value[idx][field];
};

const submit = () => {
    router.post(route('admin.access-control.store'), {
        user_id: selectedUserId.value,
        permissions: formPermissions.value.map(({ district_id, can_read, can_create, can_update, can_delete }) => ({
            district_id,
            can_read,
            can_create,
            can_update,
            can_delete,
        })),
    }, {
        preserveScroll: true,
    });
};

const onUserChange = () => {
    formPermissions.value = buildInitial();
};
</script>

<template>
    <AppLayout title="Access Control">
        <template #header>
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="font-semibold text-xl text-gray-800 leading-tight">Role-Based Access Control</h2>
                    <p class="text-sm text-gray-500">Admin-only: assign district CRUD privileges and review user activity.</p>
                </div>
                <PrimaryButton @click="submit">Save Changes</PrimaryButton>
            </div>
        </template>

        <div class="py-8 space-y-6">
            <div class="bg-white shadow-sm sm:rounded-lg p-6">
                <div class="flex flex-wrap items-center gap-4 mb-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Select User</label>
                        <select v-model="selectedUserId" @change="onUserChange" class="mt-1 block w-64 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                            <option v-for="u in props.users" :key="u.id" :value="u.id">{{ u.name }} ({{ u.email }})</option>
                        </select>
                    </div>
                    <div v-if="selectedUser" class="text-sm text-gray-600">
                        <span class="font-semibold">District:</span> {{ selectedUser.district?.name ?? 'N/A' }} |
                        <span class="font-semibold">Roles:</span> {{ selectedUser.roles?.map(r => r.name).join(', ') || 'None' }}
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">District</th>
                                <th class="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wide">Read</th>
                                <th class="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wide">Create</th>
                                <th class="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wide">Update</th>
                                <th class="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wide">Delete</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr v-for="(perm, idx) in formPermissions" :key="perm.district_id">
                                <td class="px-4 py-2 text-sm text-gray-700">{{ perm.district_name }}</td>
                                <td class="px-4 py-2 text-center">
                                    <input type="checkbox" v-model="perm.can_read" @change="toggle(idx, 'can_read')" />
                                </td>
                                <td class="px-4 py-2 text-center">
                                    <input type="checkbox" v-model="perm.can_create" @change="toggle(idx, 'can_create')" />
                                </td>
                                <td class="px-4 py-2 text-center">
                                    <input type="checkbox" v-model="perm.can_update" @change="toggle(idx, 'can_update')" />
                                </td>
                                <td class="px-4 py-2 text-center">
                                    <input type="checkbox" v-model="perm.can_delete" @change="toggle(idx, 'can_delete')" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="bg-white shadow-sm sm:rounded-lg p-6">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800">Recent Activity</h3>
                        <p class="text-sm text-gray-500">Last 100 actions. Filtered by selected user.</p>
                    </div>
                    <PrimaryButton @click="router.get(route('admin.access-control.index'), { user_id: selectedUserId })" class="bg-gray-700 hover:bg-gray-800">Refresh</PrimaryButton>
                </div>
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">When</th>
                                <th class="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Action</th>
                                <th class="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Method</th>
                                <th class="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Route</th>
                                <th class="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Status</th>
                                <th class="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">IP</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr v-for="log in props.auditLogs" :key="log.id">
                                <td class="px-3 py-2 text-sm text-gray-700">{{ new Date(log.created_at).toLocaleString() }}</td>
                                <td class="px-3 py-2 text-sm text-gray-700">{{ log.action }}</td>
                                <td class="px-3 py-2 text-sm text-gray-700">{{ log.method }}</td>
                                <td class="px-3 py-2 text-sm text-gray-700 truncate max-w-md">{{ log.route }}</td>
                                <td class="px-3 py-2 text-sm text-gray-700">{{ log.meta?.status ?? '' }}</td>
                                <td class="px-3 py-2 text-sm text-gray-700">{{ log.ip }}</td>
                            </tr>
                            <tr v-if="!props.auditLogs.length">
                                <td colspan="6" class="px-3 py-4 text-center text-sm text-gray-500">No activity yet.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

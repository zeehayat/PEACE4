<script setup>
import { useForm } from '@inertiajs/vue3';
import { computed } from 'vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';

const props = defineProps({
    role: {
        type: Object,
        default: null,
    },
    groupedPermissions: Object,
});

const emit = defineEmits(['close']);

const isEditMode = computed(() => !!props.role);
const groupEntries = computed(() => {
    const entries = Object.entries(props.groupedPermissions || {});
    return entries.sort(([a], [b]) => a.localeCompare(b));
});
const allPermissionNames = computed(() => {
    return groupEntries.value.flatMap(([, permissions]) => permissions.map((permission) => permission.name));
});
const allPermissionsSelected = computed(() => {
    if (allPermissionNames.value.length === 0) {
        return false;
    }
    return allPermissionNames.value.every((name) => form.permissions.includes(name));
});

const form = useForm({
        name: props.role?.name || '',
        permissions: props.role?.permissions.map(p => p.name) || [],
    });

const toggleAllPermissions = (event) => {
    if (event.target.checked) {
        form.permissions = [...allPermissionNames.value];
        return;
    }
    form.permissions = [];
};

const submit = () => {
    const routeName = isEditMode.value ? 'admin.roles.update' : 'admin.roles.store';
    const options = {
            onSuccess: () => emit('close'),
        };

    if (isEditMode.value) {
        form.put(route(routeName, props.role.id), options);
    } else {
        form.post(route(routeName), options);
    }
};
</script>

<template>
    <form @submit.prevent="submit" class="p-6">
        <h2 class="text-lg font-medium text-gray-900">
            {{ isEditMode ? 'Edit Role' : 'Create New Role' }}
        </h2>

        <div class="mt-6 space-y-6">
            <details class="border border-gray-200 rounded-lg bg-white shadow-sm">
                <summary class="cursor-pointer select-none px-4 py-3 font-semibold text-gray-900">
                    Role Details
                </summary>
                <div class="px-4 pb-4 pt-2 space-y-4">
                    <div>
                        <InputLabel for="name" value="Role Name" />
                        <TextInput
                            id="name"
                            v-model="form.name"
                            type="text"
                            class="block w-full mt-1"
                            required
                        />
                        <InputError :message="form.errors.name" class="mt-2" />
                    </div>
                    <label class="flex items-center text-sm text-gray-700">
                        <input
                            type="checkbox"
                            :checked="allPermissionsSelected"
                            @change="toggleAllPermissions"
                            class="text-indigo-600 border-gray-300 rounded shadow-sm focus:ring-indigo-500"
                        />
                        <span class="ml-2">Check all permissions</span>
                    </label>
                    <div class="text-xs text-gray-500">
                        Assign permissions on the right to control access.
                    </div>
                </div>
            </details>

            <details class="border border-gray-200 rounded-lg bg-white shadow-sm">
                <summary class="cursor-pointer select-none px-4 py-3 font-semibold text-gray-900">
                    Permissions
                </summary>
                <div class="px-4 pb-4 pt-2">
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                        <details
                            v-for="[group, permissions] in groupEntries"
                            :key="group"
                            class="border border-gray-200 rounded-md bg-gray-50"
                        >
                            <summary class="cursor-pointer select-none px-3 py-2 font-semibold text-gray-800 capitalize">
                                {{ group }} Management
                            </summary>
                            <div class="px-3 pb-3 pt-2">
                                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <label
                                        v-for="permission in permissions"
                                        :key="permission.id"
                                        class="flex items-center text-sm text-gray-700"
                                    >
                                        <input
                                            type="checkbox"
                                            :value="permission.name"
                                            v-model="form.permissions"
                                            class="text-indigo-600 border-gray-300 rounded shadow-sm focus:ring-indigo-500"
                                        />
                                        <span class="ml-2">{{ permission.name.replace(/_/g, ' ') }}</span>
                                    </label>
                                </div>
                            </div>
                        </details>
                    </div>
                    <InputError :message="form.errors.permissions" class="mt-3" />
                </div>
            </details>
        </div>

        <div class="flex justify-end mt-6">
            <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                {{ isEditMode ? 'Update Role' : 'Create Role' }}
            </PrimaryButton>
        </div>
    </form>
</template>

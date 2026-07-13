<script setup>
import { computed, reactive, watch, ref, onMounted } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';

import InputGroup from '@/Components/FormComponents/InputGroup.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import SelectInput from '@/Components/SelectInput.vue';
import PasswordInput from '@/Components/PasswordInput.vue'; // Assuming a PasswordInput component exists

const props = defineProps({
    user: { type: Object, default: null },
    roles: { type: Array, default: () => [] },
    groupedPermissions: { type: Object, default: () => ({}) },
    districts: { type: Array, default: () => [] },
    mode: { type: String, default: 'create' },
});

const groupEntries = computed(() => {
    const entries = Object.entries(props.groupedPermissions || {});
    return entries.sort(([a], [b]) => a.localeCompare(b));
});

const emit = defineEmits(['success', 'cancel']);
const isEditMode = ref(props.mode === 'update');
const globalDistrictValue = 'global';

const form = useForm({
    name: props.user?.name || '',
    email: props.user?.email || '',
    password: '',
    password_confirmation: '',
    district_id: props.user?.district_id ?? globalDistrictValue,
    roles: props.user?.roles.map(role => role.name) || [],
    permissions: props.user?.permissions?.map(permission => permission.name) || [],
});

const districtOptions = computed(() => [
    { id: globalDistrictValue, name: 'Global (All Districts)' },
    ...props.districts,
]);

watch(() => props.user, (newUser) => {
    isEditMode.value = !!newUser;
    if (newUser) {
        form.defaults({
            name: newUser.name,
            email: newUser.email,
            district_id: newUser.district_id ?? globalDistrictValue,
            roles: newUser.roles.map(role => role.name),
            permissions: newUser.permissions.map(p => p.name),
        });
    } else {
        form.defaults({
            name: '',
            email: '',
            district_id: globalDistrictValue,
            roles: [],
            permissions: [],
        });
    }
    form.reset();
}, { immediate: true });

const handleSubmit = () => {
    const url = isEditMode.value
        ? route('admin.users.update', props.user.id)
        : route('admin.users.store');

    form.transform((data) => {
        if (isEditMode.value) {
            data._method = 'put';
        }
        if (data.district_id === globalDistrictValue) {
            data.district_id = null;
        }
        return data;
    }).post(url, {
        onSuccess: () => {
            emit('success', isEditMode.value ? 'User updated successfully!' : 'User created successfully!');
        },
        onError: (errors) => {
            console.error('Form errors:', errors);
        },
        preserveScroll: true,
        preserveState: true,
    });
};

const handleCancel = () => {
    form.reset();
    emit('cancel');
};
</script>

<template>
    <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Name -->
            <InputGroup id="name" label="Name" :required="true" :error="form.errors.name">
                <TextInput
                    id="name"
                    v-model="form.name"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.name }"
                />
            </InputGroup>

            <!-- Email -->
            <InputGroup id="email" label="Email" :required="true" :error="form.errors.email">
                <TextInput
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.email }"
                    :disabled="isEditMode"
                />
            </InputGroup>

            <!-- District -->
            <InputGroup id="district_id" label="District" :error="form.errors.district_id">
                <SelectInput
                    id="district_id"
                    v-model="form.district_id"
                    :options="districtOptions"
                    option-label="name"
                    option-value="id"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.district_id }"
                />
            </InputGroup>

            <!-- Roles -->
            <InputGroup id="roles" label="Roles" :required="!isEditMode" :error="form.errors.roles">
                <SelectInput
                    id="roles"
                    v-model="form.roles"
                    :options="roles"
                    option-label="name"
                    option-value="name"
                    :multiple="true"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.roles }"
                />
            </InputGroup>

            <!-- Direct Permissions -->
            <InputGroup
                label="Direct Permissions"
                class="md:col-span-2"
                :error="form.errors.permissions"
            >
                <p class="text-xs text-ink-500 mt-1 mb-2">
                    Granted directly to this user, in addition to whatever their roles above already grant.
                </p>
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <details
                        v-for="[group, groupPermissions] in groupEntries"
                        :key="group"
                        class="border border-ink-200 rounded-md bg-paper-50"
                    >
                        <summary class="cursor-pointer select-none px-3 py-2 font-semibold text-ink-800 capitalize">
                            {{ group }} Management
                        </summary>
                        <div class="px-3 pb-3 pt-2">
                            <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                <label
                                    v-for="permission in groupPermissions"
                                    :key="permission.id"
                                    class="flex items-center text-sm text-ink-700"
                                >
                                    <input
                                        type="checkbox"
                                        :value="permission.name"
                                        v-model="form.permissions"
                                        class="text-accent-600 border-ink-300 rounded shadow-sm focus:ring-accent-500"
                                    />
                                    <span class="ml-2">{{ permission.name.replace(/_/g, ' ') }}</span>
                                </label>
                            </div>
                        </div>
                    </details>
                </div>
            </InputGroup>

            <!-- Password (only for create mode, or nullable for update) -->
            <InputGroup v-if="!isEditMode" id="password" label="Password" :required="true" :error="form.errors.password">
                <PasswordInput
                    id="password"
                    v-model="form.password"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.password }"
                />
            </InputGroup>
            <InputGroup
                v-if="!isEditMode"
                id="password_confirmation"
                label="Confirm Password"
                :required="true"
                :error="form.errors.password_confirmation"
            >
                <PasswordInput
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.password_confirmation }"
                />
            </InputGroup>
        </div>

        <div class="flex items-center justify-end mt-6 space-x-4">
            <button
                type="button"
                @click="handleCancel"
                class="inline-flex items-center px-4 py-2 bg-paper-200 border border-transparent rounded-md font-semibold text-xs text-ink-700 uppercase tracking-widest hover:bg-paper-300 focus:bg-paper-300 active:bg-paper-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 transition ease-in-out duration-150"
            >
                Cancel
            </button>
            <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                {{ isEditMode ? 'Update User' : 'Create User' }}
            </PrimaryButton>
        </div>
    </form>
</template>

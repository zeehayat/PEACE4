<script setup>
import { reactive, watch, ref, onMounted } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';

import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import SelectInput from '@/Components/SelectInput.vue';
import PasswordInput from '@/Components/PasswordInput.vue'; // Assuming a PasswordInput component exists

const props = defineProps({
    user: { type: Object, default: null },
    roles: { type: Array, default: () => [] }, // Good practice to add defaults
    permissions: { type: Array, default: () => [] }, // Good practice to add defaults
    districts: { type: Array, default: () => [] }, // <-- ADD THIS DEFAULT
    mode: { type: String, default: 'create' },
});

const emit = defineEmits(['success', 'cancel']);
const isEditMode = ref(props.mode === 'update');

const form = useForm({
    name: props.user?.name || '',
    email: props.user?.email || '',
    password: '',
    password_confirmation: '',
    district_id: props.user?.district_id || null,
    roles: props.user?.roles.map(role => role.name) || [],
    permissions: props.user?.permissions.map(permission => permission.name) || [],
});

watch(() => props.user, (newUser) => {
    isEditMode.value = !!newUser;
    if (newUser) {
        form.defaults({
            name: newUser.name,
            email: newUser.email,
            district_id: newUser.district_id,
            roles: newUser.roles.map(role => role.name),
            permissions: newUser.permissions.map(p => p.name),
        });
    } else {
        form.defaults({ name: '', email: '', district_id: null, roles: [], permissions: [] });
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
            <div>
                <InputLabel for="name" value="Name" />
                <TextInput
                    id="name"
                    v-model="form.name"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.name }"
                />
                <InputError class="mt-2" :message="form.errors.name" />
            </div>

            <!-- Email -->
            <div>
                <InputLabel for="email" value="Email" />
                <TextInput
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.email }"
                    :disabled="isEditMode"
                />
                <InputError class="mt-2" :message="form.errors.email" />
            </div>

            <!-- District -->
            <div>
                <InputLabel for="district_id" value="District" />
                <SelectInput
                    id="district_id"
                    v-model="form.district_id"
                    :options="districts"
                    option-label="name"
                    option-value="id"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.district_id }"
                />
                <InputError class="mt-2" :message="form.errors.district_id" />
            </div>

            <!-- Roles -->
            <div>
                <InputLabel for="roles" value="Roles" />
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
                <InputError class="mt-2" :message="form.errors.roles" />
            </div>

            <!-- Password (only for create mode, or nullable for update) -->
            <div v-if="!isEditMode">
                <InputLabel for="password" value="Password" />
                <PasswordInput
                    id="password"
                    v-model="form.password"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.password }"
                />
                <InputError class="mt-2" :message="form.errors.password" />
            </div>
            <div v-if="!isEditMode">
                <InputLabel for="password_confirmation" value="Confirm Password" />
                <PasswordInput
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.password_confirmation }"
                />
                <InputError class="mt-2" :message="form.errors.password_confirmation" />
            </div>
        </div>

        <div class="flex items-center justify-end mt-6 space-x-4">
            <button
                type="button"
                @click="handleCancel"
                class="inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
            >
                Cancel
            </button>
            <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                {{ isEditMode ? 'Update User' : 'Create User' }}
            </PrimaryButton>
        </div>
    </form>
</template>

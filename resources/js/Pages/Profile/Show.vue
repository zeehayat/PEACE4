<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import InputGroup from '@/Components/FormComponents/InputGroup.vue';
import PasswordInput from '@/Components/PasswordInput.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import ActionMessage from '@/Components/ActionMessage.vue';

const passwordUpdated = ref(false);

const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

const updatePassword = () => {
    form.put(route('user-password.update'), {
        errorBag: 'updatePassword',
        preserveScroll: true,
        onSuccess: () => {
            form.reset();
            passwordUpdated.value = true;
        },
        onError: () => {
            form.reset('current_password', 'password', 'password_confirmation');
        },
    });
};
</script>

<template>
    <AppLayout title="My Profile">
        <template #header>
            <h2 class="font-semibold text-xl text-ink-800 leading-tight">
                My Profile
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-3xl mx-auto sm:px-6 lg:px-8">
                <div class="rounded-lg border border-ink-200 bg-surface p-6 shadow-sm">
                    <h3 class="text-sm font-semibold uppercase tracking-wide text-ink-700 mb-4">
                        Change Password
                    </h3>

                    <form @submit.prevent="updatePassword" class="space-y-6">
                        <InputGroup
                            id="current_password"
                            label="Current Password"
                            :required="true"
                            :error="form.errors.current_password"
                        >
                            <PasswordInput
                                id="current_password"
                                v-model="form.current_password"
                                class="mt-1 block w-full"
                                :class="{ 'border-red-500': form.errors.current_password }"
                            />
                        </InputGroup>

                        <InputGroup
                            id="password"
                            label="New Password"
                            :required="true"
                            :error="form.errors.password"
                        >
                            <PasswordInput
                                id="password"
                                v-model="form.password"
                                class="mt-1 block w-full"
                                :class="{ 'border-red-500': form.errors.password }"
                            />
                        </InputGroup>

                        <InputGroup
                            id="password_confirmation"
                            label="Confirm New Password"
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

                        <div class="flex items-center gap-4">
                            <PrimaryButton :disabled="form.processing">Update Password</PrimaryButton>
                            <ActionMessage :on="passwordUpdated">Password updated.</ActionMessage>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

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

const isEditMode = computed(() =&gt; !!props.role);

const form = useForm({
        name: props.role?.name || '',
        permissions: props.role?.permissions.map(p =&gt; p.name) || [],
    });

const submit = () =&gt; {
    const routeName = isEditMode.value ? 'admin.roles.update' : 'admin.roles.store';
    const options = {
            onSuccess: () =&gt; emit('close'),
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

        <div class="mt-6">
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

        <div class="mt-6">
            <h3 class="font-medium text-gray-900">Permissions</h3>
            <div class="mt-4 space-y-4">
                <div v-for="(permissions, group) in groupedPermissions" :key="group" class="p-4 border border-gray-200 rounded-md">
                    <h4 class="font-semibold text-gray-800 capitalize">{{ group }} Management</h4>
                    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <div v-for="permission in permissions" :key="permission.id">
                            <label class="flex items-center">
                                <input
                                    type="checkbox"
                                    :value="permission.name"
                                    v-model="form.permissions"
                                    class="text-indigo-600 border-gray-300 rounded shadow-sm focus:ring-indigo-500"
                                />
                                <span class="ml-2 text-sm text-gray-600">{{ permission.name.replace(/_/g, ' ') }}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <InputError :message="form.errors.permissions" class="mt-2" />
        </div>

        <div class="flex justify-end mt-6">
            <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                {{ isEditMode ? 'Update Role' : 'Create Role' }}
            </PrimaryButton>
        </div>
    </form>
</template>

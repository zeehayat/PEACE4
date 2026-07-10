<script setup>
import { useForm } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import InputLabel from '@/Components/InputLabel.vue';
import InputError from '@/Components/InputError.vue';
import TextInput from '@/Components/TextInput.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';

const props = defineProps({
    districts: Array,
});

const form = useForm({
    name: '',
});

const submit = () => {
    form.post(route('admin.districts.store'), {
        preserveScroll: true,
        onSuccess: () => form.reset(),
    });
};
</script>

<template>
    <AppLayout title="Districts">
        <div class="py-8 max-w-3xl mx-auto px-4 space-y-6">
            <h1 class="text-xl font-bold text-ink-900">Districts</h1>

            <form @submit.prevent="submit" class="bg-surface border border-ink-200 rounded-lg p-5 flex items-end gap-4">
                <div class="flex-1">
                    <InputLabel for="name" value="Add District" />
                    <TextInput id="name" v-model="form.name" type="text" class="mt-1 block w-full" :class="{ 'border-red-500': form.errors.name }" />
                    <InputError class="mt-2" :message="form.errors.name" />
                </div>
                <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Add
                </PrimaryButton>
            </form>

            <div class="bg-surface border border-ink-200 rounded-lg overflow-hidden">
                <table class="min-w-full text-sm text-left">
                    <thead class="bg-paper-50 text-ink-600 uppercase text-xs">
                        <tr>
                            <th class="px-4 py-3">Name</th>
                            <th class="px-4 py-3">Added</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="district in districts" :key="district.id" class="border-t border-ink-100">
                            <td class="px-4 py-2 text-ink-900">{{ district.name }}</td>
                            <td class="px-4 py-2 text-ink-500">{{ new Date(district.created_at).toLocaleDateString() }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </AppLayout>
</template>

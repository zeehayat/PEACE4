<script setup>
import { reactive, watch, ref, computed } from 'vue';
import { useForm, router } from '@inertiajs/vue3';
import InputGroup from '@/Components/FormComponents/InputGroup.vue';
import TextInput from '@/Components/TextInput.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import AttachmentsInput from '@/Components/AttachmentComponent/AttachmentUploader.vue';

const props = defineProps({
    mhpSiteId: {
        type: [Number, String],
        required: true,
    },
    progress: {
        type: Object,
        default: null,
    },
    mode: {
        type: String,
        default: 'create', // 'create' or 'update'
    },
});

const emit = defineEmits(['success', 'cancel']);

const form = useForm({
    milestone_percent: props.progress?.milestone_percent || '',
    date: props.progress?.date || '',
    works: props.progress?.works || '',
    remarks: props.progress?.remarks || '',
    attachments: [],
});

const submit = () => {
    const routeName = props.mode === 'create' ? 'mhp.sites.eme-progress.store' : 'mhp.sites.eme-progress.update';
    const params = { site: props.mhpSiteId };
    if (props.mode === 'update') {
        params.eme_progress = props.progress.id;
    }

    form.post(route(routeName, params), {
        onSuccess: () => {
            form.reset('milestone_percent', 'date', 'works', 'remarks', 'attachments');
            emit('success', `EME Physical Progress ${props.mode}d successfully!`);
        },
        onError: (errors) => {
            console.error('Form submission failed:', errors);
        },
    });
};

const title = computed(() => (props.mode === 'create' ? 'Record EME Progress' : 'Edit EME Progress'));

</script>

<template>
    <form @submit.prevent="submit" class="space-y-6">
        <h2 class="text-xl font-semibold text-ink-900">{{ title }}</h2>

        <InputGroup id="milestone_percent" label="Milestone Percentage" :error="form.errors.milestone_percent">
            <TextInput
                id="milestone_percent"
                type="number"
                step="0.01"
                class="mt-1 block w-full"
                v-model="form.milestone_percent"
            />
        </InputGroup>

        <InputGroup id="date" label="Progress Date" :error="form.errors.date">
            <TextInput
                id="date"
                type="date"
                class="mt-1 block w-full"
                v-model="form.date"
            />
        </InputGroup>

        <InputGroup id="works" label="Works" :error="form.errors.works">
            <textarea
                id="works"
                class="mt-1 block w-full border-ink-300 rounded-md shadow-sm"
                rows="3"
                v-model="form.works"
            ></textarea>
        </InputGroup>

        <InputGroup id="remarks" label="Remarks" :error="form.errors.remarks">
            <textarea
                id="remarks"
                class="mt-1 block w-full border-ink-300 rounded-md shadow-sm"
                rows="3"
                v-model="form.remarks"
            ></textarea>
        </InputGroup>

        <InputGroup label="Attachments" :error="form.errors['attachments']">
            <AttachmentsInput v-model="form.attachments" />
        </InputGroup>

        <div class="flex justify-end gap-x-4">
            <SecondaryButton @click="emit('cancel')" :disabled="form.processing">Cancel</SecondaryButton>
            <PrimaryButton :disabled="form.processing">
                {{ form.processing ? 'Saving...' : 'Save' }}
            </PrimaryButton>
        </div>
    </form>
</template>

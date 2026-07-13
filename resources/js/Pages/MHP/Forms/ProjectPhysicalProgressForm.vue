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
    progressType: { // FIX: A new prop is needed to set the payment_for value
        type: String,
        required: true,
        validator: (value) => ['T&D', 'EME', 'Civil'].includes(value),
    },
});

const emit = defineEmits(['success', 'cancel']);

const form = useForm({
    progress_percentage: props.progress?.progress_percentage || '',
    progress_date: props.progress?.progress_date || '',
    remarks: props.progress?.remarks || '',
    payment_for: props.progress?.payment_for || props.progressType, // FIX: Use the new prop
    activity_id: props.progress?.activity_id || null,
    activity_type: props.progress?.activity_type || null,
    works: props.progress?.works || '',
    attachments: [],
});

const submit = () => {
    const routeName = 'mhp.sites.physical-progresses.store';

    // FIX: Pass the site ID directly from the component's props
    const params = { site: props.mhpSiteId };

    form.post(route(routeName, params), {
        onSuccess: () => {
            form.reset();
            emit('success', `Physical Progress recorded successfully!`);
        },
        onError: (errors) => {
            console.error('Form submission failed:', errors);
        },
    });
};

const title = computed(() => `Record ${form.payment_for} Progress`);

</script>

<template>
    <form @submit.prevent="submit" class="space-y-6">
        <h2 class="text-xl font-semibold text-ink-900">{{ title }}</h2>

        <InputGroup id="progress_percentage" label="Progress Percentage" :required="true" :error="form.errors.progress_percentage">
            <TextInput
                id="progress_percentage"
                type="number"
                step="0.01"
                class="mt-1 block w-full"
                v-model="form.progress_percentage"
            />
        </InputGroup>

        <InputGroup id="progress_date" label="Progress Date" :required="true" :error="form.errors.progress_date">
            <TextInput
                id="progress_date"
                type="date"
                class="mt-1 block w-full"
                v-model="form.progress_date"
            />
        </InputGroup>

        <input type="hidden" v-model="form.payment_for" />

        <InputGroup v-if="form.payment_for === 'EME'" id="works" label="Works" :error="form.errors.works">
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

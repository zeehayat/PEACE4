<script setup>
import { reactive, watch, ref, computed } from 'vue';
import { useForm, router } from '@inertiajs/vue3';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import InputError from '@/Components/InputError.vue';
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
    const routeName = 'mhp.physical-progresses.store';

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
        <h2 class="text-xl font-semibold text-gray-900">{{ title }}</h2>

        <div>
            <InputLabel for="progress_percentage" value="Progress Percentage" />
            <TextInput
                id="progress_percentage"
                type="number"
                step="0.01"
                class="mt-1 block w-full"
                v-model="form.progress_percentage"
                required
            />
            <InputError class="mt-2" :message="form.errors.progress_percentage" />
        </div>

        <div>
            <InputLabel for="progress_date" value="Progress Date" />
            <TextInput
                id="progress_date"
                type="date"
                class="mt-1 block w-full"
                v-model="form.progress_date"
                required
            />
            <InputError class="mt-2" :message="form.errors.progress_date" />
        </div>

        <input type="hidden" v-model="form.payment_for" />

        <div v-if="form.payment_for === 'EME'">
            <InputLabel for="works" value="Works" />
            <textarea
                id="works"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                rows="3"
                v-model="form.works"
            ></textarea>
            <InputError class="mt-2" :message="form.errors.works" />
        </div>

        <div>
            <InputLabel for="remarks" value="Remarks" />
            <textarea
                id="remarks"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                rows="3"
                v-model="form.remarks"
            ></textarea>
            <InputError class="mt-2" :message="form.errors.remarks" />
        </div>

        <AttachmentsInput v-model="form.attachments" />
        <InputError class="mt-2" :message="form.errors['attachments']" />

        <div class="flex justify-end gap-x-4">
            <SecondaryButton @click="emit('cancel')" :disabled="form.processing">Cancel</SecondaryButton>
            <PrimaryButton :disabled="form.processing">
                {{ form.processing ? 'Saving...' : 'Save' }}
            </PrimaryButton>
        </div>
    </form>
</template>

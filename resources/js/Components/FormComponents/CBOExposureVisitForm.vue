<script setup>
import { useForm, router } from '@inertiajs/vue3';
import { watch, ref } from 'vue';
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';
import DatePicker from '@/Components/DatePicker.vue';

const props = defineProps({
    cbo: {
        type: Object,
        required: true,
    },
    exposureVisit: {
        type: Object,
        default: null,
    },
    mode: {
        type: String,
        default: 'create',
    },
});

const emit = defineEmits(['submit', 'cancel']);

const form = useForm({
    _method: props.mode === 'edit' ? 'PUT' : 'POST',
    cbo_id: props.mode === 'edit' ? props.exposureVisit?.cbo_id : props.cbo.id,
    date_of_visit: props.exposureVisit?.date_of_visit || '',
    participants: props.exposureVisit?.participants || '',
    purpose_of_visit: props.exposureVisit?.purpose_of_visit || '',
    remarks: props.exposureVisit?.remarks || '',
    attachments: [],
    removed_attachments: [],
    existing_attachments: [],
});

watch(
    () => props.exposureVisit,
    (newExposureVisit) => {
        if (props.mode === 'edit' && newExposureVisit) {
            form.cbo_id = newExposureVisit.cbo_id;
            form.date_of_visit = newExposureVisit.date_of_visit;
            form.participants = newExposureVisit.participants;
            form.purpose_of_visit = newExposureVisit.purpose_of_visit || '';
            form.remarks = newExposureVisit.remarks || '';
            form.existing_attachments = newExposureVisit.attachments || [];
            form.attachments = [];
            form.removed_attachments = [];
        } else if (props.mode === 'create') {
            form.reset();
            form.cbo_id = props.cbo.id;
            form.attachments = [];
            form.removed_attachments = [];
            form.existing_attachments = [];
        }
    },
    { immediate: true }
);

const handleRemoveExistingAttachment = (fileId) => {
    form.removed_attachments.push(fileId);
    form.existing_attachments = form.existing_attachments.filter(f => f.id !== fileId);
};

const submitForm = () => {
    console.log('Form data being submitted (before FormData construction):', form.data());

    const url = props.mode === 'create'
        ? route('cbo.exposure-visits.store')
        : route('cbo.exposure-visits.update', props.exposureVisit.id);

    const formDataPayload = new FormData();

    // CRITICAL FIX: Explicitly append all the form fields you want to send
    // Do NOT iterate over form.data() in a complex loop.
    // Instead, grab the specific properties you need directly.

    formDataPayload.append('cbo_id', form.cbo_id ?? ''); // Ensure cbo_id is always sent
    formDataPayload.append('date_of_visit', form.date_of_visit ?? '');
    formDataPayload.append('participants', form.participants ?? '');
    formDataPayload.append('purpose_of_visit', form.purpose_of_visit ?? '');
    formDataPayload.append('remarks', form.remarks ?? '');

    // Append _method if it exists (for PUT/PATCH spoofing)
    if (form._method) { // Access _method directly from form
        formDataPayload.append('_method', form._method);
    }

    // Append new attachments (filtered by AttachmentUploader)
    form.attachments.forEach(file => {
        // Ensure that file is actually a File object before appending
        if (file instanceof File) {
            formDataPayload.append('attachments[]', file);
        } else {
            console.warn('Skipping invalid attachment:', file);
        }
    });

    // Append IDs of attachments to be removed
    form.removed_attachments.forEach(id => {
        formDataPayload.append('removed_attachments[]', id);
    });

    // Pass the manually constructed formDataPayload to router.post
    router.post(url, formDataPayload, {
        onSuccess: () => {
            emit('submit');
        },
        onError: (errors) => {
            console.error('Exposure Visit form errors (from server):', errors);
        },
    });
};

const cancelForm = () => {
    emit('cancel');
};
</script>

<template>
    <form @submit.prevent="submitForm" class="p-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
            <div class="col-span-full">
                <label for="cbo_id" class="block text-sm font-medium text-gray-700 mb-1">CBO</label>
                <template v-if="mode === 'edit'">
                    <div class="input-compact bg-gray-100 text-gray-700 font-semibold cursor-not-allowed flex items-center h-[38px] px-3 py-1.5 rounded-lg">
                        {{ cbo?.reference_code || 'N/A' }}
                    </div>
                    <input type="hidden" v-model="form.cbo_id" />
                </template>
                <template v-else>
                   {{form.cbo_id}}
                </template>
                <div v-if="form.errors.cbo_id" class="text-red-500 text-xs mt-1">{{ form.errors.cbo_id }}</div>
            </div>

            <div>
                <label for="date_of_visit" class="block text-sm font-medium text-gray-700 mb-1">Date of Visit</label>
                <DatePicker v-model="form.date_of_visit" id="date_of_visit" class="input-compact" />
                <div v-if="form.errors.date_of_visit" class="text-red-500 text-xs mt-1">{{ form.errors.date_of_visit }}</div>
            </div>

            <div>
                <label for="participants" class="block text-sm font-medium text-gray-700 mb-1">Participants</label>
                <input type="number" id="participants" v-model="form.participants" class="input-compact" />
                <div v-if="form.errors.participants" class="text-red-500 text-xs mt-1">{{ form.errors.participants }}</div>
            </div>

            <div class="col-span-full">
                <label for="purpose_of_visit" class="block text-sm font-medium text-gray-700 mb-1">Purpose of Visit</label>
                <input type="text" id="purpose_of_visit" v-model="form.purpose_of_visit" class="input-compact" />
                <div v-if="form.errors.purpose_of_visit" class="text-red-500 text-xs mt-1">{{ form.errors.purpose_of_visit }}</div>
            </div>

            <div class="col-span-full">
                <label for="remarks" class="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea id="remarks" v-model="form.remarks" rows="3" class="input-compact"></textarea>
                <div v-if="form.errors.remarks" class="text-red-500 text-xs mt-1">{{ form.errors.remarks }}</div>
            </div>
        </div>

        <div class="mt-6">
            <AttachmentUploader
                v-model="form.attachments"
                :existing="form.existing_attachments"
                @removeExisting="handleRemoveExistingAttachment"
                label="Visit Attachments"
            />
            <div v-if="form.errors['attachments.0']" class="text-red-500 text-xs mt-1">{{ form.errors['attachments.0'] }}</div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
            <button type="button" @click="cancelForm" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancel
            </button>
            <button type="submit" :disabled="form.processing" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {{ form.processing ? 'Saving...' : (mode === 'create' ? 'Add Visit' : 'Update Visit') }}
            </button>
        </div>
    </form>
</template>

<style scoped>
.input-compact {
    @apply appearance-none block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm;
}
label {
    margin-bottom: 0.25rem;
}
</style>

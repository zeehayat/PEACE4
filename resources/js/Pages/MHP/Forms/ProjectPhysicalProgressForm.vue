<script setup>
import { reactive, watch, ref, onMounted, computed } from 'vue';
import { useForm, router } from '@inertiajs/vue3'; // Import router for fetching T&D works

import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import TextArea from '@/Components/TextArea.vue';
import SelectInput from '@/Components/SelectInput.vue';
import DatePicker from '@/Components/DatePicker.vue';
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';

const props = defineProps({
    mhpSiteId: {
        type: Number,
        required: true, // The MHP Site this physical progress belongs to
    },
    progress: {
        type: Object,
        default: null, // Null for create mode, object for edit mode
    },
    mode: {
        type: String,
        default: 'create', // 'create' or 'update'
    },
});

const emit = defineEmits(['success', 'cancel']);

const isEditMode = ref(props.mode === 'update');
const existingAttachments = ref(props.progress ? props.progress.attachments_frontend : []);
const tAndDWorksOptions = ref([]); // To store T&D works for selection
const fetchingTAndDWorks = ref(false);

const form = useForm({
    projectable_id: props.mhpSiteId,
    projectable_type: 'App\\Models\\MhpSite', // Hardcode for MHP for now
    progress_percentage: props.progress ? props.progress.progress_percentage : '',
    progress_date: props.progress ? props.progress.progress_date : null,
    remarks: props.progress ? props.progress.remarks : '',
    payment_for: props.progress ? props.progress.payment_for : 'Civil', // Default to Civil
    activity_id: props.progress && props.progress.activity_type === 'App\\Models\\TAndDWork' ? props.progress.activity_id : null,
    activity_type: props.progress && props.progress.activity_type === 'App\\Models\\TAndDWork' ? 'App\\Models\\TAndDWork' : null,
    attachments: [],
    attachments_to_delete: [],
});

const paymentForOptions = ['Civil', 'EME', 'T&D']; // Order might matter for UI

// Fetch T&D Works when payment_for is 'T&D' and component is mounted/site ID changes
const fetchTAndDWorks = async () => {
    if (form.payment_for === 'T&D' && props.mhpSiteId) {
        fetchingTAndDWorks.value = true;
        try {
            // Use Inertia.get or axios for API call
            const response = await router.get(
                route('mhp.sites.t-and-d-works.index', { site: props.mhpSiteId, 'only-data': true }), // API endpoint
                {}, // No params for initial fetch
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                    onSuccess: (page) => {
                        tAndDWorksOptions.value = page.props.tAndDWorks.data.map(work => ({
                            value: work.id,
                            label: work.name || `T&D Work #${work.id}`, // Use name or default
                        }));
                    },
                    onError: (errors) => {
                        console.error('Error fetching T&D works:', errors);
                    }
                }
            );
        } catch (error) {
            console.error('API call failed to fetch T&D works:', error);
        } finally {
            fetchingTAndDWorks.value = false;
        }
    } else {
        tAndDWorksOptions.value = []; // Clear options if not T&D
        form.activity_id = null;
        form.activity_type = null;
    }
};

// Watch for payment_for changes to trigger T&D fetch or clear activity
watch(() => form.payment_for, (newVal) => {
    if (newVal === 'T&D') {
        fetchTAndDWorks();
    } else {
        form.activity_id = null;
        form.activity_type = null;
    }
}, { immediate: true }); // Run immediately to fetch if initial state is T&D

// Watch for prop changes to re-initialize form when modal re-opens for a different item
watch(() => props.progress, (newVal) => {
    if (newVal) {
        isEditMode.value = true;
        form.reset(); // Reset to clear old state and errors
        form.fill({
            projectable_id: props.mhpSiteId,
            projectable_type: 'App\\Models\\MhpSite',
            progress_percentage: newVal.progress_percentage,
            progress_date: newVal.progress_date,
            remarks: newVal.remarks,
            payment_for: newVal.payment_for,
            activity_id: newVal.activity_type === 'App\\Models\\TAndDWork' ? newVal.activity_id : null,
            activity_type: newVal.activity_type === 'App\\Models\\TAndDWork' ? 'App\\Models\\TAndDWork' : null,
            attachments: [],
            attachments_to_delete: [],
        });
        existingAttachments.value = newVal.attachments_frontend;
    } else {
        isEditMode.value = false;
        form.reset();
        form.projectable_id = props.mhpSiteId;
        form.projectable_type = 'App\\Models\\MhpSite';
        form.payment_for = 'Civil'; // Default for new entry
        form.activity_id = null;
        form.activity_type = null;
        existingAttachments.value = [];
    }
}, { immediate: true });

onMounted(() => {
    // Initial fetch if component is mounted in T&D mode
    if (form.payment_for === 'T&D' && !props.progress && props.mhpSiteId) {
        fetchTAndDWorks();
    }
});

// Handle attachment changes from AttachmentUploader
const handleFilePondUpdate = (files) => {
    form.attachments = files.map(fileItem => fileItem.file);
};

const handleAttachmentsToDelete = (ids) => {
    form.attachments_to_delete = ids;
};

const handleSubmit = () => {
    const url = isEditMode.value
        ? route('mhp.sites.physical-progresses.update', { site: props.mhpSiteId, 'physical_progress': props.progress.id })
        : route('mhp.sites.physical-progresses.store', { site: props.mhpSiteId });

    const method = isEditMode.value ? 'post' : 'post'; // Laravel PUT/PATCH via POST with _method spoofing

    form.transform((data) => {
        if (isEditMode.value) {
            data._method = 'put'; // or 'patch'
        }
        // Ensure activity_type is correctly set for T&D or null otherwise
        if (data.payment_for === 'T&D') {
            data.activity_type = 'App\\Models\\TAndDWork';
        } else {
            data.activity_id = null;
            data.activity_type = null;
        }
        return data;
    }).post(url, {
        onSuccess: () => {
            form.reset();
            emit('success', isEditMode.value ? 'Physical Progress updated successfully!' : 'Physical Progress recorded successfully!');
            form.attachments = [];
            form.attachments_to_delete = [];
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
        <input type="hidden" v-model="form.projectable_id" />
        <input type="hidden" v-model="form.projectable_type" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <InputLabel for="progress_percentage" value="Progress Percentage (%)" />
                <TextInput
                    id="progress_percentage"
                    v-model="form.progress_percentage"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.progress_percentage }"
                />
                <InputError class="mt-2" :message="form.errors.progress_percentage" />
            </div>

            <div>
                <InputLabel for="progress_date" value="Progress Date" />
                <DatePicker
                    id="progress_date"
                    v-model="form.progress_date"
                    :class="{ 'border-red-500': form.errors.progress_date }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.progress_date" />
            </div>

            <div>
                <InputLabel for="payment_for" value="Activity Type (Payment For)" />
                <SelectInput
                    id="payment_for"
                    v-model="form.payment_for"
                    :options="paymentForOptions"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.payment_for }"
                />
                <InputError class="mt-2" :message="form.errors.payment_for" />
            </div>

            <div v-if="form.payment_for === 'T&D'">
                <InputLabel for="activity_id" value="Select T&D Work" />
                <SelectInput
                    id="activity_id"
                    v-model="form.activity_id"
                    :options="tAndDWorksOptions"
                    :disabled="fetchingTAndDWorks || tAndDWorksOptions.length === 0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.activity_id }"
                >
                    <option v-if="fetchingTAndDWorks">Loading T&D Works...</option>
                    <option v-if="!fetchingTAndDWorks && tAndDWorksOptions.length === 0">No T&D Works available for this site.</option>
                </SelectInput>
                <InputError class="mt-2" :message="form.errors.activity_id" />
                <p v-if="!fetchingTAndDWorks && tAndDWorksOptions.length === 0" class="mt-1 text-sm text-gray-500">
                    No T&D Works found for this site. You might need to add one first.
                </p>
            </div>
            <input type="hidden" v-model="form.activity_type" />

            <div class="md:col-span-2">
                <InputLabel for="remarks" value="Remarks" />
                <TextArea
                    id="remarks"
                    v-model="form.remarks"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.remarks }"
                />
                <InputError class="mt-2" :message="form.errors.remarks" />
            </div>
        </div>

        <div class="mt-6">
            <InputLabel value="Attachments" />
            <AttachmentUploader
                :existing-attachments="existingAttachments"
                @update-files="handleFilePondUpdate"
                @delete-existing-attachments="handleAttachmentsToDelete"
                :error-message="form.errors.attachments"
            />
            <InputError class="mt-2" :message="form.errors.attachments" />
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
                {{ isEditMode ? 'Update Progress' : 'Record Progress' }}
            </PrimaryButton>
        </div>
    </form>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

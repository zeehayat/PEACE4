<script setup>
import { reactive, watch, ref, onMounted } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';

import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import TextArea from '@/Components/TextArea.vue';
import SelectInput from '@/Components/SelectInput.vue';
import WysiwygEditor from '@/Components/WysiwygEditor.vue';
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';

const props = defineProps({
    vendor: {
        type: Object,
        default: null, // Null for create mode, object for edit mode
    },
});

const emit = defineEmits(['success', 'cancel']);

const page = usePage();

const isEditMode = ref(!!props.vendor);
const existingAttachments = ref([]);

const statusOptions = ['APPROVED', 'NEW', 'BLACK-LISTED', 'UNAPPROVED', 'OLD'];

// Function to get the initial data for the form based on a vendor object or null
function getInitialFormData(vendor) {
    return {
        name: vendor ? vendor.name : '',
        contact_person: vendor ? vendor.contact_person : '',
        phone: vendor ? vendor.phone : '',
        email: vendor ? vendor.email : '',
        address: vendor ? vendor.address : '',
        ntn_no: vendor ? vendor.ntn_no : '',
        status: vendor ? vendor.status : 'NEW',
        remarks: vendor ? vendor.remarks : '',
        attachments: [],
        attachments_to_delete: [],
    };
}

const form = useForm(getInitialFormData(props.vendor));

// Watch for prop.vendor changes to update the form
watch(() => props.vendor, (newVendor) => {
    console.log('--- VendorForm: props.vendor watcher triggered ---');
    console.log('New Vendor prop:', newVendor);

    isEditMode.value = !!newVendor;

    form.defaults(getInitialFormData(newVendor));
    form.reset();

    existingAttachments.value = newVendor ? newVendor.attachments_frontend : [];

    form.clearErrors();
    console.log('VendorForm: Form and attachments initialized based on new prop.');
}, { immediate: true });

onMounted(() => {
    console.log('--- VendorForm: Mounted ---');
    console.log('VendorForm: Initial form.attachments on mount:', form.attachments);
});

const handleAttachmentsToDelete = (id) => {
    console.log('--- VendorForm: handleAttachmentsToDelete called ---');
    console.log('Deleting attachment ID:', id);
    form.attachments_to_delete.push(id);
    existingAttachments.value = existingAttachments.value.filter(att => att.id !== id);
};

const handleSubmit = () => {
    console.log('--- VendorForm: handleSubmit triggered ---');
    console.log('Form data before POST:', form.data());
    console.log('Attachments array before POST:', form.attachments);

    const url = isEditMode.value
        ? route('vendor.vendors.update', props.vendor.id)
        : route('vendor.vendors.store');

    form.transform((data) => {
        if (isEditMode.value) {
            data._method = 'put';
        }
        return data;
    }).post(url, {
        onSuccess: () => {
            console.log('--- VendorForm: Submission Success ---');
            form.reset();
            existingAttachments.value = [];
            form.attachments_to_delete = [];
            emit('success', isEditMode.value ? 'Vendor updated successfully!' : 'Vendor created successfully!');
        },
        onError: (errors) => {
            console.error('--- VendorForm: Submission Error ---');
            console.error('Form errors:', errors);
        },
        preserveScroll: true,
        preserveState: true,
    });
};

const handleCancel = () => {
    console.log('--- VendorForm: Cancel triggered ---');
    form.reset();
    existingAttachments.value = [];
    form.attachments_to_delete = [];
    emit('cancel');
};
</script>

<template>
    <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Name -->
            <div>
                <InputLabel for="name" value="Vendor Name" />
                <TextInput
                    id="name"
                    v-model="form.name"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.name }"
                />
                <InputError class="mt-2" :message="form.errors.name" />
            </div>

            <!-- Contact Person -->
            <div>
                <InputLabel for="contact_person" value="Contact Person" />
                <TextInput
                    id="contact_person"
                    v-model="form.contact_person"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.contact_person }"
                />
                <InputError class="mt-2" :message="form.errors.contact_person" />
            </div>

            <!-- Phone -->
            <div>
                <InputLabel for="phone" value="Phone" />
                <TextInput
                    id="phone"
                    v-model="form.phone"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.phone }"
                />
                <InputError class="mt-2" :message="form.errors.phone" />
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
                />
                <InputError class="mt-2" :message="form.errors.email" />
            </div>

            <!-- Address -->
            <div class="md:col-span-2">
                <InputLabel for="address" value="Address" />
                <TextArea
                    id="address"
                    v-model="form.address"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.address }"
                />
                <InputError class="mt-2" :message="form.errors.address" />
            </div>

            <!-- NTN No -->
            <div>
                <InputLabel for="ntn_no" value="NTN No." />
                <TextInput
                    id="ntn_no"
                    v-model="form.ntn_no"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.ntn_no }"
                />
                <InputError class="mt-2" :message="form.errors.ntn_no" />
            </div>

            <!-- Status -->
            <div>
                <InputLabel for="status" value="Status" />
                <SelectInput
                    id="status"
                    v-model="form.status"
                    :options="statusOptions"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.status }"
                />
                <InputError class="mt-2" :message="form.errors.status" />
            </div>

            <!-- Remarks (WYSIWYG Editor) -->
            <div class="md:col-span-2">
                <InputLabel for="remarks" value="Remarks" />
                <WysiwygEditor
                    id="remarks"
                    v-model="form.remarks"
                    :class="{ 'border-red-500': form.errors.remarks }"
                    :height="200"
                />
                <InputError class="mt-2" :message="form.errors.remarks" />
            </div>
        </div>

        <!-- Attachments Section -->
        <div class="mt-6">
            <InputLabel value="Attachments" />
            <AttachmentUploader
                v-model="form.attachments"
                :existing-attachments="existingAttachments"
                @remove-existing="handleAttachmentsToDelete"
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
                {{ isEditMode ? 'Update Vendor' : 'Create Vendor' }}
            </PrimaryButton>
        </div>
    </form>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

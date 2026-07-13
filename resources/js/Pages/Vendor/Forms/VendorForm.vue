<script setup>
import { reactive, watch, ref, onMounted } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';

import InputGroup from '@/Components/FormComponents/InputGroup.vue';
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
            <InputGroup id="name" label="Vendor Name" :required="true" :error="form.errors.name">
                <TextInput
                    id="name"
                    v-model="form.name"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.name }"
                />
            </InputGroup>

            <!-- Contact Person -->
            <InputGroup id="contact_person" label="Contact Person" :error="form.errors.contact_person">
                <TextInput
                    id="contact_person"
                    v-model="form.contact_person"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.contact_person }"
                />
            </InputGroup>

            <!-- Phone -->
            <InputGroup id="phone" label="Phone" :error="form.errors.phone">
                <TextInput
                    id="phone"
                    v-model="form.phone"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.phone }"
                />
            </InputGroup>

            <!-- Email -->
            <InputGroup id="email" label="Email" :error="form.errors.email">
                <TextInput
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.email }"
                />
            </InputGroup>

            <!-- Address -->
            <InputGroup id="address" label="Address" class="md:col-span-2" :error="form.errors.address">
                <TextArea
                    id="address"
                    v-model="form.address"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.address }"
                />
            </InputGroup>

            <!-- NTN No -->
            <InputGroup
                id="ntn_no"
                label="NTN No."
                help="NTN means National Tax Number, the vendor's tax registration identifier."
                :error="form.errors.ntn_no"
            >
                <TextInput
                    id="ntn_no"
                    v-model="form.ntn_no"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.ntn_no }"
                />
            </InputGroup>

            <!-- Status -->
            <InputGroup id="status" label="Status" :required="true" :error="form.errors.status">
                <SelectInput
                    id="status"
                    v-model="form.status"
                    :options="statusOptions"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.status }"
                />
            </InputGroup>

            <!-- Remarks (WYSIWYG Editor) -->
            <InputGroup id="remarks" label="Remarks" class="md:col-span-2" :error="form.errors.remarks">
                <WysiwygEditor
                    id="remarks"
                    v-model="form.remarks"
                    :class="{ 'border-red-500': form.errors.remarks }"
                    :height="200"
                />
            </InputGroup>
        </div>

        <!-- Attachments Section -->
        <div class="mt-6">
            <InputGroup label="Attachments" :error="form.errors.attachments">
                <AttachmentUploader
                    v-model="form.attachments"
                    :existing-attachments="existingAttachments"
                    @remove-existing="handleAttachmentsToDelete"
                    :error-message="form.errors.attachments"
                />
            </InputGroup>
        </div>

        <div class="flex items-center justify-end mt-6 space-x-4">
            <button
                type="button"
                @click="handleCancel"
                class="inline-flex items-center px-4 py-2 bg-slate-200 border border-transparent rounded-md font-semibold text-xs text-slate-700 uppercase tracking-widest hover:bg-slate-300 focus:bg-slate-300 active:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
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

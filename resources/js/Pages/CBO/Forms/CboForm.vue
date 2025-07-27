<script setup>
import { reactive, watch, ref, onMounted } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';

import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import SelectInput from '@/Components/SelectInput.vue';
import DatePicker from '@/Components/DatePicker.vue';
import WysiwygEditor from '@/Components/WysiwygEditor.vue'; // Assuming WysiwygEditor exists
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue'; // Assuming AttachmentUploader exists

const props = defineProps({
    cbo: {
        type: Object,
        default: null, // Null for create mode, object for edit mode
    },
});

const emit = defineEmits(['success', 'cancel']);

const page = usePage();

const form = useForm({
    reference_code: props.cbo ? props.cbo.reference_code : '',
    district: props.cbo ? props.cbo.district : '',
    tehsil: props.cbo ? props.cbo.tehsil : '',
    village_council: props.cbo ? props.cbo.village_council : '',
    village: props.cbo ? props.cbo.village : '',
    date_of_formation: props.cbo ? props.cbo.date_of_formation : null,
    total_members: props.cbo ? props.cbo.total_members : null,
    gender: props.cbo ? props.cbo.gender : 'Mixed',
    num_cbo_members: props.cbo ? props.cbo.num_cbo_members : null,
    president_name: props.cbo ? props.cbo.president_name : '',
    president_contact: props.cbo ? props.cbo.president_contact : '',
    secretary_name: props.cbo ? props.cbo.secretary_name : '',
    secretary_contact: props.cbo ? props.cbo.secretary_contact : '',
    remarks: props.cbo ? props.cbo.remarks : '', // New remarks field
    attachments: [], // For new files to upload
    attachments_to_delete: [], // For existing files to delete (by ID)
});

const isEditMode = ref(!!props.cbo);
const existingAttachments = ref(props.cbo ? props.cbo.attachments_frontend : []);

// Options for select inputs
const genderOptions = ['Male', 'Female', 'Mixed'];

// Handle attachments from AttachmentUploader
const handleAttachmentsToDelete = (id) => {
    console.log('Request to delete attachment ID:', id);
    form.attachments_to_delete.push(id);
    existingAttachments.value = existingAttachments.value.filter(att => att.id !== id);
};

const handleSubmit = () => {
    console.log('--- CboForm: handleSubmit triggered ---');
    console.log('Form data before POST:', form.data());
    console.log('Attachments array before POST:', form.attachments);

    const url = isEditMode.value
        ? route('cbo.cbos.update', props.cbo.id)
        : route('cbo.cbos.store');

    form.transform((data) => {
        if (isEditMode.value) {
            data._method = 'put'; // Laravel PUT/PATCH via POST with _method spoofing
        }
        return data;
    }).post(url, {
        onSuccess: () => {
            console.log('--- CboForm: Submission Success ---');
            form.reset(); // Reset form, which clears form.attachments
            existingAttachments.value = []; // Clear for next use
            form.attachments_to_delete = []; // Clear for next use
            emit('success', isEditMode.value ? 'CBO updated successfully!' : 'CBO created successfully!');
        },
        onError: (errors) => {
            console.error('--- CboForm: Submission Error ---');
            console.error('Form errors:', errors);
        },
        preserveScroll: true,
        preserveState: true,
    });
};

const handleCancel = () => {
    console.log('--- CboForm: Cancel triggered ---');
    form.reset();
    existingAttachments.value = [];
    form.attachments_to_delete = [];
    emit('cancel');
};

// Watch for prop changes to re-initialize form when modal re-opens for a different item
watch(() => props.cbo, (newCbo) => {
    console.log('--- CboForm: props.cbo watcher triggered ---');
    console.log('New CBO prop:', newCbo);

    if (newCbo) {
        isEditMode.value = true;
        form.fill({ // Use form.fill to update existing form data
            reference_code: newCbo.reference_code,
            district: newCbo.district,
            tehsil: newCbo.tehsil,
            village_council: newCbo.village_council,
            village: newCbo.village,
            date_of_formation: newCbo.date_of_formation,
            total_members: newCbo.total_members,
            gender: newCbo.gender,
            num_cbo_members: newCbo.num_cbo_members,
            president_name: newCbo.president_name,
            president_contact: newCbo.president_contact,
            secretary_name: newCbo.secretary_name,
            secretary_contact: newCbo.secretary_contact,
            remarks: newCbo.remarks,
            attachments: [], // Clear any newly added files from previous interaction
            attachments_to_delete: [], // Reset for a new edit session
        });
        existingAttachments.value = newCbo.attachments_frontend; // Populate existing attachments
        form.clearErrors();
        console.log('CboForm: Edit mode - form and attachments initialized.');
    } else {
        // Create Mode: Reset form to initial empty state
        isEditMode.value = false;
        form.reset(); // Correctly resets form.attachments to []
        existingAttachments.value = []; // Clear existing attachments for new creation
        form.attachments = []; // Ensure new attachments array is fresh
        form.attachments_to_delete = []; // Reset for new creation
        form.clearErrors();
        console.log('CboForm: Create mode - form reset.');
    }
}, { immediate: true }); // Run immediately on component mount

onMounted(() => {
    console.log('--- CboForm: Mounted ---');
    if (!isEditMode.value && props.cbo === null) {
        // Ensure form is truly reset on first mount for new forms
        form.reset();
        existingAttachments.value = [];
        form.attachments = [];
        form.attachments_to_delete = [];
    }
    console.log('CboForm: Initial form.attachments on mount:', form.attachments);
});
</script>

<template>
    <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Reference Code -->
            <div>
                <InputLabel for="reference_code" value="Reference Code" />
                <TextInput
                    id="reference_code"
                    v-model="form.reference_code"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.reference_code }"
                />
                <InputError class="mt-2" :message="form.errors.reference_code" />
            </div>

            <!-- District -->
            <div>
                <InputLabel for="district" value="District" />
                <TextInput
                    id="district"
                    v-model="form.district"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.district }"
                />
                <InputError class="mt-2" :message="form.errors.district" />
            </div>

            <!-- Tehsil -->
            <div>
                <InputLabel for="tehsil" value="Tehsil" />
                <TextInput
                    id="tehsil"
                    v-model="form.tehsil"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.tehsil }"
                />
                <InputError class="mt-2" :message="form.errors.tehsil" />
            </div>

            <!-- Village Council -->
            <div>
                <InputLabel for="village_council" value="Village Council" />
                <TextInput
                    id="village_council"
                    v-model="form.village_council"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.village_council }"
                />
                <InputError class="mt-2" :message="form.errors.village_council" />
            </div>

            <!-- Village -->
            <div>
                <InputLabel for="village" value="Village" />
                <TextInput
                    id="village"
                    v-model="form.village"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.village }"
                />
                <InputError class="mt-2" :message="form.errors.village" />
            </div>

            <!-- Date of Formation -->
            <div>
                <InputLabel for="date_of_formation" value="Date of Formation" />
                <DatePicker
                    id="date_of_formation"
                    v-model="form.date_of_formation"
                    :class="{ 'border-red-500': form.errors.date_of_formation }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.date_of_formation" />
            </div>

            <!-- Total Members -->
            <div>
                <InputLabel for="total_members" value="Total Members" />
                <TextInput
                    id="total_members"
                    v-model="form.total_members"
                    type="number"
                    min="1"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.total_members }"
                />
                <InputError class="mt-2" :message="form.errors.total_members" />
            </div>

            <!-- Gender -->
            <div>
                <InputLabel for="gender" value="Gender" />
                <SelectInput
                    id="gender"
                    v-model="form.gender"
                    :options="genderOptions"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.gender }"
                />
                <InputError class="mt-2" :message="form.errors.gender" />
            </div>

            <!-- Number of CBO Members -->
            <div>
                <InputLabel for="num_cbo_members" value="Number of CBO Members" />
                <TextInput
                    id="num_cbo_members"
                    v-model="form.num_cbo_members"
                    type="number"
                    min="1"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.num_cbo_members }"
                />
                <InputError class="mt-2" :message="form.errors.num_cbo_members" />
            </div>

            <!-- President Name -->
            <div>
                <InputLabel for="president_name" value="President Name" />
                <TextInput
                    id="president_name"
                    v-model="form.president_name"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.president_name }"
                />
                <InputError class="mt-2" :message="form.errors.president_name" />
            </div>

            <!-- President Contact -->
            <div>
                <InputLabel for="president_contact" value="President Contact" />
                <TextInput
                    id="president_contact"
                    v-model="form.president_contact"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.president_contact }"
                />
                <InputError class="mt-2" :message="form.errors.president_contact" />
            </div>

            <!-- Secretary Name -->
            <div>
                <InputLabel for="secretary_name" value="Secretary Name" />
                <TextInput
                    id="secretary_name"
                    v-model="form.secretary_name"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.secretary_name }"
                />
                <InputError class="mt-2" :message="form.errors.secretary_name" />
            </div>

            <!-- Secretary Contact -->
            <div>
                <InputLabel for="secretary_contact" value="Secretary Contact" />
                <TextInput
                    id="secretary_contact"
                    v-model="form.secretary_contact"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.secretary_contact }"
                />
                <InputError class="mt-2" :message="form.errors.secretary_contact" />
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
                {{ isEditMode ? 'Update CBO' : 'Create CBO' }}
            </PrimaryButton>
        </div>
    </form>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

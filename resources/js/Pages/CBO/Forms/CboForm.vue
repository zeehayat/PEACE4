<script setup>
import { reactive, watch, ref, onMounted } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';

import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import SelectInput from '@/Components/SelectInput.vue';
import DatePicker from '@/Components/DatePicker.vue';
import WysiwygEditor from '@/Components/WysiwygEditor.vue';
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';

const props = defineProps({
    cbo: {
        type: Object,
        default: null,
    },
});

const emit = defineEmits(['success', 'cancel']);

const page = usePage();

const genderOptions = ['Male', 'Female', 'Mixed'];

const isEditMode = ref(!!props.cbo);

const existingAttachments = ref([]);

const form = useForm({
    reference_code: '',
    cbo_name: '', // New field
    region: '', // New field
    district: '',
    tehsil: '',
    village_council: '',
    village: '',
    date_of_formation: null,
    total_members: null,
    gender: 'Mixed',
    num_cbo_members: null,
    president_name: '',
    president_contact: '',
    secretary_name: '',
    secretary_contact: '',
    remarks: '',
    attachments: [],
    attachments_to_delete: [],
});

watch(() => props.cbo, (newCbo) => {
    console.log('--- CboForm: props.cbo watcher triggered ---');
    console.log('New CBO prop:', newCbo);

    isEditMode.value = !!newCbo;

    form.reference_code = newCbo ? newCbo.reference_code : '';
    form.cbo_name = newCbo ? newCbo.cbo_name : '';
    form.region = newCbo ? newCbo.region : '';
    form.district = newCbo ? newCbo.district : '';
    form.tehsil = newCbo ? newCbo.tehsil : '';
    form.village_council = newCbo ? newCbo.village_council : '';
    form.village = newCbo ? newCbo.village : '';
    form.date_of_formation = newCbo ? newCbo.date_of_formation : null;
    form.total_members = newCbo ? newCbo.total_members : null;
    form.gender = newCbo ? newCbo.gender : 'Mixed';
    form.num_cbo_members = newCbo ? newCbo.num_cbo_members : null;
    form.president_name = newCbo ? newCbo.president_name : '';
    form.president_contact = newCbo ? newCbo.president_contact : '';
    form.secretary_name = newCbo ? newCbo.secretary_name : '';
    form.secretary_contact = newCbo ? newCbo.secretary_contact : '';
    form.remarks = newCbo ? newCbo.remarks : '';

    form.attachments = [];
    form.attachments_to_delete = [];

    existingAttachments.value = newCbo ? newCbo.attachments_frontend : [];

    form.clearErrors();
    console.log('CboForm: Form and attachments initialized based on new CBO prop.');
}, { immediate: true });

onMounted(() => {
    console.log('--- CboForm: Mounted ---');
    console.log('CboForm: Initial form.attachments on mount:', form.attachments);
});

const handleAttachmentsToDelete = (id) => {
    console.log('--- CboForm: handleAttachmentsToDelete called ---');
    console.log('Deleting attachment ID:', id);
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
            data._method = 'put';
        }
        return data;
    }).post(url, {
        onSuccess: () => {
            console.log('--- CboForm: Submission Success ---');
            form.reset();
            existingAttachments.value = [];
            form.attachments_to_delete = [];
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
</script>

<template>
    <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div>
                <InputLabel for="cbo_name" value="CBO Name" />
                <TextInput
                    id="cbo_name"
                    v-model="form.cbo_name"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.cbo_name }"
                />
                <InputError class="mt-2" :message="form.errors.cbo_name" />
            </div>

            <div>
                <InputLabel for="region" value="Region" />
                <TextInput
                    id="region"
                    v-model="form.region"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.region }"
                />
                <InputError class="mt-2" :message="form.errors.region" />
            </div>

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
```

***

### 2. `resources/js/Pages/CBO/Modals/CboDetailsViewModal.vue`

This modal has been updated to display the `cbo_name` and `region` fields in the General Information section.


```vue

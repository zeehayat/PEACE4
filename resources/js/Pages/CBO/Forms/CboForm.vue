<script setup>
import { reactive, watch, ref, onMounted } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';

import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import InputGroup from '@/Components/FormComponents/InputGroup.vue';
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
    districts: {
        type: Array,
        default: () => [],
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
}, { immediate: true });

const handleAttachmentsToDelete = (id) => {
    form.attachments_to_delete.push(id);
    existingAttachments.value = existingAttachments.value.filter(att => att.id !== id);
};

const handleSubmit = () => {


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
            form.reset();
            existingAttachments.value = [];
            form.attachments_to_delete = [];
            emit('success', isEditMode.value ? 'CBO updated successfully!' : 'CBO created successfully!');
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
    existingAttachments.value = [];
    form.attachments_to_delete = [];
    emit('cancel');
};
</script>

<template>
    <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup id="reference_code" label="Reference Code" :required="true" :error="form.errors.reference_code">
                <TextInput
                    id="reference_code"
                    v-model="form.reference_code"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.reference_code }"
                />
            </InputGroup>

            <InputGroup id="cbo_name" label="CBO Name" :required="true" :error="form.errors.cbo_name">
                <TextInput
                    id="cbo_name"
                    v-model="form.cbo_name"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.cbo_name }"
                />
            </InputGroup>

            <InputGroup id="region" label="Region" :required="true" :error="form.errors.region">
                <TextInput
                    id="region"
                    v-model="form.region"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.region }"
                />
            </InputGroup>

            <InputGroup id="district" label="District" :required="true" :error="form.errors.district">
                <SelectInput
                    id="district"
                    v-model="form.district"
                    :options="districts.map(d => d.name)"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.district }"
                />
            </InputGroup>

            <InputGroup id="tehsil" label="Tehsil" :required="true" :error="form.errors.tehsil">
                <TextInput
                    id="tehsil"
                    v-model="form.tehsil"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.tehsil }"
                />
            </InputGroup>

            <InputGroup id="village_council" label="Village Council" :required="true" :error="form.errors.village_council">
                <TextInput
                    id="village_council"
                    v-model="form.village_council"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.village_council }"
                />
            </InputGroup>

            <InputGroup id="village" label="Village" :required="true" :error="form.errors.village">
                <TextInput
                    id="village"
                    v-model="form.village"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.village }"
                />
            </InputGroup>

            <InputGroup id="date_of_formation" label="Date of Formation" :required="true" :error="form.errors.date_of_formation">
                <DatePicker
                    id="date_of_formation"
                    v-model="form.date_of_formation"
                    :class="{ 'border-red-500': form.errors.date_of_formation }"
                    placeholder="Select Date"
                />
            </InputGroup>

            <InputGroup id="total_members" label="Total Members" :required="true" :error="form.errors.total_members">
                <TextInput
                    id="total_members"
                    v-model="form.total_members"
                    type="number"
                    min="1"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.total_members }"
                />
            </InputGroup>

            <InputGroup id="gender" label="Gender" :required="true" :error="form.errors.gender">
                <SelectInput
                    id="gender"
                    v-model="form.gender"
                    :options="genderOptions"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.gender }"
                />
            </InputGroup>

            <InputGroup id="num_cbo_members" label="Number of CBO Members" :required="true" :error="form.errors.num_cbo_members">
                <TextInput
                    id="num_cbo_members"
                    v-model="form.num_cbo_members"
                    type="number"
                    min="1"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.num_cbo_members }"
                />
            </InputGroup>

            <InputGroup id="president_name" label="President Name" :required="true" :error="form.errors.president_name">
                <TextInput
                    id="president_name"
                    v-model="form.president_name"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.president_name }"
                />
            </InputGroup>

            <InputGroup id="president_contact" label="President Contact" :required="true" :error="form.errors.president_contact">
                <TextInput
                    id="president_contact"
                    v-model="form.president_contact"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.president_contact }"
                />
            </InputGroup>

            <InputGroup id="secretary_name" label="Secretary Name" :required="true" :error="form.errors.secretary_name">
                <TextInput
                    id="secretary_name"
                    v-model="form.secretary_name"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.secretary_name }"
                />
            </InputGroup>

            <InputGroup id="secretary_contact" label="Secretary Contact" :required="true" :error="form.errors.secretary_contact">
                <TextInput
                    id="secretary_contact"
                    v-model="form.secretary_contact"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.secretary_contact }"
                />
            </InputGroup>

            <InputGroup id="remarks" label="Remarks" class="md:col-span-2" :error="form.errors.remarks">
                <WysiwygEditor
                    id="remarks"
                    v-model="form.remarks"
                    :class="{ 'border-red-500': form.errors.remarks }"
                    :height="200"
                />
            </InputGroup>
        </div>

        <InputGroup label="Attachments" class="mt-6" :error="form.errors.attachments">
            <AttachmentUploader
                v-model="form.attachments"
                :existing-attachments="existingAttachments"
                @remove-existing="handleAttachmentsToDelete"
                :error-message="form.errors.attachments"
            />
        </InputGroup>

        <div class="flex items-center justify-end mt-6 space-x-4">
            <button
                type="button"
                @click="handleCancel"
                class="inline-flex items-center px-4 py-2 bg-paper-200 border border-transparent rounded-md font-semibold text-xs text-ink-700 uppercase tracking-widest hover:bg-paper-300 focus:bg-paper-300 active:bg-paper-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 transition ease-in-out duration-150"
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

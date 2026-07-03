<script setup>
import { reactive, watch, ref } from 'vue';
import { useForm } from '@inertiajs/vue3';

import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import SelectInput from '@/Components/SelectInput.vue';
import DatePicker from '@/Components/DatePicker.vue';
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';

const props = defineProps({
    parentId: { type: Number, required: true },
    visitableType: { type: String, required: true }, // 'irrigation_scheme' or 'mhp_site'
    visit: { type: Object, default: null },
    mode: { type: String, default: 'create' },
});

const emit = defineEmits(['success', 'cancel']);

const isEditMode = ref(props.mode === 'update');
const existingAttachments = ref([]);

const customRole = ref('');
const customType = ref('');

const visitorRoles = [
    'District Engineer',
    'Senior Engineer',
    'M&E Specialist',
    'Project Manager',
    'Social Mobilizer',
    'Donor Representative',
    'Third Party Monitor',
    'Other'
];

const visitTypes = [
    'Validation',
    'Routine Monitoring',
    'Technical Assessment',
    'Pre-Completion Inspection',
    'Final Handover Verification',
    'Other'
];

function getInitialFormData(visit) {
    const defaultRole = visit ? visit.visitor_role : '';
    const isCustomRole = defaultRole && !visitorRoles.includes(defaultRole);
    customRole.value = isCustomRole ? defaultRole : '';

    const defaultType = visit ? visit.visit_type : '';
    const isCustomType = defaultType && !visitTypes.includes(defaultType);
    customType.value = isCustomType ? defaultType : '';

    return {
        visitable_id: props.parentId,
        visitable_type: props.visitableType,
        visit_date: visit ? visit.visit_date : null,
        visitor_role: isCustomRole ? 'Other' : defaultRole,
        visit_type: isCustomType ? 'Other' : defaultType,
        visitor_name: visit ? visit.visitor_name : '',
        remarks: visit ? visit.remarks : '',
        attachments: [],
        attachments_to_delete: [],
    };
}

const form = useForm(getInitialFormData(props.visit));

watch(() => props.visit, (newVal) => {
    isEditMode.value = !!newVal;
    form.defaults(getInitialFormData(newVal));
    form.reset();
    existingAttachments.value = newVal?.attachments_frontend ?? [];
    form.clearErrors();
}, { immediate: true });

const handleAttachmentsToDelete = (ids) => {
    form.attachments_to_delete = ids;
};

const handleSubmit = () => {
    const routeName = props.visitableType === 'irrigation_scheme'
        ? (isEditMode.value ? 'irrigation.schemes.visits.update' : 'irrigation.schemes.visits.store')
        : (isEditMode.value ? 'mhp.sites.visits.update' : 'mhp.sites.visits.store');

    const params = props.visitableType === 'irrigation_scheme'
        ? (isEditMode.value ? { scheme: props.parentId, visit: props.visit.id } : { scheme: props.parentId })
        : (isEditMode.value ? { site: props.parentId, visit: props.visit.id } : { site: props.parentId });

    const url = route(routeName, params);

    form.transform((data) => {
        const transformedData = { ...data };
        if (isEditMode.value) {
            transformedData._method = 'put';
        }
        if (transformedData.visitor_role === 'Other') {
            transformedData.visitor_role = customRole.value;
        }
        if (transformedData.visit_type === 'Other') {
            transformedData.visit_type = customType.value;
        }
        // Normalize date to YYYY-MM-DD
        if (transformedData.visit_date && typeof transformedData.visit_date === 'object' && transformedData.visit_date.toISOString) {
            transformedData.visit_date = transformedData.visit_date.toISOString().slice(0, 10);
        }
        return transformedData;
    }).post(url, {
        onSuccess: () => {
            form.reset();
            customRole.value = '';
            customType.value = '';
            existingAttachments.value = [];
            form.attachments_to_delete = [];
            emit('success', isEditMode.value ? 'Visit updated successfully!' : 'Visit added successfully!');
        },
        onError: (errors) => {
            console.error('Form errors:', errors);
        },
        preserveScroll: true,
        forceFormData: true,
    });
};

const handleCancel = () => {
    form.reset();
    customRole.value = '';
    customType.value = '';
    existingAttachments.value = [];
    form.attachments_to_delete = [];
    emit('cancel');
};
</script>

<template>
    <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <InputLabel for="visit_date" value="Visit Date" />
                <DatePicker
                    id="visit_date"
                    v-model="form.visit_date"
                    :class="{ 'border-red-500': form.errors.visit_date }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.visit_date" />
            </div>

            <div>
                <InputLabel for="visitor_role" value="Visitor Role" />
                <SelectInput
                    id="visitor_role"
                    v-model="form.visitor_role"
                    :options="visitorRoles"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.visitor_role }"
                />
                <InputError class="mt-2" :message="form.errors.visitor_role" />
            </div>

            <div v-if="form.visitor_role === 'Other'">
                <InputLabel for="custom_role" value="Specify Visitor Role" />
                <TextInput
                    id="custom_role"
                    v-model="customRole"
                    type="text"
                    class="mt-1 block w-full"
                    placeholder="Enter custom role"
                    required
                />
            </div>

            <div>
                <InputLabel for="visit_type" value="Visit Type" />
                <SelectInput
                    id="visit_type"
                    v-model="form.visit_type"
                    :options="visitTypes"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.visit_type }"
                />
                <InputError class="mt-2" :message="form.errors.visit_type" />
            </div>

            <div v-if="form.visit_type === 'Other'">
                <InputLabel for="custom_type" value="Specify Visit Type" />
                <TextInput
                    id="custom_type"
                    v-model="customType"
                    type="text"
                    class="mt-1 block w-full"
                    placeholder="Enter custom visit type"
                    required
                />
            </div>

            <div>
                <InputLabel for="visitor_name" value="Visitor Name (Optional)" />
                <TextInput
                    id="visitor_name"
                    v-model="form.visitor_name"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.visitor_name }"
                />
                <InputError class="mt-2" :message="form.errors.visitor_name" />
            </div>

            <div class="md:col-span-2">
                <InputLabel for="remarks" value="Remarks / Findings" />
                <textarea
                    id="remarks"
                    v-model="form.remarks"
                    rows="4"
                    class="mt-1 block w-full border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                    :class="{ 'border-red-500': form.errors.remarks }"
                ></textarea>
                <InputError class="mt-2" :message="form.errors.remarks" />
            </div>
        </div>

        <div class="mt-6">
            <InputLabel value="Visit Attachments (Photos/Reports)" />
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
                class="inline-flex items-center px-4 py-2 bg-slate-200 border border-transparent rounded-md font-semibold text-xs text-slate-700 uppercase tracking-widest hover:bg-slate-300 focus:bg-slate-300 active:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
            >
                Cancel
            </button>
            <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                {{ isEditMode ? 'Update Visit Log' : 'Save Visit Log' }}
            </PrimaryButton>
        </div>
    </form>
</template>

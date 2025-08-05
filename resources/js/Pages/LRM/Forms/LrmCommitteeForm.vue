<script setup>
import { reactive, watch, ref, onMounted } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';

import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import TextArea from '@/Components/TextArea.vue';
import SelectInput from '@/Components/SelectInput.vue';
import DatePicker from '@/Components/DatePicker.vue';
import WysiwygEditor from '@/Components/WysiwygEditor.vue';
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';
import SearchableCboSelect from '@/Components/SearchableCboSelect.vue'; // Assuming this exists

const props = defineProps({
    lrmCommittee: {
        type: Object,
        default: null, // Null for create mode, object for edit mode
    },
});

const emit = defineEmits(['success', 'cancel']);

const page = usePage();

const isEditMode = ref(!!props.lrmCommittee);
const existingAttachments = ref([]);

const afforestationReforestationOptions = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' }
];

const forestPlantsOptions = ['Rubinia', 'Allinthis', 'Bakain', 'Others']; // Example options
const fruitPlantsOptions = ['PEACH', 'Apple', 'Mango', 'Orange']; // Example options

// Function to get the initial data for the form based on an LRM Committee object or null
function getInitialFormData(lrmCommittee) {
    return {
        cbo_id: lrmCommittee ? lrmCommittee.cbo_id : null,
        date_of_lrm_committee_formation: lrmCommittee ? lrmCommittee.date_of_lrm_committee_formation : null,
        no_of_lrm_committee_members: lrmCommittee ? lrmCommittee.no_of_lrm_committee_members : null,
        date_of_nrm_plan_finalization: lrmCommittee ? lrmCommittee.date_of_nrm_plan_finalization : null,
        has_afforestation_reforestation: lrmCommittee ? lrmCommittee.has_afforestation_reforestation : false,
        forest_plants: lrmCommittee ? lrmCommittee.forest_plants : [],
        fruit_plants: lrmCommittee ? lrmCommittee.fruit_plants : [],
        total_land_covered_hectares: lrmCommittee ? lrmCommittee.total_land_covered_hectares : null,
        remarks: lrmCommittee ? lrmCommittee.remarks : '',
        attachments: [],
        attachments_to_delete: [],
    };
}

const form = useForm(getInitialFormData(props.lrmCommittee));

// Watch for prop.lrmCommittee changes to update the form
watch(() => props.lrmCommittee, (newLrmCommittee) => {
    isEditMode.value = !!newLrmCommittee;
    form.defaults(getInitialFormData(newLrmCommittee));
    form.reset();
    existingAttachments.value = newLrmCommittee ? newLrmCommittee.attachments_frontend : [];
    form.clearErrors();
}, { immediate: true });

const handleAttachmentsToDelete = (id) => {
    form.attachments_to_delete.push(id);
    existingAttachments.value = existingAttachments.value.filter(att => att.id !== id);
};

const handleSubmit = () => {
    const url = isEditMode.value
        ? route('lrm.committees.update', props.lrmCommittee.id)
        : route('lrm.committees.store');

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
            emit('success', isEditMode.value ? 'LRM Committee updated successfully!' : 'LRM Committee created successfully!');
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
            <!-- CBO -->
            <div>
                <InputLabel for="cbo_id" value="CBO" />
                <SearchableCboSelect
                    id="cbo_id"
                    v-model="form.cbo_id"
                    :initial-cbo-object="lrmCommittee ? lrmCommittee.cbo : null"
                    :class="{ 'border-red-500': form.errors.cbo_id }"
                />
                <InputError class="mt-2" :message="form.errors.cbo_id" />
            </div>

            <!-- Date of LRM Committee Formation -->
            <div>
                <InputLabel for="date_of_lrm_committee_formation" value="Date of Committee Formation" />
                <DatePicker
                    id="date_of_lrm_committee_formation"
                    v-model="form.date_of_lrm_committee_formation"
                    :class="{ 'border-red-500': form.errors.date_of_lrm_committee_formation }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.date_of_lrm_committee_formation" />
            </div>

            <!-- No. of LRM Committee Members -->
            <div>
                <InputLabel for="no_of_lrm_committee_members" value="No. of Committee Members" />
                <TextInput
                    id="no_of_lrm_committee_members"
                    v-model="form.no_of_lrm_committee_members"
                    type="number"
                    min="1"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.no_of_lrm_committee_members }"
                />
                <InputError class="mt-2" :message="form.errors.no_of_lrm_committee_members" />
            </div>

            <!-- Date of NRM Plan Finalization -->
            <div>
                <InputLabel for="date_of_nrm_plan_finalization" value="Date of NRM Plan Finalization (Optional)" />
                <DatePicker
                    id="date_of_nrm_plan_finalization"
                    v-model="form.date_of_nrm_plan_finalization"
                    :class="{ 'border-red-500': form.errors.date_of_nrm_plan_finalization }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.date_of_nrm_plan_finalization" />
            </div>

            <!-- Has Afforestation/Reforestation -->
            <div>
                <InputLabel for="has_afforestation_reforestation" value="Afforestation/Reforestation Activity?" />
                <SelectInput
                    id="has_afforestation_reforestation"
                    v-model="form.has_afforestation_reforestation"
                    :options="afforestationReforestationOptions"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.has_afforestation_reforestation }"
                />
                <InputError class="mt-2" :message="form.errors.has_afforestation_reforestation" />
            </div>

            <!-- Forest Plants (Multi-select or tags) -->
            <div>
                <InputLabel for="forest_plants" value="Forest Plants (Select all that apply)" />
                <SelectInput
                    id="forest_plants"
                    v-model="form.forest_plants"
                    :options="forestPlantsOptions"
                    :multiple="true"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.forest_plants }"
                />
                <InputError class="mt-2" :message="form.errors.forest_plants" />
            </div>

            <!-- Fruit Plants (Multi-select or tags) -->
            <div>
                <InputLabel for="fruit_plants" value="Fruit Plants (Select all that apply)" />
                <SelectInput
                    id="fruit_plants"
                    v-model="form.fruit_plants"
                    :options="fruitPlantsOptions"
                    :multiple="true"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.fruit_plants }"
                />
                <InputError class="mt-2" :message="form.errors.fruit_plants" />
            </div>

            <!-- Total Land Covered (Hectares) -->
            <div>
                <InputLabel for="total_land_covered_hectares" value="Total Land Covered (Hectares)" />
                <TextInput
                    id="total_land_covered_hectares"
                    v-model="form.total_land_covered_hectares"
                    type="number"
                    step="0.01"
                    min="0"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.total_land_covered_hectares }"
                />
                <InputError class="mt-2" :message="form.errors.total_land_covered_hectares" />
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
                {{ isEditMode ? 'Update LRM Committee' : 'Create LRM Committee' }}
            </PrimaryButton>
        </div>
    </form>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

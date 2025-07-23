<script setup>
import { reactive, watch, ref, onMounted } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';

import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import TextArea from '@/Components/TextArea.vue';
import SelectInput from '@/Components/SelectInput.vue';
import DatePicker from '@/Components/DatePicker.vue'; // Assuming this exists
import SearchableCboSelect from '@/Components/SearchableCboSelect.vue'; // Assuming this exists
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue'; // Assuming this exists

const props = defineProps({
    site: {
        type: Object,
        default: null, // Null for create mode, object for edit mode
    },
});

const emit = defineEmits(['success', 'cancel']);

const page = usePage();
const availableCbos = ref([]); // To store CBOs fetched by SearchableCboSelect

const form = useForm({
    cbo_id: props.site ? props.site.cbo_id : '',
    month_year_establishment: props.site ? props.site.month_year_establishment : null,
    established_by: props.site ? props.site.established_by : '',
    population: props.site ? props.site.population : '',
    grid_status: props.site ? props.site.grid_status : 'Off-Grid',
    status: props.site ? props.site.status : 'New',
    existing_capacity_kw: props.site ? props.site.existing_capacity_kw : '',
    planned_capacity_kw: props.site ? props.site.planned_capacity_kw : '',
    head_ft: props.site ? props.site.head_ft : '',
    design_discharge_cusecs: props.site ? props.site.design_discharge_cusecs : '',
    channel_length_km: props.site ? props.site.channel_length_km : '',
    tl_ht_km: props.site ? props.site.tl_ht_km : '',
    tl_lt_km: props.site ? props.site.tl_lt_km : '',
    // 'transformers' is removed from MhpSite model, so it's not here
    turbine_type: props.site ? props.site.turbine_type : '',
    alternator_type: props.site ? props.site.alternator_type : '',
    accessible: props.site ? props.site.accessible : '',
    domestic_units: props.site ? props.site.domestic_units : '',
    commercial_units: props.site ? props.site.commercial_units : '',
    estimated_cost: props.site ? props.site.estimated_cost : '',
    per_kw_cost: props.site ? props.site.per_kw_cost : '',
    total_hh: props.site ? props.site.total_hh : '',
    avg_hh_size: props.site ? props.site.avg_hh_size : '',
    cost_per_capita: props.site ? props.site.cost_per_capita : '',
    tentative_completion_date: props.site ? props.site.tentative_completion_date : null,
    financial_initiation_date: props.site ? props.site.financial_initiation_date : null,
    physical_completion_date: props.site ? props.site.physical_completion_date : null,
    remarks: props.site ? props.site.remarks : '',
    attachments: [], // For new files to upload
    attachments_to_delete: [], // For existing files to delete (by ID)
});

const isEditMode = ref(!!props.site);
const existingAttachments = ref(props.site ? props.site.attachments_frontend : []);

// Options for select inputs
const gridStatusOptions = ['On-Grid', 'Off-Grid', 'Partially on-Grid'];
const siteStatusOptions = ['New', 'Rehabilitation', 'Upgradation'];
const accessibleOptions = ['Yes', 'No']; // Assuming 'accessible' is 'Yes'/'No'

// Handle attachment changes from AttachmentUploader


// In resources/js/Pages/MHP/Forms/MhpSiteForm.vue script
const handleAttachmentsToDelete = (id) => {
    console.log('Request to delete attachment ID:', id);
    form.attachments_to_delete.push(id);
    // Optimistically update the UI: remove the deleted attachment from existingAttachments
    existingAttachments.value = existingAttachments.value.filter(att => att.id !== id);
};

// Handle CBO selection
// const handleCboSelected = (cbo) => {
//     form.cbo_id = cbo ? cbo.id : null;
// };

const handleSubmit = () => {
    console.log('Final form data before POST:', form.data()); // Inspect entire form data
    console.log('Attachments array before POST:', form.attachments); // Specifically check attachments

    const url = isEditMode.value
        ? route('mhp.sites.update', props.site.id)
        : route('mhp.sites.store');

    const method = isEditMode.value ? 'post' : 'post'; // Laravel PUT/PATCH via POST with _method spoofing

    form.transform((data) => {
        // Append _method for PUT/PATCH requests
        if (isEditMode.value) {
            data._method = 'put'; // or 'patch'
        }
        return data;
    }).post(url, {
        onSuccess: () => {
            form.reset();
            emit('success', isEditMode.value ? 'MHP Site updated successfully!' : 'MHP Site created successfully!');
            // After successful save, clear attachments array to prevent re-upload on subsequent open
            form.attachments = [];
            form.attachments_to_delete = [];
        },
        onError: (errors) => {
            console.error('Form errors:', errors);
            // Inertia's useForm automatically populates form.errors
        },
        // Preserve scroll and form state (optional)
        preserveScroll: true,
        preserveState: true,
    });
};

const handleCancel = () => {
    form.reset();
    emit('cancel');
};

// Watch for prop changes if the component might be reused for different sites without full re-mount
watch(() => props.site, (newSite) => {
    if (newSite) {
        isEditMode.value = true;
        form.cbo_id = newSite.cbo_id;
        form.month_year_establishment = newSite.month_year_establishment;
        form.established_by = newSite.established_by;
        form.population = newSite.population;
        form.grid_status = newSite.grid_status;
        form.status = newSite.status;
        form.existing_capacity_kw = newSite.existing_capacity_kw;
        form.planned_capacity_kw = newSite.planned_capacity_kw;
        form.head_ft = newSite.head_ft;
        form.design_discharge_cusecs = newSite.design_discharge_cusecs;
        form.channel_length_km = newSite.channel_length_km;
        form.tl_ht_km = newSite.tl_ht_km;
        form.tl_lt_km = newSite.tl_lt_lt_km;
        form.turbine_type = newSite.turbine_type;
        form.alternator_type = newSite.alternator_type;
        form.accessible = newSite.accessible;
        form.domestic_units = newSite.domestic_units;
        form.commercial_units = newSite.commercial_units;
        form.estimated_cost = newSite.estimated_cost;
        form.per_kw_cost = newSite.per_kw_cost;
        form.total_hh = newSite.total_hh;
        form.avg_hh_size = newSite.avg_hh_size;
        form.cost_per_capita = newSite.cost_per_capita;
        form.tentative_completion_date = newSite.tentative_completion_date;
        form.financial_initiation_date = newSite.financial_initiation_date;
        form.physical_completion_date = newSite.physical_completion_date;
        form.remarks = newSite.remarks;
        existingAttachments.value = newSite.attachments_frontend;


        existingAttachments.value = newSite.attachments_frontend;
        form.attachments_to_delete = []; // Reset this array for new edit sessions
        form.attachments = []; // Clear new files for new edit sessions
        form.clearErrors();
    } else {
        // Reset form for create mode if site prop becomes null
        isEditMode.value = false;
        form.reset();
        existingAttachments.value = [];

        form.attachments_to_delete = [];
        form.attachments = [];
        form.clearErrors();
    }
}, { immediate: true }); // Run immediately on component mount

// Handle pre-selection of CBO for edit mode if site is available
onMounted(() => {
    if (props.site && props.site.cbo) {
        availableCbos.value = [props.site.cbo]; // Pre-populate for SearchableCboSelect
    }
});

</script>

<template>

    <form @submit.prevent="handleSubmit" class="p-6 space-y-6 bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-400">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <InputLabel for="cbo_id" value="" />
                <SearchableCboSelect
                    id="cbo_id"
                    :initial-cbo="site ? site.cbo : null"
                    v-model="form.cbo_id" :class="{ 'border-red-500 rounded': form.errors.cbo_id }"
                />
                <InputError class="mt-2" :message="form.errors.cbo_id" />
            </div>

            <div>
                <InputLabel for="month_year_establishment" value="Month & Year of Establishment" />
                <DatePicker
                    id="month_year_establishment"
                    v-model="form.month_year_establishment"
                    :class="{ 'border-red-500': form.errors.month_year_establishment }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.month_year_establishment" />
            </div>

            <div>
                <InputLabel for="established_by" value="Established By" />
                <TextInput
                    id="established_by"
                    v-model="form.established_by"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500 ': form.errors.established_by }"
                />
                <InputError class="mt-2" :message="form.errors.established_by" />
            </div>

            <div>
                <InputLabel for="population" value="Population" />
                <TextInput
                    id="population"
                    v-model="form.population"
                    type="number"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.population }"
                />
                <InputError class="mt-2" :message="form.errors.population" />
            </div>

            <div>
                <InputLabel for="grid_status" value="Grid Status" />
                <SelectInput
                    id="grid_status"
                    v-model="form.grid_status"
                    :options="gridStatusOptions"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.grid_status }"
                />
                <InputError class="mt-2" :message="form.errors.grid_status" />
            </div>

            <div>
                <InputLabel for="status" value="Status" />
                <SelectInput
                    id="status"
                    v-model="form.status"
                    :options="siteStatusOptions"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.status }"
                />
                <InputError class="mt-2" :message="form.errors.status" />
            </div>

            <div>
                <InputLabel for="existing_capacity_kw" value="Existing Capacity (KW)" />
                <TextInput
                    id="existing_capacity_kw"
                    v-model="form.existing_capacity_kw"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.existing_capacity_kw }"
                />
                <InputError class="mt-2" :message="form.errors.existing_capacity_kw" />
            </div>

            <div>
                <InputLabel for="planned_capacity_kw" value="Planned Capacity (KW)" />
                <TextInput
                    id="planned_capacity_kw"
                    v-model="form.planned_capacity_kw"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.planned_capacity_kw }"
                />
                <InputError class="mt-2" :message="form.errors.planned_capacity_kw" />
            </div>

            <div>
                <InputLabel for="head_ft" value="Head (FT)" />
                <TextInput
                    id="head_ft"
                    v-model="form.head_ft"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.head_ft }"
                />
                <InputError class="mt-2" :message="form.errors.head_ft" />
            </div>

            <div>
                <InputLabel for="design_discharge_cusecs" value="Design Discharge (Cusecs)" />
                <TextInput
                    id="design_discharge_cusecs"
                    v-model="form.design_discharge_cusecs"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.design_discharge_cusecs }"
                />
                <InputError class="mt-2" :message="form.errors.design_discharge_cusecs" />
            </div>

            <div>
                <InputLabel for="channel_length_km" value="Channel Length (KM)" />
                <TextInput
                    id="channel_length_km"
                    v-model="form.channel_length_km"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.channel_length_km }"
                />
                <InputError class="mt-2" :message="form.errors.channel_length_km" />
            </div>

            <div>
                <InputLabel for="tl_ht_km" value="TL HT (KM)" />
                <TextInput
                    id="tl_ht_km"
                    v-model="form.tl_ht_km"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.tl_ht_km }"
                />
                <InputError class="mt-2" :message="form.errors.tl_ht_km" />
            </div>

            <div>
                <InputLabel for="tl_lt_km" value="TL LT (KM)" />
                <TextInput
                    id="tl_lt_km"
                    v-model="form.tl_lt_km"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.tl_lt_km }"
                />
                <InputError class="mt-2" :message="form.errors.tl_lt_km" />
            </div>

            <div>
                <InputLabel for="turbine_type" value="Turbine Type" />
                <TextInput
                    id="turbine_type"
                    v-model="form.turbine_type"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.turbine_type }"
                />
                <InputError class="mt-2" :message="form.errors.turbine_type" />
            </div>

            <div>
                <InputLabel for="alternator_type" value="Alternator Type" />
                <TextInput
                    id="alternator_type"
                    v-model="form.alternator_type"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.alternator_type }"
                />
                <InputError class="mt-2" :message="form.errors.alternator_type" />
            </div>

            <div>
                <InputLabel for="accessible" value="Accessible" />
                <SelectInput
                    id="accessible"
                    v-model="form.accessible"
                    :options="accessibleOptions"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.accessible }"
                />
                <InputError class="mt-2" :message="form.errors.accessible" />
            </div>

            <div>
                <InputLabel for="domestic_units" value="Domestic Units" />
                <TextInput
                    id="domestic_units"
                    v-model="form.domestic_units"
                    type="number"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.domestic_units }"
                />
                <InputError class="mt-2" :message="form.errors.domestic_units" />
            </div>

            <div>
                <InputLabel for="commercial_units" value="Commercial Units" />
                <TextInput
                    id="commercial_units"
                    v-model="form.commercial_units"
                    type="number"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.commercial_units }"
                />
                <InputError class="mt-2" :message="form.errors.commercial_units" />
            </div>

            <div>
                <InputLabel for="estimated_cost" value="Estimated Cost" />
                <TextInput
                    id="estimated_cost"
                    v-model="form.estimated_cost"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.estimated_cost }"
                />
                <InputError class="mt-2" :message="form.errors.estimated_cost" />
            </div>

            <div>
                <InputLabel for="per_kw_cost" value="Per KW Cost" />
                <TextInput
                    id="per_kw_cost"
                    v-model="form.per_kw_cost"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.per_kw_cost }"
                />
                <InputError class="mt-2" :message="form.errors.per_kw_cost" />
            </div>

            <div>
                <InputLabel for="total_hh" value="Total Households (HH)" />
                <TextInput
                    id="total_hh"
                    v-model="form.total_hh"
                    type="number"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.total_hh }"
                />
                <InputError class="mt-2" :message="form.errors.total_hh" />
            </div>

            <div>
                <InputLabel for="avg_hh_size" value="Average HH Size" />
                <TextInput
                    id="avg_hh_size"
                    v-model="form.avg_hh_size"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.avg_hh_size }"
                />
                <InputError class="mt-2" :message="form.errors.avg_hh_size" />
            </div>

            <div>
                <InputLabel for="cost_per_capita" value="Cost Per Capita" />
                <TextInput
                    id="cost_per_capita"
                    v-model="form.cost_per_capita"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.cost_per_capita }"
                />
                <InputError class="mt-2" :message="form.errors.cost_per_capita" />
            </div>

            <div>
                <InputLabel for="tentative_completion_date" value="Tentative Completion Date" />
                <DatePicker
                    id="tentative_completion_date"
                    v-model="form.tentative_completion_date"
                    :class="{ 'border-red-500': form.errors.tentative_completion_date }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.tentative_completion_date" />
            </div>

            <div>
                <InputLabel for="financial_initiation_date" value="Financial Initiation Date" />
                <DatePicker
                    id="financial_initiation_date"
                    v-model="form.financial_initiation_date"
                    :class="{ 'border-red-500': form.errors.financial_initiation_date }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.financial_initiation_date" />
            </div>

            <div>
                <InputLabel for="physical_completion_date" value="Physical Completion Date" />
                <DatePicker
                    id="physical_completion_date"
                    v-model="form.physical_completion_date"
                    :class="{ 'border-red-500': form.errors.physical_completion_date }"
                    placeholder="Select Date"
                />
                <InputError class="mt-2" :message="form.errors.physical_completion_date" />
            </div>

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
                {{ isEditMode ? 'Update Site' : 'Create Site' }}

            </PrimaryButton>
        </div>
    </form>
</template>

<style scoped>
/* No specific scoped styles needed here, as styling is handled by child components or global Tailwind */
</style>

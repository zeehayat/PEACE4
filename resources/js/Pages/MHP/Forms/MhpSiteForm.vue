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
import SearchableCboSelect from '@/Components/SearchableCboSelect.vue';
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';
import WysiwygEditor from "@/Components/WysiwygEditor.vue";

const props = defineProps({
    site: {
        type: Object,
        default: null, // Null for create mode, object for edit mode
    },
});

const emit = defineEmits(['success', 'cancel']);

const page = usePage();

// Options for select inputs
const gridStatusOptions = ['On-Grid', 'Off-Grid', 'Partially on-Grid'];
const siteStatusOptions = ['New', 'Rehabilitation', 'Upgradation'];
const accessibleOptions = ['Yes', 'No'];

const isEditMode = ref(!!props.site); // Determine edit mode based on initial prop

const existingAttachments = ref([]); // Initialized as empty array, filled by watcher

// Function to get the initial data for the form based on a site object or null
function getInitialFormData(site) {
    return {
        cbo_id: site ? site.cbo_id : null,
        month_year_establishment: site ? site.month_year_establishment : null,
        established_by: site ? site.established_by : '',
        population: site ? site.population : null,
        grid_status: site ? site.grid_status : 'Off-Grid',
        status: site ? site.status : 'New',
        existing_capacity_kw: site ? site.existing_capacity_kw : null,
        planned_capacity_kw: site ? site.planned_capacity_kw : null,
        head_ft: site ? site.head_ft : null,
        design_discharge_cusecs: site ? site.design_discharge_cusecs : null,
        channel_length_km: site ? site.channel_length_km : null,
        tl_ht_km: site ? site.tl_ht_km : null,
        tl_lt_km: site ? site.tl_lt_km : null,
        turbine_type: site ? site.turbine_type : '',
        alternator_type: site ? site.alternator_type : '',
        accessible: site ? site.accessible : '',
        domestic_units: site ? site.domestic_units : null,
        commercial_units: site ? site.commercial_units : null,
        estimated_cost: site ? site.estimated_cost : null,
        per_kw_cost: site ? site.per_kw_cost : null,
        total_hh: site ? site.total_hh : null,
        avg_hh_size: site ? site.avg_hh_size : null,
        cost_per_capita: site ? site.cost_per_capita : null,
        tentative_completion_date: site ? site.tentative_completion_date : null,
        financial_initiation_date: site ? site.financial_initiation_date : null,
        physical_completion_date: site ? site.physical_completion_date : null,
        remarks: site ? site.remarks : '',
        observed_discharge: site ? site.observed_discharge : null,
        intake_details: site ? site.intake_details : '',
        settling_basin_details: site ? site.settling_basin_details : '',
        approach_culvert_details: site ? site.approach_culvert_details : '',
        headrace_channel_details: site ? site.headrace_channel_details : '',
        aqueduct_details: site ? site.aqueduct_details : '',
        tailrace_details: site ? site.tailrace_details : '',
        spillway_details: site ? site.spillway_details : '',
        retaining_walls_details: site ? site.retaining_walls_details : '',
        design_net_head: site ? site.design_net_head : null,
        proposed_capacity_kw: site ? site.proposed_capacity_kw : null,
        length_ft: site ? site.length_ft : null,
        bottom_width_ft: site ? site.bottom_width_ft : null,
        design_depth_ft: site ? site.design_depth_ft : null,
        freeboard_ft: site ? site.freeboard_ft : null,
        velocity_ft_per_sec: site ? site.velocity_ft_per_sec : null,
        attachments: [], // Always start with empty array for new uploads
        attachments_to_delete: [], // Always start with empty array for new deletions
    };
}

// Initialize form using a function to ensure it's always a useForm instance
const form = useForm(getInitialFormData(props.site));

// Watch for prop.site changes to update the form
watch(() => props.site, (newSite) => {
    console.log('--- MhpSiteForm: props.site watcher triggered ---');
    console.log('New Site prop:', newSite);

    isEditMode.value = !!newSite;

    // Set the new default values for the form based on the prop
    form.defaults(getInitialFormData(newSite));

    // Reset the form to apply the new defaults and clear any dirty state/errors
    form.reset();

    // Update existing attachments separately
    existingAttachments.value = newSite ? newSite.attachments_frontend : [];

    form.clearErrors();
    console.log('MhpSiteForm: Form and attachments initialized based on new prop.');
}, { immediate: true });

onMounted(() => {
    console.log('--- MhpSiteForm: Mounted ---');
    console.log('MhpSiteForm: Initial form.attachments on mount:', form.attachments);
});

const handleAttachmentsToDelete = (id) => {
    console.log('--- MhpSiteForm: handleAttachmentsToDelete called ---');
    console.log('Deleting attachment ID:', id);
    form.attachments_to_delete.push(id);
    existingAttachments.value = existingAttachments.value.filter(att => att.id !== id);
};

const handleSubmit = () => {
    console.log('--- MhpSiteForm: handleSubmit triggered ---');
    console.log('Form data before POST:', form.data());
    console.log('Attachments array before POST:', form.attachments);

    const url = isEditMode.value
        ? route('mhp.sites.update', props.site.id)
        : route('mhp.sites.store');

    form.transform((data) => {
        if (isEditMode.value) {
            data._method = 'put';
        }
        return data;
    }).post(url, {
        onSuccess: () => {
            console.log('--- MhpSiteForm: Submission Success ---');
            form.reset();
            existingAttachments.value = [];
            form.attachments_to_delete = [];
            emit('success', isEditMode.value ? 'MHP Site updated successfully!' : 'MHP Site created successfully!');
        },
        onError: (errors) => {
            console.error('--- MhpSiteForm: Submission Error ---');
            console.error('Form errors:', errors);
        },
        preserveScroll: true,
        preserveState: true,
    });
};

const handleCancel = () => {
    console.log('--- MhpSiteForm: Cancel triggered ---');
    form.reset();
    existingAttachments.value = [];
    form.attachments_to_delete = [];
    emit('cancel');
};
</script>

<template>
    <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Reference Code -->
            <div>
                <InputLabel for="cbo_id" value="CBO" />
                <SearchableCboSelect
                    id="cbo_id"
                    v-model="form.cbo_id"
                    :initial-cbo-object="site ? site.cbo : null"
                    :class="{ 'border-red-500': form.errors.cbo_id }"
                />
                <InputError class="mt-2" :message="form.errors.cbo_id" />
            </div>

            <!-- Month & Year of Establishment -->
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

            <!-- Established By -->
            <div>
                <InputLabel for="established_by" value="Established By" />
                <TextInput
                    id="established_by"
                    v-model="form.established_by"
                    type="text"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.established_by }"
                />
                <InputError class="mt-2" :message="form.errors.established_by" />
            </div>

            <!-- Population -->
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

            <!-- Grid Status -->
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

            <!-- Status -->
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

            <!-- Existing Capacity (KW) -->
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

            <!-- Planned Capacity (KW) -->
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

            <!-- Proposed Capacity (KW) -->
            <div>
                <InputLabel for="proposed_capacity_kw" value="Proposed Capacity (KW)" />
                <TextInput
                    id="proposed_capacity_kw"
                    v-model="form.proposed_capacity_kw"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.proposed_capacity_kw }"
                />
                <InputError class="mt-2" :message="form.errors.proposed_capacity_kw" />
            </div>

            <!-- Head (FT) -->
            <div>
                <InputLabel for="head_ft" value="Gross Head (FT)" />
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

            <!-- Design Net Head (FT) -->
            <div>
                <InputLabel for="design_net_head" value="Design Net Head (FT)" />
                <TextInput
                    id="design_net_head"
                    v-model="form.design_net_head"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.design_net_head }"
                />
                <InputError class="mt-2" :message="form.errors.design_net_head" />
            </div>

            <!-- Design Discharge (Cusecs) -->
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

            <!-- Observed Discharge (Cusecs) -->
            <div>
                <InputLabel for="observed_discharge" value="Observed Discharge (Cusecs)" />
                <TextInput
                    id="observed_discharge"
                    v-model="form.observed_discharge"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.observed_discharge }"
                />
                <InputError class="mt-2" :message="form.errors.observed_discharge" />
            </div>

            <!-- Turbine Type -->
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

            <!-- Alternator Type -->
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

            <!-- Accessible -->
            <div>
                <InputLabel for="accessible" value="Working Area Accessibility" />
                <SelectInput
                    id="accessible"
                    v-model="form.accessible"
                    :options="accessibleOptions"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.accessible }"
                />
                <InputError class="mt-2" :message="form.errors.accessible" />
            </div>

            <!-- Channel Length (KM) -->
            <div>
                <InputLabel for="channel_length_km" value="Length of Channel (KM)" />
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

            <!-- Length (FT) -->
            <div>
                <InputLabel for="length_ft" value="Length (FT)" />
                <TextInput
                    id="length_ft"
                    v-model="form.length_ft"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.length_ft }"
                />
                <InputError class="mt-2" :message="form.errors.length_ft" />
            </div>

            <!-- Bottom Width (FT) -->
            <div>
                <InputLabel for="bottom_width_ft" value="Bottom Width (FT)" />
                <TextInput
                    id="bottom_width_ft"
                    v-model="form.bottom_width_ft"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.bottom_width_ft }"
                />
                <InputError class="mt-2" :message="form.errors.bottom_width_ft" />
            </div>

            <!-- Design Depth (FT) -->
            <div>
                <InputLabel for="design_depth_ft" value="Design Depth (FT)" />
                <TextInput
                    id="design_depth_ft"
                    v-model="form.design_depth_ft"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.design_depth_ft }"
                />
                <InputError class="mt-2" :message="form.errors.design_depth_ft" />
            </div>

            <!-- Freeboard (FT) -->
            <div>
                <InputLabel for="freeboard_ft" value="Freeboard (FT)" />
                <TextInput
                    id="freeboard_ft"
                    v-model="form.freeboard_ft"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.freeboard_ft }"
                />
                <InputError class="mt-2" :message="form.errors.freeboard_ft" />
            </div>

            <!-- Velocity (FT/S) -->
            <div>
                <InputLabel for="velocity_ft_per_sec" value="Velocity (FT/S)" />
                <TextInput
                    id="velocity_ft_per_sec"
                    v-model="form.velocity_ft_per_sec"
                    type="number"
                    step="0.01"
                    class="mt-1 block w-full"
                    :class="{ 'border-red-500': form.errors.velocity_ft_per_sec }"
                />
                <InputError class="mt-2" :message="form.errors.velocity_ft_per_sec" />
            </div>

            <!-- Domestic Units -->
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

            <!-- Commercial Units -->
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

            <!-- Estimated Cost -->
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

            <!-- Per KW Cost -->
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

            <!-- Total Households (HH) -->
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

            <!-- Average HH Size -->
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

            <!-- Cost Per Capita -->
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

            <!-- Tentative Completion Date -->
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

            <!-- Financial Initiation Date -->
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

            <!-- Physical Completion Date -->
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
                {{ isEditMode ? 'Update Site' : 'Create Site' }}
            </PrimaryButton>
        </div>
    </form>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

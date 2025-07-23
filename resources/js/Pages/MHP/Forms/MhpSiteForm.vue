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

const props = defineProps({
    site: {
        type: Object,
        default: null, // Null for create mode, object for edit mode
    },
});

const emit = defineEmits(['success', 'cancel']);

const page = usePage();

// --- Tab State ---
const activeTab = ref('general'); // Default active tab

const tabs = [
    { id: 'general', name: 'General & CBO' },
    { id: 'design_technical', name: 'Design & Technical' },
    { id: 'physical_components', name: 'Physical Components' },
    { id: 'financial_demographics', name: 'Financials & Demographics' },
    { id: 'remarks_attachments', name: 'Remarks & Attachments' },
];

// Function to move to the next tab
const nextTab = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab.value);
    if (currentIndex < tabs.length - 1) {
        activeTab.value = tabs[currentIndex + 1].id;
    }
};

// Function to move to the previous tab
const prevTab = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab.value);
    if (currentIndex > 0) {
        activeTab.value = tabs[currentIndex - 1].id;
    }
};

// --- Form State ---
const form = useForm({
    cbo_id: null,
    month_year_establishment: null,
    established_by: '',
    population: null,
    grid_status: 'Off-Grid',
    status: 'New',
    existing_capacity_kw: null,
    planned_capacity_kw: null,
    head_ft: null,
    design_discharge_cusecs: null,
    channel_length_km: null,
    tl_ht_km: null,
    tl_lt_km: null,
    turbine_type: '',
    alternator_type: '',
    accessible: '',
    domestic_units: null,
    commercial_units: null,
    estimated_cost: null,
    per_kw_cost: null,
    total_hh: null,
    avg_hh_size: null,
    cost_per_capita: null,
    tentative_completion_date: null,
    financial_initiation_date: null,
    physical_completion_date: null,
    remarks: '',

    // --- NEW FIELDS ---
    observed_discharge: null,
    intake_details: '',
    settling_basin_details: '',
    approach_culvert_details: '',
    headrace_channel_details: '',
    aqueduct_details: '',
    tailrace_details: '',
    spillway_details: '',
    retaining_walls_details: '',
    design_net_head: null,
    proposed_capacity_kw: null,
    length_ft: null,
    bottom_width_ft: null,
    design_depth_ft: null,
    freeboard_ft: null,
    velocity_ft_per_sec: null,
    // --- END NEW FIELDS ---

    attachments: [],
    attachments_to_delete: [],
});

const isEditMode = ref(!!props.site);
const existingAttachments = ref([]); // Initialized as empty array, filled by watch

// Options for select inputs
const gridStatusOptions = ['On-Grid', 'Off-Grid', 'Partially on-Grid'];
const siteStatusOptions = ['New', 'Rehabilitation', 'Upgradation'];
const accessibleOptions = ['Yes', 'No'];

const handleAttachmentsToDelete = (id) => {
    console.log('Request to delete attachment ID:', id);
    form.attachments_to_delete.push(id);
    existingAttachments.value = existingAttachments.value.filter(att => att.id !== id);
};

const handleSubmit = () => {
    console.log('--- MhpSiteForm: handleSubmit triggered ---');
    console.log('Form data before POST (from form.data()):', form.data());
    console.log('Attachments array before POST (from form.attachments ref):', form.attachments);

    const url = isEditMode.value
        ? route('mhp.sites.update', props.site.id)
        : route('mhp.sites.store');

    form.transform((data) => {
        console.log('MhpSiteForm: data inside transform (before _method):', data);
        if (isEditMode.value) {
            data._method = 'put';
        }
        return data;
    }).post(url, {
        onSuccess: () => {
            console.log('MhpSiteForm: onSuccess callback. Resetting form for next entry/close.');
            form.reset();
            existingAttachments.value = [];
            form.attachments_to_delete = [];
            emit('success', isEditMode.value ? 'MHP Site updated successfully!' : 'MHP Site created successfully!');
        },
        onError: (errors) => {
            console.error('MhpSiteForm: onError callback. Form errors:', errors);
        },
        preserveScroll: true,
        preserveState: true,
    });
};

const handleCancel = () => {
    console.log('MhpSiteForm: Cancel clicked. Resetting form.');
    form.reset();
    existingAttachments.value = [];
    form.attachments_to_delete = [];
    emit('cancel');
};

// REVISED WATCH FOR PROPS.SITE (to handle new fields)
watch(() => props.site, (newSite) => {
    console.log('MhpSiteForm: props.site watcher triggered. New site:', newSite);
    if (newSite) {
        isEditMode.value = true;
        form.fill({ // Use form.fill for convenience
            cbo_id: newSite.cbo_id,
            month_year_establishment: newSite.month_year_establishment,
            established_by: newSite.established_by,
            population: newSite.population,
            grid_status: newSite.grid_status,
            status: newSite.status,
            existing_capacity_kw: newSite.existing_capacity_kw,
            planned_capacity_kw: newSite.planned_capacity_kw,
            head_ft: newSite.head_ft,
            design_discharge_cusecs: newSite.design_discharge_cusecs,
            channel_length_km: newSite.channel_length_km,
            tl_ht_km: newSite.tl_ht_km,
            tl_lt_km: newSite.tl_lt_km,
            turbine_type: newSite.turbine_type,
            alternator_type: newSite.alternator_type,
            accessible: newSite.accessible,
            domestic_units: newSite.domestic_units,
            commercial_units: newSite.commercial_units,
            estimated_cost: newSite.estimated_cost,
            per_kw_cost: newSite.per_kw_cost,
            total_hh: newSite.total_hh,
            avg_hh_size: newSite.avg_hh_size,
            cost_per_capita: newSite.cost_per_capita,
            tentative_completion_date: newSite.tentative_completion_date,
            financial_initiation_date: newSite.financial_initiation_date,
            physical_completion_date: newSite.physical_completion_date,
            remarks: newSite.remarks,

            // --- FILL NEW FIELDS ---
            observed_discharge: newSite.observed_discharge,
            intake_details: newSite.intake_details,
            settling_basin_details: newSite.settling_basin_details,
            approach_culvert_details: newSite.approach_culvert_details,
            headrace_channel_details: newSite.headrace_channel_details,
            aqueduct_details: newSite.aqueduct_details,
            tailrace_details: newSite.tailrace_details,
            spillway_details: newSite.spillway_details,
            retaining_walls_details: newSite.retaining_walls_details,
            design_net_head: newSite.design_net_head,
            proposed_capacity_kw: newSite.proposed_capacity_kw,
            length_ft: newSite.length_ft,
            bottom_width_ft: newSite.bottom_width_ft,
            design_depth_ft: newSite.design_depth_ft,
            freeboard_ft: newSite.freeboard_ft,
            velocity_ft_per_sec: newSite.velocity_ft_per_sec,
            // --- END FILL NEW FIELDS ---

            attachments: [], // Clear any newly added files from previous interaction
            attachments_to_delete: [], // Reset attachments to delete for new edit session
        });
        existingAttachments.value = newSite.attachments_frontend; // Populate existing attachments
        form.clearErrors();
        console.log('MhpSiteForm: Edit mode - form and attachments initialized.');
    } else {
        // Create Mode: Reset form to initial empty state
        isEditMode.value = false;
        form.reset(); // Correctly resets form.attachments to []
        existingAttachments.value = []; // Ensure this is empty for new creation
        form.attachments_to_delete = [];
        form.attachments = []; // Ensure new attachments array is fresh
        form.clearErrors();
        console.log('MhpSiteForm: Create mode - form reset.');
    }
}, { immediate: true });

onMounted(() => {
    console.log('MhpSiteForm: Mounted. Initial form.attachments:', form.attachments);
    if (!isEditMode.value && props.site === null) {
        form.reset(); // Ensure form is truly reset on first mount for new forms
        existingAttachments.value = [];
        form.attachments_to_delete = [];
        form.attachments = [];
    }
});
</script>

<template>
    <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                    v-for="tab in tabs"
                    :key="tab.id"
                    @click="activeTab = tab.id"
                    :class="[
                        activeTab === tab.id
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                        'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                    ]"
                    :aria-current="activeTab === tab.id ? 'page' : undefined"
                    type="button"
                >
                    {{ tab.name }}
                </button>
            </nav>
        </div>

        <div class="mt-6">
            <div v-if="activeTab === 'general'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        :class="{ 'border-red-500': form.errors.established_by }"
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
            </div>

            <div v-if="activeTab === 'design_technical'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <div>
                    <InputLabel for="turbine_type" value="Type of Turbine" />
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
                    <InputLabel for="alternator_type" value="Type of Alternator" />
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
            </div>

            <div v-if="activeTab === 'physical_components'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <div class="md:col-span-2">
                    <InputLabel for="intake_details" value="Intake Details" />
                    <TextArea
                        id="intake_details"
                        v-model="form.intake_details"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.intake_details }"
                    />
                    <InputError class="mt-2" :message="form.errors.intake_details" />
                </div>
                <div class="md:col-span-2">
                    <InputLabel for="settling_basin_details" value="Settling Basin Details" />
                    <TextArea
                        id="settling_basin_details"
                        v-model="form.settling_basin_details"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.settling_basin_details }"
                    />
                    <InputError class="mt-2" :message="form.errors.settling_basin_details" />
                </div>
                <div class="md:col-span-2">
                    <InputLabel for="approach_culvert_details" value="Approach Culvert Details" />
                    <TextArea
                        id="approach_culvert_details"
                        v-model="form.approach_culvert_details"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.approach_culvert_details }"
                    />
                    <InputError class="mt-2" :message="form.errors.approach_culvert_details" />
                </div>
                <div class="md:col-span-2">
                    <InputLabel for="headrace_channel_details" value="Headrace Channel Details" />
                    <TextArea
                        id="headrace_channel_details"
                        v-model="form.headrace_channel_details"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.headrace_channel_details }"
                    />
                    <InputError class="mt-2" :message="form.errors.headrace_channel_details" />
                </div>
                <div class="md:col-span-2">
                    <InputLabel for="aqueduct_details" value="Aqueduct Details" />
                    <TextArea
                        id="aqueduct_details"
                        v-model="form.aqueduct_details"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.aqueduct_details }"
                    />
                    <InputError class="mt-2" :message="form.errors.aqueduct_details" />
                </div>
                <div class="md:col-span-2">
                    <InputLabel for="tailrace_details" value="Tailrace Details" />
                    <TextArea
                        id="tailrace_details"
                        v-model="form.tailrace_details"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.tailrace_details }"
                    />
                    <InputError class="mt-2" :message="form.errors.tailrace_details" />
                </div>
                <div class="md:col-span-2">
                    <InputLabel for="spillway_details" value="Spillway Details" />
                    <TextArea
                        id="spillway_details"
                        v-model="form.spillway_details"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.spillway_details }"
                    />
                    <InputError class="mt-2" :message="form.errors.spillway_details" />
                </div>
                <div class="md:col-span-2">
                    <InputLabel for="retaining_walls_details" value="Retaining Walls Details" />
                    <TextArea
                        id="retaining_walls_details"
                        v-model="form.retaining_walls_details"
                        class="mt-1 block w-full"
                        :class="{ 'border-red-500': form.errors.retaining_walls_details }"
                    />
                    <InputError class="mt-2" :message="form.errors.retaining_walls_details" />
                </div>
            </div>

            <div v-if="activeTab === 'financial_demographics'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

            <div v-if="activeTab === 'remarks_attachments'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div class="md:col-span-2">
                    <InputLabel value="Attachments" />
                    <AttachmentUploader
                        v-model="form.attachments"
                        :existing-attachments="existingAttachments"
                        @remove-existing="handleAttachmentsToDelete"
                        :error-message="form.errors.attachments"
                    />
                    <InputError class="mt-2" :message="form.errors.attachments" />
                </div>
            </div>
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
/* Scoped styles for the tab navigation, etc. */
/* No specific scoped styles needed here, as styling is handled by child components or global Tailwind */
</style>

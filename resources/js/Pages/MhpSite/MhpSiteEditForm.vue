<script setup>
import { useForm, router } from '@inertiajs/vue3';
import { ref, watch } from 'vue';
import SearchableCboSelect from '@/Components/SearchableCboSelect.vue';
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';
import DatePicker from '@/Components/DatePicker.vue';

const props = defineProps({
    site: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['success', 'cancel']);

const statuses = ['New', 'Rehab', 'Upgradation', 'Completed'];
const grid_status_options = ['On-Grid', 'Off-Grid', 'Partially on-Grid'];
const accessible_values = ['YES', 'NO'];

const form = useForm({
    _method: 'PUT',
    cbo_id: props.site.cbo_id,
    population: props.site.population ?? null,
    grid_status: props.site.grid_status ?? '',
    status: props.site.status ?? '',
    existing_capacity_kw: props.site.existing_capacity_kw ?? null,
    planned_capacity_kw: props.site.planned_capacity_kw ?? null,
    head_ft: props.site.head_ft ?? null,
    design_discharge_cusecs: props.site.design_discharge_cusecs ?? null,
    channel_length_km: props.site.channel_length_km ?? null,
    tl_ht_km: props.site.tl_ht_km ?? null,
    tl_lt_km: props.site.tl_lt_km ?? null,
    transformers: props.site.transformers ?? null,
    turbine_type: props.site.turbine_type ?? '',
    alternator_type: props.site.alternator_type ?? '',
    accessible: props.site.accessible ?? '',
    domestic_units: props.site.domestic_units ?? null,
    commercial_units: props.site.commercial_units ?? null,
    estimated_cost: props.site.estimated_cost ?? null,
    per_kw_cost: props.site.per_kw_cost ?? null,
    total_hh: props.site.total_hh ?? null,
    avg_hh_size: props.site.avg_hh_size ?? null,
    cost_per_capita: props.site.cost_per_capita ?? null,
    tentative_completion_date: props.site.tentative_completion_date || null,
    established_by: props.site.established_by ?? '',
    month_year_establishment: props.site.month_year_establishment || null,

    // Removed direct attachment refs here, as they are handled below as separate refs
    // and then manually appended to FormData.
    // form.attachments and form.removed_attachments are not directly used in the v-model.
});

// CRITICAL FIX: Define refs for AttachmentUploader's v-model and :existing
const newAttachments = ref([]); // This ref will capture the files from AttachmentUploader's v-model
const existingAttachments = ref(props.site.attachments || []); // This populates the :existing prop
const removedAttachmentsIds = ref([]); // NEW: Ref to track IDs of removed attachments

// Watch for 'site' prop changes (if modal is reused for different sites)
watch(
    () => props.site,
    (newSite) => {
        if (newSite) {
            // Re-populate form with new site data
            form.cbo_id = newSite.cbo_id;
            form.population = newSite.population ?? null;
            form.grid_status = newSite.grid_status ?? '';
            form.status = newSite.status ?? '';
            form.existing_capacity_kw = newSite.existing_capacity_kw ?? null;
            form.planned_capacity_kw = newSite.planned_capacity_kw ?? null;
            form.head_ft = newSite.head_ft ?? null;
            form.design_discharge_cusecs = newSite.design_discharge_cusecs ?? null;
            form.channel_length_km = newSite.channel_length_km ?? null;
            form.tl_ht_km = newSite.tl_ht_km ?? null;
            form.tl_lt_km = newSite.tl_lt_km ?? null;
            form.transformers = newSite.transformers ?? null;
            form.turbine_type = newSite.turbine_type ?? '';
            form.alternator_type = newSite.alternator_type ?? '';
            form.accessible = newSite.accessible ?? '';
            form.domestic_units = newSite.domestic_units ?? null;
            form.commercial_units = newSite.commercial_units ?? null;
            form.estimated_cost = newSite.estimated_cost ?? null;
            form.per_kw_cost = newSite.per_kw_cost ?? null;
            form.total_hh = newSite.total_hh ?? null;
            form.avg_hh_size = newSite.avg_hh_size ?? null;
            form.cost_per_capita = newSite.cost_per_capita ?? null;
            form.tentative_completion_date = newSite.tentative_completion_date || null;
            form.established_by = newSite.established_by ?? '';
            form.month_year_establishment = newSite.month_year_establishment || null;

            existingAttachments.value = newSite.attachments || [];
            newAttachments.value = [];
            removedAttachmentsIds.value = []; // Clear removed IDs on new site load
        } else {
            form.reset();
            existingAttachments.value = [];
            newAttachments.value = [];
            removedAttachmentsIds.value = [];
        }
    },
    { immediate: true, deep: true }
);


// CRITICAL FIX: Define handleRemoveExistingAttachment function
const handleRemoveExistingAttachment = (fileId) => {
    removedAttachmentsIds.value.push(fileId);
    existingAttachments.value = existingAttachments.value.filter(f => f.id !== fileId);
};

const submitForm = () => {
    const url = route('mhp.sites.update', props.site.id);

    const formDataPayload = new FormData();

    // Iterate over form's data (which is managed by useForm)
    for (const key in form.data()) {
        const value = form.data()[key];
        formDataPayload.append(key, value === null || value === undefined ? '' : value);
    }

    // Explicitly append _method for PUT/PATCH (should be 'PUT' here)
    formDataPayload.append('_method', 'PUT');

    // Append new attachments (from AttachmentUploader's v-model)
    newAttachments.value.forEach(file => {
        if (file instanceof File) {
            formDataPayload.append('attachments[]', file);
        } else {
            console.warn('MhpSiteEditForm: Skipping invalid new attachment:', file);
        }
    });

    // Append removed attachment IDs
    removedAttachmentsIds.value.forEach(id => { // Use removedAttachmentsIds
        formDataPayload.append('removed_attachments[]', id);
    });

    router.post(url, formDataPayload, {
        onSuccess: () => {
            emit('success', 'MHP Site updated successfully!');
        },
        onError: (errors) => {
            console.error('MHP Site Form Submission Errors:', errors);
        },
    });
};

const cancelForm = () => {
    emit('cancel');
};
</script>

<template>

    <form @submit.prevent="submitForm" class="p-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
            <div class="col-span-full">
                <label class="block text-sm font-medium text-gray-700 mb-1">CBO</label>
                <div class="input-compact bg-gray-100 text-gray-700 font-semibold cursor-not-allowed flex items-center h-[38px] px-3 py-1.5 rounded-lg">
                    {{ site.cbo?.reference_code || 'N/A' }}
                </div>
                <input type="hidden" v-model="form.cbo_id" />
                <div v-if="form.errors.cbo_id" class="text-red-500 text-xs mt-1">{{ form.errors.cbo_id }}</div>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Established By</label>
                <input v-model="form.established_by" type="text" class="input-compact" />
                <div v-if="form.errors.established_by" class="text-red-500 text-xs mt-1">{{ form.errors.established_by }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Establishment Date</label>
                <DatePicker v-model="form.month_year_establishment" id="month_year_establishment" class="input-compact" />
                <div v-if="form.errors.month_year_establishment" class="text-red-500 text-xs mt-1">{{ form.errors.month_year_establishment }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Population</label>
                <input v-model.number="form.population" type="number" class="input-compact" />
                <div v-if="form.errors.population" class="text-red-500 text-xs mt-1">{{ form.errors.population }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select v-model="form.status" class="input-compact">
                    <option value="">-- Select --</option>
                    <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
                </select>
                <div v-if="form.errors.status" class="text-red-500 text-xs mt-1">{{ form.errors.status }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Grid Status</label>
                <select v-model="form.grid_status" class="input-compact">
                    <option value="">-- Select --</option>
                    <option v-for="g in grid_status_options" :key="g" :value="g">{{ g }}</option>
                </select>
                <div v-if="form.errors.grid_status" class="text-red-500 text-xs mt-1">{{ form.errors.grid_status }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Accessible</label>
                <select v-model="form.accessible" class="input-compact">
                    <option value="">-- Select --</option>
                    <option v-for="a in accessible_values" :key="a" :value="a">{{ a }}</option>
                </select>
                <div v-if="form.errors.accessible" class="text-red-500 text-xs mt-1">{{ form.errors.accessible }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tentative Completion Date</label>
                <DatePicker v-model="form.tentative_completion_date" id="tentative_completion_date" class="input-compact" />
                <div v-if="form.errors.tentative_completion_date" class="text-red-500 text-xs mt-1">{{ form.errors.tentative_completion_date }}</div>
            </div>
        </div>

        <hr class="my-6 border-gray-300" />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Existing Capacity (kW)</label>
                <input v-model.number="form.existing_capacity_kw" type="number" step="0.01" class="input-compact" />
                <div v-if="form.errors.existing_capacity_kw" class="text-red-500 text-xs mt-1">{{ form.errors.existing_capacity_kw }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Planned Capacity (kW)</label>
                <input v-model.number="form.planned_capacity_kw" type="number" step="0.01" class="input-compact" />
                <div v-if="form.errors.planned_capacity_kw" class="text-red-500 text-xs mt-1">{{ form.errors.planned_capacity_kw }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Head (ft)</label>
                <input v-model.number="form.head_ft" type="number" step="0.01" class="input-compact" />
                <div v-if="form.errors.head_ft" class="text-red-500 text-xs mt-1">{{ form.errors.head_ft }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Design Discharge (cusecs)</label>
                <input v-model.number="form.design_discharge_cusecs" type="number" step="0.01" class="input-compact" />
                <div v-if="form.errors.design_discharge_cusecs" class="text-red-500 text-xs mt-1">{{ form.errors.design_discharge_cusecs }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Channel Length (km)</label>
                <input v-model.number="form.channel_length_km" type="number" step="0.01" class="input-compact" />
                <div v-if="form.errors.channel_length_km" class="text-red-500 text-xs mt-1">{{ form.errors.channel_length_km }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">TL HT (km)</label>
                <input v-model.number="form.tl_ht_km" type="number" step="0.01" class="input-compact" />
                <div v-if="form.errors.tl_ht_km" class="text-red-500 text-xs mt-1">{{ form.errors.tl_ht_km }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">TL LT (km)</label>
                <input v-model.number="form.tl_lt_km" type="number" step="0.01" class="input-compact" />
                <div v-if="form.errors.tl_lt_km" class="text-red-500 text-xs mt-1">{{ form.errors.tl_lt_km }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Transformers</label>
                <input v-model.number="form.transformers" type="number" class="input-compact" />
                <div v-if="form.errors.transformers" class="text-red-500 text-xs mt-1">{{ form.errors.transformers }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Turbine Type</label>
                <input v-model="form.turbine_type" type="text" class="input-compact" />
                <div v-if="form.errors.turbine_type" class="text-red-500 text-xs mt-1">{{ form.errors.turbine_type }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Alternator Type</label>
                <input v-model="form.alternator_type" type="text" class="input-compact" />
                <div v-if="form.errors.alternator_type" class="text-red-500 text-xs mt-1">{{ form.errors.alternator_type }}</div>
            </div>
        </div>

        <hr class="my-6 border-gray-300" />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Domestic Units</label>
                <input v-model.number="form.domestic_units" type="number" class="input-compact" />
                <div v-if="form.errors.domestic_units" class="text-red-500 text-xs mt-1">{{ form.errors.domestic_units }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Commercial Units</label>
                <input v-model.number="form.commercial_units" type="number" class="input-compact" />
                <div v-if="form.errors.commercial_units" class="text-red-500 text-xs mt-1">{{ form.errors.commercial_units }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Estimated Cost</label>
                <input v-model.number="form.estimated_cost" type="number" step="0.01" class="input-compact" />
                <div v-if="form.errors.estimated_cost" class="text-red-500 text-xs mt-1">{{ form.errors.estimated_cost }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Per kW Cost</label>
                <input v-model.number="form.per_kw_cost" type="number" step="0.01" class="input-compact" />
                <div v-if="form.errors.per_kw_cost" class="text-red-500 text-xs mt-1">{{ form.errors.per_kw_cost }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Total Households</label>
                <input v-model.number="form.total_hh" type="number" class="input-compact" />
                <div v-if="form.errors.total_hh" class="text-red-500 text-xs mt-1">{{ form.errors.total_hh }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Avg Household Size</label>
                <input v-model.number="form.avg_hh_size" type="number" step="0.01" class="input-compact" />
                <div v-if="form.errors.avg_hh_size" class="text-red-500 text-xs mt-1">{{ form.errors.avg_hh_size }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Cost Per Capita</label>
                <input v-model.number="form.cost_per_capita" type="number" step="0.01" class="input-compact" />
                <div v-if="form.errors.cost_per_capita" class="text-red-500 text-xs mt-1">{{ form.errors.cost_per_capita }}</div>
            </div>
        </div>

        <hr class="my-6 border-gray-300" />

        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">📎 Attach Files</label>
            <AttachmentUploader
                v-model="newAttachments"
                label="New Attachments"
                :existing="existingAttachments"
                @removeExisting="handleRemoveExistingAttachment"
            />
            <div v-if="form.errors['attachments.0']" class="text-red-500 text-xs mt-1">{{ form.errors['attachments.0'] }}</div>
        </div>

        <div class="flex justify-end mt-4 space-x-2">
            <button type="button" @click="cancelForm" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Save Changes
            </button>
        </div>
    </form>
</template>

<style scoped>
.input-compact {
    @apply appearance-none block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm;
}
label {
    margin-bottom: 0.25rem;
}
</style>

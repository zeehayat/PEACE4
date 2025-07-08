<script setup>
import { useForm, router } from '@inertiajs/vue3'
import { watch, ref, computed } from 'vue' // Added computed
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue'
import SearchableCboSelect from '@/Components/SearchableCboSelect.vue'
import DatePicker from '@/Components/DatePicker.vue'

const props = defineProps({
    mhpSite: Object, // Will be null for create, object for edit
    mode: {
        type: String,
        default: 'create' // 'create' or 'edit'
    }
})

const emit = defineEmits(['saved', 'cancel'])

const form = useForm({
    _method: props.mode === 'edit' ? 'PUT' : 'POST',
    cbo_id: props.mhpSite?.cbo_id || '',
    population: props.mhpSite?.population || '',
    grid_status: props.mhpSite?.grid_status || 'On-Grid',
    status: props.mhpSite?.status || 'New',
    existing_capacity_kw: props.mhpSite?.existing_capacity_kw || '',
    planned_capacity_kw: props.mhpSite?.planned_capacity_kw || '',
    head_ft: props.mhpSite?.head_ft || '',
    design_discharge_cusecs: props.mhpSite?.design_discharge_cusecs || '',
    channel_length_km: props.mhpSite?.channel_length_km || '',
    tl_ht_km: props.mhpSite?.tl_ht_km || '',
    tl_lt_km: props.mhpSite?.tl_lt_km || '',
    transformers: props.mhpSite?.transformers || '',
    turbine_type: props.mhpSite?.turbine_type || '',
    alternator_type: props.mhpSite?.alternator_type || '',
    accessible: props.mhpSite?.accessible || 'YES',
    domestic_units: props.mhpSite?.domestic_units || '',
    commercial_units: props.mhpSite?.commercial_units || '',
    estimated_cost: props.mhpSite?.estimated_cost || '',
    per_kw_cost: props.mhpSite?.per_kw_cost || '',
    total_hh: props.mhpSite?.total_hh || '',
    avg_hh_size: props.mhpSite?.avg_hh_size || '',
    cost_per_capita: props.mhpSite?.cost_per_capita || '',
    tentative_completion_date: props.mhpSite?.tentative_completion_date || '',
    month_year_establishment: props.mhpSite?.month_year_establishment || '',
    established_by: props.mhpSite?.established_by || '',
})

const newAttachments = ref([])
const existingAttachments = ref(props.mhpSite?.attachments || [])
const attachmentsToRemove = ref([])

// Define tabs and their corresponding fields
const tabs = ref([
    { id: 'general', name: 'General Info', fields: ['cbo_id', 'population', 'grid_status', 'status', 'accessible'] },
    { id: 'capacity', name: 'Capacity & Hydro', fields: ['existing_capacity_kw', 'planned_capacity_kw', 'head_ft', 'design_discharge_cusecs', 'channel_length_km'] },
    { id: 'tnd', name: 'T&D', fields: ['tl_ht_km', 'tl_lt_km', 'transformers', 'turbine_type', 'alternator_type'] },
    { id: 'costing', name: 'Units & Costing', fields: ['domestic_units', 'commercial_units', 'estimated_cost', 'per_kw_cost', 'total_hh', 'avg_hh_size', 'cost_per_capita'] },
    { id: 'dates', name: 'Dates & Est.', fields: ['tentative_completion_date', 'month_year_establishment', 'established_by'] },
    { id: 'attachments', name: 'Attachments', fields: [] }, // Attachments handled separately
]);

const activeTab = ref('general'); // Default active tab

// Watch for mhpSite prop changes in edit mode to reset form
watch(
    () => props.mhpSite,
    (newSite) => {
        if (newSite && props.mode === 'edit') {
            form.cbo_id = newSite.cbo_id
            form.population = newSite.population
            form.grid_status = newSite.grid_status
            form.status = newSite.status
            form.existing_capacity_kw = newSite.existing_capacity_kw
            form.planned_capacity_kw = newSite.planned_capacity_kw
            form.head_ft = newSite.head_ft
            form.design_discharge_cusecs = newSite.design_discharge_cusecs
            form.channel_length_km = newSite.channel_length_km
            form.tl_ht_km = newSite.tl_ht_km
            form.tl_lt_km = newSite.tl_lt_km
            form.transformers = newSite.transformers
            form.turbine_type = newSite.turbine_type
            form.alternator_type = newSite.alternator_type
            form.accessible = newSite.accessible
            form.domestic_units = newSite.domestic_units
            form.commercial_units = newSite.commercial_units
            form.estimated_cost = newSite.estimated_cost
            form.per_kw_cost = newSite.per_kw_cost
            form.total_hh = newSite.total_hh
            form.avg_hh_size = newSite.avg_hh_size
            form.cost_per_capita = newSite.cost_per_capita
            form.tentative_completion_date = newSite.tentative_completion_date
            form.month_year_establishment = newSite.month_year_establishment
            form.established_by = newSite.established_by
            existingAttachments.value = newSite.attachments || []
        } else if (props.mode === 'create') {
            form.reset()
            existingAttachments.value = []
        }
        newAttachments.value = []
        attachmentsToRemove.value = []
        activeTab.value = 'general'; // Reset to first tab on form reset
    },
    { immediate: true }
)

const removeExisting = (file) => {
    attachmentsToRemove.value.push(file.id)
    existingAttachments.value = existingAttachments.value.filter(f => f.id !== file.id)
}

const submit = () => {
    const data = new FormData()
    Object.entries(form.data()).forEach(([key, val]) => {
        if (typeof val === 'number' || (typeof val === 'string' && val.match(/^\d+(\.\d+)?$/))) {
            data.append(key, val);
        } else {
            data.append(key, val ?? '');
        }
    })

    newAttachments.value.forEach(file => {
        data.append('attachments[]', file)
    })
    attachmentsToRemove.value.forEach(id => {
        data.append('removed_attachments[]', id)
    })

    const url = props.mode === 'create'
        ? '/mhp/mhp-sites'
        : `/mhp/mhp-sites/${props.mhpSite.id}`

    router.post(url, data, {
        forceFormData: true,
        onSuccess: () => {
            emit('saved', `MHP Site ${props.mode === 'create' ? 'created' : 'updated'} successfully.`)
            form.reset()
        },
        onError: (errors) => {
            console.error('Form Errors:', errors)
            // If there are errors, automatically switch to the tab that has the first error
            const firstErrorField = Object.keys(errors)[0];
            if (firstErrorField) {
                const tabWithErrors = tabs.value.find(tab => tab.fields.includes(firstErrorField));
                if (tabWithErrors) {
                    activeTab.value = tabWithErrors.id;
                } else if (firstErrorField.startsWith('attachments')) {
                    activeTab.value = 'attachments';
                }
            }
        }
    })
}

// Function to get the current tab's fields (not directly used in template, but useful for logic)
const currentTabFields = computed(() => {
    const tab = tabs.value.find(t => t.id === activeTab.value);
    return tab ? tab.fields : [];
});
</script>

<template>
    <form @submit.prevent="submit" class="p-0">
        <div class="flex border-b border-gray-200">
            <button
                v-for="tab in tabs"
                :key="tab.id"
                @click.prevent="activeTab = tab.id"
                :class="[
                    'py-2 px-4 text-sm font-medium focus:outline-none',
                    activeTab === tab.id
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
            >
                {{ tab.name }}
            </button>
        </div>

        <div class="p-4 space-y-4"> <div v-if="activeTab === 'general'" class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
            <div class="col-span-full">
                <label for="cbo_id" class="block text-sm font-medium text-gray-700 mb-1">CBO</label>
                <SearchableCboSelect v-model:selected-cbo-id="form.cbo_id" :initial-cbo-id="form.cbo_id" class="input-compact" />
                <div v-if="form.errors.cbo_id" class="text-red-500 text-xs mt-1">{{ form.errors.cbo_id }}</div>
            </div>

            <div>
                <label for="population" class="block text-sm font-medium text-gray-700 mb-1">Population</label>
                <input type="number" id="population" v-model="form.population" class="input-compact" />
                <div v-if="form.errors.population" class="text-red-500 text-xs mt-1">{{ form.errors.population }}</div>
            </div>

            <div>
                <label for="grid_status" class="block text-sm font-medium text-gray-700 mb-1">Grid Status</label>
                <select id="grid_status" v-model="form.grid_status" class="input-compact">
                    <option value="On-Grid">On-Grid</option>
                    <option value="Off-Grid">Off-Grid</option>
                    <option value="Partially on-Grid">Partially on-Grid</option>
                </select>
                <div v-if="form.errors.grid_status" class="text-red-500 text-xs mt-1">{{ form.errors.grid_status }}</div>
            </div>

            <div>
                <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select id="status" v-model="form.status" class="input-compact">
                    <option value="New">New</option>
                    <option value="Rehabilitation">Rehabilitation</option>
                    <option value="Upgradation">Upgradation</option>
                </select>
                <div v-if="form.errors.status" class="text-red-500 text-xs mt-1">{{ form.errors.status }}</div>
            </div>

            <div>
                <label for="accessible" class="block text-sm font-medium text-gray-700 mb-1">Accessible</label>
                <select id="accessible" v-model="form.accessible" class="input-compact">
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                </select>
                <div v-if="form.errors.accessible" class="text-red-500 text-xs mt-1">{{ form.errors.accessible }}</div>
            </div>
        </div>

            <div v-else-if="activeTab === 'capacity'" class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                <div>
                    <label for="existing_capacity_kw" class="block text-sm font-medium text-gray-700 mb-1">Existing Capacity (kW)</label>
                    <input type="number" step="0.01" id="existing_capacity_kw" v-model="form.existing_capacity_kw" class="input-compact" />
                    <div v-if="form.errors.existing_capacity_kw" class="text-red-500 text-xs mt-1">{{ form.errors.existing_capacity_kw }}</div>
                </div>

                <div>
                    <label for="planned_capacity_kw" class="block text-sm font-medium text-gray-700 mb-1">Planned Capacity (kW)</label>
                    <input type="number" step="0.01" id="planned_capacity_kw" v-model="form.planned_capacity_kw" class="input-compact" />
                    <div v-if="form.errors.planned_capacity_kw" class="text-red-500 text-xs mt-1">{{ form.errors.planned_capacity_kw }}</div>
                </div>

                <div>
                    <label for="head_ft" class="block text-sm font-medium text-gray-700 mb-1">Head (ft)</label>
                    <input type="number" step="0.01" id="head_ft" v-model="form.head_ft" class="input-compact" />
                    <div v-if="form.errors.head_ft" class="text-red-500 text-xs mt-1">{{ form.errors.head_ft }}</div>
                </div>

                <div>
                    <label for="design_discharge_cusecs" class="block text-sm font-medium text-gray-700 mb-1">Design Discharge (Cusecs)</label>
                    <input type="number" step="0.01" id="design_discharge_cusecs" v-model="form.design_discharge_cusecs" class="input-compact" />
                    <div v-if="form.errors.design_discharge_cusecs" class="text-red-500 text-xs mt-1">{{ form.errors.design_discharge_cusecs }}</div>
                </div>

                <div>
                    <label for="channel_length_km" class="block text-sm font-medium text-gray-700 mb-1">Channel Length (km)</label>
                    <input type="number" step="0.01" id="channel_length_km" v-model="form.channel_length_km" class="input-compact" />
                    <div v-if="form.errors.channel_length_km" class="text-red-500 text-xs mt-1">{{ form.errors.channel_length_km }}</div>
                </div>
            </div>

            <div v-else-if="activeTab === 'tnd'" class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                <div>
                    <label for="tl_ht_km" class="block text-sm font-medium text-gray-700 mb-1">TL HT (km)</label>
                    <input type="number" step="0.01" id="tl_ht_km" v-model="form.tl_ht_km" class="input-compact" />
                    <div v-if="form.errors.tl_ht_km" class="text-red-500 text-xs mt-1">{{ form.errors.tl_ht_km }}</div>
                </div>

                <div>
                    <label for="tl_lt_km" class="block text-sm font-medium text-gray-700 mb-1">TL LT (km)</label>
                    <input type="number" step="0.01" id="tl_lt_km" v-model="form.tl_lt_km" class="input-compact" />
                    <div v-if="form.errors.tl_lt_km" class="text-red-500 text-xs mt-1">{{ form.errors.tl_lt_km }}</div>
                </div>

                <div>
                    <label for="transformers" class="block text-sm font-medium text-gray-700 mb-1">Transformers</label>
                    <input type="number" id="transformers" v-model="form.transformers" class="input-compact" />
                    <div v-if="form.errors.transformers" class="text-red-500 text-xs mt-1">{{ form.errors.transformers }}</div>
                </div>

                <div>
                    <label for="turbine_type" class="block text-sm font-medium text-gray-700 mb-1">Turbine Type</label>
                    <input type="text" id="turbine_type" v-model="form.turbine_type" class="input-compact" />
                    <div v-if="form.errors.turbine_type" class="text-red-500 text-xs mt-1">{{ form.errors.turbine_type }}</div>
                </div>

                <div>
                    <label for="alternator_type" class="block text-sm font-medium text-gray-700 mb-1">Alternator Type</label>
                    <input type="text" id="alternator_type" v-model="form.alternator_type" class="input-compact" />
                    <div v-if="form.errors.alternator_type" class="text-red-500 text-xs mt-1">{{ form.errors.alternator_type }}</div>
                </div>
            </div>

            <div v-else-if="activeTab === 'costing'" class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                <div>
                    <label for="domestic_units" class="block text-sm font-medium text-gray-700 mb-1">Domestic Units</label>
                    <input type="number" id="domestic_units" v-model="form.domestic_units" class="input-compact" />
                    <div v-if="form.errors.domestic_units" class="text-red-500 text-xs mt-1">{{ form.errors.domestic_units }}</div>
                </div>

                <div>
                    <label for="commercial_units" class="block text-sm font-medium text-gray-700 mb-1">Commercial Units</label>
                    <input type="number" id="commercial_units" v-model="form.commercial_units" class="input-compact" />
                    <div v-if="form.errors.commercial_units" class="text-red-500 text-xs mt-1">{{ form.errors.commercial_units }}</div>
                </div>

                <div>
                    <label for="estimated_cost" class="block text-sm font-medium text-gray-700 mb-1">Estimated Cost</label>
                    <input type="number" step="0.01" id="estimated_cost" v-model="form.estimated_cost" class="input-compact" />
                    <div v-if="form.errors.estimated_cost" class="text-red-500 text-xs mt-1">{{ form.errors.estimated_cost }}</div>
                </div>

                <div>
                    <label for="per_kw_cost" class="block text-sm font-medium text-gray-700 mb-1">Per kW Cost</label>
                    <input type="number" step="0.01" id="per_kw_cost" v-model="form.per_kw_cost" class="input-compact" />
                    <div v-if="form.errors.per_kw_cost" class="text-red-500 text-xs mt-1">{{ form.errors.per_kw_cost }}</div>
                </div>

                <div>
                    <label for="total_hh" class="block text-sm font-medium text-gray-700 mb-1">Total Households</label>
                    <input type="number" id="total_hh" v-model="form.total_hh" class="input-compact" />
                    <div v-if="form.errors.total_hh" class="text-red-500 text-xs mt-1">{{ form.errors.total_hh }}</div>
                </div>

                <div>
                    <label for="avg_hh_size" class="block text-sm font-medium text-gray-700 mb-1">Average Household Size</label>
                    <input type="number" step="0.01" id="avg_hh_size" v-model="form.avg_hh_size" class="input-compact" />
                    <div v-if="form.errors.avg_hh_size" class="text-red-500 text-xs mt-1">{{ form.errors.avg_hh_size }}</div>
                </div>

                <div>
                    <label for="cost_per_capita" class="block text-sm font-medium text-gray-700 mb-1">Cost per Capita</label>
                    <input type="number" step="0.01" id="cost_per_capita" v-model="form.cost_per_capita" class="input-compact" />
                    <div v-if="form.errors.cost_per_capita" class="text-red-500 text-xs mt-1">{{ form.errors.cost_per_capita }}</div>
                </div>
            </div>

            <div v-else-if="activeTab === 'dates'" class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                <div>
                    <label for="tentative_completion_date" class="block text-sm font-medium text-gray-700 mb-1">Tentative Completion Date</label>
                    <DatePicker v-model="form.tentative_completion_date" id="tentative_completion_date" class="input-compact" />
                    <div v-if="form.errors.tentative_completion_date" class="text-red-500 text-xs mt-1">{{ form.errors.tentative_completion_date }}</div>
                </div>

                <div>
                    <label for="month_year_establishment" class="block text-sm font-medium text-gray-700 mb-1">Month/Year of Establishment</label>
                    <DatePicker v-model="form.month_year_establishment" id="month_year_establishment" class="input-compact" />
                    <div v-if="form.errors.month_year_establishment" class="text-red-500 text-xs mt-1">{{ form.errors.month_year_establishment }}</div>
                </div>

                <div>
                    <label for="established_by" class="block text-sm font-medium text-gray-700 mb-1">Established By</label>
                    <input type="text" id="established_by" v-model="form.established_by" class="input-compact" />
                    <div v-if="form.errors.established_by" class="text-red-500 text-xs mt-1">{{ form.errors.established_by }}</div>
                </div>
            </div>

            <div v-else-if="activeTab === 'attachments'">
                <AttachmentUploader
                    v-model="newAttachments"
                    :existing="existingAttachments"
                    @removeExisting="removeExisting"
                    label="Site Attachments"
                />
                <div v-if="form.errors['attachments.0']" class="text-red-500 text-xs mt-1">{{ form.errors['attachments.0'] }}</div>
            </div>
        </div>

        <div class="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
            <button type="button" @click="emit('cancel')" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancel
            </button>
            <button type="submit" :disabled="form.processing" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {{ form.processing ? 'Saving...' : (mode === 'create' ? 'Create Site' : 'Update Site') }}
            </button>
        </div>
    </form>
</template>

<style scoped>
/* New input-compact class for tighter vertical spacing */
.input-compact {
    @apply appearance-none block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm;
}
/* Reduce default margin-bottom on labels if not already minimal */
label {
    margin-bottom: 0.25rem; /* Equivalent to mb-1, or reduce to 0 if desired */
}
</style>

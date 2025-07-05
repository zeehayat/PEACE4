<script setup>
import { ref, watch } from 'vue'
import { router } from '@inertiajs/vue3'
import SearchableCboSelect from '@/Components/SearchableCboSelect.vue'
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue'

const props = defineProps({
    show: Boolean,
    site: Object,
})

const emit = defineEmits(['close', 'updated'])

const form = ref({})
const attachments = ref([])

const statuses = ['New', 'Rehab', 'Upgradation']
const grid_status = ['On-Grid', 'Off-Grid', 'Partially on-Grid']
const accessible_values = ['YES', 'NO']

watch(
    () => props.site,
    (site) => {
        if (site) {
            form.value = {
                cbo_id: site.cbo_id ?? '',
                population: site.population ?? '',
                grid_status: site.grid_status ?? '',
                status: site.status ?? '',
                existing_capacity_kw: site.existing_capacity_kw ?? '',
                planned_capacity_kw: site.planned_capacity_kw ?? '',
                head_ft: site.head_ft ?? '',
                design_discharge_cusecs: site.design_discharge_cusecs ?? '',
                channel_length_km: site.channel_length_km ?? '',
                tl_ht_km: site.tl_ht_km ?? '',
                tl_lt_km: site.tl_lt_km ?? '',
                transformers: site.transformers ?? '',
                turbine_type: site.turbine_type ?? '',
                alternator_type: site.alternator_type ?? '',
                accessible: site.accessible ?? '',
                domestic_units: site.domestic_units ?? '',
                commercial_units: site.commercial_units ?? '',
                estimated_cost: site.estimated_cost ?? '',
                per_kw_cost: site.per_kw_cost ?? '',
                total_hh: site.total_hh ?? '',
                avg_hh_size: site.avg_hh_size ?? '',
                cost_per_capita: site.cost_per_capita ?? '',
                tentative_completion_date: site.tentative_completion_date ?? '',
                established_by: site.established_by ?? '',
                month_year_establishment: site.month_year_establishment ?? '',
            }
        }
    },
    { immediate: true }
)

const submit = () => {
    if (!props.site?.id) return

    const payload = new FormData()  // define it here

    Object.entries(form.value).forEach(([key, val]) => payload.append(key, val ?? ''))

    attachments.value.forEach(file => {
        payload.append('attachments[]', file)
    })
    console.log([...payload.entries()]);
    router.post(`/mhp/mhp-site/${props.site.id}?_method=PUT`, payload, {
        forceFormData: true,
        onSuccess: () => {
            emit('updated', 'MHP site updated successfully.')
            emit('close')
        },
    })
}

</script>

<template>
    <div
        v-if="show"
        class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto p-4"
    >
        <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl max-h-full overflow-y-auto">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold text-blue-700">
                    ✏️ Edit MHP Site Info
                </h2>
                <button
                    @click="emit('close')"
                    class="text-gray-500 hover:text-gray-700 text-lg"
                >
                    ✕
                </button>
            </div>

            <form @submit.prevent="submit" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm">CBO</label>
                        {{ form.cbo_id }}
                    </div>
                    <div>
                        <label class="block text-sm">Established By</label>
                        <input v-model="form.established_by" type="text" class="input" />
                    </div>
                    <div>
                        <label class="block text-sm">Establishment Date</label>
                        <input v-model="form.month_year_establishment" type="date" class="input" />
                    </div>
                    <div>
                        <label class="block text-sm">Population</label>
                        <input v-model="form.population" type="number" class="input" />
                    </div>
                    <div>
                        <label class="block text-sm">Status</label>
                        <select v-model="form.status" class="input">
                            <option value="">-- Select --</option>
                            <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm">Grid Status</label>
                        <select v-model="form.grid_status" class="input">
                            <option value="">-- Select --</option>
                            <option v-for="g in grid_status" :key="g" :value="g">{{ g }}</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm">Accessible</label>
                        <select v-model="form.accessible" class="input">
                            <option value="">-- Select --</option>
                            <option v-for="a in accessible_values" :key="a" :value="a">{{ a }}</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm">Tentative Completion Date</label>
                        <input v-model="form.tentative_completion_date" type="date" class="input" />
                    </div>
                </div>

                <hr />

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-sm">Existing Capacity (kW)</label>
                        <input v-model="form.existing_capacity_kw" type="number" class="input" />
                    </div>
                    <div>
                        <label class="block text-sm">Planned Capacity (kW)</label>
                        <input v-model="form.planned_capacity_kw" type="number" class="input" />
                    </div>
                    <div>
                        <label class="block text-sm">Head (ft)</label>
                        <input v-model="form.head_ft" type="number" class="input" />
                    </div>
                    <div>
                        <label class="block text-sm">Design Discharge (cusecs)</label>
                        <input v-model="form.design_discharge_cusecs" type="number" class="input" />
                    </div>
                    <div>
                        <label class="block text-sm">Channel Length (km)</label>
                        <input v-model="form.channel_length_km" type="number" class="input" />
                    </div>
                    <div>
                        <label class="block text-sm">TL HT (km)</label>
                        <input v-model="form.tl_ht_km" type="number" class="input" />
                    </div>
                    <div>
                        <label class="block text-sm">TL LT (km)</label>
                        <input v-model="form.tl_lt_km" type="number" class="input" />
                    </div>
                    <div>
                        <label class="block text-sm">Transformers</label>
                        <input v-model="form.transformers" type="number" class="input" />
                    </div>
                    <div>
                        <label class="block text-sm">Turbine Type</label>
                        <input v-model="form.turbine_type" type="text" class="input" />
                    </div>
                    <div>
                        <label class="block text-sm">Alternator Type</label>
                        <input v-model="form.alternator_type" type="text" class="input" />
                    </div>
                </div>

                <hr />

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-sm">Domestic Units</label>
                        <input v-model="form.domestic_units" type="number" class="input" />
                    </div>
                    <div>
                        <label class="block text-sm">Commercial Units</label>
                        <input v-model="form.commercial_units" type="number" class="input" />
                    </div>
                    <div>
                        <label class="block text-sm">Estimated Cost</label>
                        <input v-model="form.estimated_cost" type="number" class="input" />
                    </div>
                    <div>
                        <label class="block text-sm">Per kW Cost</label>
                        <input v-model="form.per_kw_cost" type="number" class="input" />
                    </div>
                    <div>
                        <label class="block text-sm">Total Households</label>
                        <input v-model="form.total_hh" type="number" class="input" />
                    </div>
                    <div>
                        <label class="block text-sm">Avg Household Size</label>
                        <input v-model="form.avg_hh_size" type="number" class="input" />
                    </div>
                    <div>
                        <label class="block text-sm">Cost Per Capita</label>
                        <input v-model="form.cost_per_capita" type="number" class="input" />
                    </div>
                </div>

                <hr />

                <div>
                    <label class="block text-sm font-medium">📎 Attach Files</label>
                    <AttachmentUploader v-model="attachments" />
                </div>

                <div class="flex justify-end mt-4 space-x-2">
                    <button type="button" @click="emit('close')" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                        Cancel
                    </button>
                    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.input {
    @apply w-full px-2 py-1 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200;
}
</style>

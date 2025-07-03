<script setup>
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import SearchableCboSelect from '@/Components/SearchableCboSelect.vue' // your existing CBO search
const props = defineProps({
    site: {
        type: Object,
        default: () => ({})
    },
    action: {
        type: String,
        default: 'create' // or 'edit'
    }
})

const form = ref({
    cbo_id: props.site.cbo_id ?? '',
    population: props.site.population ?? '',
    grid_status: props.site.grid_status ?? '',
    status: props.site.status ?? '',
    existing_capacity_kw: props.site.existing_capacity_kw ?? '',
    planned_capacity_kw: props.site.planned_capacity_kw ?? '',
    head_ft: props.site.head_ft ?? '',
    design_discharge_cusecs: props.site.design_discharge_cusecs ?? '',
    channel_length_km: props.site.channel_length_km ?? '',
    tl_ht_km: props.site.tl_ht_km ?? '',
    tl_lt_km: props.site.tl_lt_km ?? '',
    transformers: props.site.transformers ?? '',
    turbine_type: props.site.turbine_type ?? '',
    alternator_type: props.site.alternator_type ?? '',
    accessible: props.site.accessible ?? '',
    domestic_units: props.site.domestic_units ?? '',
    commercial_units: props.site.commercial_units ?? '',
    estimated_cost: props.site.estimated_cost ?? '',
    per_kw_cost: props.site.per_kw_cost ?? '',
    total_hh: props.site.total_hh ?? '',
    avg_hh_size: props.site.avg_hh_size ?? '',
    cost_per_capita: props.site.cost_per_capita ?? ''
})

const statuses = ['New', 'Rehab', 'Upgradation']

const submit = () => {
    if (props.action === 'create') {
        router.post('/mhp-sites', form.value)
    } else {
        router.put(`/mhp-sites/${props.site.id}`, form.value)
    }
}
</script>

<template>
    <form @submit.prevent="submit" class="space-y-6 max-w-3xl mx-auto">
        <!-- CBO -->
        <div>
            <label class="font-bold">CBO</label>
            <SearchableCboSelect v-model="form.cbo_id" />
        </div>

        <!-- Status -->
        <div>
            <label class="font-bold">Status</label>
            <select v-model="form.status" class="input">
                <option disabled value="">Select Status</option>
                <option v-for="s in statuses" :key="s">{{ s }}</option>
            </select>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div>
                <label>Population</label>
                <input v-model="form.population" class="input" type="number" />
            </div>
            <div>
                <label>Grid Status</label>
                <input v-model="form.grid_status" class="input" type="text" />
            </div>
            <div>
                <label>Existing Capacity (kW)</label>
                <input v-model="form.existing_capacity_kw" class="input" type="number" step="0.01" />
            </div>
            <div>
                <label>Planned Capacity (kW)</label>
                <input v-model="form.planned_capacity_kw" class="input" type="number" step="0.01" />
            </div>
            <div>
                <label>Head (ft)</label>
                <input v-model="form.head_ft" class="input" type="number" />
            </div>
            <div>
                <label>Design Discharge (cusecs)</label>
                <input v-model="form.design_discharge_cusecs" class="input" type="number" step="0.01" />
            </div>
            <div>
                <label>Channel Length (km)</label>
                <input v-model="form.channel_length_km" class="input" type="number" step="0.01" />
            </div>
            <div>
                <label>TL HT (km)</label>
                <input v-model="form.tl_ht_km" class="input" type="number" step="0.01" />
            </div>
            <div>
                <label>TL LT (km)</label>
                <input v-model="form.tl_lt_km" class="input" type="number" step="0.01" />
            </div>
            <div>
                <label>Transformers</label>
                <input v-model="form.transformers" class="input" type="number" />
            </div>
            <div>
                <label>Turbine Type</label>
                <input v-model="form.turbine_type" class="input" type="text" />
            </div>
            <div>
                <label>Alternator Type</label>
                <input v-model="form.alternator_type" class="input" type="text" />
            </div>
            <div>
                <label>Accessible</label>
                <input v-model="form.accessible" class="input" type="text" />
            </div>
            <div>
                <label>Domestic Units</label>
                <input v-model="form.domestic_units" class="input" type="number" />
            </div>
            <div>
                <label>Commercial Units</label>
                <input v-model="form.commercial_units" class="input" type="number" />
            </div>
            <div>
                <label>Estimated Cost</label>
                <input v-model="form.estimated_cost" class="input" type="number" step="0.01" />
            </div>
            <div>
                <label>Per kW Cost</label>
                <input v-model="form.per_kw_cost" class="input" type="number" step="0.01" />
            </div>
            <div>
                <label>Total Households</label>
                <input v-model="form.total_hh" class="input" type="number" />
            </div>
            <div>
                <label>Avg. Household Size</label>
                <input v-model="form.avg_hh_size" class="input" type="number" step="0.01" />
            </div>
            <div>
                <label>Cost Per Capita</label>
                <input v-model="form.cost_per_capita" class="input" type="number" step="0.01" />
            </div>
        </div>

        <button type="submit" class="btn btn-primary">
            {{ props.action === 'create' ? 'Create' : 'Update' }}
        </button>
    </form>
</template>

<style scoped>
.input {
    @apply w-full border rounded p-2 mt-1;
}
.btn {
    @apply px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700;
}
</style>

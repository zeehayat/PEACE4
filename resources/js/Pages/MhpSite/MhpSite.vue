<script setup>
import { ref, watch } from 'vue'
import { router } from '@inertiajs/vue3'
import SearchableCboSelect from '@/Components/SearchableCboSelect.vue'
import SideBar from '@/Components/SideBar.vue'
import DatePicker from '@/Components/DatePicker.vue'
//import 'vue-datepicker-next/index.css'
const sidebarRef = ref()
const props = defineProps({
    flash: Object,
    errors: Object,
    site: { type: Object, default: () => ({}) },
    action: { type: String, default: 'create' }
})
const showErrorModal = ref(false)

watch(
    () => props.errors,
    (val) => {
        if (Object.keys(val).length > 0) {
            showErrorModal.value = true
        }
    },
    { immediate: true }
)
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
    cost_per_capita: props.site.cost_per_capita ?? '',
    tentative_completion_date: props.site.tentative_completion_date ?? ''
})


const statuses = ['New', 'Rehab', 'Upgradation']
const grid_status = ['On-Grid', 'Off-Grid', 'Partially on-Grid']
const accessible_values = ['YES', 'NO']

const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

watch(() => props.flash, (val) => {
    if (val.success) {
        toastMessage.value = val.success
        toastType.value = 'success'
        showToast.value = true
        setTimeout(() => (showToast.value = false), 3000)
    } else if (val.error) {
        toastMessage.value = val.error
        toastType.value = 'error'
        showToast.value = true
        setTimeout(() => (showToast.value = false), 3000)
    }
}, { immediate: true })

const submit = () => {
    if (props.action === 'create') {
        router.post('/mhp-sites', form.value)
    } else {
        router.put(`/mhp-sites/${props.site.id}`, form.value)
    }
}
</script>


<template>
    <SideBar ref="sidebarRef" />

    <div class="max-w-4xl mx-auto mt-4 px-2 sm:px-4">
        <!-- Toast -->
        <transition name="slide-fade">
            <div v-if="showToast" class="fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg text-white"
                 :class="toastType === 'success' ? 'bg-green-600' : 'bg-red-600'">
                {{ toastMessage }}
            </div>
        </transition>

        <h1 class="text-2xl sm:text-3xl font-extrabold text-center text-blue-700 mb-4">
            ⚡ MHP Creation Form
        </h1>

        <form
            @submit.prevent="submit"
            class="bg-white shadow-md rounded-lg p-4 sm:p-6 space-y-4"
        >
            <!-- General Info -->
            <div>
                <h2 class="text-lg font-semibold text-gray-700 mb-1">General Info</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label class="font-medium text-gray-600">CBO</label>
                        <SearchableCboSelect v-model="form.cbo_id" />
                    </div>
                    <div>
                        <label class="font-medium text-gray-600">Status</label>
                        <select v-model="form.status" class="input">
                            <option disabled value="">Select Status</option>
                            <option v-for="s in statuses" :key="s">{{ s }}</option>
                        </select>
                    </div>
                    <div>
                        <label class="font-medium text-gray-600">Grid Status</label>
                        <select v-model="form.grid_status" class="input">
                            <option disabled value="">Select Grid Status</option>
                            <option v-for="gs in grid_status" :key="gs">{{ gs }}</option>
                        </select>
                    </div>
                    <div>
                        <label class="font-medium text-gray-600">Accessible</label>
                        <select v-model="form.accessible" class="input">
                            <option disabled value="">Is it Accessible?</option>
                            <option v-for="av in accessible_values" :key="av">{{ av }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Technical -->
            <hr>
            <div>
                <h2 class="text-lg font-semibold text-gray-700 mb-1">Technical Details</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div><label>Population</label><input v-model="form.population" class="input" type="number" /></div>
                    <div><label>Existing Capacity (kW)</label><input v-model="form.existing_capacity_kw" class="input" type="number" step="0.01" /></div>
                    <div><label>Planned Capacity (kW)</label><input v-model="form.planned_capacity_kw" class="input" type="number" step="0.01" /></div>
                    <div><label>Head (ft)</label><input v-model="form.head_ft" class="input" type="number" /></div>
                    <div><label>Design Discharge (cusecs)</label><input v-model="form.design_discharge_cusecs" class="input" type="number" step="0.01" /></div>
                    <div><label>Channel Length (km)</label><input v-model="form.channel_length_km" class="input" type="number" step="0.01" /></div>
                    <div><label>TL HT (km)</label><input v-model="form.tl_ht_km" class="input" type="number" step="0.01" /></div>
                    <div><label>TL LT (km)</label><input v-model="form.tl_lt_km" class="input" type="number" step="0.01" /></div>
                    <div><label>Transformers</label><input v-model="form.transformers" class="input" type="number" /></div>
                    <div><label>Turbine Type</label><input v-model="form.turbine_type" class="input" type="text" /></div>
                    <div><label>Alternator Type</label><input v-model="form.alternator_type" class="input" type="text" /></div>
                </div>
            </div>

            <!-- Cost & Households -->
            <hr>
            <div>
                <h2 class="text-lg font-semibold text-gray-700 mb-1">Cost & Households</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div><label>Domestic Units</label><input v-model="form.domestic_units" class="input" type="number" /></div>
                    <div><label>Commercial Units</label><input v-model="form.commercial_units" class="input" type="number" /></div>
                    <div><label>Estimated Cost</label><input v-model="form.estimated_cost" class="input" type="number" step="0.01" /></div>
                    <div><label>Per kW Cost</label><input v-model="form.per_kw_cost" class="input" type="number" step="0.01" /></div>
                    <div><label>Total Households</label><input v-model="form.total_hh" class="input" type="number" /></div>
                    <div><label>Avg. Household Size</label><input v-model="form.avg_hh_size" class="input" type="number" step="0.01" /></div>
                    <div><label>Cost Per Capita</label><input v-model="form.cost_per_capita" class="input" type="number" step="0.01" /></div>
                    <div>
                        <label>Tentative Date</label>
                        <input type="date" class="input"
                            v-model="form.tentative_completion_date"

                        />
                    </div>
                </div>
            </div>

            <div class="text-center">
                <button
                    type="submit"
                    class="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded shadow hover:shadow-lg hover:from-blue-700 hover:to-blue-900 transition"
                >
                    {{ props.action === 'create' ? '✨ Create' : '🔄 Update' }}
                </button>
            </div>
        </form>
    </div>
    <transition name="fade">
    <div v-if="showErrorModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
            <h2 class="text-lg font-semibold text-red-700 mb-4">🚨 Validation Errors</h2>
            <ul class="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li v-for="(messages, field) in errors" :key="field">
                    <span class="font-medium capitalize">{{ field.replace('_', ' ') }}:</span>
                    <ul class="ml-4 list-[circle]">
                        <li v-for="msg in messages" :key="msg">{{ msg }}</li>
                    </ul>
                </li>
            </ul>
            <div class="text-right mt-4">
                <button
                    @click="showErrorModal = false"
                    class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
    </transition>
</template>

<style scoped>
.input {
    @apply w-full border border-gray-300 rounded px-2 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-sm;
}

.slide-fade-enter-active {
    transition: all 0.4s ease;
}
.slide-fade-leave-active {
    transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
.fade-enter-active, .fade-leave-active {
    transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
}
.input-date{
    @apply w-full border border-gray-300 rounded px-2 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-sm;
}
</style>


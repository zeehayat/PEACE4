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
    tentative_completion_date: props.site.tentative_completion_date ?? '',
    established_by:props.site.established_by ?? '',
    month_year_establishment: props.site.month_year_establishment ?? '',
})


const statuses = ['New', 'Rehab', 'Upgradation']
const grid_status = ['On-Grid', 'Off-Grid', 'Partially on-Grid']
const accessible_values = ['YES', 'NO']

const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')
const activeTab = ref('technical');

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
        router.post('/mhp/mhp-sites', form.value)
    } else {
        router.put(`/mhp/mhp-sites/${props.site.id}`, form.value)
    }
}
</script>


<template>
    <SideBar ref="sidebarRef" />

    <div class="max-w-4xl mx-auto mt-4 px-2 sm:px-4">
        <transition name="slide-fade">
            <div v-if="showToast" class="fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg text-white"
                 :class="toastType === 'success' ? 'bg-green-600' : 'bg-red-600'">
                {{ toastMessage }}
            </div>
        </transition>

        <h1 class="text-2xl sm:text-3xl font-extrabold text-center text-blue-700 mb-6">
            ⚡ MHP Creation Form
        </h1>

        <form
            @submit.prevent="submit"
            class="bg-white shadow-lg rounded-lg p-4 sm:p-6 space-y-6"
        >
            <div>
                <h2 class="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">General Information</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                    <div>
                        <label for="cbo_id" class="block text-sm font-medium text-gray-700 mb-1"></label>
                        <SearchableCboSelect v-model="form.cbo_id" id="cbo_id" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Select Status:</label>
                        <div class="flex flex-col gap-2">
                            <label
                                v-for="s in statuses"
                                :key="s"
                                class="
                                    flex items-center p-2 rounded-md cursor-pointer
                                    transition-all duration-200 ease-in-out
                                    hover:bg-gray-50
                                    focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2
                                "
                                :class="{ 'bg-blue-50 border border-blue-200': form.status === s }"
                            >
                                <input
                                    type="radio"
                                    :id="`status_${s}`"
                                    :value="s"
                                    v-model="form.status"
                                    class="
                                        form-radio h-4 w-4 text-blue-600 border-gray-300
                                        focus:ring-blue-500 focus:ring-offset-2
                                        cursor-pointer
                                        peer
                                    "
                                />
                                <span
                                    class="ml-2 text-sm font-medium text-gray-700
                                           peer-checked:text-blue-700"
                                >
                                    {{ s }}
                                </span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Grid Status</label>
                        <div class="flex flex-col gap-2">
                            <label
                                v-for="gs in grid_status"
                                :key="gs"
                                class="
                                    flex items-center p-2 rounded-md cursor-pointer
                                    transition-all duration-200 ease-in-out
                                    hover:bg-gray-50
                                    focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2
                                "
                                :class="{ 'bg-blue-50 border border-blue-200': form.grid_status === gs }"
                            >
                                <input
                                    type="radio"
                                    :id="`grid_status_${gs}`"
                                    :value="gs"
                                    v-model="form.grid_status"
                                    class="
                                        form-radio h-4 w-4 text-blue-600 border-gray-300
                                        focus:ring-blue-500 focus:ring-offset-2
                                        cursor-pointer
                                        peer
                                    "
                                />
                                <span
                                    class="ml-2 text-sm font-medium text-gray-700
                                           peer-checked:text-blue-700"
                                >
                                    {{ gs }}
                                </span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Accessible</label>
                        <div class="flex flex-col gap-2">
                            <label
                                v-for="av in accessible_values"
                                :key="av"
                                class="
                                    flex items-center p-2 rounded-md cursor-pointer
                                    transition-all duration-200 ease-in-out
                                    hover:bg-gray-50
                                    focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2
                                "
                                :class="{ 'bg-blue-50 border border-blue-200': form.accessible === av }"
                            >
                                <input
                                    type="radio"
                                    :id="`accessible_${av}`"
                                    :value="av"
                                    v-model="form.accessible"
                                    class="
                                        form-radio h-4 w-4 text-blue-600 border-gray-300
                                        focus:ring-blue-500 focus:ring-offset-2
                                        cursor-pointer
                                        peer
                                    "
                                />
                                <span
                                    class="ml-2 text-sm font-medium text-gray-700
                                           peer-checked:text-blue-700"
                                >
                                    {{ av }}
                                </span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label for="date_of_establishment" class="block text-sm font-medium text-gray-700 mb-1">Date of Establishment</label>
                        <input v-model="form.month_year_establishment" id="date_of_establishment" class="input" type="date" />
                    </div>

                    <div>
                        <label for="established_by" class="block text-sm font-medium text-gray-700 mb-1">Established By</label>
                        <input v-model="form.established_by" id="established_by" class="input" type="text" />
                    </div>
                </div>
            </div>
        <hr class="my-3" />
            <div class="mt-6 border-b border-gray-200">
                <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                    <button type="button" @click="activeTab = 'technical'"
                            :class="[activeTab === 'technical' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm']">
                        Technical Details
                    </button>
                    <button type="button" @click="activeTab = 'costHouseholds'"
                            :class="[activeTab === 'costHouseholds' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm']">
                        Cost & Households
                    </button>
                </nav>
            </div>

            <div class="mt-6">
                <div v-show="activeTab === 'technical'">
                    <h2 class="sr-only">Technical Details</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                        <div>
                            <label for="population" class="block text-sm font-medium text-gray-700 mb-1">Population</label>
                            <input v-model="form.population" id="population" class="input" type="number" />
                        </div>
                        <div>
                            <label for="existing_capacity_kw" class="block text-sm font-medium text-gray-700 mb-1">Existing Capacity (kW)</label>
                            <input v-model="form.existing_capacity_kw" id="existing_capacity_kw" class="input" type="number" step="0.01" />
                        </div>
                        <div>
                            <label for="planned_capacity_kw" class="block text-sm font-medium text-gray-700 mb-1">Planned Capacity (kW)</label>
                            <input v-model="form.planned_capacity_kw" id="planned_capacity_kw" class="input" type="number" step="0.01" />
                        </div>
                        <div>
                            <label for="head_ft" class="block text-sm font-medium text-gray-700 mb-1">Head (ft)</label>
                            <input v-model="form.head_ft" id="head_ft" class="input" type="number" />
                        </div>
                        <div>
                            <label for="design_discharge_cusecs" class="block text-sm font-medium text-gray-700 mb-1">Design Discharge (cusecs)</label>
                            <input v-model="form.design_discharge_cusecs" id="design_discharge_cusecs" class="input" type="number" step="0.01" />
                        </div>
                        <div>
                            <label for="channel_length_km" class="block text-sm font-medium text-gray-700 mb-1">Channel Length (km)</label>
                            <input v-model="form.channel_length_km" id="channel_length_km" class="input" type="number" step="0.01" />
                        </div>
                        <div>
                            <label for="tl_ht_km" class="block text-sm font-medium text-gray-700 mb-1">TL HT (km)</label>
                            <input v-model="form.tl_ht_km" id="tl_ht_km" class="input" type="number" step="0.01" />
                        </div>
                        <div>
                            <label for="tl_lt_km" class="block text-sm font-medium text-gray-700 mb-1">TL LT (km)</label>
                            <input v-model="form.tl_lt_km" id="tl_lt_km" class="input" type="number" step="0.01" />
                        </div>
                        <div>
                            <label for="transformers" class="block text-sm font-medium text-gray-700 mb-1">Transformers</label>
                            <input v-model="form.transformers" id="transformers" class="input" type="number" />
                        </div>
                        <div>
                            <label for="turbine_type" class="block text-sm font-medium text-gray-700 mb-1">Turbine Type</label>
                            <input v-model="form.turbine_type" id="turbine_type" class="input" type="text" />
                        </div>
                        <div>
                            <label for="alternator_type" class="block text-sm font-medium text-gray-700 mb-1">Alternator Type</label>
                            <input v-model="form.alternator_type" id="alternator_type" class="input" type="text" />
                        </div>
                    </div>
                </div>

                <div v-show="activeTab === 'costHouseholds'">
                    <h2 class="sr-only">Cost & Households</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                        <div>
                            <label for="domestic_units" class="block text-sm font-medium text-gray-700 mb-1">Domestic Units</label>
                            <input v-model="form.domestic_units" id="domestic_units" class="input" type="number" />
                        </div>
                        <div>
                            <label for="commercial_units" class="block text-sm font-medium text-gray-700 mb-1">Commercial Units</label>
                            <input v-model="form.commercial_units" id="commercial_units" class="input" type="number" />
                        </div>
                        <div>
                            <label for="estimated_cost" class="block text-sm font-medium text-gray-700 mb-1">Estimated Cost</label>
                            <input v-model="form.estimated_cost" id="estimated_cost" class="input" type="number" step="0.01" />
                        </div>
                        <div>
                            <label for="per_kw_cost" class="block text-sm font-medium text-gray-700 mb-1">Per kW Cost</label>
                            <input v-model="form.per_kw_cost" id="per_kw_cost" class="input" type="number" step="0.01" />
                        </div>
                        <div>
                            <label for="total_hh" class="block text-sm font-medium text-gray-700 mb-1">Total Households</label>
                            <input v-model="form.total_hh" id="total_hh" class="input" type="number" />
                        </div>
                        <div>
                            <label for="avg_hh_size" class="block text-sm font-medium text-gray-700 mb-1">Avg. Household Size</label>
                            <input v-model="form.avg_hh_size" id="avg_hh_size" class="input" type="number" step="0.01" />
                        </div>
                        <div>
                            <label for="cost_per_capita" class="block text-sm font-medium text-gray-700 mb-1">Cost Per Capita</label>
                            <input v-model="form.cost_per_capita" id="cost_per_capita" class="input" type="number" step="0.01" />
                        </div>
                        <div>
                            <label for="tentative_completion_date" class="block text-sm font-medium text-gray-700 mb-1">Tentative Completion Date</label>
                            <input type="date" id="tentative_completion_date" class="input"
                                   v-model="form.tentative_completion_date"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-center pt-4">
                <button
                    type="submit"
                    class="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                    {{ props.action === 'create' ? '✨ Create MHP Site' : '🔄 Update MHP Site' }}
                </button>
            </div>
        </form>
    </div>

    <transition name="fade">
        <div v-if="showErrorModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <h2 class="text-xl font-bold text-red-700 mb-4 flex items-center">
                    <svg class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Validation Errors
                </h2>
                <ul class="list-disc pl-5 space-y-2 text-sm text-gray-800">
                    <li v-for="(messages, field) in errors" :key="field" class="font-semibold">
                        <span class="capitalize text-red-600">{{ field.replace('_', ' ') }}:</span>
                        <ul class="ml-4 list-[circle] text-gray-700 font-normal">
                            <li v-for="msg in messages" :key="msg">{{ msg }}</li>
                        </ul>
                    </li>
                </ul>
                <div class="text-right mt-6">
                    <button
                        @click="showErrorModal = false"
                        class="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 shadow-md"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
/* Unified input styling */
.input {
    @apply w-full border border-gray-300 rounded-md px-3 py-2 mt-1
    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500
    text-base text-gray-800 shadow-sm;
}

/* Base styles for slide-fade transition for Toast */
.slide-fade-enter-active {
    transition: all 0.4s ease-out;
}
.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}

/* Base styles for fade transition for Modal */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: scale(0.98);
}
</style>

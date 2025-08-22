<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { Head } from '@inertiajs/vue3';
import { defineProps, computed, ref } from 'vue';

const props = defineProps({
    stats: {
        type: Object,
        required: true,
    },
});

const activeTab = ref('mhp'); // Default tab is MHP

const mhpCards = computed(() => [
    { title: 'Total No. of MHPs Approved', value: props.stats.total_mhps_approved, icon: 'mdi-check-circle', color: 'green' },
    { title: 'Total No. of MHPs Completed', value: props.stats.total_mhps_completed, icon: 'mdi-check-all', color: 'blue' },
    { title: 'Total No. of Initiated MHPs', value: props.stats.total_initiated_mhps, icon: 'mdi-progress-check', color: 'yellow' },
    { title: 'Total Capacity Installed', value: `${props.stats.total_capacity_installed} KW`, icon: 'mdi-flash', color: 'indigo' },
    { title: 'Total Operational Cost', value: `PKR ${props.stats.total_operational_cost}`, icon: 'mdi-currency-usd', color: 'red' },
    { title: 'Total No. of Households Benefited', value: props.stats.total_households_benefited, icon: 'mdi-home-group', color: 'cyan' },
    { title: 'Total No. of Population Benefited', value: props.stats.total_population_benefited, icon: 'mdi-account-group', color: 'pink' },
    { title: 'Accumulative Energy Generation', value: props.stats.accumulative_energy_generation, icon: 'mdi-power-plug', color: 'green' },
    { title: 'Total Energy Consumption', value: props.stats.total_energy_consumption, icon: 'mdi-power-plug-off', color: 'orange' },
    { title: 'Total O&M Cost', value: props.stats.total_om_cost, icon: 'mdi-wrench', color: 'brown' },
    { title: 'Gross Revenue Generated', value: props.stats.gross_revenue_generated, icon: 'mdi-cash-multiple', color: 'teal' },
]);

const irrigationCards = computed(() => [
    { title: 'Total Irrigation Systems Approved', value: props.stats.total_irrigation_systems_approved, icon: 'mdi-water', color: 'green' },
    { title: 'Total Irrigation Systems Completed', value: props.stats.total_irrigation_systems_completed, icon: 'mdi-water-check', color: 'blue' },
    { title: 'Total No. of LRM Interventions Approved', value: props.stats.total_lrm_interventions_approved, icon: 'mdi-tree', color: 'green' },
    { title: 'Total No. of LRM Interventions Completed', value: props.stats.total_lrm_interventions_completed, icon: 'mdi-leaf', color: 'blue' },
    { title: 'No. of Community Dialogue Conducted', value: props.stats.total_cbo_dialogues, icon: 'mdi-account-group', color: 'purple' },
    { title: 'No. of CBOs Formed', value: props.stats.total_cbos_formed, icon: 'mdi-town-hall', color: 'purple' },
    { title: 'No. of O&M Training Conducted', value: props.stats.total_om_training, icon: 'mdi-school', color: 'orange' },
    { title: 'No. of Session on Safe Use of Electric Appliances', value: props.stats.total_safe_use_training, icon: 'mdi-lightning-bolt', color: 'orange' },
    { title: 'No. of Beneficiary Households', value: props.stats.no_of_beneficiary_households, icon: 'mdi-home-group', color: 'cyan' },
    { title: 'Total No. of Beneficiary Population', value: props.stats.total_beneficiary_population, icon: 'mdi-account-group', color: 'pink' },
    { title: 'Total Length of Channel Covered (In KM)', value: `${props.stats.total_length_of_channel_km} KM`, icon: 'mdi-ruler', color: 'indigo' },
    { title: 'Total Land Covered (In Hectares)', value: `${props.stats.total_land_covered_hectares} Ha`, icon: 'mdi-land-plots', color: 'brown' },
]);

const displayedCards = computed(() => {
    return activeTab.value === 'mhp' ? mhpCards.value : irrigationCards.value;
});

const formatValue = (value) => {
    if (typeof value === 'number') {
        return value.toLocaleString();
    }
    return value;
};
</script>

<template>
    <AppLayout title="Dashboard">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">
                        <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
                            <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
                                <li class="me-2" role="presentation">
                                    <button @click="activeTab = 'mhp'" :class="{'bg-gray-200 text-gray-800': activeTab === 'mhp'}" class="inline-block p-4 border-b-2 rounded-t-lg">MHP Metrics</button>
                                </li>
                                <li class="me-2" role="presentation">
                                    <button @click="activeTab = 'irrigation'" :class="{'bg-gray-200 text-gray-800': activeTab === 'irrigation'}" class="inline-block p-4 border-b-2 rounded-t-lg">Irrigation Metrics</button>
                                </li>
                            </ul>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div v-for="(card, index) in displayedCards" :key="index" class="bg-gray-100 p-6 rounded-lg shadow-md flex items-center justify-between">
                                <div>
                                    <h3 class="text-lg font-bold text-gray-700">{{ card.title }}</h3>
                                    <p class="text-2xl mt-2 font-extrabold text-gray-900">{{ formatValue(card.value) }}</p>
                                </div>
                                <div :class="`text-4xl text-${card.color}-500`">
                                    <i :class="card.icon"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

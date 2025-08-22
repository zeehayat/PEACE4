<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { Head } from '@inertiajs/vue3';
import { defineProps, computed } from 'vue';

const props = defineProps({
    stats: {
        type: Object,
        required: true,
    },
});

const cards = computed(() => [
    { title: 'Total MHPs Approved', value: props.stats.total_mhps_approved, icon: 'mdi-check-circle', color: 'green' },
    { title: 'Total MHPs Completed', value: props.stats.total_mhps_completed, icon: 'mdi-check-all', color: 'blue' },
    { title: 'Total Irrigation Systems Approved', value: props.stats.total_irrigation_systems_approved, icon: 'mdi-water', color: 'green' },
    { title: 'Total Irrigation Systems Completed', value: props.stats.total_irrigation_systems_completed, icon: 'mdi-water-check', color: 'blue' },
    { title: 'Total LRM Interventions Approved', value: props.stats.total_lrm_interventions_approved, icon: 'mdi-tree', color: 'green' },
    { title: 'Total LRM Interventions Completed', value: props.stats.total_lrm_interventions_completed, icon: 'mdi-leaf', color: 'blue' },
    { title: 'Total CBO Dialogues', value: props.stats.total_cbo_dialogues, icon: 'mdi-account-group', color: 'purple' },
    { title: 'Total CBOs Formed', value: props.stats.total_cbos_formed, icon: 'mdi-town-hall', color: 'purple' },
    { title: 'Total O&M Training Conducted', value: props.stats.total_om_training, icon: 'mdi-school', color: 'orange' },
    { title: 'No. of Safe Use Sessions', value: props.stats.total_safe_use_training, icon: 'mdi-lightning-bolt', color: 'orange' },
    { title: 'Total Capacity Installed', value: `${props.stats.total_capacity_installed} KW`, icon: 'mdi-flash', color: 'indigo' },
    { title: 'Total Operational Cost', value: `PKR ${props.stats.total_operational_cost}`, icon: 'mdi-currency-usd', color: 'red' },
]);

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
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div v-for="(card, index) in cards" :key="index" class="bg-gray-100 p-6 rounded-lg shadow-md flex items-center justify-between">
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

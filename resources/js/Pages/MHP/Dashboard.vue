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
    { title: 'Total MHPs Approved', value: props.stats.total_mhps_approved, icon: 'mdi-check-circle', color: 'text-green-500' },
    { title: 'Total MHPs Completed', value: props.stats.total_mhps_completed, icon: 'mdi-check-all', color: 'text-blue-500' },
    { title: 'Total Initiated MHPs', value: props.stats.total_initiated_mhps, icon: 'mdi-play-circle', color: 'text-yellow-500' },
    { title: 'Total Capacity Installed', value: `${props.stats.total_capacity_installed ?? 0} KW`, icon: 'mdi-flash', color: 'text-indigo-500' },
    { title: 'Total CBO Dialogues', value: props.stats.total_cbo_dialogues, icon: 'mdi-forum', color: 'text-purple-500' },
    { title: 'Total CBOs Formed', value: props.stats.total_cbos_formed, icon: 'mdi-account-multiple-plus', color: 'text-purple-500' },
    { title: 'Total O&M Training Conducted', value: props.stats.total_om_training, icon: 'mdi-wrench-check', color: 'text-orange-500' },
    { title: 'No. of Safe Use Sessions', value: props.stats.total_safe_use_training, icon: 'mdi-power-plug', color: 'text-orange-500' },
    { title: 'Total Operational Cost', value: `PKR ${props.stats.total_operational_cost ?? 0}`, icon: 'mdi-cash', color: 'text-red-500' },
]);

const formatValue = (value) => {
    if (typeof value === 'number') {
        return value.toLocaleString();
    }
    return value;
};
</script>

<template>
    <AppLayout title="MHP Dashboard">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">MHP Dashboard</h2>
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
                                <div :class="`text-4xl ${card.color}`">
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

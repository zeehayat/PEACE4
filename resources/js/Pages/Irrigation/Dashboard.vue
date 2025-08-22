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
    { title: 'No. of Community Dialogues', value: props.stats.total_dialogues_conducted, icon: 'mdi-forum', color: 'text-purple-500' },
    { title: 'No. of CBOs Formed', value: props.stats.total_cbos_formed, icon: 'mdi-account-multiple-plus', color: 'text-purple-500' },
    { title: 'No. of Sub-committees Formed', value: props.stats.total_sub_committees_formed, icon: 'mdi-account-group', color: 'text-purple-500' },
    { title: 'No. of O&M Sessions Conducted', value: props.stats.total_om_sessions, icon: 'mdi-school', color: 'text-orange-500' },
    { title: 'No. of Irrigation Systems Approved', value: props.stats.total_irrigation_systems_approved, icon: 'mdi-check-circle', color: 'text-green-500' },
    { title: 'Total No. of Irrigation Systems Initiated', value: props.stats.total_irrigation_systems_initiated, icon: 'mdi-play-circle', color: 'text-yellow-500' },
    { title: 'Total No. of Irrigation Systems Completed', value: props.stats.total_irrigation_systems_completed, icon: 'mdi-check-all', color: 'text-blue-500' },
    { title: 'No. of Beneficiary Households', value: props.stats.total_beneficiary_households, icon: 'mdi-home-group', color: 'text-teal-500' },
    { title: 'Total No. of Beneficiary Population', value: props.stats.total_beneficiary_population, icon: 'mdi-account-multiple', color: 'text-teal-500' },
    { title: 'Total Length of Channel Covered', value: `${props.stats.total_channel_length_km ?? 0} KM`, icon: 'mdi-water-sync', color: 'text-cyan-500' },
    { title: 'Total Land Covered', value: `${props.stats.total_land_covered_hectares ?? 0} Ha`, icon: 'mdi-resize', color: 'text-cyan-500' },
]);

const formatValue = (value) => {
    if (typeof value === 'number') {
        return value.toLocaleString();
    }
    return value;
};
</script>

<template>
    <AppLayout title="Irrigation Dashboard">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Irrigation Dashboard</h2>
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

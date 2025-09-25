<script setup>
import { computed, ref, watch } from 'vue';
import { router } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import { Head } from '@inertiajs/vue3';

const props = defineProps({
    districts: {
        type: Array,
        required: true,
    },
    reportData: {
        type: Object,
        required: true,
        default: () => ({
            total_cbos_formed: 0,
            total_members: 0,
            total_exposure_visits: 0,
            total_om_training: 0,
        }),
    },
    selectedDistrict: {
        type: String,
        default: null,
    },
});

const selectedDistrictRef = ref(props.selectedDistrict);

const handleDistrictChange = () => {
    router.get(route('cbo.reports.index'), { district: selectedDistrictRef.value }, {
        preserveState: true,
        replace: true,
    });
};

const cards = computed(() => [
    { title: 'Total CBOs Formed', value: props.reportData.total_cbos_formed, icon: 'mdi-account-multiple-plus', color: 'text-purple-500' },
    { title: 'Total Members', value: props.reportData.total_members, icon: 'mdi-account-group', color: 'text-indigo-500' },
    { title: 'Total Exposure Visits', value: props.reportData.total_exposure_visits, icon: 'mdi-bus', color: 'text-orange-500' },
    { title: 'Total O&M Trainings', value: props.reportData.total_om_training, icon: 'mdi-wrench', color: 'text-teal-500' },
]);

const formatValue = (value) => {
    if (typeof value === 'number') {
        return value.toLocaleString();
    }
    return value;
};
</script>

<template>
    <AppLayout title="CBO Report">
        <template #header>
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">CBO Report</h2>
                <div class="flex items-center space-x-2">
                    <label for="district-select" class="font-semibold text-gray-700">Filter by District:</label>
                    <select
                        id="district-select"
                        v-model="selectedDistrictRef"
                        @change="handleDistrictChange"
                        class="form-select rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option :value="null">All Districts</option>
                        <option v-for="district in districts" :key="district.id" :value="district.name">
                            {{ district.name }}
                        </option>
                    </select>
                </div>
            </div>
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

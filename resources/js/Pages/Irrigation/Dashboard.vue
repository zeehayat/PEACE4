<script setup>
import { router } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import ChartWithTable from '@/Components/ChartWithTable.vue';

const props = defineProps({
    districts: { type: Array, required: true },
    filters: { type: Object, required: true },
    stats: { type: Object, required: true },
    chart_implementation_status: { type: Object, required: true },
    chart_district_alignment: { type: Object, required: true },
});

function applyDistrictFilter(district) {
    router.get(
        route('irrigation.overview'),
        { district: district || undefined },
        { preserveState: true, preserveScroll: true }
    );
}

function onDistrictChange(event) {
    applyDistrictFilter(event.target.value);
}

function onChartClick(labels, index) {
    applyDistrictFilter(labels[index]);
}

const districtAlignmentChartData = {
    labels: props.chart_district_alignment.labels,
    datasets: [
        { label: 'Schemes', backgroundColor: '#059669', data: props.chart_district_alignment.scheme_counts },
        { label: 'CBOs Formed', backgroundColor: '#6ee7b7', data: props.chart_district_alignment.cbo_counts },
    ],
};

const implementationStatusChartData = {
    labels: props.chart_implementation_status.labels,
    datasets: [
        { label: 'Schemes', backgroundColor: '#059669', data: props.chart_implementation_status.counts },
    ],
};

const implementationStatusChartOptions = { indexAxis: 'y' };
</script>

<template>
    <AppLayout>
        <div class="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
            <div class="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-gradient-to-r from-irrigation-600 to-irrigation-800 p-6 shadow-sm">
                <div>
                    <p class="text-xs font-semibold uppercase tracking-wide text-irrigation-100">Irrigation</p>
                    <h1 class="text-2xl font-bold text-white sm:text-3xl">Irrigation Overview Dashboard</h1>
                </div>
                <select
                    class="rounded-md border-transparent bg-white/90 text-sm text-ink-800 focus:border-irrigation-300 focus:ring-irrigation-300"
                    :value="filters.district ?? ''"
                    @change="onDistrictChange"
                >
                    <option value="">All Districts</option>
                    <option v-for="d in districts" :key="d" :value="d">{{ d }}</option>
                </select>
            </div>

            <!-- Stat tile row 1: infrastructure -->
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                <div class="rounded-lg border border-ink-200 bg-surface p-4 text-center shadow-sm">
                    <p class="text-2xl font-bold text-irrigation-700">{{ stats.infrastructure.total_schemes }}</p>
                    <p class="mt-1 text-xs font-medium text-ink-600">Total Schemes</p>
                </div>
                <div class="rounded-lg border border-ink-200 bg-surface p-4 text-center shadow-sm">
                    <p class="text-2xl font-bold text-irrigation-700">{{ stats.infrastructure.schemes_ongoing }}</p>
                    <p class="mt-1 text-xs font-medium text-ink-600">Schemes Ongoing</p>
                </div>
                <div class="rounded-lg border border-ink-200 bg-surface p-4 text-center shadow-sm">
                    <p class="text-2xl font-bold text-irrigation-700">{{ stats.infrastructure.schemes_completed }}</p>
                    <p class="mt-1 text-xs font-medium text-ink-600">Schemes Completed</p>
                </div>
                <div class="rounded-lg border border-ink-200 bg-surface p-4 text-center shadow-sm">
                    <p class="text-2xl font-bold text-irrigation-700">{{ stats.infrastructure.beneficiary_households }}</p>
                    <p class="mt-1 text-xs font-medium text-ink-600">Beneficiary Households</p>
                </div>
                <div class="rounded-lg border border-ink-200 bg-surface p-4 text-center shadow-sm">
                    <p class="text-2xl font-bold text-irrigation-700">{{ stats.infrastructure.acres_irrigated.toLocaleString() }}</p>
                    <p class="mt-1 text-xs font-medium text-ink-600">Acres Irrigated</p>
                </div>
                <div class="rounded-lg border border-ink-200 bg-surface p-4 text-center shadow-sm">
                    <p class="text-2xl font-bold text-irrigation-700">{{ stats.infrastructure.km_of_channel.toLocaleString() }}</p>
                    <p class="mt-1 text-xs font-medium text-ink-600">Km of Channel</p>
                    <p v-if="stats.infrastructure.channel_excluded_count > 0" class="mt-1 text-[10px] text-amber-700">
                        {{ stats.infrastructure.channel_excluded_count }} scheme(s) excluded — data anomaly
                    </p>
                </div>
            </div>

            <!-- Stat tile row 2: CBO -->
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                <div class="rounded-lg border border-ink-200 bg-surface p-4 text-center shadow-sm">
                    <p class="text-2xl font-bold text-irrigation-700">{{ stats.cbo.cbos_formed }}</p>
                    <p class="mt-1 text-xs font-medium text-ink-600">CBOs Formed</p>
                </div>
                <div class="rounded-lg border border-ink-200 bg-surface p-4 text-center shadow-sm">
                    <p class="text-2xl font-bold text-irrigation-700">{{ stats.cbo.districts_covered }}</p>
                    <p class="mt-1 text-xs font-medium text-ink-600">Districts Covered</p>
                </div>
                <div class="rounded-lg border border-ink-200 bg-surface p-4 text-center shadow-sm">
                    <p class="text-2xl font-bold text-irrigation-700">{{ stats.cbo.total_members }}</p>
                    <p class="mt-1 text-xs font-medium text-ink-600">Total Members</p>
                </div>
                <div class="rounded-lg border border-ink-200 bg-surface p-4 text-center shadow-sm">
                    <p class="text-2xl font-bold text-irrigation-700">{{ stats.cbo.members_trained }}</p>
                    <p class="mt-1 text-xs font-medium text-ink-600">Members Trained</p>
                </div>
                <div class="rounded-lg border border-ink-200 bg-surface p-4 text-center shadow-sm">
                    <p class="text-2xl font-bold text-irrigation-700">{{ stats.cbo.female_led_cbos }}</p>
                    <p class="mt-1 text-xs font-medium text-ink-600">Female-Led CBOs</p>
                </div>
            </div>

            <!-- Charts 1-2 -->
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <ChartWithTable
                    title="01 · District Alignment"
                    subtitle="Schemes and CBOs stood up per district — is mobilization keeping pace with construction?"
                    chart-type="bar"
                    :chart-data="districtAlignmentChartData"
                    :table-columns="[{ key: 'district', label: 'District' }, { key: 'schemes', label: 'Schemes' }, { key: 'cbos', label: 'CBOs' }]"
                    :table-rows="chart_district_alignment.table"
                    @chart-click="onChartClick(chart_district_alignment.labels, $event)"
                />
                <ChartWithTable
                    title="02 · Implementation Status"
                    subtitle="Schemes by stage."
                    chart-type="bar"
                    :chart-data="implementationStatusChartData"
                    :chart-options="implementationStatusChartOptions"
                    :table-columns="[{ key: 'status', label: 'Status' }, { key: 'count', label: 'Count' }]"
                    :table-rows="chart_implementation_status.table"
                />
            </div>
        </div>
    </AppLayout>
</template>

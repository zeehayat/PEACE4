<script setup>
import { router } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import ChartWithTable from '@/Components/ChartWithTable.vue';

const props = defineProps({
    districts: { type: Array, required: true },
    filters: { type: Object, required: true },
    stats: { type: Object, required: true },
    chart_mobilization: { type: Object, required: true },
    chart_type_breakdown: { type: Object, required: true },
});

function onDistrictChange(event) {
    router.get(
        route('mhp.overview'),
        { district: event.target.value || undefined },
        { preserveState: true, preserveScroll: true }
    );
}

const mobilizationChartData = {
    labels: props.chart_mobilization.labels,
    datasets: [
        { label: 'MHP Schemes', backgroundColor: '#0e7490', data: props.chart_mobilization.scheme_counts },
        { label: 'CBOs Formed', backgroundColor: '#67e8f9', data: props.chart_mobilization.cbo_counts },
    ],
};

const pipelineChartData = {
    labels: props.stats.pipeline.map((p) => p.label),
    datasets: [
        {
            label: 'Schemes',
            backgroundColor: '#0e7490',
            data: props.stats.pipeline.map((p) => p.count),
        },
    ],
};

const pipelineChartOptions = { indexAxis: 'y' };

const typeChartData = {
    labels: props.chart_type_breakdown.labels,
    datasets: [
        {
            backgroundColor: ['#0e7490', '#67e8f9', '#155e75'],
            data: props.chart_type_breakdown.counts,
        },
    ],
};
</script>

<template>
    <AppLayout>
        <div class="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
            <div class="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p class="text-xs font-semibold uppercase tracking-wide text-hydro-700">MHP</p>
                    <h1 class="text-2xl font-bold text-ink-900">MHP Overview Dashboard</h1>
                </div>
                <select
                    class="rounded-md border-ink-300 text-sm focus:border-hydro-500 focus:ring-hydro-500"
                    :value="filters.district ?? ''"
                    @change="onDistrictChange"
                >
                    <option value="">All Districts</option>
                    <option v-for="d in districts" :key="d" :value="d">{{ d }}</option>
                </select>
            </div>

            <!-- Stat tile row 1: pipeline -->
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                <div
                    v-for="stage in stats.pipeline"
                    :key="stage.label"
                    class="rounded-lg border border-ink-200 bg-surface p-4 text-center shadow-sm"
                >
                    <p class="text-2xl font-bold text-hydro-700">{{ stage.count }}</p>
                    <p class="mt-1 text-xs font-medium text-ink-600">{{ stage.label }}</p>
                    <p class="text-xs text-ink-400">{{ stage.capacity_kw.toLocaleString() }} kW</p>
                </div>
            </div>

            <!-- Stat tile row 2: beneficiaries + CBO -->
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div class="rounded-lg border border-ink-200 bg-surface p-4 text-center shadow-sm">
                    <p class="text-2xl font-bold text-hydro-700">{{ stats.beneficiaries.total_hh_and_commercial }}</p>
                    <p class="mt-1 text-xs font-medium text-ink-600">Total Beneficiary HH + Commercial</p>
                </div>
                <div class="rounded-lg border border-ink-200 bg-surface p-4 text-center shadow-sm">
                    <p class="text-2xl font-bold text-hydro-700">{{ stats.beneficiaries.avg_hh_per_hpp }}</p>
                    <p class="mt-1 text-xs font-medium text-ink-600">Avg. HH per HPP</p>
                </div>
                <div class="rounded-lg border border-ink-200 bg-surface p-4 text-center shadow-sm">
                    <p class="text-2xl font-bold text-hydro-700">{{ stats.cbo.cbos_formed }}</p>
                    <p class="mt-1 text-xs font-medium text-ink-600">CBOs Formed</p>
                </div>
                <div class="rounded-lg border border-ink-200 bg-surface p-4 text-center shadow-sm">
                    <p class="text-2xl font-bold text-hydro-700">{{ stats.cbo.members_trained }}</p>
                    <p class="mt-1 text-xs font-medium text-ink-600">Members Trained</p>
                </div>
            </div>

            <!-- Charts 1-3 -->
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <ChartWithTable
                    title="01 · Mobilization Pace by District"
                    subtitle="MHP schemes and CBOs stood up per district — is mobilization keeping pace with the design/construction pipeline?"
                    chart-type="bar"
                    :chart-data="mobilizationChartData"
                    :table-columns="[{ key: 'district', label: 'District' }, { key: 'schemes', label: 'Schemes' }, { key: 'cbos', label: 'CBOs' }]"
                    :table-rows="chart_mobilization.table"
                />
                <ChartWithTable
                    title="02 · Design, Approval & Construction Pipeline"
                    subtitle="Schemes moving from prioritization through detailed design, EU/OPM approval, and civil works initiation."
                    chart-type="bar"
                    :chart-data="pipelineChartData"
                    :chart-options="pipelineChartOptions"
                    :table-columns="[{ key: 'label', label: 'Stage' }, { key: 'count', label: 'Count' }, { key: 'capacity_kw', label: 'Capacity (kW)' }]"
                    :table-rows="stats.pipeline"
                />
                <ChartWithTable
                    title="03 · Type of MHP"
                    subtitle="Breakdown of schemes with detailed design data — new construction vs. rehabilitation vs. upgradation."
                    chart-type="pie"
                    :chart-data="typeChartData"
                    :table-columns="[{ key: 'type', label: 'Type' }, { key: 'count', label: 'Count' }]"
                    :table-rows="chart_type_breakdown.table"
                />
            </div>
        </div>
    </AppLayout>
</template>

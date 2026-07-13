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
    chart_progress: { type: Object, required: true },
    chart_component_progress: { type: Object, required: true },
    chart_beneficiaries: { type: Object, required: true },
    scheme_log: { type: Array, required: true },
    cbo_log: { type: Array, required: true },
    stalled: { type: Array, required: true },
    mismatches: { type: Array, required: true },
});

function applyDistrictFilter(district) {
    router.get(
        route('mhp.overview'),
        { district: district || undefined },
        { preserveState: true, preserveScroll: true }
    );
}

function onDistrictChange(event) {
    applyDistrictFilter(event.target.value);
}

function onChartClick(labels, index) {
    const district = labels[index];
    if (district) {
        applyDistrictFilter(district);
    }
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

const progressChartData = {
    labels: props.chart_progress.labels,
    datasets: [
        { label: 'Physical %', backgroundColor: '#0e7490', data: props.chart_progress.physical },
        { label: 'Financial %', backgroundColor: '#67e8f9', data: props.chart_progress.financial },
    ],
};
const progressChartOptions = { indexAxis: 'y' };

const componentProgressChartData = {
    labels: props.chart_component_progress.labels,
    datasets: [
        { label: 'Civil %', backgroundColor: '#0e7490', data: props.chart_component_progress.civil },
        { label: 'EME %', backgroundColor: '#67e8f9', data: props.chart_component_progress.eme },
        { label: 'T&D %', backgroundColor: '#155e75', data: props.chart_component_progress.td },
    ],
};
const componentProgressChartOptions = { indexAxis: 'y' };

const beneficiaryChartData = {
    labels: props.chart_beneficiaries.labels,
    datasets: [
        { label: 'Total HH', backgroundColor: '#0e7490', data: props.chart_beneficiaries.total_hh },
        { label: 'Commercial Units', backgroundColor: '#67e8f9', data: props.chart_beneficiaries.commercial_units },
    ],
};

const schemeExportUrl = route('mhp.overview.export-schemes', { district: props.filters.district || undefined });
const cboExportUrl = route('mhp.overview.export-cbos', { district: props.filters.district || undefined });
</script>

<template>
    <AppLayout>
        <div class="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
            <div class="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-gradient-to-r from-hydro-600 to-hydro-800 p-6 shadow-sm">
                <div>
                    <p class="text-xs font-semibold uppercase tracking-wide text-hydro-100">MHP</p>
                    <h1 class="text-2xl font-bold text-white sm:text-3xl">MHP Overview Dashboard</h1>
                </div>
                <select
                    class="rounded-md border-transparent bg-white/90 text-sm text-ink-800 focus:border-hydro-300 focus:ring-hydro-300"
                    :value="filters.district ?? ''"
                    @change="onDistrictChange"
                >
                    <option value="">All Districts</option>
                    <option v-for="d in districts" :key="d" :value="d">{{ d }}</option>
                </select>
            </div>

            <div
                v-if="stalled.length > 0"
                class="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800"
            >
                <p class="font-semibold">{{ stalled.length }} scheme(s) stalled — approved &gt;90 days ago, civil works not yet initiated</p>
                <ul class="mt-2 list-disc space-y-1 pl-5">
                    <li v-for="s in stalled" :key="s.id">
                        {{ s.cbo_name }} ({{ s.district }}) — approved {{ s.stalled_since }}, {{ s.days_stalled }} days ago
                    </li>
                </ul>
            </div>

            <div
                v-if="mismatches.length > 0"
                class="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800"
            >
                <p class="font-semibold">{{ mismatches.length }} scheme(s) with disbursement running &gt;20 points ahead of physical progress</p>
                <ul class="mt-2 list-disc space-y-1 pl-5">
                    <li v-for="m in mismatches" :key="m.id">
                        {{ m.cbo_name }} ({{ m.district }}) — Physical {{ m.physical }}%, Financial {{ m.financial }}%, variance +{{ m.variance }} pts
                    </li>
                </ul>
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
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
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
                <div class="rounded-lg border border-ink-200 bg-surface p-4 text-center shadow-sm">
                    <p class="text-2xl font-bold text-hydro-700">{{ stats.beneficiaries.detailed_capacity_kw.toLocaleString() }}</p>
                    <p class="mt-1 text-xs font-medium text-ink-600">Cumulative Capacity, Detailed Schemes (kW)</p>
                </div>
                <div class="rounded-lg border border-ink-200 bg-surface p-4 text-center shadow-sm">
                    <p class="text-2xl font-bold text-hydro-700">{{ stats.beneficiaries.detailed_total_hh }}</p>
                    <p class="mt-1 text-xs font-medium text-ink-600">Total HH, Detailed Schemes</p>
                </div>
                <div class="rounded-lg border border-ink-200 bg-surface p-4 text-center shadow-sm">
                    <p class="text-2xl font-bold text-hydro-700">{{ stats.cbo.districts_covered }}</p>
                    <p class="mt-1 text-xs font-medium text-ink-600">Districts Covered</p>
                </div>
                <div class="rounded-lg border border-ink-200 bg-surface p-4 text-center shadow-sm">
                    <p class="text-2xl font-bold text-hydro-700">{{ stats.cbo.total_members }}</p>
                    <p class="mt-1 text-xs font-medium text-ink-600">Total Members</p>
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
                    @chart-click="onChartClick(chart_mobilization.labels, $event)"
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
                <ChartWithTable
                    title="04 · Overall Physical Progress by MHP Scheme"
                    subtitle="Combined Civil + T&D + EME physical progress, paired with financial disbursement progress. Schemes not yet approved or initiated show 0%."
                    chart-type="bar"
                    :chart-data="progressChartData"
                    :chart-options="progressChartOptions"
                    :table-columns="[{ key: 'scheme', label: 'Scheme' }, { key: 'physical', label: 'Physical %' }, { key: 'financial', label: 'Financial %' }]"
                    :table-rows="chart_progress.table"
                />
                <ChartWithTable
                    title="04a · Progress by Component (Civil / EME / T&D)"
                    subtitle="Physical progress split by work component, sourced from progress-log entries. May not sum exactly to the combined Physical % shown above, which is a cost-weighted current-state figure from a different source."
                    chart-type="bar"
                    :chart-data="componentProgressChartData"
                    :chart-options="componentProgressChartOptions"
                    :table-columns="[{ key: 'scheme', label: 'Scheme' }, { key: 'civil', label: 'Civil %' }, { key: 'eme', label: 'EME %' }, { key: 'td', label: 'T&D %' }]"
                    :table-rows="chart_component_progress.table"
                />
                <ChartWithTable
                    title="05 · Beneficiary Overview"
                    subtitle="Projected households and commercial connections per district, based on schemes with completed technical surveys."
                    chart-type="bar"
                    :chart-data="beneficiaryChartData"
                    :table-columns="[{ key: 'district', label: 'District' }, { key: 'total_hh', label: 'Total HH' }, { key: 'commercial_units', label: 'Commercial Units' }]"
                    :table-rows="chart_beneficiaries.table"
                    @chart-click="onChartClick(chart_beneficiaries.labels, $event)"
                />
            </div>

            <!-- Chart 6: Scheme Log -->
            <div class="rounded-lg border border-ink-200 bg-surface p-5 shadow-sm">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-semibold uppercase tracking-wide text-hydro-700">06 · MHP Scheme Log</h3>
                    <div class="flex gap-3">
                        <a :href="schemeExportUrl" class="text-xs font-medium text-hydro-700 hover:text-hydro-800">Export CSV</a>
                        <a :href="route('mhp.reports.detailed')" class="text-xs font-medium text-accent-600 hover:text-accent-700">View full report</a>
                    </div>
                </div>
                <div class="mt-3 overflow-x-auto">
                    <table class="min-w-full divide-y divide-ink-200 text-xs">
                        <thead class="bg-paper-50">
                            <tr>
                                <th class="px-3 py-2 text-left font-semibold text-ink-600">#</th>
                                <th class="px-3 py-2 text-left font-semibold text-ink-600">District</th>
                                <th class="px-3 py-2 text-left font-semibold text-ink-600">Village</th>
                                <th class="px-3 py-2 text-left font-semibold text-ink-600">Type</th>
                                <th class="px-3 py-2 text-left font-semibold text-ink-600">Capacity (kW)</th>
                                <th class="px-3 py-2 text-left font-semibold text-ink-600">Total HH</th>
                                <th class="px-3 py-2 text-left font-semibold text-ink-600">Approved (EU)</th>
                                <th class="px-3 py-2 text-left font-semibold text-ink-600">Initiated</th>
                                <th class="px-3 py-2 text-left font-semibold text-ink-600">Progress</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-ink-100">
                            <tr v-for="(row, idx) in scheme_log" :key="row.id">
                                <td class="px-3 py-2 text-ink-700">{{ idx + 1 }}</td>
                                <td class="px-3 py-2 text-ink-700">{{ row.district }}</td>
                                <td class="px-3 py-2 text-ink-700">{{ row.village }}</td>
                                <td class="px-3 py-2 text-ink-700">{{ row.type }}</td>
                                <td class="px-3 py-2 text-ink-700">{{ row.capacity_kw }}</td>
                                <td class="px-3 py-2 text-ink-700">{{ row.total_hh }}</td>
                                <td class="px-3 py-2 text-ink-700">{{ row.approved_eu }}</td>
                                <td class="px-3 py-2 text-ink-700">{{ row.initiated }}</td>
                                <td class="px-3 py-2 text-ink-700">{{ row.progress }}%</td>
                            </tr>
                            <tr v-if="scheme_log.length === 0">
                                <td colspan="9" class="px-3 py-4 text-center text-ink-400">No data</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Chart 7: CBO Log -->
            <div class="rounded-lg border border-ink-200 bg-surface p-5 shadow-sm">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-semibold uppercase tracking-wide text-hydro-700">07 · MHP/CBO Log</h3>
                    <a :href="cboExportUrl" class="text-xs font-medium text-hydro-700 hover:text-hydro-800">Export CSV</a>
                </div>
                <div class="mt-3 overflow-x-auto">
                    <table class="min-w-full divide-y divide-ink-200 text-xs">
                        <thead class="bg-paper-50">
                            <tr>
                                <th class="px-3 py-2 text-left font-semibold text-ink-600">#</th>
                                <th class="px-3 py-2 text-left font-semibold text-ink-600">District</th>
                                <th class="px-3 py-2 text-left font-semibold text-ink-600">Village</th>
                                <th class="px-3 py-2 text-left font-semibold text-ink-600">CBO Name</th>
                                <th class="px-3 py-2 text-left font-semibold text-ink-600">Formed</th>
                                <th class="px-3 py-2 text-left font-semibold text-ink-600">Members</th>
                                <th class="px-3 py-2 text-left font-semibold text-ink-600">Dialogues</th>
                                <th class="px-3 py-2 text-left font-semibold text-ink-600">Members Trained</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-ink-100">
                            <tr v-for="(row, idx) in cbo_log" :key="row.id">
                                <td class="px-3 py-2 text-ink-700">{{ idx + 1 }}</td>
                                <td class="px-3 py-2 text-ink-700">{{ row.district }}</td>
                                <td class="px-3 py-2 text-ink-700">{{ row.village }}</td>
                                <td class="px-3 py-2 text-ink-700">{{ row.cbo_name }}</td>
                                <td class="px-3 py-2 text-ink-700">{{ row.formed }}</td>
                                <td class="px-3 py-2 text-ink-700">{{ row.members }}</td>
                                <td class="px-3 py-2 text-ink-700">{{ row.dialogues }}</td>
                                <td class="px-3 py-2 text-ink-700">{{ row.members_trained }}</td>
                            </tr>
                            <tr v-if="cbo_log.length === 0">
                                <td colspan="8" class="px-3 py-4 text-center text-ink-400">No data</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

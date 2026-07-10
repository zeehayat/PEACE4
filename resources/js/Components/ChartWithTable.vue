<script setup>
import { computed } from 'vue';
import { Bar, Pie } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const props = defineProps({
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    chartType: { type: String, required: true }, // 'bar' | 'pie'
    chartData: { type: Object, required: true },
    chartOptions: { type: Object, default: () => ({}) },
    tableColumns: { type: Array, required: true }, // [{ key, label }]
    tableRows: { type: Array, required: true },
});

const mergedOptions = computed(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } },
    ...props.chartOptions,
}));

const chartComponent = computed(() => (props.chartType === 'pie' ? Pie : Bar));
</script>

<template>
    <div class="rounded-lg border border-ink-200 bg-surface p-5 shadow-sm">
        <h3 class="text-sm font-semibold uppercase tracking-wide text-hydro-700">{{ title }}</h3>
        <p v-if="subtitle" class="mt-1 text-xs italic text-ink-500">{{ subtitle }}</p>

        <div class="mt-4 h-72">
            <component :is="chartComponent" :data="chartData" :options="mergedOptions" />
        </div>

        <details class="mt-4">
            <summary class="cursor-pointer text-xs font-medium text-hydro-700 hover:text-hydro-800">
                View data table
            </summary>
            <div class="mt-2 overflow-x-auto">
                <table class="min-w-full divide-y divide-ink-200 text-xs">
                    <thead class="bg-paper-50">
                        <tr>
                            <th
                                v-for="col in tableColumns"
                                :key="col.key"
                                class="px-3 py-2 text-left font-semibold text-ink-600"
                            >
                                {{ col.label }}
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-ink-100">
                        <tr v-for="(row, idx) in tableRows" :key="idx">
                            <td
                                v-for="col in tableColumns"
                                :key="col.key"
                                class="px-3 py-2 text-ink-700"
                            >
                                {{ row[col.key] }}
                            </td>
                        </tr>
                        <tr v-if="tableRows.length === 0">
                            <td :colspan="tableColumns.length" class="px-3 py-4 text-center text-ink-400">
                                No data
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </details>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';
import { route } from 'ziggy-js';
import AppLayout from '@/Layouts/AppLayout.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SelectInput from '@/Components/SelectInput.vue';

const props = defineProps({
    rows: {
        type: Array,
        default: () => [],
    },
    districts: {
        type: Array,
        default: () => [],
    },
    filters: {
        type: Object,
        default: () => ({}),
    },
});

const form = ref({
    district: props.filters.district || '',
});

const applyFilters = () => {
    router.get(route('mhp.reports.district.instructions'), form.value, {
        preserveState: true,
        replace: true,
    });
};

const clearFilters = () => {
    form.value.district = '';
    applyFilters();
};

const exportCsv = () => {
    window.location.href = route('mhp.reports.district.instructions.export', form.value);
};
</script>

<template>
    <AppLayout title="District Wise MHP Data (Instructions)">
        <template #header>
            <div class="flex flex-col gap-1">
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">District Wise MHP Data (Instructions)</h2>
                <p class="text-sm text-gray-500">Fields exactly from instructions.txt for CSV download.</p>
            </div>
        </template>

        <div class="py-10">
            <div class="max-w-5xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div class="bg-white shadow-sm sm:rounded-lg p-6 border border-gray-100">
                    <div class="flex flex-wrap items-end gap-4 justify-between">
                        <div class="flex flex-wrap gap-4">
                            <div>
                                <label for="district" class="block text-sm font-medium text-gray-700">District</label>
                                <SelectInput
                                    id="district"
                                    v-model="form.district"
                                    :options="[{ value: '', label: 'All Districts' }, ...props.districts.map((d) => ({ value: d, label: d }))]"
                                    class="mt-1 w-48"
                                />
                            </div>
                            <div class="flex items-end gap-2">
                                <PrimaryButton @click="applyFilters" class="h-10">Apply</PrimaryButton>
                                <button
                                    type="button"
                                    class="h-10 px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
                                    @click="clearFilters"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                        <PrimaryButton class="h-10 bg-green-600 hover:bg-green-700" @click="exportCsv">
                            Export CSV
                        </PrimaryButton>
                    </div>
                </div>

                <div class="bg-white shadow-sm sm:rounded-lg border border-gray-100">
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">District</th>
                                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Tehsil</th>
                                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">VC/NC</th>
                                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Village</th>
                                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</th>
                                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">CBO</th>
                                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Dialogue Date</th>
                                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Technical Survey Date</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Existing KW</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Total KW</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Head (ft)</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Discharge (cusecs)</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Channel (ft)</th>
                                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Turbine Type</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Turbines</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">HT km</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">LT km</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Transformers</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Households</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Commercial</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Connections</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Population</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Cost</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Per kW</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Per HH</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Per Beneficiary</th>
                                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Presented MC</th>
                                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Shared OPM/EU</th>
                                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Review OPM</th>
                                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">OPM Visit Date</th>
                                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">T&D Initiation</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Civil Paid</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Civil Fin %</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Civil Physical %</th>
                                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Civil Remarks</th>
                                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">T&D Physical %</th>
                                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">EME Physical %</th>
                                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Overall Physical %</th>
                                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Overall Remarks</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-100">
                                <tr v-if="!props.rows.length">
                                    <td colspan="40" class="px-4 py-6 text-center text-sm text-gray-500">No records for the selected filters.</td>
                                </tr>
                                <tr v-for="row in props.rows" :key="row.district">
                                    <td class="px-4 py-3 text-sm text-gray-700">{{ row.district }}</td>
                                    <td class="px-4 py-3 text-sm text-gray-700">{{ row.tehsil }}</td>
                                    <td class="px-4 py-3 text-sm text-gray-700">{{ row.vc_nc }}</td>
                                    <td class="px-4 py-3 text-sm text-gray-700">{{ row.village }}</td>
                                    <td class="px-4 py-3 text-sm text-gray-700">{{ row.type }}</td>
                                    <td class="px-4 py-3 text-sm text-gray-700">{{ row.cbo_name }}</td>
                                    <td class="px-4 py-3 text-sm text-gray-700">{{ row.dialogue_date }}</td>
                                    <td class="px-4 py-3 text-sm text-gray-700">{{ row.technical_survey_date }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.existing_capacity_kw }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.total_capacity_kw }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.net_head_ft }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.discharge_cusecs }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.channel_length_ft }}</td>
                                    <td class="px-4 py-3 text-sm text-gray-700">{{ row.turbine_type }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.turbine_count }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.ht_length_km }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.lt_length_km }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.transformer_count }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.total_households }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.commercial_consumers }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.total_connections }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.population }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.total_cost }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.per_kw_cost }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.per_hh_cost }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.per_beneficiary_cost }}</td>
                                    <td class="px-4 py-3 text-sm text-gray-700">{{ row.presented_mc }}</td>
                                    <td class="px-4 py-3 text-sm text-gray-700">{{ row.shared_opm }}</td>
                                    <td class="px-4 py-3 text-sm text-gray-700">{{ row.review_meeting_opm }}</td>
                                    <td class="px-4 py-3 text-sm text-gray-700">{{ row.opm_visit_date }}</td>
                                    <td class="px-4 py-3 text-sm text-gray-700">{{ row.tnd_initiation_date }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.civil_disbursed }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.civil_financial_progress }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.civil_physical_progress }}</td>
                                    <td class="px-4 py-3 text-sm text-gray-700">{{ row.civil_progress_description }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.tnd_physical_progress }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.eme_physical_progress }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.overall_physical_progress }}</td>
                                    <td class="px-4 py-3 text-sm text-gray-700">{{ row.overall_progress_description }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import { router } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import Pagination from '@/Components/Pagination.vue';

const props = defineProps({
    schemes: Object,
});

const formatDate = (value) => {
    if (!value) return '—';
    const date = new Date(value);
    return isNaN(date.getTime()) ? value : date.toLocaleDateString('en-GB');
};

const formatNumber = (value) => {
    if (value === null || value === undefined || value === '') return '—';
    const num = Number(value);
    return isNaN(num) ? value : num.toLocaleString(undefined, { maximumFractionDigits: 2 });
};

const goToPage = (url) => {
    router.get(url, {}, { preserveScroll: true, preserveState: true });
};

const exportXlsx = () => {
    const url = route('irrigation.reports.schemes', { export: 'xlsx' });
    window.location.href = url;
};
</script>

<template>
    <AppLayout title="Irrigation Scheme Report">
        <template #header>
            <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h2 class="text-xl font-semibold text-gray-800 leading-tight">Irrigation Scheme Report</h2>
                <div class="flex flex-wrap gap-2 items-center">
                    <button
                        type="button"
                        @click="exportXlsx"
                        class="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
                    >
                        Download as XLSX
                    </button>
                </div>
            </div>
            <p class="text-sm text-gray-600 mt-1">Key milestones and beneficiaries per scheme.</p>
        </template>

        <div class="py-8">
            <div class="max-w-full mx-auto sm:px-6 lg:px-8">
                <div class="bg-white shadow sm:rounded-lg overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200 text-[11px] md:text-xs">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">S. No</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">District</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">Tehsil</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">VC/NC</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">Village</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">CBO Name</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">CBO Members</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">Type of Scheme</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">Duration (days)</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">Dialogue With Community</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">CBO Formation Date</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">Social Assessment</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">Detailed Technical Survey</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">Detail Design Finalized</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">Initiated Date</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">Completion Date</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">O&M Trainings</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">Handed Over Date</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">Beneficiary HHs</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">Beneficiary (Farmers)</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">Total Command Area (Kanal)</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">Length of Irrigation Channel (Km)</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">Additional Area covered before/ after rehabilitation</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">Channel Running Feet REHAB</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">Channel Running Feet NEW</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">Total Channel Running Feet</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">Protection Running Feet</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">Intake Length Running Feet</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">Per Household cost</th>
                                    <th class="px-3 py-3 text-left font-semibold text-gray-600 uppercase">Scheme Cost</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                <tr v-for="(item, idx) in schemes.data" :key="item.id" class="hover:bg-gray-50">
                                    <td class="px-3 py-2 text-gray-800">{{ (schemes.from || 1) + idx }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ item.district ?? '—' }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ item.tehsil ?? '—' }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ item.village_council ?? '—' }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ item.village ?? '—' }}</td>
                                    <td class="px-3 py-2 text-gray-800 font-semibold">{{ item.cbo_name ?? '—' }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ formatNumber(item.cbo_members) }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ item.scheme_type ?? '—' }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ item.duration_days ?? '—' }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ item.dialogues ?? 0 }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ formatDate(item.cbo_formation_date) }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ formatDate(item.social_assessment) }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ formatDate(item.technical_survey_date) }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ formatDate(item.design_finalized_date) }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ formatDate(item.initiated_date) }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ formatDate(item.completion_date) }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ item.om_trainings ?? 0 }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ formatDate(item.handed_over_date) }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ formatNumber(item.beneficiary_hhs) }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ formatNumber(item.beneficiary_farmers) }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ formatNumber(item.command_area_kanal) }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ formatNumber(item.channel_length_km) }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ formatNumber(item.additional_area_kanal) }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ formatNumber(item.channel_running_feet_rehab) }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ formatNumber(item.channel_running_feet_new) }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ formatNumber(item.total_channel_running_feet) }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ formatNumber(item.protection_running_feet) }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ formatNumber(item.intake_length_running_feet) }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ formatNumber(item.per_household_cost) }}</td>
                                    <td class="px-3 py-2 text-gray-700">{{ formatNumber(item.scheme_cost) }}</td>
                                </tr>
                                <tr v-if="!schemes.data.length">
                                    <td colspan="30" class="px-3 py-6 text-center text-gray-500">No irrigation schemes found.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="p-4 border-t border-gray-100">
                        <Pagination :links="schemes.links" @pagination-link-clicked="goToPage" />
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import { computed, ref } from 'vue';
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

const totals = computed(() =>
    props.rows.reduce(
        (acc, row) => {
            acc.cbos += row.cbos_formed ?? 0;
            acc.members += row.total_members ?? 0;
            acc.exposures += row.exposure_visits ?? 0;
            acc.exposureParticipants += row.exposure_participants ?? 0;
            acc.om += row.om_trainings ?? 0;
            acc.omParticipants += row.om_training_participants ?? 0;
            acc.applianceWomen += row.appliance_sessions_women ?? 0;
            acc.applianceParticipantsWomen += row.appliance_participants_women ?? 0;
            return acc;
        },
        { cbos: 0, members: 0, exposures: 0, exposureParticipants: 0, om: 0, omParticipants: 0, applianceWomen: 0, applianceParticipantsWomen: 0 },
    ),
);

const applyFilters = () => {
    router.get(route('mhp.reports.district'), form.value, {
        preserveState: true,
        replace: true,
    });
};

const clearFilters = () => {
    form.value.district = '';
    applyFilters();
};

const exportCsv = () => {
    window.location.href = route('mhp.reports.district.export', form.value);
};
</script>

<template>
    <AppLayout title="District Wise MHP Data">
        <template #header>
            <div class="flex flex-col gap-2">
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">District Wise MHP Data</h2>
                <p class="text-sm text-gray-500">Counts of CBO formation and outreach activities, filtered by district.</p>
            </div>
        </template>

        <div class="py-10">
            <div class="max-w-6xl mx-auto sm:px-6 lg:px-8 space-y-6">
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
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">CBOs formed</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Total members</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Exposure visits</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Exposure participants</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">O&M trainings</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">O&M participants</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Electrical appliance sessions (women)</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Electrical appliance participants (women)</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-100">
                                <tr v-if="!props.rows.length">
                                    <td colspan="9" class="px-4 py-6 text-center text-sm text-gray-500">No records for the selected filters.</td>
                                </tr>
                                <tr v-for="row in props.rows" :key="row.district">
                                    <td class="px-4 py-3 text-sm text-gray-700">{{ row.district }}</td>
                                    <td class="px-4 py-3 text-sm text-right font-semibold text-gray-800">{{ row.cbos_formed }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.total_members?.toLocaleString() }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.exposure_visits }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.exposure_participants }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.om_trainings }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.om_training_participants }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.appliance_sessions_women }}</td>
                                    <td class="px-4 py-3 text-sm text-right text-gray-700">{{ row.appliance_participants_women }}</td>
                                </tr>
                            </tbody>
                            <tfoot v-if="props.rows.length" class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">Totals</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-800">{{ totals.cbos }}</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-800">{{ totals.members.toLocaleString() }}</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-800">{{ totals.exposures }}</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-800">{{ totals.exposureParticipants }}</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-800">{{ totals.om }}</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-800">{{ totals.omParticipants }}</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-800">{{ totals.applianceWomen }}</th>
                                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-800">{{ totals.applianceParticipantsWomen }}</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

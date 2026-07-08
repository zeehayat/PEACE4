<script setup>
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import SelectInput from '@/Components/SelectInput.vue';

const props = defineProps({
    districts: Array,
    filters: Object,
    rows: Array,
});

const district = ref(props.filters?.district || '');

const applyFilter = () => {
    router.get(route('lrm.report.index'), { district: district.value }, { preserveState: true });
};

const exportCsv = () => {
    window.location.href = route('lrm.report.export', { district: district.value });
};
</script>

<template>
    <AppLayout title="LRM/NRM Report">
        <div class="py-8 max-w-7xl mx-auto px-4">
            <div class="flex items-center justify-between mb-6">
                <h1 class="text-xl font-bold text-slate-900">LRM/NRM Targets vs. Achievements</h1>
                <button @click="exportCsv" class="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-semibold">Export CSV</button>
            </div>

            <div class="mb-6 w-64">
                <SelectInput
                    v-model="district"
                    :options="[{ id: '', name: 'All Districts' }, ...districts.map(d => ({ id: d, name: d }))]"
                    option-label="name"
                    option-value="id"
                    @change="applyFilter"
                />
            </div>

            <div class="overflow-x-auto bg-white border border-slate-200 rounded-lg">
                <table class="min-w-full text-sm text-left">
                    <thead class="bg-slate-50 text-slate-600 uppercase text-xs">
                        <tr>
                            <th class="px-4 py-3">District</th>
                            <th class="px-4 py-3">CBO</th>
                            <th class="px-4 py-3 text-right">Forest Plants (Target / Achieved)</th>
                            <th class="px-4 py-3 text-right">Fruit Plants (Target / Achieved)</th>
                            <th class="px-4 py-3 text-right">DRR Training (Target / Achieved)</th>
                            <th class="px-4 py-3 text-right">Check Dams (Target / Achieved)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in rows" :key="row.id" class="border-t border-slate-100">
                            <td class="px-4 py-2">{{ row.district }}</td>
                            <td class="px-4 py-2">{{ row.cbo_name }}</td>
                            <td class="px-4 py-2 text-right">{{ row.target_forest_plants_count ?? '—' }} / {{ row.achieved_forest_plants_count ?? '—' }}</td>
                            <td class="px-4 py-2 text-right">{{ row.target_fruit_plants_count ?? '—' }} / {{ row.achieved_fruit_plants_count ?? '—' }}</td>
                            <td class="px-4 py-2 text-right">{{ row.target_drr_training_persons ?? '—' }} / {{ row.achieved_drr_training_persons ?? '—' }}</td>
                            <td class="px-4 py-2 text-right">{{ row.target_check_dams_value ?? '—' }} / {{ row.achieved_check_dams_value ?? '—' }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </AppLayout>
</template>

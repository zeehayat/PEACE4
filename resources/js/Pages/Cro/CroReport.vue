<script setup>
import { ref, computed, watch } from 'vue';
import { router } from '@inertiajs/vue3';
import { route } from 'ziggy-js';
import AppLayout from '@/Layouts/AppLayout.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SelectInput from '@/Components/SelectInput.vue';
import TextInput from '@/Components/TextInput.vue';
import InputLabel from '@/Components/InputLabel.vue';
import { debounce } from 'lodash';

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
    search: props.filters.search || '',
});

// Client-side sorting
const sortKey = ref('');
const sortOrder = ref('asc');

const sortBy = (key) => {
    if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortKey.value = key;
        sortOrder.value = 'asc';
    }
};

const sortedRows = computed(() => {
    if (!sortKey.value) return props.rows;

    return [...props.rows].sort((a, b) => {
        let valA = a[sortKey.value];
        let valB = b[sortKey.value];

        if (valA === null || valA === undefined) valA = '';
        if (valB === null || valB === undefined) valB = '';

        const numA = parseFloat(valA);
        const numB = parseFloat(valB);
        if (!isNaN(numA) && !isNaN(numB) && typeof valA !== 'string') {
             valA = numA;
             valB = numB;
        }

        if (valA < valB) return sortOrder.value === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder.value === 'asc' ? 1 : -1;
        return 0;
    });
});

const applyFilters = () => {
    router.get(route('cro.reports.index'), form.value, {
        preserveState: true,
        replace: true,
    });
};

const debouncedSearch = debounce(() => {
    applyFilters();
}, 500);

watch(() => form.value.search, () => {
    debouncedSearch();
});

const clearFilters = () => {
    form.value.district = '';
    form.value.search = '';
    applyFilters();
};

const exportExcel = () => {
    const params = new URLSearchParams(form.value);
    window.location.href = route('cro.reports.export') + '?' + params.toString();
};
</script>

<template>
    <AppLayout title="CRO Report">
        <template #header>
            <div class="flex flex-col gap-1">
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">CRO Report</h2>
                <p class="text-sm text-gray-500">Comprehensive report of Community Representative Organizations.</p>
            </div>
        </template>

        <div class="py-10">
            <div class="w-full px-4 sm:px-6 lg:px-8 space-y-6">
                
                <!-- Filters Section -->
                <div class="bg-white shadow-sm sm:rounded-lg p-6 border border-gray-100">
                    <div class="flex flex-wrap items-end gap-6 justify-between">
                        <div class="flex flex-wrap gap-4 items-end flex-grow">
                            <!-- District Filter -->
                            <div>
                                <InputLabel for="district" value="District" />
                                <SelectInput
                                    id="district"
                                    v-model="form.district"
                                    :options="[{ value: '', label: 'All Districts' }, ...props.districts.map((d) => ({ value: d, label: d }))]"
                                    class="mt-1 w-48"
                                    @change="applyFilters"
                                />
                            </div>

                            <!-- Search Filter -->
                            <div class="flex-grow max-w-md">
                                <InputLabel for="search" value="Search (Name, Village, President)" />
                                <TextInput
                                    id="search"
                                    v-model="form.search"
                                    type="text"
                                    class="mt-1 block w-full"
                                    placeholder="Search..."
                                />
                            </div>

                            <div class="flex gap-2 pb-1">
                                <PrimaryButton @click="applyFilters" class="h-10">Search</PrimaryButton>
                                <button
                                    type="button"
                                    class="h-10 px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
                                    @click="clearFilters"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>

                        <!-- Export Button -->
                        <PrimaryButton class="h-10 bg-green-600 hover:bg-green-700 whitespace-nowrap" @click="exportExcel">
                            Export to Excel
                        </PrimaryButton>
                    </div>
                </div>

                <!-- Data Table -->
                <div class="bg-white shadow-sm sm:rounded-lg border border-gray-100">
                    <div class="overflow-x-auto max-h-[75vh] relative"> 
                        <table class="min-w-max divide-y divide-gray-200 text-sm">
                            <thead class="bg-gray-50 sticky top-0 z-10 shadow-sm">
                                <tr>
                                    <th v-for="(header, key) in {
                                        district: 'District',
                                        tehsil: 'Tehsil',
                                        village_council: 'VC/NC',
                                        village: 'Village',
                                        cro_name: 'CRO Name',
                                        date_of_cro_formation: 'Formation Date',
                                        gender: 'Gender',
                                        president_name: 'President',
                                        secretary_name: 'Secretary',
                                        total_members: 'Total Members',
                                        no_of_cro_members: 'CRO Members',
                                        no_of_community_dialogues: 'Dialogues',
                                        date_final_community_dialogue: 'Dialogue Date',
                                        exposure_visit_participants: 'Exp. Visit Ptx',
                                        om_training_participants: 'O&M Ptx',
                                        electrical_training_participants: 'Elec. Ptx',
                                    }" :key="key" 
                                    class="px-3 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 whitespace-nowrap"
                                    @click="sortBy(key)">
                                        <div class="flex items-center gap-1">
                                            {{ header }}
                                            <span v-if="sortKey === key" class="text-xs">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-100">
                                <tr v-if="!sortedRows.length">
                                    <td colspan="100" class="px-4 py-8 text-center text-gray-500">No records found.</td>
                                </tr>
                                <tr v-for="row in sortedRows" :key="row.id" class="hover:bg-gray-50 transition-colors">
                                    <td v-for="key in [
                                        'district', 'tehsil', 'village_council', 'village', 'cro_name',
                                        'date_of_cro_formation', 'gender', 'president_name', 'secretary_name',
                                        'total_members', 'no_of_cro_members', 'no_of_community_dialogues',
                                        'date_final_community_dialogue', 'exposure_visit_participants',
                                        'om_training_participants', 'electrical_training_participants'
                                    ]" :key="key" class="px-3 py-2 whitespace-nowrap text-gray-700 border-r border-gray-50 last:border-r-0">
                                        {{ row[key] }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

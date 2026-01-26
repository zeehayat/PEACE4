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
    statuses: {
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
    status: props.filters.status || '',
    search: props.filters.search || '',
});

// Client-side sorting
const sortKey = ref('');
const sortOrder = ref('asc'); // 'asc' or 'desc'

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

        // Handle nulls always at bottom or top? Let's treat null as empty string/0
        if (valA === null || valA === undefined) valA = '';
        if (valB === null || valB === undefined) valB = '';

        // Numeric sort if applicable
        const numA = parseFloat(valA);
        const numB = parseFloat(valB);
        if (!isNaN(numA) && !isNaN(numB) && typeof valA !== 'string') { // Check type to avoid parsing strings like "10-Oct" as 10
             // Ideally rely on data type, but this is simple generic sort
             // Better: Let's assume numbers are numbers in JSON
             valA = numA;
             valB = numB;
        }

        if (valA < valB) return sortOrder.value === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder.value === 'asc' ? 1 : -1;
        return 0;
    });
});

const applyFilters = () => {
    router.get(route('mhp.reports.detailed'), form.value, {
        preserveState: true,
        replace: true,
    });
};

// Debounce search
const debouncedSearch = debounce(() => {
    applyFilters();
}, 500);

watch(() => form.value.search, () => {
    debouncedSearch();
});

const clearFilters = () => {
    form.value.district = '';
    form.value.status = '';
    form.value.search = '';
    applyFilters();
};

const exportExcel = () => {
    // Generate URL manually to include current filters
    const params = new URLSearchParams(form.value);
    window.location.href = route('mhp.reports.detailed.export') + '?' + params.toString();
};
</script>

<template>
    <AppLayout title="Detailed MHP Report">
        <template #header>
            <div class="flex flex-col gap-1">
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">Detailed MHP Report</h2>
                <p class="text-sm text-gray-500">Comprehensive report with sorting, filtering, and detailed procurement info.</p>
            </div>
        </template>

        <div class="py-10">
            <!-- Widen the container to fit the massive table -->
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

                            <!-- Status Filter -->
                            <div>
                                <InputLabel for="status" value="Status" />
                                <SelectInput
                                    id="status"
                                    v-model="form.status"
                                    :options="[{ value: '', label: 'All Statuses' }, ...props.statuses.map((s) => ({ value: s, label: s }))]"
                                    class="mt-1 w-48"
                                    @change="applyFilters"
                                />
                            </div>

                            <!-- Search Filter -->
                            <div class="flex-grow max-w-md">
                                <InputLabel for="search" value="Search (MHP Name, CBO, Reference)" />
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
                     <!-- Max height and auto overflow for sticky header support -->
                    <div class="overflow-x-auto max-h-[75vh] relative"> 
                        <table class="min-w-max divide-y divide-gray-200 text-sm">
                            <thead class="bg-gray-50 sticky top-0 z-10 shadow-sm">
                                <tr>
                                    <!-- Using TH for every column. Adding click handler for sorting. -->
                                    <th v-for="(header, key) in {
                                        district: 'District',
                                        tehsil: 'Tehsil',
                                        vc_nc: 'VC/NC',
                                        village: 'Village',
                                        cbo_name: 'CBO Name',
                                        type: 'Type',
                                        dialogue_date: 'Dialogue Date',
                                        social_assessment: 'Social Assessment',
                                        technical_survey_date: 'Tech Survey',
                                        existing_capacity_kw: 'Exist KW',
                                        total_capacity_kw: 'Total KW',
                                        net_head_ft: 'Net Head (ft)',
                                        discharge_cusecs: 'Discharge',
                                        channel_length_ft: 'Channel (ft)',
                                        turbine_type: 'Turbine Type',
                                        turbine_count: 'Turbines',
                                        ht_length_km: 'HT (km)',
                                        lt_length_km: 'LT (km)',
                                        transformer_count: 'Transformers',
                                        total_households: 'Households',
                                        commercial_consumers: 'Commercial',
                                        total_connections: 'Connections',
                                        population: 'Population',
                                        total_cost: 'Total Cost',
                                        per_kw_cost: 'Per KW',
                                        per_hh_cost: 'Per HH',
                                        per_beneficiary_cost: 'Per Beneficiary',
                                        presented_mc: 'Presented MC',
                                        shared_opm: 'Shared OPM',
                                        review_meeting_opm: 'Review OPM',
                                        opm_visit_date: 'OPM Visit',
                                        eu_final_review: 'EU Final Review',
                                        eu_approval: 'EU Approval',
                                    }" :key="key" 
                                    class="px-3 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 whitespace-nowrap"
                                    @click="sortBy(key)">
                                        <div class="flex items-center gap-1">
                                            {{ header }}
                                            <span v-if="sortKey === key" class="text-xs">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                                        </div>
                                    </th>

                                    <!-- Grouped Headers handled simpler for now, just flat list -->
                                    <!-- Civil Procurement -->
                                     <th v-for="(header, key) in {
                                        civil_advertisement: 'Civil Advert',
                                        civil_pre_bid: 'Civil Pre-Bid',
                                        civil_tech_bid: 'Civil Tech Bid',
                                        civil_fin_bid: 'Civil Fin Bid',
                                        civil_contract_award: 'Civil Award',
                                        civil_contractor_amount: 'Civil Amount'
                                     }" :key="key" class="px-3 py-3 text-left font-semibold text-blue-600 uppercase tracking-wider cursor-pointer hover:bg-blue-50 whitespace-nowrap" @click="sortBy(key)">{{ header }}</th>

                                     <!-- T&D Procurement -->
                                     <th v-for="(header, key) in {
                                        tnd_advertisement: 'T&D Advert',
                                        tnd_pre_bid: 'T&D Pre-Bid',
                                        tnd_tech_bid: 'T&D Tech Bid',
                                        tnd_fin_bid: 'T&D Fin Bid',
                                        tnd_contract_award: 'T&D Award',
                                        tnd_contractor_amount: 'T&D Amount'
                                     }" :key="key" class="px-3 py-3 text-left font-semibold text-purple-600 uppercase tracking-wider cursor-pointer hover:bg-purple-50 whitespace-nowrap" @click="sortBy(key)">{{ header }}</th>

                                     <!-- EME Procurement -->
                                     <th v-for="(header, key) in {
                                        eme_advertisement: 'EME Advert',
                                        eme_pre_bid: 'EME Pre-Bid',
                                        eme_tech_bid: 'EME Tech Bid',
                                        eme_fin_bid: 'EME Fin Bid',
                                        eme_contract_award: 'EME Award',
                                        eme_contractor_amount: 'EME Amount'
                                     }" :key="key" class="px-3 py-3 text-left font-semibold text-indigo-600 uppercase tracking-wider cursor-pointer hover:bg-indigo-50 whitespace-nowrap" @click="sortBy(key)">{{ header }}</th>
                                    
                                     <!-- Progress -->
                                     <th v-for="(header, key) in {
                                        civil_initiation_ground_breaking: 'Civil Initiation',
                                        civil_total: 'Civil Total',
                                        civil_financial_progress: 'Civil Fin %',
                                        civil_physical_progress: 'Civil Phy %',
                                        
                                        tnd_initiation_date: 'T&D Initiation',
                                        tnd_total: 'T&D Total',
                                        tnd_financial_progress: 'T&D Fin %',
                                        tnd_physical_progress: 'T&D Phy %',
                                        
                                        eme_initiation_date: 'EME Initiation',
                                        eme_total: 'EME Total',
                                        eme_financial_progress: 'EME Fin %',
                                        eme_physical_progress: 'EME Phy %',
                                        
                                        overall_physical_progress: 'Overall Phy %',
                                        overall_disbursed: 'Overall Disbursed',
                                        overall_financial_progress: 'Overall Fin %',
                                     }" :key="key" class="px-3 py-3 text-left font-semibold text-green-600 uppercase tracking-wider cursor-pointer hover:bg-green-50 whitespace-nowrap" @click="sortBy(key)">{{ header }}</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-100">
                                <tr v-if="!sortedRows.length">
                                    <td colspan="100" class="px-4 py-8 text-center text-gray-500">No records found.</td>
                                </tr>
                                <tr v-for="row in sortedRows" :key="row.id" class="hover:bg-gray-50 transition-colors">
                                    <td v-for="key in [
                                        'district', 'tehsil', 'vc_nc', 'village', 'cbo_name', 'type',
                                        'dialogue_date', 'social_assessment', 'technical_survey_date',
                                        'existing_capacity_kw', 'total_capacity_kw', 'net_head_ft', 'discharge_cusecs',
                                        'channel_length_ft', 'turbine_type', 'turbine_count',
                                        'ht_length_km', 'lt_length_km', 'transformer_count',
                                        'total_households', 'commercial_consumers', 'total_connections', 'population',
                                        'total_cost', 'per_kw_cost', 'per_hh_cost', 'per_beneficiary_cost',
                                        'presented_mc', 'shared_opm', 'review_meeting_opm', 'opm_visit_date', 'eu_final_review', 'eu_approval',
                                        
                                        'civil_advertisement', 'civil_pre_bid', 'civil_tech_bid', 'civil_fin_bid', 'civil_contract_award', 'civil_contractor_amount',
                                        'tnd_advertisement', 'tnd_pre_bid', 'tnd_tech_bid', 'tnd_fin_bid', 'tnd_contract_award', 'tnd_contractor_amount',
                                        'eme_advertisement', 'eme_pre_bid', 'eme_tech_bid', 'eme_fin_bid', 'eme_contract_award', 'eme_contractor_amount',
                                        
                                        'civil_initiation_ground_breaking', 'civil_total', 'civil_financial_progress', 'civil_physical_progress',
                                        'tnd_initiation_date', 'tnd_total', 'tnd_financial_progress', 'tnd_physical_progress',
                                        'eme_initiation_date', 'eme_total', 'eme_financial_progress', 'eme_physical_progress',
                                        'overall_physical_progress', 'overall_disbursed', 'overall_financial_progress'
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

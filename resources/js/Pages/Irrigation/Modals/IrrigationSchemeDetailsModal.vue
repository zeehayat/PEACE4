<script setup>
import { ref, computed } from 'vue';
import Modal from '@/Components/Modal.vue';
import DetailGrid from '@/Components/Shared/DetailGrid.vue';
import DetailItem from '@/Components/Shared/DetailItem.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';
import { formatDate, formatDecimal } from '@/Utils/formatters';

const props = defineProps({
    show: Boolean,
    scheme: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close']);
const activeTab = ref('general');

const tabs = [
    { id: 'general', name: 'Overview', icon: 'info' },
    { id: 'technical', name: 'Technical specs', icon: 'water_drop' },
];

const hasAttachments = computed(() => props.scheme.attachments_frontend && props.scheme.attachments_frontend.length > 0);
const hasRemarks = computed(() => props.scheme.remarks && props.scheme.remarks.trim() !== '');
const hasProfile = computed(() => !!props.scheme.profile);

const printDetails = () => {
    window.print();
};
</script>

<template>
    <Modal :show="show" @close="emit('close')" :maxWidth="'5xl'" :title="`Irrigation Scheme Details`">
        <div class="flex flex-col max-h-[85vh] bg-surface text-ink-800 print-content">
            
            <!-- Tabbed Navigation Header -->
            <div class="flex border-b border-ink-200 px-6 bg-paper-50 shrink-0 print:hidden">
                <button 
                    v-for="tab in tabs" 
                    :key="tab.id"
                    @click="activeTab = tab.id"
                    class="flex items-center gap-2 py-4 px-4 text-sm font-medium border-b-2 -mb-px transition focus:outline-none"
                    :class="activeTab === tab.id ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-ink-500 hover:text-ink-700'"
                >
                    <span class="material-symbols-outlined text-lg">{{ tab.icon }}</span>
                    {{ tab.name }}
                </button>
            </div>

            <!-- Scrollable Tab Content Container -->
            <div class="flex-1 overflow-y-auto p-6 space-y-6">
                
                <!-- General Info Tab Panel -->
                <div v-show="activeTab === 'general' || window?.matchMedia?.('print').matches" class="space-y-6">
                    <div>
                        <h3 class="text-base font-bold text-ink-800 border-b pb-2 mb-4">Scheme Overview</h3>
                        <DetailGrid>
                            <DetailItem label="CBO" :value="scheme.cbo?.reference_code" />
                            <DetailItem label="Status" :value="scheme.status" />
                            <DetailItem label="Scheme Type" :value="scheme.scheme_type" />
                            <DetailItem label="Sub-Scheme Type" :value="scheme.sub_scheme_type" />
                            <DetailItem v-if="hasProfile" label="Established By" :value="scheme.profile.established_by" />
                            <DetailItem v-if="hasProfile" label="Establishment Date" :value="formatDate(scheme.profile.month_year_establishment)" />
                            <DetailItem v-if="hasProfile" label="Beneficiary Farmers" :value="scheme.profile.beneficiary_farmers" />
                            <DetailItem label="Direct Household Beneficiaries" :value="scheme.direct_household_beneficiary" />
                            <DetailItem label="Indirect Household Beneficiaries" :value="scheme.indirect_household_beneficiary" />
                            <DetailItem label="Validation Visit by District Engineer" :value="formatDate(scheme.validation_visit_date)" />
                            <DetailItem label="Recent Visit by Senior Engineer" :value="formatDate(scheme.recent_senior_engineer_visit_date)" />
                        </DetailGrid>
                        
                        <div v-if="hasRemarks" class="mt-6 p-4 bg-paper-50 rounded-xl border border-ink-200">
                            <p class="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-1">Remarks</p>
                            <div class="text-sm text-ink-900 prose max-w-none" v-html="scheme.remarks"></div>
                        </div>

                        <div v-if="hasAttachments" class="mt-6">
                            <p class="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-2">Attachments</p>
                            <AttachmentViewer :attachments="scheme.attachments_frontend" />
                        </div>
                    </div>
                </div>

                <!-- Technical Specs Tab Panel -->
                <div v-show="activeTab === 'technical'" class="space-y-6">
                    <div>
                        <h3 class="text-base font-bold text-ink-800 border-b pb-2 mb-4">Technical Details</h3>
                        <DetailGrid>
                            <DetailItem label="Water Availability" :value="scheme.water_availability_cusecs ? `${formatDecimal(scheme.water_availability_cusecs)} Cusecs` : 'N/A'" tooltip="Flow volume of water available, measured in Cubic Feet per Second (Cusecs)." />
                            <DetailItem label="No. of Watercourses" :value="scheme.number_of_watercourses" />
                            <DetailItem v-if="hasProfile" label="Channel Length" :value="scheme.profile.channel_length_km ? `${formatDecimal(scheme.profile.channel_length_km)} KM` : 'N/A'" />
                            <DetailItem v-if="hasProfile" label="Land Area" :value="scheme.profile.land_area_hectares ? `${formatDecimal(scheme.profile.land_area_hectares)} Hectares` : 'N/A'" />
                            <DetailItem v-if="hasProfile" label="Technical Surveys Date" :value="formatDate(scheme.profile.date_technical_surveys)" />
                            <DetailItem v-if="hasProfile" label="Northening Coordinate" :value="scheme.profile.northening" />
                            <DetailItem v-if="hasProfile" label="Easting Coordinate" :value="scheme.profile.easting" />
                            <DetailItem v-if="hasProfile" label="Elevation" :value="scheme.profile.elevation ? `${formatDecimal(scheme.profile.elevation)} FT` : 'N/A'" />
                        </DetailGrid>
                    </div>
                </div>
            </div>

            <!-- Footer Section -->
            <div class="px-6 py-4 bg-paper-50 border-t border-ink-200 shrink-0 flex justify-end print:hidden">
                <button
                    type="button"
                    @click="printDetails"
                    class="inline-flex items-center px-4 py-2 bg-emerald-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-700 active:bg-emerald-800 transition mr-3"
                >
                    <span class="material-symbols-outlined text-sm mr-2">print</span>
                    Print Details
                </button>
                <PrimaryButton @click="emit('close')">Close</PrimaryButton>
            </div>
        </div>
    </Modal>
</template>

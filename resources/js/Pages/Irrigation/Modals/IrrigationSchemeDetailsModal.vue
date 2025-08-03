<script setup>
import { computed } from 'vue';
import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';

const props = defineProps({
    show: Boolean,
    scheme: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close']);

// Helper function to format nullable dates
const formatNullableDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
        return 'Invalid Date';
    }
};

const formatNullableDecimal = (value) => {
    if (value === null || value === undefined) return 'N/A';
    return parseFloat(value).toFixed(2);
};

const hasAttachments = computed(() => props.scheme.attachments_frontend && props.scheme.attachments_frontend.length > 0);
const hasRemarks = computed(() => props.scheme.remarks && props.scheme.remarks.trim() !== '');
const hasProfile = computed(() => !!props.scheme.profile);
</script>

<template>
    <Modal :show="show" @close="emit('close')" :maxWidth="'5xl'" :title="`Irrigation Scheme Details`">
        <div class="p-6 overflow-y-auto max-h-[85vh] text-gray-800 print-content">

            <section class="mb-8 border-b pb-6">
                <h2 class="text-xl font-bold mb-4">General Information</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div class="detail-item"><p class="font-semibold text-gray-700">CBO:</p><p>{{ scheme.cbo?.reference_code ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Status:</p><p>{{ scheme.status ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Scheme Type:</p><p>{{ scheme.scheme_type ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Sub-Scheme Type:</p><p>{{ scheme.sub_scheme_type ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Water Availability:</p><p>{{ formatNullableDecimal(scheme.water_availability_cusecs) }} cusecs</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">No. of Watercourses:</p><p>{{ scheme.number_of_watercourses ?? 'N/A' }}</p></div>
                </div>
            </section>

            <div v-if="hasProfile" class="mb-8 border-b pb-6">
                <h2 class="text-xl font-bold mb-4">Profile Details</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div class="detail-item"><p class="font-semibold text-gray-700">Beneficiary Farmers:</p><p>{{ scheme.profile.beneficiary_farmers ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Channel Length:</p><p>{{ formatNullableDecimal(scheme.profile.channel_length_km) }} KM</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Land Area:</p><p>{{ formatNullableDecimal(scheme.profile.land_area_hectares) }} Hectares</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Established:</p><p>{{ formatNullableDate(scheme.profile.month_year_establishment) }} by {{ scheme.profile.established_by ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Date of Technical Surveys:</p><p>{{ formatNullableDate(scheme.profile.date_technical_surveys) }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Northening:</p><p>{{ scheme.profile.northening ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Easting:</p><p>{{ scheme.profile.easting ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Elevation:</p><p>{{ formatNullableDecimal(scheme.profile.elevation) }} ft</p></div>
                </div>
            </div>

            <div v-if="hasRemarks" class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h2 class="text-xl font-bold mb-4">Remarks</h2>
                <div class="text-gray-800 prose max-w-none" v-html="scheme.remarks"></div>
            </div>

            <div v-if="hasAttachments" class="mt-6">
                <h2 class="text-xl font-bold mb-4">Attachments</h2>
                <AttachmentViewer :attachments="scheme.attachments_frontend" />
            </div>
            <div v-else class="mt-6 text-gray-500 text-sm">
                No attachments available.
            </div>

            <div class="flex justify-end mt-6 print:hidden">
                <PrimaryButton @click="emit('close')">Close</PrimaryButton>
            </div>
        </div>
    </Modal>
</template>

<style scoped>
.detail-item p {
    margin-bottom: 0.25rem;
}
.detail-item p:last-child {
    margin-bottom: 0;
}
</style>

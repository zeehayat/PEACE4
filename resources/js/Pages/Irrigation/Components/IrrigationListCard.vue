<script setup>
import { computed } from 'vue';

const props = defineProps({
    scheme: { type: Object, required: true },
    openActionMenuId: [Number, null], // ID of the currently open menu
    menuPosition: { // Receives position for teleported menu
        type: Object,
        default: () => ({ top: 0, left: 0, width: 0, direction: 'down' }),
    },
});

const emit = defineEmits([
    'toggle-action-menu',
    'view-details',
    'edit-scheme',
    'manage-admin-approval',
    'manage-physical-progress',
    'manage-financial-installment',
    'delete-scheme',
]);

// Helper function to get status class
function getStatusClass(status) {
    switch (status) {
        case 'New': return 'bg-blue-100 text-blue-800 border border-blue-200';
        case 'Active': return 'bg-green-100 text-green-800 border border-green-200';
        case 'Inactive': return 'bg-gray-100 text-gray-800 border border-gray-200';
        default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
}

// Helper function to format nullable dates for display
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

</script>

<template>

    <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:scale-[1.01] relative">

        <div class="absolute top-4 right-4 z-10">
            <button
                @click.stop="emit('toggle-action-menu', scheme.id, $event)"
                class="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-200/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-opacity action-menu-trigger"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
            </button>
            <!-- Menu content is teleported from Irrigation/Index.vue -->
        </div>

        <div class="mt-4 pt-4 border-t border-gray-200">
            <div class="flex items-center justify-between mb-3">
                <p class="text-sm text-gray-500">Status</p>
                <span :class="getStatusClass(scheme.status)" class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border">
                  {{ scheme.status ?? 'N/A' }}
                </span>
            </div>

            <div class="space-y-2">
                <div class="flex items-center justify-between">
                    <p class="text-sm text-gray-500">CBO</p>
                    <p class="font-semibold text-sm text-gray-900">{{ scheme.cbo?.reference_code ?? 'N/A' }}</p>
                </div>
                <div v-if="scheme.cbo" class="text-sm text-gray-600">
                    <p>{{ scheme.cbo.village ?? 'N/A' }}, {{ scheme.cbo.village_council ?? 'N/A' }}</p>
                    <p>{{ scheme.cbo.tehsil ?? 'N/A' }}, {{ scheme.cbo.district ?? 'N/A' }}</p>
                </div>
            </div>

            <div class="space-y-2 mt-4">
                <div class="flex items-center justify-between">
                    <p class="text-sm text-gray-500">Scheme Type</p>
                    <p class="font-semibold text-sm text-gray-900">{{ scheme.scheme_type ?? 'N/A' }}</p>
                </div>
                <div class="flex items-center justify-between">
                    <p class="text-sm text-gray-500">Sub-Scheme Type</p>
                    <p class="font-semibold text-sm text-gray-900">{{ scheme.sub_scheme_type ?? 'N/A' }}</p>
                </div>
            </div>

            <div v-if="scheme.profile" class="space-y-2 mt-4 pt-4 border-t border-gray-200">
                <div class="flex items-center justify-between">
                    <p class="text-sm text-gray-500">Established by</p>
                    <p class="font-semibold text-sm text-gray-900">{{ scheme.profile.established_by ?? 'N/A' }}</p>
                </div>
                <div class="flex items-center justify-between">
                    <p class="text-sm text-gray-500">Land Area (Ha)</p>
                    <p class="font-semibold text-sm text-gray-900">{{ scheme.profile.land_area_hectares ?? 'N/A' }}</p>
                </div>
                <div class="flex items-center justify-between">
                    <p class="text-sm text-gray-500">Channel Length (Km)</p>
                    <p class="font-semibold text-sm text-gray-900">{{ scheme.profile.channel_length_km ?? 'N/A' }}</p>
                </div>
                <div class="flex items-center justify-between">
                    <p class="text-sm text-gray-500">Beneficiary Farmers</p>
                    <p class="font-semibold text-sm text-gray-900">{{ scheme.profile.beneficiary_farmers ?? 'N/A' }}</p>
                </div>
                <div class="flex items-center justify-between">
                    <p class="text-sm text-gray-500">Established on</p>
                    <p class="font-semibold text-sm text-gray-900">{{ formatNullableDate(scheme.profile.month_year_establishment) }}</p>
                </div>
                <div class="flex items-center justify-between">
                    <p class="text-sm text-gray-500">Date of Technical Survey</p>
                    <p class="font-semibold text-sm text-gray-900">{{ formatNullableDate(scheme.profile.date_technical_surveys) }}</p>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

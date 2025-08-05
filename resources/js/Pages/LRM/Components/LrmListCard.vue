<script setup>
import { computed } from 'vue';

const props = defineProps({
    lrmCommittee: { type: Object, required: true }, // Changed prop name to lrmCommittee
    openActionMenuId: [Number, null], // ID of the currently open menu
    menuPosition: { // Receives position for teleported menu
        type: Object,
        default: () => ({ top: 0, left: 0, width: 0, direction: 'down' }),
    },
});

const emit = defineEmits([
    'toggle-action-menu',
    'view-details',
    'edit-lrm-committee',
    'delete-lrm-committee',
]);

// Helper function to get status class (LRM Committee doesn't have a direct 'status' enum, so this is a placeholder)
function getStatusClass(status) {
    return 'bg-gray-100 text-gray-800 border border-gray-200';
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
                @click.stop="emit('toggle-action-menu', lrmCommittee.id, $event)"
                class="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-200/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-opacity action-menu-trigger"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
            </button>
            <!-- Menu content is teleported from LRM/Index.vue -->
        </div>

        <div class="mt-4 pt-4 border-t border-gray-200">
            <div class="flex items-center justify-between mb-3">
                <p class="text-sm text-gray-500">CBO</p>
                <span class="font-semibold text-sm text-gray-900">{{ lrmCommittee.cbo?.reference_code ?? 'N/A' }}</span>
            </div>
            <div class="flex items-center justify-between">
                <p class="text-sm text-gray-500">Formed</p>
                <p class="font-semibold text-sm text-gray-900">{{ formatNullableDate(lrmCommittee.date_of_lrm_committee_formation) }}</p>
            </div>
            <div class="flex items-center justify-between">
                <p class="text-sm text-gray-500">Members</p>
                <p class="font-semibold text-sm text-gray-900">{{ lrmCommittee.no_of_lrm_committee_members ?? 'N/A' }}</p>
            </div>
            <div class="flex items-center justify-between">
                <p class="text-sm text-gray-500">NRM Plan Finalized</p>
                <p class="font-semibold text-sm text-gray-900">{{ lrmCommittee.date_of_nrm_plan_finalization ? formatNullableDate(lrmCommittee.date_of_nrm_plan_finalization) : 'N/A' }}</p>
            </div>
            <div class="flex items-center justify-between">
                <p class="text-sm text-gray-500">Land Covered (Ha)</p>
                <p class="font-semibold text-sm text-gray-900">{{ lrmCommittee.total_land_covered_hectares ?? 'N/A' }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

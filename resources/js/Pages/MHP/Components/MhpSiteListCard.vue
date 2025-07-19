<script setup>
import { computed, ref, onBeforeUnmount, onMounted } from 'vue';

const props = defineProps({
    site: { type: Object, required: true },
    openActionMenuId: [Number, null], // ID of the currently open menu
    menuPosition: { // New prop: receives the computed position for the teleported menu
        type: Object,
        default: () => ({ top: 0, left: 0, width: 0, direction: 'down' }),
    },
});

const emit = defineEmits([
    'toggle-action-menu', // Now emits siteId and event for positioning
    'view-details',
    'edit-info',
    'view-approval',
    'add-edit-approval',
    'open-revised-cost-modal',
    'view-report',
    'add-edit-view-completion',
    'view-completion', // New event for viewing completion explicitly
    'open-eme-progress',
    'open-operational-cost',
    'manage-physical-progress',
    'manage-financial-installment',
    'delete-site',
]);

// Helper functions (getFileIcon, getStatusClass, etc. - can be moved to a shared script)
function getFileIcon(file) {
    const ext = file.file_name.split('.').pop().toLowerCase();
    if (ext === 'pdf') return '📄';
    if (['doc', 'docx'].includes(ext)) return '📝';
    if (['xls', 'xlsx', 'csv'].includes(ext)) return '📊';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return '🖼️';
    return '📁';
}

function getStatusClass(status) {
    switch (status) {
        case 'New': return 'bg-blue-100 text-blue-800 border border-blue-200';
        case 'Rehabilitation': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
        case 'Upgradation': return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
        case 'Completed': return 'bg-green-100 text-green-800 border border-green-200';
        default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
}

function determineNextField(adminApproval) {
    if (!adminApproval) return 'revised_cost_1';
    if (!adminApproval.revised_cost_1) return 'revised_cost_1';
    if (!adminApproval.revised_cost_2) return 'revised_cost_2';
    if (!adminApproval.revised_cost_3) return 'revised_cost_3';
    return null;
}
function nextRevisedCostLabel(adminApproval) {
    const nextField = determineNextField(adminApproval);
    if (nextField === 'revised_cost_1') return '+ Add Revised Cost 1';
    if (nextField === 'revised_cost_2') return '+ Add Revised Cost 2';
    if (nextField === 'revised_cost_3') return '+ Add Revised Cost 3';
    return 'All Revised Costs Added';
}

// Ref to the button that triggers the menu for this specific card
const menuButtonRef = ref(null);

// Function to emit toggle with the button's event
const triggerToggle = (event) => {
    emit('toggle-action-menu', props.site.id, event);
};
</script>

<template>
    <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:scale-[1.01] relative">
        <div class="absolute top-4 right-4 z-10">
            <button
                ref="menuButtonRef"
                @click.stop="triggerToggle"
                class="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-200/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-opacity action-menu-trigger"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
            </button>
        </div>

        <div class="mt-4 pt-4 border-t border-gray-200">
            <div class="flex items-center justify-between mb-3">
                <p class="text-sm text-gray-500">Status</p>
                <span :class="getStatusClass(site.status)" class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border">
                  {{ site.status ?? 'N/A' }}
                </span>
            </div>
            <div class="flex items-center justify-between">
                <p class="text-sm text-gray-500">Admin Approval</p>
                <p :class="site.admin_approval ? 'text-green-600' : 'text-red-500'" class="font-semibold text-sm flex items-center gap-1">
                    <svg v-if="site.admin_approval" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
                    <svg v-else class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    {{ site.admin_approval ? 'Exists' : 'None' }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* No specific scoped styles needed here, as styling is handled by Tailwind and Index.vue */
</style>

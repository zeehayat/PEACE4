<script setup>
import { computed } from 'vue';

const props = defineProps({
    site: { type: Object, required: true },
    openActionMenuId: [Number, null], // ID of the currently open menu
    menuDirection: String, // 'up' or 'down' for menu positioning
});

const emit = defineEmits([
    'toggle-action-menu',
    'view-details',
    'edit-info',
    'view-approval',
    'add-edit-approval',
    'open-revised-cost-modal',
    'view-report',
    'add-edit-view-completion',
    'open-eme-progress',
    'open-operational-cost',
    'manage-physical-progress',
    'manage-financial-installment',
    'delete-site', // For the delete button
]);

// Helper to get file icon (should be moved to a shared MHP script util later)
function getFileIcon(file) {
    const ext = file.file_name.split('.').pop().toLowerCase();
    if (ext === 'pdf') return '📄';
    if (['doc', 'docx'].includes(ext)) return '📝';
    if (['xls', 'xlsx', 'csv'].includes(ext)) return '📊';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return '🖼️';
    return '📁';
}

// Helper to get status class (should be moved to a shared MHP script util later)
function getStatusClass(status) {
    switch (status) {
        case 'New': return 'bg-blue-100 text-blue-800 border border-blue-200';
        case 'Rehab': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
        case 'Upgradation': return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
        case 'Completed': return 'bg-green-100 text-green-800 border border-green-200';
        default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
}

// Helper to determine next revised cost field label
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
</script>

<template>
    <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:scale-[1.01] relative">
        <div class="absolute top-4 right-4 z-10 action-menu-container">
            <button @click.stop="emit('toggle-action-menu', site.id, $event)" class="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-200/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
            </button>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <div v-if="openActionMenuId === site.id" :class="['origin-top-right absolute w-56 rounded-xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-20 divide-y divide-gray-100', menuDirection === 'up' ? 'bottom-full mb-2 right-0' : 'top-full mt-2 right-0']">
                    <div class="py-1 text-sm text-gray-700">
                        <button @click="emit('view-details', site)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                            View Details
                        </button>
                        <button @click="emit('edit-info', site)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="M15 5l4 4"/></svg>
                            Edit Info
                        </button>
                        <button v-if="site.admin_approval" @click="emit('view-approval', site)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            View Approval
                        </button>
                        <button @click="emit('add-edit-approval', site, site.admin_approval ? 'update' : 'create')" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-circle"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                            {{ site.admin_approval ? 'Edit Approval' : '+ Add Approval' }}
                        </button>
                        <button @click="emit('open-revised-cost-modal', site)" :class="{ 'opacity-50 cursor-not-allowed': !determineNextField(site.admin_approval) }" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dollar-sign"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            {{ nextRevisedCostLabel(site.admin_approval) }}
                        </button>
                    </div>
                    <div class="py-1 text-sm text-gray-700">
                        <button @click="emit('view-report', site)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
                            View Report
                        </button>
                        <button @click="emit('add-edit-view-completion', site)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-square"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                            {{ site.completion ? 'Edit Completion' : '+ Add Completion' }}
                        </button>
                        <button v-if="site.completion" @click="emit('add-edit-view-completion', site, 'view')" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
                            View Completion
                        </button>
                    </div>
                    <div class="py-1 text-sm text-gray-700">
                        <button @click="emit('open-eme-progress', site)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-activity"><path d="M22 12H2"/><path d="M17 5 22 12 17 19"/><path d="M7 5 2 12 7 19"/></svg>
                            EME Progress
                        </button>
                        <button @click="emit('open-operational-cost', site)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dollar-sign"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            Operational Costs
                        </button>
                        <button @click="emit('manage-physical-progress', site)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bar-chart-2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
                            Manage Physical Progress
                        </button>
                        <button @click="emit('manage-financial-installment', site)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wallet"><path d="M21 12V7H5a2 2 0 0 0 0 4h16v-1a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h16v-1a2 2 0 0 0-2-2Z"/><path d="M10 12v.01"/></svg>
                            Manage Financial Installment
                        </button>
                    </div>
                    <div class="py-1 text-sm text-gray-700">
                        <button @click="emit('delete-site', site.id)" class="w-full text-left block px-4 py-2 hover:bg-red-100 text-red-600 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                            Delete Site
                        </button>
                    </div>
                </div>
            </transition>
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
.filepond-wrapper {
    /* Base styles for the root element */
    --filepond-font-family: 'Inter', sans-serif;
    --filepond-label-color: #475569; /* slate-600 */
}

.filepond--root {
    font-family: var(--filepond-font-family);
    background-color: #f8fafc; /* slate-50 */
    border-radius: 0.75rem; /* rounded-xl */
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

/* The drop panel */
.filepond--panel-root {
    background-color: #f1f5f9; /* slate-100 */
    border-radius: 0.5rem; /* rounded-lg */
    border: 2px dashed #cbd5e1; /* slate-300 */
    transition: all 0.2s ease-in-out;
}

.filepond--panel-root:hover,
.filepond--drophover .filepond--panel-root {
    border-color: #6366f1; /* indigo-500 */
    background-color: #eef2ff; /* indigo-50 */
}

/* The label */
.filepond--label-action {
    text-decoration: none;
}

/* Image preview styles */
.filepond--item-panel {
    background-color: #e2e8f0; /* slate-200 */
    border-radius: 0.5rem;
}

/* Remove border from the file info and image edit sections */
.filepond--file-info, .filepond--image-edit-button {
    color: var(--filepond-label-color);
}
.filepond--file-action-button {
    background-color: rgba(0,0,0,0.5);
    color: white;
}
</style>

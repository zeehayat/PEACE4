<script setup>
import { ref, computed, onMounted } from 'vue'
import { router, Link, usePage } from '@inertiajs/vue3'

import SideBar from "@/Components/SideBar.vue"; // Global component
import Toast from '@/Components/Toast.vue'; // Global component

// MHP-specific Components and Modals (from new structure)
import MhpSiteListCard from '@/Pages/MHP/Components/MhpSiteListCard.vue'; // New component, relative path

// Placeholders for MHP Modals (will be created in subsequent phases)
import MhpSiteCreateModal from '@/Pages/MHP/Modals/MhpSiteCreateModal.vue';
import MhpEditInfoModal from '@/Pages/MHP/Modals/MhpEditInfoModal.vue';
// import MhpAdminApprovalModal from '@/Pages/MHP/Modals/MhpAdminApprovalModal.vue';
// import ProjectPhysicalProgressModal from '@/Pages/MHP/Modals/ProjectPhysicalProgressModal.vue';
// import ProjectFinancialInstallmentModal from '@/Pages/MHP/Modals/ProjectFinancialInstallmentModal.vue';
// import MhpSiteDetailsModal from '@/Pages/MHP/Modals/MhpSiteDetailsModal.vue';
// import MhpApprovalViewModal from '@/Pages/MHP/Modals/MhpApprovalViewModal.vue';
// import AddRevisedCostModal from '@/Pages/MHP/Modals/AddRevisedCostModal.vue';
// import MhpReportModal from '@/Pages/MHP/Modals/MhpReportModal.vue';
// import MhpCompletionModal from '@/Pages/MHP/Modals/MhpCompletionModal.vue';
// import MhpEmeProgressModal from '@/Pages/MHP/Modals/MhpEmeProgressModal.vue';
// import OperationalCostModal from '@/Pages/MHP/Modals/OperationalCostModal.vue';


const props = defineProps({
    mhpSites: Object, // Paginated data for MHP Sites
    filters: Object,
    errors: Object // Validation errors from backend
})
const page = usePage() // To access shared Inertia props if needed

// --- Reactive State Variables ---
const selectedSite = ref(null) // The MHP Site object currently selected for modal/action
const toastVisible = ref(false)
const toastMessage = ref('')
const toastType = ref('success')
const searchTerm = ref(props.filters.search || '') // For search filter
const openActionMenuId = ref(null) // For controlling which action menu is open in MhpSiteListCard
const menuDirection = ref('down') // For controlling action menu dropdown direction

// Modal Visibility Control (true to show, false to hide)
const showSiteCreateModal = ref(false); // For adding new site
const showEditInfoModal = ref(false); // For editing site info
const showAdminApprovalModal = ref(false); // For managing admin approval
const approvalAction = ref('create'); // 'create' or 'update' for admin approval form

// Placeholder for other modals (will be added as we create them)
const showDetailsModal = ref(false);
const showApprovalViewModal = ref(false);
const showRevisedCostModal = ref(false);
const revisedCostField = ref('');
const showReportModal = ref(false);
const showCompletionModal = ref(false);
const completionMode = ref('create');
const selectedCompletion = ref(null);
const showEmeProgressModal = ref(false);
const showOperationalCostModal = ref(false);

const showProjectPhysicalProgressModal = ref(false);
const physicalProgressModalMode = ref('create');
const selectedPhysicalProgress = ref(null);

const showProjectFinancialInstallmentModal = ref(false);
const financialInstallmentModalMode = ref('create');
const selectedFinancialInstallment = ref(null);


// --- Centralized Handlers ---

// Handles updates (success messages, data reloads) from various forms/modals
function handleUpdated(message, updatedSiteData = null) {
    toastMessage.value = message
    toastType.value = 'success'
    toastVisible.value = true
    setTimeout(() => (toastVisible.value = false), 3000) // Hide toast after 3 seconds

    if (updatedSiteData && selectedSite.value && updatedSiteData.id === selectedSite.value.id) {
        // If a specific site was updated, and it's the one currently selected in modal,
        // update it directly to reflect changes instantly without full reload.
        Object.assign(selectedSite.value, updatedSiteData);
        // Also update in the main mhpSites array if it exists there
        const index = props.mhpSites.data.findIndex(s => s.id === updatedSiteData.id);
        if (index !== -1) {
            Object.assign(props.mhpSites.data[index], updatedSiteData);
        }
    } else {
        // Fallback: For creation, deletion, or if the update doesn't return full site data,
        // reload the main mhpSites list.
        router.reload({ only: ['mhpSites'] });
    }
}

// Closes any open modal and clears selected data
function closeModal() {
    // Clear all modal visibility refs
    showSiteCreateModal.value = false;
    showEditInfoModal.value = false;
    showAdminApprovalModal.value = false;
    showDetailsModal.value = false;
    showApprovalViewModal.value = false;
    showRevisedCostModal.value = false;
    showReportModal.value = false;
    showCompletionModal.value = false;
    showEmeProgressModal.value = false;
    showOperationalCostModal.value = false;
    showProjectPhysicalProgressModal.value = false;
    showProjectFinancialInstallmentModal.value = false;

    // Clear selected data after a slight delay to allow modal transition
    setTimeout(() => {
        selectedSite.value = null;
        selectedCompletion.value = null;
        selectedPhysicalProgress.value = null;
        selectedFinancialInstallment.value = null;
    }, 300);
}


// --- Handlers for Site Actions (emitted by MhpSiteListCard) ---
// These functions are called when actions are performed on individual site cards.
// They typically set 'selectedSite.value' and control modal visibility/mode.

function handleViewDetails(site) {
    selectedSite.value = site; // Set the site to view
    showDetailsModal.value = true;
}

function handleEditInfo(site) {
    selectedSite.value = site; // Set the site to edit
    showEditInfoModal.value = true;
}

function handleAddEditApproval(site, action) {
    selectedSite.value = site;
    approvalAction.value = action;
    showAdminApprovalModal.value = true;
}

function handleViewApproval(site) {
    selectedSite.value = site;
    showApprovalViewModal.value = true;
}

function handleOpenRevisedCostModal(site) {
    selectedSite.value = site;
    revisedCostField.value = site.admin_approval ? nextRevisedCostLabel(site.admin_approval) : 'revised_cost_1'; // Use the helper
    showRevisedCostModal.value = true;
}

function handleViewReport(site) {
    selectedSite.value = site;
    showReportModal.value = true;
}

function handleAddEditViewCompletion(site, mode = null) {
    selectedSite.value = site;
    selectedCompletion.value = site.completion || null;
    completionMode.value = mode || (site.completion ? 'edit' : 'create');
    showCompletionModal.value = true;
}

function handleOpenEmeProgress(site) {
    selectedSite.value = site;
    showEmeProgressModal.value = true;
}

function handleOpenOperationalCost(site) {
    selectedSite.value = site;
    showOperationalCostModal.value = true;
}

function handleManagePhysicalProgress(site) {
    selectedSite.value = site;
    physicalProgressModalMode.value = 'create'; // Default to create mode
    selectedPhysicalProgress.value = null; // Ensure no specific progress is selected for new entry
    showProjectPhysicalProgressModal.value = true;
}

function handleManageFinancialInstallment(site) {
    selectedSite.value = site;
    financialInstallmentModalMode.value = 'create'; // Default to create mode
    selectedFinancialInstallment.value = null; // Ensure no specific installment is selected for new entry
    showProjectFinancialInstallmentModal.value = true;
}

function handleDeleteSite(siteId) {
    if (confirm('Are you sure you want to delete this MHP Site? This action cannot be undone.')) {
        router.delete(route('mhp.sites.destroy', siteId), {
            onSuccess: () => handleUpdated('MHP Site deleted successfully!'),
            onError: (errors) => {
                console.error('Error deleting MHP Site:', errors);
                toast.error('Failed to delete MHP Site.');
            }
        });
    }
}


// --- Filter and Display Helpers (mostly computed properties) ---
const filteredSites = computed(() => {
    if (!searchTerm.value.trim()) return props.mhpSites.data
    const term = searchTerm.value.trim().toLowerCase()
    return props.mhpSites.data.filter(site =>
        (site.cbo?.reference_code || '').toLowerCase().includes(term) ||
        (site.status || '').toLowerCase().includes(term) ||
        (site.project_id || '').toLowerCase().includes(term) // Search by project_id
    )
})
function toggleActionMenu(){
    alert('H')
}
// Helper for status badge styling
function getStatusClass(status) {
    switch (status) {
        case 'New': return 'bg-blue-100 text-blue-800 border border-blue-200';
        case 'Rehab': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
        case 'Upgradation': return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
        case 'Completed': return 'bg-green-100 text-green-800 border border-green-200';
        default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
}

// Helper for revised cost label (used in MhpSiteListCard)
function determineNextField(adminApproval) {
    if (!adminApproval) return 'revised_cost_1'
    if (!adminApproval.revised_cost_1) return 'revised_cost_1'
    if (!adminApproval.revised_cost_2) return 'revised_cost_2'
    if (!adminApproval.revised_cost_3) return 'revised_cost_3'
    return null
}
function nextRevisedCostLabel(adminApproval) {
    const nextField = determineNextField(adminApproval)
    if (nextField === 'revised_cost_1') return '+ Add Revised Cost 1'
    if (nextField === 'revised_cost_2') return 'Revises Cost 2'
    if (nextField === 'revised_cost_3') return 'Revised Cost 3'
    return 'All Revised Costs Added'
}

// Helper to get file icon (used in MhpSiteListCard)
function getFileIcon(file) {
    const ext = file.file_name.split('.').pop().toLowerCase()
    if (ext === 'pdf') return '📄'
    if (['doc', 'docx'].includes(ext)) return '📝'
    if (['xls', 'xlsx', 'csv'].includes(ext)) return '📊' // Added csv
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return '🖼️'
    return '📁'
}
</script>

<template>
    <side-bar />

    <div class="bg-gray-50 font-sans antialiased text-gray-800 min-h-screen">
        <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

            <header class="mb-8 bg-white p-6 rounded-lg shadow-md">
                <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">MHP Sites Overview</h1>
                        <p class="mt-1 text-base text-gray-600">Centralized management for micro-hydel project sites and their progress.</p>
                    </div>
                    <div class="flex w-full md:w-auto items-center gap-x-3">
                        <div class="relative flex-grow">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                v-model="searchTerm"
                                @input="router.get(route('mhp.index'), { search: searchTerm }, { preserveState: true, replace: true })"
                                placeholder="Search by CBO, Status, or ID..."
                                class="block w-full rounded-lg border-gray-300 bg-white py-2.5 pl-10 pr-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200"
                            />
                        </div>
                        <button @click="openNewSiteModal" class="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200 flex-shrink-0">
                            <svg class="-ml-0.5 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                            </svg>
                            <span>New Site</span>
                        </button>
                    </div>
                </div>
            </header>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:hidden">
                <MhpSiteListCard
                    v-for="site in filteredSites"
                    :key="site.id"
                    :site="site"
                    :open-action-menu-id="openActionMenuId"
                    :menu-direction="menuDirection"
                    @toggle-action-menu="toggleActionMenu"
                    @view-details="handleViewDetails"
                    @edit-info="handleEditInfo"
                    @add-edit-approval="handleAddEditApproval"
                    @view-approval="handleViewApproval"
                    @open-revised-cost-modal="handleOpenRevisedCostModal"
                    @view-report="handleViewReport"
                    @add-edit-view-completion="handleAddEditViewCompletion"
                    @open-eme-progress="handleOpenEmeProgress"
                    @open-operational-cost="handleOpenOperationalCost"
                    @manage-physical-progress="handleManagePhysicalProgress"
                    @manage-financial-installment="handleManageFinancialInstallment"
                    @delete-site="handleDeleteSite"
                />
            </div>

            <div class="hidden md:block bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Site Info</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Population</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Approval</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Attachments</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Progress Summary</th>
                        <th scope="col" class="relative px-6 py-3"><span class="sr-only">Actions</span></th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                    <tr v-for="site in filteredSites" :key="site.id" class="hover:bg-gray-50 transition-colors duration-150 group">

                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">{{ site.cbo?.reference_code ?? 'N/A' }}</div>
                            <div class="text-xs text-gray-500 mt-0.5">Project ID: {{ site.project_id }}</div>
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap">
                            <span :class="getStatusClass(site.status)" class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border">
                              {{ site.status ?? 'N/A' }}
                            </span>
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ site.population ?? 'N/A' }}</td>

                        <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                            <span :class="site.admin_approval ? 'text-green-600' : 'text-red-500'" class="flex items-center gap-1.5">
                                <svg v-if="site.admin_approval" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
                                <svg v-else class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                {{ site.admin_approval ? 'Exists' : 'None' }}
                            </span>
                        </td>

                        <td class="px-6 py-4">
                            <div v-if="site.attachments_frontend && site.attachments_frontend.length" class="space-y-2 text-xs max-h-24 overflow-y-auto pr-2">
                                <div v-for="file in site.attachments_frontend" :key="file.id" class="flex items-center gap-2" :title="`Size: ${(file.size/1024).toFixed(1)} KB | Uploaded: ${new Date(file.created_at).toLocaleDateString()}`">
                                    <span class="text-gray-500 flex-shrink-0">{{ getFileIcon(file) }}</span>
                                    <a :href="file.url" target="_blank" class="text-indigo-600 hover:text-indigo-800 hover:underline truncate">{{ file.file_name }}</a>
                                </div>
                            </div>
                            <span v-else class="text-gray-400 text-sm">—</span>
                        </td>

                        <td class="px-6 py-4">
                            <div class="space-y-1 text-sm">
                                <div v-if="site.physicalProgresses && site.physicalProgresses.length">
                                    <p class="font-semibold text-gray-800">Latest Physical:</p>
                                    <span class="text-xs text-gray-600">{{ site.physicalProgresses[site.physicalProgresses.length - 1].progress_percentage }}% on {{ site.physicalProgresses[site.physicalProgresses.length - 1].progress_date }}</span>
                                </div>
                                <div v-else class="text-gray-400 text-xs">— No Physical Progress</div>

                                <div v-if="site.financialInstallments && site.financialInstallments.length" class="pt-1 border-t border-gray-100 mt-1">
                                    <p class="font-semibold text-gray-800">Latest Financial:</p>
                                    <span class="text-xs text-gray-600">Inst. #{{ site.financialInstallments[site.financialInstallments.length - 1].installment_number }} ({{ site.financialInstallments[site.financialInstallments.length - 1].installment_amount }})</span>
                                </div>
                                <div v-else class="text-gray-400 text-xs">— No Financial Installments</div>
                            </div>
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative action-menu-container">
                            <button @click.stop="toggleActionMenu(site.id, $event)" class="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-200/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                            </button>
                            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                <div v-if="openActionMenuId === site.id" :class="['origin-top-right absolute w-56 rounded-xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-30 divide-y divide-gray-100', menuDirection === 'up' ? 'bottom-full mb-2 right-0' : 'top-full mt-2 right-0']">
                                    <div class="py-1 text-sm text-gray-700">
                                        <button @click="handleViewDetails(site)" class="w-full text-left block px-4 py-2 hover:bg-gray-100">View Details</button>
                                        <button @click="handleEditInfo(site)" class="w-full text-left block px-4 py-2 hover:bg-gray-100">Edit Info</button>
                                        <button v-if="site.admin_approval" @click="handleViewApproval(site)" class="w-full text-left block px-4 py-2 hover:bg-gray-100">View Approval</button>
                                        <button @click="handleAddEditApproval(site, site.admin_approval ? 'update' : 'create')" class="w-full text-left block px-4 py-2 hover:bg-gray-100">
                                            {{ site.admin_approval ? 'Edit Approval' : '+ Add Approval' }}
                                        </button>
                                        <button @click="handleOpenRevisedCostModal(site)" :class="{ 'opacity-50 cursor-not-allowed': !determineNextField(site.admin_approval) }" class="w-full text-left block px-4 py-2 hover:bg-gray-100">
                                            {{ nextRevisedCostLabel(site.admin_approval) }}
                                        </button>
                                    </div>
                                    <div class="py-1 text-sm text-gray-700">
                                        <button @click="handleViewReport(site)" class="w-full text-left block px-4 py-2 hover:bg-gray-100">View Report</button>
                                        <button @click="handleAddEditViewCompletion(site)" class="w-full text-left block px-4 py-2 hover:bg-gray-100">
                                            {{ site.completion ? 'Edit Completion' : '+ Add Completion' }}
                                        </button>
                                        <button v-if="site.completion" @click="handleAddEditViewCompletion(site, 'view')" class="w-full text-left block px-4 py-2 hover:bg-gray-100">
                                            View Completion
                                        </button>
                                    </div>
                                    <div class="py-1 text-sm text-gray-700">
                                        <button @click="handleOpenEmeProgress(site)" class="w-full text-left block px-4 py-2 hover:bg-gray-100">
                                            EME Progress
                                        </button>
                                        <button @click="handleOpenOperationalCost(site)" class="w-full text-left block px-4 py-2 hover:bg-gray-100">
                                            Operational Costs
                                        </button>
                                        <button @click="handleManagePhysicalProgress(site)" class="w-full text-left block px-4 py-2 hover:bg-gray-100">
                                            Manage Physical Progress
                                        </button>
                                        <button @click="handleManageFinancialInstallment(site)" class="w-full text-left block px-4 py-2 hover:bg-gray-100">
                                            Manage Financial Installment
                                        </button>
                                    </div>
                                    <div class="py-1 text-sm text-gray-700">
                                        <button @click="handleDeleteSite(site.id)" class="w-full text-left block px-4 py-2 hover:bg-red-100 text-red-600">Delete Site</button>
                                    </div>
                                </div>
                            </transition>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <nav v-if="mhpSites.links.length > 3" class="mt-8 flex justify-center">
                <div class="flex flex-wrap -mb-1">
                    <template v-for="(link, key) in mhpSites.links" :key="key">
                        <div v-if="link.url === null" class="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded" v-html="link.label" />
                        <Link v-else :href="link.url" class="mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-indigo-500 focus:text-indigo-500" :class="{ 'bg-white text-indigo-500': link.active }" v-html="link.label" />
                    </template>
                </div>
            </nav>

        </div>
    </div>

    <Toast :show="toastVisible" :message="toastMessage" :type="toastType" @hide="toastVisible = false" />

    <MhpSiteDetailsModal
        v-if="showDetailsModal && selectedSite"
        :show="showDetailsModal"
        :site="selectedSite"
        @close="closeModal"
    />

    <MhpEditInfoModal
        v-if="showEditInfoModal && selectedSite"
        :show="showEditInfoModal"
        :site="selectedSite"
        @close="closeModal"
        @updated="handleUpdated"
    />

    <MhpAdminApprovalModal
        v-if="showAdminApprovalModal && selectedSite"
        :show="showAdminApprovalModal"
        :action="approvalAction"
        :mhp-site-id="selectedSite.id"
        :approval="selectedSite.admin_approval"
        @close="closeModal"
        @updated="handleUpdated"
    />

    <MhpSiteCreateModal
        :show="showSiteCreateModal"
        @close="closeModal"
        @saved="handleUpdated"
    />

    <ProjectPhysicalProgressModal
        v-if="showProjectPhysicalProgressModal && selectedSite"
        :show="showProjectPhysicalProgressModal"
        :site="selectedSite"
        :progress="selectedPhysicalProgress"
        :mode="physicalProgressModalMode"
        @close="closeModal"
        @saved="handleUpdated"
    />

    <ProjectFinancialInstallmentModal
        v-if="showProjectFinancialInstallmentModal && selectedSite"
        :show="showProjectFinancialInstallmentModal"
        :site="selectedSite"
        :installment="selectedFinancialInstallment"
        :mode="financialInstallmentModalMode"
        @close="closeModal"
        @saved="handleUpdated"
    />
</template>

<style scoped>
button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Ensure no conflicting styles that affect z-index or fixed positioning of toasts/modals */
</style>

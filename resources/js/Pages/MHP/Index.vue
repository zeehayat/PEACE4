<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { router, Link, usePage } from '@inertiajs/vue3';

import SideBar from "@/Components/SideBar.vue";
import Toast from '@/Components/Toast.vue';
import Pagination from '@/Components/Pagination.vue';

// MHP-specific Components and Modals
import MhpSiteListCard from '@/Pages/MHP/Components/MhpSiteListCard.vue';
import MhpSiteCreateModal from '@/Pages/MHP/Modals/MhpSiteCreateModal.vue';
import MhpEditInfoModal from '@/Pages/MHP/Modals/MhpEditInfoModal.vue';
import MhpAdminApprovalModal from '@/Pages/MHP/Modals/MhpAdminApprovalModal.vue';
import MhpApprovalViewModal from '@/Pages/MHP/Modals/MhpApprovalViewModal.vue';
import TAndDWorkModal from '@/Pages/MHP/Modals/TAndDWorkModal.vue';
import TAndDWorkViewModal from '@/Pages/MHP/Modals/TAndDWorkViewModal.vue';
import ProjectPhysicalProgressModal from '@/Pages/MHP/Modals/ProjectPhysicalProgressModal.vue';
import ProjectFinancialInstallmentModal from '@/Pages/MHP/Modals/ProjectFinancialInstallmentModal.vue';
import MhpCompletionModal from '@/Pages/MHP/Modals/MhpCompletionModal.vue';
import MhpSiteDetailsModal from '@/Pages/MHP/Modals/MhpSiteDetailsModal.vue';
import MhpReportModal from '@/Pages/MHP/Modals/MhpReportModal.vue';
import AppLayout from "@/Layouts/AppLayout.vue";
import EmeInfoForm from './Partials/EmeInfoForm.vue';
import Modal from "@/Components/Modal.vue";
import EmeInfoModal from "@/Pages/MHP/Modals/EmeInfoModal.vue";


const props = defineProps({
    mhpSites: Object, // Paginated data for MHP Sites
    filters: Object,
    errors: Object, // Validation errors from backend
});

const page = usePage();

// --- Reactive State Variables ---
const selectedSite = ref(null);
const selectedTAndDWork = ref(null);
const selectedPhysicalProgress = ref(null);
const selectedFinancialInstallment = ref(null);
const selectedCompletion = ref(null);
const selectedEmeProgress = ref(null);

const toastVisible = ref(false);
const toastMessage = ref('');
const toastType = ref('success');
const searchTerm = ref(props.filters.search || '');

// === State for Teleported Action Menu ===
const openActionMenuId = ref(null);
const menuPosition = ref({ top: 0, left: 0, width: 0, direction: 'down' });
// ========================================

// Modals Visibility Control flags
const showSiteCreateModal = ref(false);
const showEditInfoModal = ref(false);
const showAdminApprovalModal = ref(false);
const approvalAction = ref('create');
const showApprovalViewModal = ref(false);
const showTAndDWorkModal = ref(false);
const tAndDWorkAction = ref('create');
const showTAndDWorkViewModal = ref(false);
const showProjectPhysicalProgressModal = ref(false);
const showProjectFinancialInstallmentModal = ref(false);
const showMhpCompletionModal = ref(false);
const completionAction = ref('create');

const showMhpSiteDetailsModal = ref(false);
const showReportModal = ref(false);
const showEmeProgressModal = ref(false);
const showOperationalCostModal = ref(false);
const showEmeInfoModal =ref(false);

const progressType = ref(null);


// --- Centralized Handlers ---

function handleUpdated(message, updatedSiteData = null) {
    toastMessage.value = message;
    toastType.value = 'success';
    toastVisible.value = true;
    setTimeout(() => (toastVisible.value = false), 3000);

    router.reload({ only: ['mhpSites'], preserveState: true });
}

function handleEmeInfo(site){
    selectedSite.value = site; // <-- Correctly assign the whole object
    showEmeInfoModal.value = true;
    openActionMenuId.value = null;
}
function closeModal() {
    showSiteCreateModal.value = false;
    showEditInfoModal.value = false;
    showAdminApprovalModal.value = false;
    showApprovalViewModal.value = false;
    showTAndDWorkModal.value = false;
    showTAndDWorkViewModal.value = false;
    showProjectPhysicalProgressModal.value = false;
    showProjectFinancialInstallmentModal.value = false;
    showMhpCompletionModal.value = false;
    showMhpSiteDetailsModal.value = false;
    showReportModal.value = false;
    showEmeProgressModal.value = false; // Close EME Progress modal
    showOperationalCostModal.value = false;
    showEmeInfoModal.value=false

    progressType.value = null;

    setTimeout(() => {
        selectedSite.value = null;
        selectedTAndDWork.value = null;
        selectedPhysicalProgress.value = null;
        selectedFinancialInstallment.value = null;
        selectedCompletion.value = null;
        openActionMenuId.value = null;
    }, 300);
}

async function toggleActionMenu(siteId, event) {
    if (event) {
        event.stopPropagation();
    }

    if (openActionMenuId.value === siteId) {
        openActionMenuId.value = null;
        return;
    }

    const siteToOpen = props.mhpSites.data.find(s => s.id === siteId);
    if (!siteToOpen) {
        console.error('MHP Site not found for action menu:', siteId);
        return;
    }
    selectedSite.value = siteToOpen;

    await nextTick();

    const button = event.currentTarget;
    if (!button) {
        console.error('Event target (button) not found for menu toggle.');
        menuPosition.value = { top: 0, left: 0, width: 0, direction: 'down' };
        openActionMenuId.value = siteId;
        return;
    }

    const rect = button.getBoundingClientRect();
    const menuHeightEstimate = 350;
    const direction = (window.innerHeight - rect.bottom < menuHeightEstimate && rect.top > (window.innerHeight - rect.bottom)) ? 'up' : 'down';

    menuPosition.value = {
        top: direction === 'down' ? rect.bottom + window.scrollY : rect.top + window.scrollY - menuHeightEstimate,
        left: rect.left + window.scrollX,
        width: rect.width,
        direction: direction,
    };

    openActionMenuId.value = siteId;
}

const closeAllActionMenus = (event) => {
    if (openActionMenuId.value !== null &&
        !event.target.closest('.action-menu-trigger') &&
        !event.target.closest('.action-menu-dropdown')
    ) {
        openActionMenuId.value = null;
    }
};

onMounted(() => {
    document.addEventListener('click', closeAllActionMenus);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', closeAllActionMenus);
});

function handleViewDetails(site) { selectedSite.value = site; showMhpSiteDetailsModal.value = true; openActionMenuId.value = null; }
function handleEditInfo(site) { selectedSite.value = site; showEditInfoModal.value = true; openActionMenuId.value = null; }
function handleAddEditApproval(site) { selectedSite.value = site; approvalAction.value = site.admin_approval ? 'update' : 'create'; showAdminApprovalModal.value = true; openActionMenuId.value = null; }
function handleViewApproval(site) { selectedSite.value = site; showApprovalViewModal.value = true; openActionMenuId.value = null; }
function handleOpenRevisedCostModal(site) { handleAddEditApproval(site); openActionMenuId.value = null; }
function handleViewReport(site) { selectedSite.value = site; showReportModal.value = true; openActionMenuId.value = null; }
function handleAddEditViewCompletion(site) { selectedSite.value = site; completionAction.value = site.completion ? 'update' : 'create'; showMhpCompletionModal.value = true; openActionMenuId.value = null; }
function handleViewCompletion(site) { selectedSite.value = site; showMhpCompletionModal.value = true; completionAction.value = 'view'; openActionMenuId.value = null; }

function handleAddTAndDWork(site) { selectedSite.value = site; selectedTAndDWork.value = null; tAndDWorkAction.value = 'create'; showTAndDWorkModal.value = true; openActionMenuId.value = null; }
function handleEditTAndDWork(site, tAndDWork) { selectedSite.value = site; selectedTAndDWork.value = tAndDWork; tAndDWorkAction.value = 'update'; showTAndDWorkModal.value = true; openActionMenuId.value = null; }
function handleViewTAndDWork(site, tAndDWork) { selectedSite.value = site; selectedTAndDWork.value = tAndDWork; showTAndDWorkViewModal.value = true; openActionMenuId.value = null; }

function handleOpenEmeProgress(site) {
    selectedSite.value = site;
    progressType.value = 'EME';
    showProjectPhysicalProgressModal.value = true;
    selectedPhysicalProgress.value = null;
    openActionMenuId.value = null;
}

function handleOpenOperationalCost(site) { selectedSite.value = site; showOperationalCostModal.value = true; openActionMenuId.value = null; }

function handleManagePhysicalProgress(site) {
    selectedSite.value = site;
    progressType.value = 'Civil';
    showProjectPhysicalProgressModal.value = true;
    selectedPhysicalProgress.value = null;
    openActionMenuId.value = null;
}

function handleManageTAndDProgress(site) {
    selectedSite.value = site;
    progressType.value = 'T&D';
    showProjectPhysicalProgressModal.value = true;
    selectedPhysicalProgress.value = null;
    openActionMenuId.value = null;
}

const handleFormSuccess = () => {
    closeModal();
    handleUpdated('EME Info saved successfully!');
};

const handleFormCancel = () => {
    closeModal();
};
function handleManageFinancialInstallment(site) { selectedSite.value = site; showProjectFinancialInstallmentModal.value = true; openActionMenuId.value = null; }

function handleDeleteSite(siteId) {
    openActionMenuId.value = null;
    if (confirm('Are you sure you want to delete this MHP Site? This action cannot be undone.')) {
        router.delete(route('mhp.sites.destroy', siteId), {
            onSuccess: () => handleUpdated('MHP Site deleted successfully!'),
            onError: (errors) => {
                console.error('Error deleting MHP Site:', errors);
                toastMessage.value = 'Failed to delete MHP Site.';
                toastType.value = 'error';
                toastVisible.value = true;
                setTimeout(() => (toastVisible.value = false), 3000);
            }
        });
    }
}

const openNewMhoModal = () => { selectedSite.value = null; showSiteCreateModal.value = true; openActionMenuId.value = null; };

const filteredMhpSites = computed(() => {
    const data = props.mhpSites?.data || [];
    if (!searchTerm.value.trim()) return data;
    const term = searchTerm.value.trim().toLowerCase();
    return data.filter(site =>
        (site.cbo?.reference_code || '').toLowerCase().includes(term) ||
        (site.status || '').toLowerCase().includes(term) ||
        (site.project_id || '').toLowerCase().includes(term)
    );
});

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

function getFileIcon(file) {
    const ext = file.file_name.split('.').pop().toLowerCase();
    if (ext === 'pdf') return '📄';
    if (['doc', 'docx'].includes(ext)) return '📝';
    if (['xls', 'xlsx'].includes(ext)) return '📊';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return '🖼️';
    return '📁';
}

const handlePagination = (url) => {
    router.get(url, { search: searchTerm.value }, { preserveState: true, replace: true });
};
</script>

<template>
    <AppLayout title="Dashboard">
        <template #header >
            <div class="bg-indigo-800 p-5 flex place-content-center items-center">

                <h2 class="text-4xl font-extrabold text-indigo-400 border-collapse">SRSP PEACE 2</h2>
            </div>

        </template>

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
                                    @input="router.get(route('mhp.sites.index'), { search: searchTerm }, { preserveState: true, replace: true })"
                                    placeholder="Search by CBO, Status, or ID..."
                                    class="block w-full rounded-lg border-gray-300 bg-white py-2.5 pl-10 pr-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200"
                                />
                            </div>
                            <button @click="openNewMhoModal" class="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200 flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" stroke="currentColor"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>
                                <span>New Site</span>
                            </button>
                        </div>
                    </div>
                </header>

                <!-- Card View for smaller screens -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:hidden">
                    <MhpSiteListCard
                        v-for="site in filteredMhpSites"
                        :key="site.id"
                        :site="site"
                        :open-action-menu-id="openActionMenuId"
                        :menu-position="menuPosition"
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

                <!-- Table View for larger screens -->
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
                        <tr v-for="site in filteredMhpSites" :key="site.id" class="hover:bg-gray-50 transition-colors duration-150 group">

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
                                <svg v-if="site.admin_approval" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
                                <svg v-else class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
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
                                    <div v-if="site.latest_physical_progress">
                                        <p class="font-semibold text-gray-800">Latest Physical:</p>
                                        <span class="text-xs text-gray-600">{{ site.latest_physical_progress.progress_percentage }}% on {{ new Date(site.latest_physical_progress.progress_date).toLocaleDateString() }} ({{ site.latest_physical_progress.payment_for }})</span>
                                    </div>
                                    <div v-else class="text-gray-400 text-xs">— No Physical Progress</div>

                                    <div v-if="site.latest_financial_installment" class="pt-1 border-t border-gray-100 mt-1">
                                        <p class="font-semibold text-gray-800">Latest Financial:</p>
                                        <span class="text-xs text-gray-600">Inst. #{{ site.latest_financial_installment.installment_number }} ({{ site.latest_financial_installment.installment_amount }}) ({{ site.latest_financial_installment.payment_for }})</span>
                                    </div>
                                    <div v-else class="text-gray-400 text-xs">— No Financial Installments</div>
                                </div>
                            </td>

                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative action-menu-container">
                                <button @click.stop="toggleActionMenu(site.id, $event)" class="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-200/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity action-menu-trigger">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                                </button>
                                <!-- The menu div is now teleported from Index.vue -->
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <Pagination :links="mhpSites.links" @pagination-link-clicked="handlePagination" class="mt-8" />

            </div>
        </div>

        <!-- Toast Notification -->
        <Toast :show="toastVisible" :message="toastMessage" :type="toastType" @hide="toastVisible = false" />

        <!-- Modals -->
        <MhpSiteCreateModal :show="showSiteCreateModal" @close="closeModal" @saved="handleUpdated" />
        <MhpEditInfoModal v-if="selectedSite" :show="showEditInfoModal" :site="selectedSite" @close="closeModal" @updated="handleUpdated" />
        <MhpAdminApprovalModal v-if="selectedSite" :show="showAdminApprovalModal" :action="approvalAction" :mhp-site-id="selectedSite.id" :approval="selectedSite.admin_approval" @close="closeModal" @updated="handleUpdated" />
        <MhpApprovalViewModal v-if="selectedSite && selectedSite.admin_approval" :show="showApprovalViewModal" :approval="selectedSite.admin_approval" @close="closeModal" />
        <TAndDWorkModal v-if="selectedSite" :show="showTAndDWorkModal" :mhp-site-id="selectedSite.id" :t-and-d-work="selectedTAndDWork" :action="tAndDWorkAction" @close="closeModal" @updated="handleUpdated" />
        <TAndDWorkViewModal v-if="selectedTAndDWork" :show="showTAndDWorkViewModal" :t-and-d-work="selectedTAndDWork" @close="closeModal" />

        <ProjectPhysicalProgressModal
            v-if="selectedSite && showProjectPhysicalProgressModal"
            :show="showProjectPhysicalProgressModal"
            :site="selectedSite"
            :progress-type="progressType"
            @close="closeModal"
            @saved="handleUpdated"
        />

        <ProjectFinancialInstallmentModal v-if="selectedSite" :show="showProjectFinancialInstallmentModal" :site="selectedSite" @close="closeModal" @saved="handleUpdated" />
        <MhpCompletionModal v-if="selectedSite" :show="showMhpCompletionModal" :site="selectedSite" :completion="selectedSite.completion" :action="completionAction" @close="closeModal" @saved="handleUpdated" />
        <MhpSiteDetailsModal v-if="selectedSite" :show="showMhpSiteDetailsModal" :site="selectedSite" @close="closeModal" />
        <MhpReportModal v-if="selectedSite" :show="showReportModal" :site="selectedSite" @close="closeModal" />
        <EmeInfoModal
            v-if="selectedSite"
            :show="showEmeInfoModal"
            :mhp-site="selectedSite" @success="handleFormSuccess"
            @cancel="handleFormCancel"
            @close="closeModal"
        />

        <!-- The EME Progress button now correctly opens the physical progress modal -->
        <!-- The showEmeProgressModal is now redundant and can be removed, but we'll leave it for now -->
        <!-- <MhpEmeProgressModal v-if="selectedSite && showEmeProgressModal" :show="showEmeProgressModal" :site="selectedSite" @close="closeModal" @saved="handleUpdated" /> -->

        <!-- Teleported Action Menu -->
        <Teleport to="body">
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from="transform opacity-100 scale-100" leave-to="transform opacity-0 scale-95">
                <div
                    v-if="openActionMenuId !== null && selectedSite"
                    :class="['action-menu-dropdown origin-top-right absolute w-56 rounded-xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-30 divide-y divide-gray-100', menuPosition.direction === 'up' ? 'bottom-full mb-2 right-0' : 'top-full mt-2 right-0']"
                    :style="{
                    top: menuPosition.top + 'px',
                    left: (menuPosition.left + menuPosition.width - 224) + 'px',
                }"
                >
                    <div class="py-1 text-sm text-gray-700">
                        <button @click="handleViewDetails(selectedSite)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                            View Details
                        </button>
                        <button @click="handleEditInfo(selectedSite)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="M15 5l4 4"/></svg>
                            Edit Info
                        </button>
                        <button v-if="selectedSite.admin_approval" @click="handleViewApproval(selectedSite)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            View Approval
                        </button>
                        <button @click="handleAddEditApproval(selectedSite)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-circle"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                            {{ selectedSite.admin_approval ? 'Edit Approval' : '+ Add Approval' }}
                        </button>
                        <button @click="handleOpenRevisedCostModal(selectedSite)" :class="{ 'opacity-50 cursor-not-allowed': !determineNextField(selectedSite.admin_approval) }" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2" :disabled="!determineNextField(selectedSite.admin_approval)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dollar-sign"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            {{ nextRevisedCostLabel(selectedSite.admin_approval) }}
                        </button>
                        <button @click="handleEmeInfo(selectedSite)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bolt"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" x2="12" y1="22.08" y2="12"></line></svg>
                            EME Profile
                        </button>
                    </div>
                    <div class="py-1 text-sm text-gray-700">
                        <button @click="handleViewReport(selectedSite)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
                            View Report
                        </button>
                        <button @click="handleAddEditViewCompletion(selectedSite)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-square"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/><polyline points="9 11 12 14 22 4"/></svg>
                            {{ selectedSite.completion ? 'Edit Completion' : '+ Add Completion' }}
                        </button>
                        <button v-if="selectedSite.completion" @click="handleViewCompletion(selectedSite)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/24/24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
                            View Completion
                        </button>
                    </div>
                    <div class="py-1 text-sm text-gray-700">
                        <button @click="handleOpenEmeProgress(selectedSite)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-activity"><path d="M22 12H2"/><path d="M17 5 22 12 17 19"/><path d="M7 5 2 12 7 19"/></svg>
                            EME Progress
                        </button>
                        <button @click="handleOpenOperationalCost(selectedSite)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dollar-sign"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            Operational Costs
                        </button>
                        <button @click="handleAddTAndDWork(selectedSite)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-circle"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                            Add T&D Work
                        </button>
                        <button @click="handleEditTAndDWork(selectedSite, selectedTAndDWork)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="M15 5l4 4"/></svg>
                            Edit T&D Work
                        </button>
                        <button @click="handleViewTAndDWork(selectedSite, selectedTAndDWork)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                            View T&D Work
                        </button>
                        <button @click="handleManagePhysicalProgress(selectedSite)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bar-chart-2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
                            Manage Physical Progress
                        </button>
                        <button @click="handleManageFinancialInstallment(selectedSite)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wallet"><path d="M21 12V7H5a2 2 0 0 0 0 4h16v-1a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h16v-1a2 2 0 0 0-2-2Z"/><path d="M10 12v.01"/></svg>
                            Manage Financial Installment
                        </button>
                    </div>
                    <div class="py-1 text-sm text-gray-700">
                        <button @click="handleDeleteSite(selectedSite.id)" class="w-full text-left block px-4 py-2 hover:bg-red-100 text-red-600 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                            Delete Site
                        </button>
                    </div>
                </div>
            </transition>
        </Teleport>
    </AppLayout>
</template>

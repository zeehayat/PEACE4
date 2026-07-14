<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { router, Link, usePage } from '@inertiajs/vue3';
import { useStatusBadge } from '@/Composables/useStatusBadge';

import SideBar from "@/Components/SideBar.vue";
import Toast from '@/Components/Toast.vue';
import Pagination from '@/Components/Pagination.vue';
import axios from 'axios';

// MHP-specific Components and Modals
import MhpSiteListCard from '@/Pages/MHP/Components/MhpSiteListCard.vue';
import MhpSiteCreateModal from '@/Pages/MHP/Modals/MhpSiteCreateModal.vue';
import MhpEditInfoModal from '@/Pages/MHP/Modals/MhpEditInfoModal.vue';
import MhpAdminApprovalModal from '@/Pages/MHP/Modals/MhpAdminApprovalModal.vue';
import TAndDWorkModal from '@/Pages/MHP/Modals/TAndDWorkModal.vue';
import ProjectPhysicalProgressModal from '@/Pages/MHP/Modals/ProjectPhysicalProgressModal.vue';
import ProjectFinancialInstallmentModal from '@/Pages/MHP/Modals/ProjectFinancialInstallmentModal.vue';
import MhpCompletionModal from '@/Pages/MHP/Modals/MhpCompletionModal.vue';
import MhpSiteDetailsModal from '@/Pages/MHP/Modals/MhpSiteDetailsModal.vue';
import MhpReportModal from '@/Pages/MHP/Modals/MhpReportModal.vue';
import AppLayout from "@/Layouts/AppLayout.vue";
import OperationalCostModal from '@/Pages/MHP/Modals/OperationalCostModal.vue';
import OperationalCostShowModal from '@/Pages/MHP/Modals/OperationalCostShowModal.vue'; // <-- New import

import EmeInfoModal from "@/Pages/MHP/Modals/EmeInfoModal.vue";
import ProjectVisitModal from '@/Pages/Shared/Visits/ProjectVisitModal.vue';

import { getFileIcon } from '@/Utils/helpers';


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
const showTAndDWorkModal = ref(false);
const showProjectPhysicalProgressModal = ref(false);
const showProjectFinancialInstallmentModal = ref(false);
const showMhpCompletionModal = ref(false);
const completionAction = ref('create');

const showMhpSiteDetailsModal = ref(false);
const showReportModal = ref(false);
const showEmeProgressModal = ref(false);
const showOperationalCostModal = ref(false);
const showOperationalCostShowModal = ref(false); // <-- New state variable
const showEmeInfoModal =ref(false);
const showVisitModal = ref(false);

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
    showTAndDWorkModal.value = false;
    showProjectPhysicalProgressModal.value = false;
    showProjectFinancialInstallmentModal.value = false;
    showMhpCompletionModal.value = false;
    showMhpSiteDetailsModal.value = false;
    showReportModal.value = false;
    showEmeProgressModal.value = false; // Close EME Progress modal
    showOperationalCostModal.value = false;
    showOperationalCostShowModal.value = false; // <-- Reset new state variable
    showEmeInfoModal.value=false;
    showVisitModal.value = false;

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
        //console.error('MHP Site not found for action menu:', siteId);
        return;
    }
    selectedSite.value = siteToOpen;

    await nextTick();

    const button = event.currentTarget;
    if (!button) {
        //console.error('Event target (button) not found for menu toggle.');
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
function handleViewReport(site) { selectedSite.value = site; showReportModal.value = true; openActionMenuId.value = null; }
function handleAddEditViewCompletion(site) { selectedSite.value = site; completionAction.value = site.completion ? 'update' : 'create'; showMhpCompletionModal.value = true; openActionMenuId.value = null; }
function handleOpenTAndDWorksManager(site) { selectedSite.value = site; showTAndDWorkModal.value = true; openActionMenuId.value = null; }

function handleOpenEmeProgress(site) {
    selectedSite.value = site;
    progressType.value = 'EME';
    showProjectPhysicalProgressModal.value = true;
    selectedPhysicalProgress.value = null;
    openActionMenuId.value = null;
}

function handleOpenOperationalCost(site) {
    selectedSite.value = site;
    showOperationalCostModal.value = true;
    openActionMenuId.value = null;
}

function handleManageVisits(site) {
    selectedSite.value = site;
    showVisitModal.value = true;
    openActionMenuId.value = null;
}

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
function handleManageFinancialProgress(site, type) {
    selectedSite.value = site;
    progressType.value = type;
    showProjectFinancialInstallmentModal.value = true;
    openActionMenuId.value = null;
}

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

const { getStatusClass } = useStatusBadge();

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

const handlePagination = (url) => {
    router.get(url, { search: searchTerm.value }, { preserveState: true, replace: true });
};
</script>

<template>
    <AppLayout title="MHP Sites">
        <template #header >
            <div class="flex flex-col gap-1">
                <p class="text-xs uppercase tracking-[0.2em] text-hydro-600">MHP</p>
                <h2 class="text-2xl font-bold text-ink-900">Sites Overview</h2>
            </div>

        </template>

        <div class="bg-background-light font-sans antialiased text-ink-900 min-h-screen">
            <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <header class="card p-5 sm:p-6 mb-6">
                    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <h1 class="text-3xl font-extrabold tracking-tight text-ink-900">MHP Sites Overview</h1>
                            <p class="mt-1 text-base text-ink-600">Centralized management for micro-hydel project sites and their progress.</p>
                        </div>
                        <div class="flex w-full md:w-auto items-center gap-3">
                            <div class="relative flex-grow">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span class="material-symbols-outlined text-ink-400 text-lg">search</span>
                                </div>
                                <input
                                    type="text"
                                    v-model="searchTerm"
                                    @input="router.get(route('mhp.sites.index'), { search: searchTerm }, { preserveState: true, replace: true })"
                                    placeholder="Search by CBO, Status, or ID..."
                                    class="block w-full bg-surface py-2.5 pl-10 pr-3 border-ink-300 focus:ring-accent-500 focus:border-accent-500"
                                />
                            </div>
                            <button @click="openNewMhoModal" class="btn-primary px-4 py-2.5 flex-shrink-0">
                                <span class="material-symbols-outlined text-base">add</span>
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
                        @manage-financial-progress="handleManageFinancialProgress"
                        @delete-site="handleDeleteSite"
                    />
                </div>

                <!-- Table View for larger screens -->
                <div class="hidden md:block card overflow-hidden">
                    <table class="table-stitch">
                        <thead>
                        <tr>
                            <th scope="col">Site Info</th>
                            <th scope="col">Location</th>
                            <th scope="col">Status</th>
                            <th scope="col">Population</th>
                            <th scope="col">Approval</th>
                            <th scope="col">Attachments</th>
                            <th scope="col">Civil %</th>
                            <th scope="col">EME %</th>
                            <th scope="col">T&D %</th>
                            <th scope="col">Financial %</th>
                            <th scope="col" class="relative px-4 py-3"><span class="sr-only">Actions</span></th>
                        </tr>
                        </thead>
                        <tbody class="divide-y divide-ink-100">
                        <tr v-for="site in filteredMhpSites" :key="site.id" class="hover:bg-hydro-500/5 transition-colors duration-150 group">

                            <td class="px-4 py-3 whitespace-nowrap">
                                <div class="text-sm font-semibold text-ink-900">{{ site.cbo?.reference_code ?? 'N/A' }}</div>
                                <div class="text-xs text-ink-500 mt-0.5">Project ID: {{ site.project_id }}</div>
                            </td>

                            <td class="px-4 py-3 whitespace-nowrap text-sm text-ink-700">
                                <div>{{ site.cbo?.district ?? 'N/A' }}</div>
                                <div class="text-xs text-ink-500">{{ site.cbo?.village ?? '' }}</div>
                            </td>

                            <td class="px-4 py-3 whitespace-nowrap">
                            <span :class="getStatusClass(site.status)" class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border">
                              {{ site.status ?? 'N/A' }}
                            </span>
                            </td>

                            <td class="px-4 py-3 whitespace-nowrap text-sm text-ink-700">{{ site.population ?? 'N/A' }}</td>

                            <td class="px-4 py-3 whitespace-nowrap text-sm font-semibold">
                            <span :class="site.admin_approval ? 'text-green-600' : 'text-red-500'" class="flex items-center gap-1.5">
                                <svg v-if="site.admin_approval" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
                                <svg v-else class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                {{ site.admin_approval ? 'Exists' : 'None' }}
                            </span>
                            </td>

                            <td class="px-4 py-3">
                                <div v-if="site.attachments_frontend && site.attachments_frontend.length" class="space-y-2 text-xs max-h-24 overflow-y-auto pr-2">
                                    <div v-for="file in site.attachments_frontend" :key="file.id" class="flex items-center gap-2" :title="`Size: ${(file.size/1024).toFixed(1)} KB | Uploaded: ${new Date(file.created_at).toLocaleDateString()}`">
                                        <span class="text-ink-500 flex-shrink-0">{{ getFileIcon(file) }}</span>
                                        <a :href="file.url" target="_blank" class="text-accent-600 hover:text-accent-800 hover:underline truncate">{{ file.file_name }}</a>
                                    </div>
                                </div>
                                <span v-else class="text-ink-400 text-sm">—</span>
                            </td>

                            <td class="px-4 py-3 whitespace-nowrap text-sm text-ink-700">{{ site.civil_progress }}%</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-ink-700">{{ site.eme_progress }}%</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-ink-700">{{ site.td_progress }}%</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-ink-700">{{ site.financial_progress }}%</td>

                            <td class="px-4 py-3 whitespace-nowrap text-right text-sm font-medium relative action-menu-container">
                                <button @click.stop="toggleActionMenu(site.id, $event)" class="p-2 text-ink-500 hover:text-ink-900 rounded-full hover:bg-paper-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity action-menu-trigger">
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
        <TAndDWorkModal v-if="selectedSite" :show="showTAndDWorkModal" :site="selectedSite" @close="closeModal" @updated="handleUpdated" />

        <ProjectPhysicalProgressModal
            v-if="selectedSite && showProjectPhysicalProgressModal"
            :show="showProjectPhysicalProgressModal"
            :site="selectedSite"

            @close="closeModal"
            @saved="handleUpdated"
        />

        <ProjectFinancialInstallmentModal
            v-if="selectedSite && showProjectFinancialInstallmentModal"
            :show="showProjectFinancialInstallmentModal"
            :site="selectedSite"
            :progress-type="progressType"
            @close="closeModal"
            @saved="handleUpdated"
        />
        <MhpCompletionModal v-if="selectedSite" :show="showMhpCompletionModal" :site="selectedSite" :completion="selectedSite.completion" :action="completionAction" @close="closeModal" @saved="handleUpdated" />
        <MhpSiteDetailsModal v-if="selectedSite" :show="showMhpSiteDetailsModal" :site="selectedSite" @close="closeModal" />
        <MhpReportModal v-if="selectedSite" :show="showReportModal" :site="selectedSite" @close="closeModal" />
        <EmeInfoModal
            v-if="selectedSite"
            :show="showEmeInfoModal"
            :mhp-site="selectedSite" @success="handleFormSuccess"

            @close="closeModal"
        />
        <OperationalCostModal v-if="selectedSite" :show="showOperationalCostModal" :site="selectedSite" @close="closeModal" @saved="handleUpdated" />
        <OperationalCostShowModal v-if="selectedSite" :show="showOperationalCostShowModal" :site="selectedSite" @close="closeModal" />

        <ProjectVisitModal
            v-if="selectedSite"
            :show="showVisitModal"
            :parent-id="selectedSite.id"
            :visitable-type="'mhp_site'"
            :project-name="selectedSite.cbo?.reference_code"
            @close="closeModal"
            @saved="handleUpdated"
        />


        <!-- The EME Progress button now correctly opens the physical progress modal -->
        <!-- The showEmeProgressModal is now redundant and can be removed, but we'll leave it for now -->
        <!-- <MhpEmeProgressModal v-if="selectedSite && showEmeProgressModal" :show="showEmeProgressModal" :site="selectedSite" @close="closeModal" @saved="handleUpdated" /> -->

        <!-- Teleported Action Menu -->
        <Teleport to="body">
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from="transform opacity-100 scale-100" leave-to="transform opacity-0 scale-95">
                <div
                    v-if="openActionMenuId !== null && selectedSite"
                    :class="['action-menu-dropdown origin-top-right absolute w-56 rounded-xl shadow-xl bg-surface ring-1 ring-black ring-opacity-5 z-30 divide-y divide-ink-100', menuPosition.direction === 'up' ? 'bottom-full mb-2 right-0' : 'top-full mt-2 right-0']"
                    :style="{
                    top: menuPosition.top + 'px',
                    left: (menuPosition.left + menuPosition.width - 224) + 'px',
                }"
                >
                    <div class="py-1 text-sm text-ink-700">
                        <button @click="handleViewDetails(selectedSite)" class="w-full text-left block px-4 py-2 hover:bg-paper-100 flex items-center gap-2">
                            <span class="material-symbols-outlined text-[16px] text-ink-500">visibility</span>
                            View Registry Details
                        </button>
                        <button @click="handleEditInfo(selectedSite)" class="w-full text-left block px-4 py-2 hover:bg-paper-100 flex items-center gap-2">
                            <span class="material-symbols-outlined text-[16px] text-ink-500">edit</span>
                            Edit Registry Info
                        </button>
                        <button @click="handleAddEditApproval(selectedSite)" class="w-full text-left block px-4 py-2 hover:bg-paper-100 flex items-center gap-2">
                            <span class="material-symbols-outlined text-[16px] text-ink-500">gavel</span>
                            Administrative Approval
                        </button>
                        <button @click="handleAddEditViewCompletion(selectedSite)" class="w-full text-left block px-4 py-2 hover:bg-paper-100 flex items-center gap-2">
                            <span class="material-symbols-outlined text-[16px] text-ink-500">verified_user</span>
                            Completion Details
                        </button>
                        <button @click="handleEmeInfo(selectedSite)" class="w-full text-left block px-4 py-2 hover:bg-paper-100 flex items-center gap-2">
                            <span class="material-symbols-outlined text-[16px] text-ink-500">bolt</span>
                            EME Profile
                        </button>
                        <button @click="handleOpenTAndDWorksManager(selectedSite)" class="w-full text-left block px-4 py-2 hover:bg-paper-100 flex items-center gap-2">
                            <span class="material-symbols-outlined text-[16px] text-ink-500">construction</span>
                            T&D Works Manager
                        </button>
                    </div>
                    <div class="py-1 text-sm text-ink-700">
                        <button @click="handleManagePhysicalProgress(selectedSite)" class="w-full text-left block px-4 py-2 hover:bg-paper-100 flex items-center gap-2">
                            <span class="material-symbols-outlined text-[16px] text-ink-500">bar_chart</span>
                            Civil Physical Progress
                        </button>
                        <button @click="handleManageTAndDProgress(selectedSite)" class="w-full text-left block px-4 py-2 hover:bg-paper-100 flex items-center gap-2">
                            <span class="material-symbols-outlined text-[16px] text-ink-500">analytics</span>
                            T&D Physical Progress
                        </button>
                        <button @click="handleManageFinancialProgress(selectedSite, 'Civil')" class="w-full text-left block px-4 py-2 hover:bg-paper-100 flex items-center gap-2">
                            <span class="material-symbols-outlined text-[16px] text-ink-500">payments</span>
                            Civil Financial Progress
                        </button>
                        <button @click="handleManageFinancialProgress(selectedSite, 'EME')" class="w-full text-left block px-4 py-2 hover:bg-paper-100 flex items-center gap-2">
                            <span class="material-symbols-outlined text-[16px] text-ink-500">credit_card</span>
                            EME Financial Progress
                        </button>
                        <button @click="handleManageFinancialProgress(selectedSite, 'T&D')" class="w-full text-left block px-4 py-2 hover:bg-paper-100 flex items-center gap-2">
                            <span class="material-symbols-outlined text-[16px] text-ink-500">account_balance_wallet</span>
                            T&D Financial Progress
                        </button>
                    </div>
                    <div class="py-1 text-sm text-ink-700">
                        <button @click="handleOpenOperationalCost(selectedSite)" class="w-full text-left block px-4 py-2 hover:bg-paper-100 flex items-center gap-2">
                            <span class="material-symbols-outlined text-[16px] text-ink-500">price_change</span>
                            Operational Costs
                        </button>
                        <button @click="handleManageVisits(selectedSite)" class="w-full text-left block px-4 py-2 hover:bg-paper-100 flex items-center gap-2">
                            <span class="material-symbols-outlined text-base">directions_walk</span>
                            Manage Visits
                        </button>
                        <button @click="handleViewReport(selectedSite)" class="w-full text-left block px-4 py-2 hover:bg-paper-100 flex items-center gap-2">
                            <span class="material-symbols-outlined text-[16px] text-ink-500">picture_as_pdf</span>
                            View PDF Report
                        </button>
                        <button @click="handleDeleteSite(selectedSite.id)" class="w-full text-left block px-4 py-2 hover:bg-red-100 text-red-600 flex items-center gap-2">
                            <span class="material-symbols-outlined text-[16px] text-red-600">delete</span>
                            Delete Site
                        </button>
                    </div>
                </div>
            </transition>
        </Teleport>
    </AppLayout>
</template>

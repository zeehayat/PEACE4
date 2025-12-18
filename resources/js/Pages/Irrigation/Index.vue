<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { router, Link, usePage } from '@inertiajs/vue3';

import SideBar from "@/Components/SideBar.vue";
import Toast from '@/Components/Toast.vue';
import Pagination from '@/Components/Pagination.vue';

import IrrigationListCard from '@/Pages/Irrigation/Components/IrrigationListCard.vue';
import IrrigationSchemeCreateModal from '@/Pages/Irrigation/Modals/IrrigationSchemeCreateModal.vue';
import IrrigationSchemeEditModal from '@/Pages/Irrigation/Modals/IrrigationSchemeEditModal.vue';
import IrrigationSchemeDetailsModal from '@/Pages/Irrigation/Modals/IrrigationSchemeDetailsModal.vue';
import IrrigationAdminApprovalModal from '@/Pages/Irrigation/Modals/IrrigationAdminApprovalModal.vue';
import IrrigationAdminApprovalViewModal from '@/Pages/Irrigation/Modals/IrrigationAdminApprovalViewModal.vue';
import ProjectPhysicalProgressModal from '@/Pages/Irrigation/Modals/ProjectPhysicalProgressModal.vue';
import ProjectFinancialInstallmentModal from '@/Pages/Irrigation/Modals/ProjectFinancialInstallmentModal.vue';
import IrrigationSchemeContractModal from '@/Pages/Irrigation/Modals/IrrigationSchemeContractModal.vue';
import AppLayout from "@/Layouts/AppLayout.vue";
import IrrigationCostRevisionModal from '@/Pages/Irrigation/Modals/IrrigationCostRevisionModal.vue';


const props = defineProps({
    irrigationSchemes: Object,
    filters: Object,
    errors: Object,
});

const page = usePage();

const selectedScheme = ref(null);
const selectedPhysicalProgress = ref(null);
const selectedFinancialInstallment = ref(null);
const selectedAdminApproval = ref(null);
const selectedSchemeContract = ref(null);

const toastVisible = ref(false);
const toastMessage = ref('');
const toastType = ref('success');
const searchTerm = ref(props.filters.search || '');

const openActionMenuId = ref(null);
const menuPosition = ref({ top: 0, left: 0, width: 0, direction: 'down' });

const showSchemeCreateModal = ref(false);
const showSchemeEditModal = ref(false);
const showSchemeDetailsModal = ref(false);
const showAdminApprovalModal = ref(false);
const showAdminApprovalViewModal = ref(false);
const showPhysicalProgressModal = ref(false);
const showFinancialInstallmentModal = ref(false);
const showSchemeContractModal = ref(false);
const showCostRevisionModal = ref(false);
const approvalAction = ref('create');
const progressType = ref(null);


function handleUpdated(message) {
    toastMessage.value = message;
    toastType.value = 'success';
    toastVisible.value = true;
    setTimeout(() => (toastVisible.value = false), 3000);
    router.reload({ only: ['irrigationSchemes'], preserveState: true });
}

function closeModal() {
    showSchemeCreateModal.value = false;
    showSchemeEditModal.value = false;
    showSchemeDetailsModal.value = false;
    showAdminApprovalModal.value = false;
    showAdminApprovalViewModal.value = false;
    showPhysicalProgressModal.value = false;
    showFinancialInstallmentModal.value = false;
    showSchemeContractModal.value = false;
    showCostRevisionModal.value = false;

    setTimeout(() => {
        selectedScheme.value = null;
        selectedPhysicalProgress.value = null;
        selectedFinancialInstallment.value = null;
        selectedAdminApproval.value = null;
        selectedSchemeContract.value = null;
        openActionMenuId.value = null;
    }, 300);
}

async function toggleActionMenu(schemeId, event) {
    if (event) {
        event.stopPropagation();
    }
    if (openActionMenuId.value === schemeId) {
        openActionMenuId.value = null;
        return;
    }
    const schemeToOpen = props.irrigationSchemes.data.find(s => s.id === schemeId);
    if (!schemeToOpen) {
        console.error('Irrigation Scheme not found for action menu:', schemeId);
        return;
    }
    selectedScheme.value = schemeToOpen;
    selectedAdminApproval.value = schemeToOpen.admin_approval;
    selectedSchemeContract.value = schemeToOpen.irrigation_scheme_contract;
    await nextTick();
    const button = event.currentTarget;
    if (!button) {
        console.error('Event target (button) not found for menu toggle.');
        menuPosition.value = { top: 0, left: 0, width: 0, direction: 'down' };
        openActionMenuId.value = schemeId;
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
    openActionMenuId.value = schemeId;
}

const closeAllActionMenus = (event) => {
    if (openActionMenuId.value !== null && !event.target.closest('.action-menu-trigger') && !event.target.closest('.action-menu-dropdown')) {
        openActionMenuId.value = null;
    }
};

onMounted(() => {
    document.addEventListener('click', closeAllActionMenus);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', closeAllActionMenus);
});

function handleViewDetails(scheme) { selectedScheme.value = scheme; showSchemeDetailsModal.value = true; openActionMenuId.value = null; }
function handleEditScheme(scheme) { selectedScheme.value = scheme; showSchemeEditModal.value = true; openActionMenuId.value = null; }
function handleManageAdminApproval(scheme) {
    selectedScheme.value = scheme;
    selectedAdminApproval.value = scheme.admin_approval;
    approvalAction.value = scheme.admin_approval ? 'update' : 'create';
    showAdminApprovalModal.value = true;
    openActionMenuId.value = null;
}
function handleViewAdminApproval(scheme) {
    selectedScheme.value = scheme;
    selectedAdminApproval.value = scheme.admin_approval;
    showAdminApprovalViewModal.value = true;
    openActionMenuId.value = null;
}

function handleManagePhysicalProgress(scheme) { selectedScheme.value = scheme; showPhysicalProgressModal.value = true; openActionMenuId.value = null; }
function handleManageFinancialInstallment(scheme) { selectedScheme.value = scheme; showFinancialInstallmentModal.value = true; openActionMenuId.value = null; }
function handleManageSchemeContract(scheme) { selectedScheme.value = scheme; showSchemeContractModal.value = true; openActionMenuId.value = null; }

function handleManageCostRevisions(scheme) {
    if (!scheme.admin_approval) {
        toastMessage.value = 'An Admin Approval record is required before adding cost revisions.';
        toastType.value = 'error';
        toastVisible.value = true;
        setTimeout(() => (toastVisible.value = false), 3000);
        return;
    }
    selectedScheme.value = scheme;
    selectedAdminApproval.value = scheme.admin_approval;
    showCostRevisionModal.value = true;
    openActionMenuId.value = null;
}

function handleDeleteScheme(schemeId) {
    openActionMenuId.value = null;
    if (confirm('Are you sure you want to delete this Irrigation Scheme? This action cannot be undone.')) {
        router.delete(route('irrigation.schemes.destroy', schemeId), {
            onSuccess: () => handleUpdated('Irrigation Scheme deleted successfully!'),
            onError: (errors) => {
                console.error('Error deleting Irrigation Scheme:', errors);
                toastMessage.value = 'Failed to delete Irrigation Scheme.';
                toastType.value = 'error';
                toastVisible.value = true;
                setTimeout(() => (toastVisible.value = false), 3000);
            }
        });
    }
}

const openNewSchemeModal = () => { selectedScheme.value = null; showSchemeCreateModal.value = true; openActionMenuId.value = null; };
const filteredSchemes = computed(() => {
    const data = props.irrigationSchemes?.data || [];
    if (!searchTerm.value.trim()) return data;
    const term = searchTerm.value.trim().toLowerCase();
    return data.filter(scheme =>
        (scheme.cbo?.reference_code || '').toLowerCase().includes(term) ||
        (scheme.status || '').toLowerCase().includes(term) ||
        (scheme.profile?.established_by || '').toLowerCase().includes(term)
    );
});

function getStatusClass(status) {
    switch (status) {
        case 'New': return 'bg-blue-100 text-blue-800 border border-blue-200';
        case 'Active': return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
        case 'Inactive': return 'bg-red-100 text-red-800 border border-red-200';
        default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
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
    <AppLayout title="Irrigation Schemes">
        <template #header>
            <div class="flex flex-col gap-1">
                <p class="text-xs uppercase tracking-[0.2em] text-primary">Irrigation</p>
                <h2 class="text-2xl font-bold text-gray-900">Scheme Management</h2>
            </div>
        </template>
        <div class="bg-background-light min-h-screen text-gray-900">
            <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                <header class="card p-5 sm:p-6">
                    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <h1 class="text-2xl font-semibold tracking-tight text-gray-900">Irrigation Schemes Overview</h1>
                            <p class="mt-1 text-sm text-gray-600">Centralized management for schemes and progress.</p>
                        </div>
                        <div class="flex w-full md:w-auto items-center gap-3">
                            <div class="relative flex-grow">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span class="material-symbols-outlined text-gray-400 text-lg">search</span>
                                </div>
                                <input
                                    type="text"
                                    v-model="searchTerm"
                                    @input="router.get(route('irrigation.schemes.index'), { search: searchTerm }, { preserveState: true, replace: true })"
                                    placeholder="Search by CBO, Status, or Type..."
                                    class="block w-full bg-white py-2.5 pl-10 pr-3"
                                />
                            </div>
                            <button @click="openNewSchemeModal" class="btn-primary px-4 py-2.5 flex-shrink-0">
                                <span class="material-symbols-outlined text-base">add</span>
                                <span>New Scheme</span>
                            </button>
                        </div>
                    </div>
                </header>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:hidden">
                    <IrrigationListCard
                        v-for="scheme in filteredSchemes"
                        :key="scheme.id"
                        :scheme="scheme"
                        :open-action-menu-id="openActionMenuId"
                        :menu-position="menuPosition"
                        @toggle-action-menu="toggleActionMenu"
                        @view-details="handleViewDetails"
                        @edit-scheme="handleEditScheme"
                        @manage-admin-approval="handleManageAdminApproval"
                        @manage-physical-progress="handleManagePhysicalProgress"
                        @manage-financial-installment="handleManageFinancialInstallment"
                        @delete-scheme="handleDeleteScheme"
                    />
                </div>
                <div class="hidden md:block card overflow-hidden">
                    <table class="table-stitch">
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Scheme Info</th>
                            <th scope="col">Location</th>
                            <th scope="col">Details</th>
                            <th scope="col">Progress Summary</th>
                            <th scope="col" class="relative px-4 py-3"><span class="sr-only">Actions</span></th>
                        </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                        <tr v-for="scheme in filteredSchemes" :key="scheme.id" class="hover:bg-primary/5 transition-colors group">
                            <td class="px-4 py-3 whitespace-nowrap">
                                <div class="text-sm font-semibold text-gray-900">{{ scheme.id }}</div>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <div class="text-sm font-semibold text-gray-900">{{ scheme.cbo?.reference_code ?? 'N/A' }}</div>
                                <div class="text-xs text-gray-500 mt-0.5">Status: {{ scheme.status ?? 'N/A' }}</div>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                <div>Scheme: {{ scheme.scheme_type ?? 'N/A' }}</div>
                                <div class="text-xs text-gray-500">{{ scheme.sub_scheme_type ?? 'N/A' }}</div>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                <div>Watercourses: {{ scheme.number_of_watercourses ?? 'N/A' }}</div>
                                <div class="text-xs text-gray-500">Water Avail: {{ scheme.water_availability_cusecs ?? 'N/A' }} cusecs</div>
                            </td>
                            <td class="px-4 py-3">
                                <div class="space-y-1 text-sm">
                                    <div v-if="scheme.latest_physical_progress">
                                        <p class="font-semibold text-gray-800">Latest Physical:</p>
                                        <span class="text-xs text-gray-600">{{ scheme.latest_physical_progress.progress_percentage }}% on {{ new Date(scheme.latest_physical_progress.progress_date).toLocaleDateString() }} ({{ scheme.latest_physical_progress.payment_for }})</span>
                                    </div>
                                    <div v-else class="text-gray-400 text-xs">— No Physical Progress</div>
                                    <div v-if="scheme.latest_financial_installment" class="pt-1 border-t border-gray-100 mt-1">
                                        <p class="font-semibold text-gray-800">Latest Financial:</p>
                                        <span class="text-xs text-gray-600">Inst. #{{ scheme.latest_financial_installment.installment_number }} ({{ scheme.latest_financial_installment.installment_amount }}) ({{ scheme.latest_financial_installment.payment_for }})</span>
                                    </div>
                                    <div v-else class="text-gray-400 text-xs">— No Financial Installments</div>
                                </div>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap text-right text-sm font-medium relative action-menu-container">
                                <button @click.stop="toggleActionMenu(scheme.id, $event)" class="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity action-menu-trigger">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <Pagination :links="irrigationSchemes.links" @pagination-link-clicked="handlePagination" class="mt-8" />
            </div>
        </div>
        <Toast :show="toastVisible" :message="toastMessage" :type="toastType" @hide="toastVisible = false" />
        <IrrigationSchemeCreateModal :show="showSchemeCreateModal" @close="closeModal" @saved="handleUpdated" />
        <IrrigationSchemeEditModal v-if="selectedScheme" :show="showSchemeEditModal" :scheme="selectedScheme" @close="closeModal" @updated="handleUpdated" />
        <IrrigationSchemeDetailsModal v-if="selectedScheme" :show="showSchemeDetailsModal" :scheme="selectedScheme" @close="closeModal" />
        <IrrigationAdminApprovalModal v-if="selectedScheme" :show="showAdminApprovalModal" :irrigation-scheme-id="selectedScheme.id" :approval="selectedAdminApproval" :action="approvalAction" @close="closeModal" @updated="handleUpdated" />
        <IrrigationAdminApprovalViewModal v-if="selectedScheme && selectedAdminApproval" :show="showAdminApprovalViewModal" :approval="selectedAdminApproval" @close="closeModal" />
        <ProjectPhysicalProgressModal v-if="selectedScheme" :show="showPhysicalProgressModal" :scheme="selectedScheme" :progress-type="progressType" @close="closeModal" @saved="handleUpdated" />
        <ProjectFinancialInstallmentModal v-if="selectedScheme" :show="showFinancialInstallmentModal" :scheme="selectedScheme" @close="closeModal" @saved="handleUpdated" />
        <IrrigationSchemeContractModal v-if="selectedScheme" :show="showSchemeContractModal" :scheme="selectedScheme" :contract="selectedSchemeContract" @close="closeModal" @saved="handleUpdated" />

        <!-- NEW: Modal for Cost Revisions -->
        <IrrigationCostRevisionModal v-if="selectedScheme && selectedAdminApproval" :show="showCostRevisionModal" :scheme="selectedScheme" :approval="selectedAdminApproval" @close="closeModal" @saved="handleUpdated" />

        <Teleport to="body">
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <div
                    v-if="openActionMenuId !== null && selectedScheme"
                    :class="['action-menu-dropdown origin-top-right absolute w-56 rounded-xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-30 divide-y divide-gray-100', menuPosition.direction === 'up' ? 'bottom-full mb-2 right-0' : 'top-full mt-2 right-0']"
                    :style="{
                        top: menuPosition.top + 'px',
                        left: (menuPosition.left + menuPosition.width - 224) + 'px',
                    }"
                >
                    <div class="py-1 text-sm text-gray-700">
                        <button @click="handleViewDetails(selectedScheme)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                            View Details
                        </button>
                        <button @click="handleEditScheme(selectedScheme)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="M15 5l4 4"/></svg>
                            Edit Scheme
                        </button>
                    </div>
                    <div class="py-1 text-sm text-gray-700">
                        <button v-if="selectedScheme.admin_approval" @click="handleViewAdminApproval(selectedScheme)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            View Approval
                        </button>
                        <button @click="handleManageAdminApproval(selectedScheme)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-circle"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                            {{ selectedScheme.admin_approval ? 'Edit Approval' : '+ Add Approval' }}
                        </button>
                        <button v-if="selectedScheme.admin_approval" @click="handleManageCostRevisions(selectedScheme)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dollar-sign"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            Manage Cost Revisions
                        </button>
                        <button v-if="selectedScheme.irrigationSchemeContract" @click="handleManageSchemeContract(selectedScheme)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-signature"><path d="M20 19.5A1.5 1.5 0 0 0 18.5 18H5.5A1.5 1.5 0 0 0 4 19.5V20"/><path d="M10 13a2.5 2.5 0 0 0-2.5 2.5v.5h5v-.5a2.5 2.5 0 0 0-2.5-2.5Z"/><path d="M8 15v1"/><path d="M16 13h2l2 2"/><path d="M14 17h6"/><path d="M2 13h2l2 2"/><path d="M16 9h2l2 2"/></svg>
                            Manage Contract
                        </button>
                        <button @click="handleManagePhysicalProgress(selectedScheme)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bar-chart-2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
                            Manage Physical Progress
                        </button>
                        <button @click="handleManageFinancialInstallment(selectedScheme)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wallet"><path d="M21 12V7H5a2 2 0 0 0 0 4h16v-1a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h16v-1a2 2 0 0 0-2-2Z"/><path d="M10 12v.01"/></svg>
                            Manage Financial Installment
                        </button>
                    </div>
                    <div class="py-1 text-sm text-gray-700">
                        <button @click="handleDeleteScheme(selectedScheme.id)" class="w-full text-left block px-4 py-2 hover:bg-red-100 text-red-600 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                            Delete Scheme
                        </button>
                    </div>
                </div>
            </transition>
        </Teleport>
    </AppLayout>
</template>

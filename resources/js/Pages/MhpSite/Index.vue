<script setup>
import { ref, computed, onMounted } from 'vue'
import { router } from '@inertiajs/vue3' // Ensure router is imported

import MhpSiteDetailsModal from '@/Components/MhpSiteDetailsModal.vue'
import MhpEditInfoModal from '@/Components/MhpEditInfoModal.vue'
import MhpAdminApprovalModal from '@/Components/MhpAdminApprovalModal.vue'
import MhpApprovalViewModal from '@/Components/MhpApprovalViewModal.vue'
import AddRevisedCostModal from '@/Components/AddRevisedCostModal.vue'
import MhpReport from '@/Pages/MhpSite/MhpReport.vue'
import MhpCompletionForm from "@/Pages/MhpCompletion/MhpCompletionForm.vue";
import SideBar from "@/Components/SideBar.vue";
import MhpEmeProgressModal from '@/Pages/MhpEmeProgress/MhpEmeProgressModal.vue';
import OperationalCostModal from '@/Pages/MhpOperationalCost/OperationalCostModal.vue'

// New imports for Manager Modals
import ProjectPhysicalProgressManagerModal from '@/Pages/MhpPhysicalProgress/ProjectPhysicalProgressModal.vue'
import ProjectFinancialInstallmentManagerModal from '@/Pages/MhpFinancialProgress/ProjectFinancialInstallmentModal.vue';
import MhpSiteCreateModal from "@/Components/MhpSiteCreateModal.vue";

const operationalCostModalVisible = ref(false)
function openOperationalCost(site) {
    selectedSite.value = site
    operationalCostModalVisible.value = true
}

const props = defineProps({
    mhpSites: Object,
    errors: Object
})

const selectedSite = ref(null)
const toastVisible = ref(false)
const toastMessage = ref('')
const toastType = ref('success')
const searchTerm = ref('')
const openActionMenuId = ref(null)
const menuDirection = ref('down')

const showDetailsModal = ref(false)
const showEditInfoModal = ref(false)
const showAdminApprovalModal = ref(false)
const showApprovalViewModal = ref(false)
const showRevisedCostModal = ref(false)
const showReportModal = ref(false)
const revisedCostField = ref('')
const approvalAction = ref('create')
const showCompletionModal = ref(false)
const completionMode = ref('create')
const selectedCompletion = ref(null)
const emeModalVisible = ref(false);
const showNewSiteModal = ref(false);

// New refs for Manager modals
const showProjectPhysicalProgressManagerModal = ref(false);
const showProjectFinancialInstallmentManagerModal = ref(false);


function openEmeProgress(site) {
    selectedSite.value = site;
    emeModalVisible.value = true;
}
function openCompletionModal(site, mode = null) {
    if (!site) {
        console.error('openCompletionModal called with null site')
        return
    }

    selectedSite.value = site
    selectedCompletion.value = site.completion || null
    completionMode.value = mode || (site.completion ? 'edit' : 'create')
    showCompletionModal.value = true
}

// New functions to open Manager modals
function openProjectPhysicalProgressManager(site) {
    selectedSite.value = site;
    showProjectPhysicalProgressManagerModal.value = true;
}

function openProjectFinancialInstallmentManager(site) {
    selectedSite.value = site;
    showProjectFinancialInstallmentManagerModal.value = true;
}


onMounted(() => {
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        // Check if the click is outside the action button and menu
        if (openActionMenuId.value && !e.target.closest('.action-menu-container')) {
            openActionMenuId.value = null;
        }
    });
})

function handleUpdated(message) {
    toastMessage.value = message
    toastType.value = 'success'
    toastVisible.value = true
    setTimeout(() => (toastVisible.value = false), 3000)
    router.reload({ only: ['mhpSites'] }); // Reload sites to get updated progress data
}

const filteredSites = computed(() => {
    if (!searchTerm.value.trim()) return props.mhpSites.data
    const term = searchTerm.value.trim().toLowerCase()
    return props.mhpSites.data.filter(site =>
        (site.cbo?.reference_code || '').toLowerCase().includes(term) ||
        (site.status || '').toLowerCase().includes(term)
    )
})

function getStatusClass(status) {
    switch (status) {
        case 'New': return 'bg-blue-100 text-blue-800 border border-blue-200';
        case 'Rehab': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
        case 'Upgradation': return 'bg-green-100 text-green-800 border border-green-200';
        default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
}

function toggleActionMenu(siteId, event) {
    if (openActionMenuId.value === siteId) {
        openActionMenuId.value = null
        return
    }

    const button = event.currentTarget
    const rect = button.getBoundingClientRect()

    const spaceBelow = window.innerHeight - rect.bottom
    // Estimate menu height, can be adjusted
    const menuHeight = 350;

    if (spaceBelow < menuHeight && rect.top > spaceBelow) {
        menuDirection.value = 'up'
    } else {
        menuDirection.value = 'down'
    }

    openActionMenuId.value = siteId
}

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

function openRevisedCostModal(site) {
    const field = determineNextField(site.admin_approval)
    if (!field) return
    selectedSite.value = site
    revisedCostField.value = field
    showRevisedCostModal.value = true
}

// file icon helper
function getFileIcon(file) {
    const ext = file.file_name.split('.').pop().toLowerCase()
    if (ext === 'pdf') return '📄'
    if (['doc', 'docx'].includes(ext)) return '📝'
    if (['xls', 'xlsx', 'csv'].includes(ext)) return '📊'
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return '🖼️'
    return '📁'
}
function openNewSiteModal() {
    showNewSiteModal.value = true;
}

</script>

<template>
    <side-bar />

    <div class="bg-gray-100 font-sans antialiased text-gray-800 min-h-screen">
        <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

            <header class="mb-8">
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
                <div v-for="site in filteredSites" :key="site.id" class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
                    <div>
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <p class="font-bold text-lg text-gray-900">{{ site.cbo?.reference_code ?? 'N/A' }}</p>
                                <p class="text-xs text-gray-500 mt-1">Project ID: {{ site.project_id }}</p>
                            </div>
                            <div class="relative action-menu-container">
                                <button @click.stop="toggleActionMenu(site.id, $event)" class="p-2 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                                </button>
                                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                    <div v-if="openActionMenuId === site.id" :class="['origin-top-right absolute w-56 rounded-xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-30 divide-y divide-gray-100', menuDirection === 'up' ? 'bottom-full mb-2 right-0' : 'top-full mt-2 right-0']">
                                        <div class="py-1 text-sm text-gray-700">
                                            <a href="#" @click.prevent="selectedSite = site; showDetailsModal = true" class="block px-4 py-2 hover:bg-gray-100">View Details</a>
                                            <a href="#" @click.prevent="selectedSite = site; showEditInfoModal = true" class="block px-4 py-2 hover:bg-gray-100">Edit Info</a>
                                            <a v-if="site.admin_approval" href="#" @click.prevent="selectedSite = site; showApprovalViewModal = true" class="block px-4 py-2 hover:bg-gray-100">View Approval</a>
                                            <a href="#" @click.prevent="selectedSite = site; approvalAction = site.admin_approval ? 'update' : 'create'; showAdminApprovalModal = true" class="block px-4 py-2 hover:bg-gray-100">
                                                {{ site.admin_approval ? 'Edit Approval' : '+ Add Approval' }}
                                            </a>
                                            <a href="#" @click.prevent="openRevisedCostModal(site)" :class="{ 'opacity-50 cursor-not-allowed': !determineNextField(site.admin_approval) }" class="block px-4 py-2 hover:bg-gray-100">
                                                {{ nextRevisedCostLabel(site.admin_approval) }}
                                            </a>
                                        </div>
                                        <div class="py-1 text-sm text-gray-700">
                                            <a href="#" @click.prevent="selectedSite = site; showReportModal = true" class="block px-4 py-2 hover:bg-gray-100">View Report</a>
                                            <a href="#" @click.prevent="openCompletionModal(site)" class="block px-4 py-2 hover:bg-gray-100">
                                                {{ site.completion ? 'Edit Completion' : '+ Add Completion' }}
                                            </a>
                                            <a v-if="site.completion" href="#" @click.prevent="openCompletionModal(site, 'view')" class="block px-4 py-2 hover:bg-gray-100">
                                                View Completion
                                            </a>
                                        </div>
                                        <div class="py-1 text-sm text-gray-700">
                                            <button @click="openEmeProgress(site)" class="w-full text-left block px-4 py-2 hover:bg-gray-100">
                                                EME Progress
                                            </button>
                                            <button @click="openOperationalCost(site)" class="w-full text-left block px-4 py-2 hover:bg-gray-100">
                                                Operational Costs
                                            </button>
                                            <button @click="openProjectPhysicalProgressManager(site)" class="w-full text-left block px-4 py-2 hover:bg-gray-100">
                                                Manage Physical Progress
                                            </button>
                                            <button @click="openProjectFinancialInstallmentManager(site)" class="w-full text-left block px-4 py-2 hover:bg-gray-100">
                                                Manage Financial Installment
                                            </button>
                                        </div>
                                    </div>
                                </transition>
                            </div>
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
                </div>
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
                            <div v-if="site.media.length" class="space-y-2 text-xs max-h-24 overflow-y-auto pr-2">
                                <div v-for="file in site.media" :key="file.id" class="flex items-center gap-2" :title="`Size: ${(file.size/1024).toFixed(1)} KB | Uploaded: ${new Date(file.created_at).toLocaleDateString()}`">
                                    <span class="text-gray-500 flex-shrink-0">{{ getFileIcon(file) }}</span>
                                    <a :href="file.original_url" target="_blank" class="text-indigo-600 hover:text-indigo-800 hover:underline truncate">{{ file.file_name }}</a>
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
                                        <a href="#" @click.prevent="selectedSite = site; showDetailsModal = true" class="block px-4 py-2 hover:bg-gray-100">View Details</a>
                                        <a href="#" @click.prevent="selectedSite = site; showEditInfoModal = true" class="block px-4 py-2 hover:bg-gray-100">Edit Info</a>
                                        <a v-if="site.admin_approval" href="#" @click.prevent="selectedSite = site; showApprovalViewModal = true" class="block px-4 py-2 hover:bg-gray-100">View Approval</a>
                                        <a href="#" @click.prevent="selectedSite = site; approvalAction = site.admin_approval ? 'update' : 'create'; showAdminApprovalModal = true" class="block px-4 py-2 hover:bg-gray-100">
                                            {{ site.admin_approval ? 'Edit Approval' : '+ Add Approval' }}
                                        </a>
                                        <a href="#" @click.prevent="openRevisedCostModal(site)" :class="{ 'opacity-50 cursor-not-allowed': !determineNextField(site.admin_approval) }" class="block px-4 py-2 hover:bg-gray-100">
                                            {{ nextRevisedCostLabel(site.admin_approval) }}
                                        </a>
                                    </div>
                                    <div class="py-1 text-sm text-gray-700">
                                        <a href="#" @click.prevent="selectedSite = site; showReportModal = true" class="block px-4 py-2 hover:bg-gray-100">View Report</a>
                                        <a href="#" @click.prevent="openCompletionModal(site)" class="block px-4 py-2 hover:bg-gray-100">
                                            {{ site.completion ? 'Edit Completion' : '+ Add Completion' }}
                                        </a>
                                        <a v-if="site.completion" href="#" @click.prevent="openCompletionModal(site, 'view')" class="block px-4 py-2 hover:bg-gray-100">
                                            View Completion
                                        </a>
                                    </div>
                                    <div class="py-1 text-sm text-gray-700">
                                        <button @click="openEmeProgress(site)" class="w-full text-left block px-4 py-2 hover:bg-gray-100">
                                            EME Progress
                                        </button>
                                        <button @click="openOperationalCost(site)" class="w-full text-left block px-4 py-2 hover:bg-gray-100">
                                            Operational Costs
                                        </button>
                                        <button @click="openProjectPhysicalProgressManager(site)" class="w-full text-left block px-4 py-2 hover:bg-gray-100">
                                            Manage Physical Progress
                                        </button>
                                        <button @click="openProjectFinancialInstallmentManager(site)" class="w-full text-left block px-4 py-2 hover:bg-gray-100">
                                            Manage Financial Installment
                                        </button>
                                    </div>
                                </div>
                            </transition>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>

    <MhpSiteDetailsModal :show="showDetailsModal" :site="selectedSite" @close="showDetailsModal = false; selectedSite = null" />
    <MhpEditInfoModal :show="showEditInfoModal" :site="selectedSite" @close="showEditInfoModal = false; selectedSite = null" @updated="handleUpdated" />
    <MhpAdminApprovalModal v-if="selectedSite" :show="showAdminApprovalModal" :action="approvalAction" :mhp-site-id="selectedSite.id" :approval="selectedSite.admin_approval" :errors="props.errors" @close="showAdminApprovalModal = false; selectedSite = null" @updated="handleUpdated" />
    <MhpApprovalViewModal v-if="selectedSite?.admin_approval" :show="showApprovalViewModal" :approval="selectedSite.admin_approval" @close="showApprovalViewModal = false; selectedSite = null" />
    <AddRevisedCostModal v-if="selectedSite" :show="showRevisedCostModal" :site="selectedSite" :field="revisedCostField" @close="showRevisedCostModal = false; selectedSite = null; revisedCostField = ''" @updated="handleUpdated" />
    <MhpReport v-if="selectedSite" :show="showReportModal" :site="selectedSite" @close="showReportModal = false; selectedSite = null" />
    <MhpCompletionForm v-if="selectedSite" :show="showCompletionModal" :mode="completionMode" :site="selectedSite" :mhp-completion="selectedCompletion" @close="showCompletionModal = false" @saved="handleUpdated" />
    <MhpEmeProgressModal :show="emeModalVisible" :site="selectedSite" @close="emeModalVisible = false" />
    <OperationalCostModal @saved="handleUpdated" title="Add Operational Cost" :show="operationalCostModalVisible" :site="selectedSite" @close="operationalCostModalVisible = false" />

    <ProjectPhysicalProgressManagerModal
        v-if="selectedSite"
        :show="showProjectPhysicalProgressManagerModal"
        :site="selectedSite"
        @close="showProjectPhysicalProgressManagerModal = false"
        @saved="handleUpdated"
    />

    <ProjectFinancialInstallmentManagerModal
        v-if="selectedSite"
        :show="showProjectFinancialInstallmentManagerModal"
        :site="selectedSite"
        @close="showProjectFinancialInstallmentManagerModal = false"
        @saved="handleUpdated"
    />
    <MhpSiteCreateModal
        :show="showNewSiteModal"
        :errors="props.errors"
        @close="showNewSiteModal = false"
        @saved="handleUpdated"
    />

</template>

<style scoped>
button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>

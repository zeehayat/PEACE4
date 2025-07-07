<script setup>
import { ref, computed, onMounted } from 'vue'

import MhpSiteDetailsModal from '@/Components/MhpSiteDetailsModal.vue'
import MhpEditInfoModal from '@/Components/MhpEditInfoModal.vue'
import MhpAdminApprovalModal from '@/Components/MhpAdminApprovalModal.vue'
import MhpApprovalViewModal from '@/Components/MhpApprovalViewModal.vue'
import AddRevisedCostModal from '@/Components/AddRevisedCostModal.vue'
import MhpReport from '@/Pages/MhpSite/MhpReport.vue'
import MhpCompletionForm from "@/Pages/MhpCompletion/MhpCompletionForm.vue";
import SideBar from "@/Components/SideBar.vue";
import MhpEmeProgressModal from '@/Pages/MhpEmeProgress/MhpEmeProgressModal.vue';

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

onMounted(() => {
    document.addEventListener('click', () => {
        openActionMenuId.value = null
    })
})

function handleUpdated(message) {
    toastMessage.value = message
    toastType.value = 'success'
    toastVisible.value = true
    setTimeout(() => (toastVisible.value = false), 3000)
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
        case 'New': return 'text-blue-600 bg-blue-50 ring-blue-200'
        case 'Rehab': return 'text-yellow-600 bg-yellow-50 ring-yellow-200'
        case 'Upgradation': return 'text-green-600 bg-green-50 ring-green-200'
        default: return 'text-gray-600 bg-gray-50 ring-gray-200'
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
    const spaceAbove = rect.top

    if (spaceBelow < 200 && spaceAbove > spaceBelow) {
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
    if (nextField === 'revised_cost_2') return '+ Add Revised Cost 2'
    if (nextField === 'revised_cost_3') return '+ Add Revised Cost 3'
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
</script>

<template>
    <side-bar />
    <div class="bg-slate-50 min-h-screen font-sans">
        <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">

            <header class="mb-8">
                <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h1 class="text-3xl font-bold tracking-tight text-slate-900">MHP Sites</h1>
                        <p class="mt-1 text-base text-slate-500">Manage, view, and update micro-hydel project sites.</p>
                    </div>
                    <div class="flex w-full md:w-auto items-center gap-x-4">
                        <div class="relative flex-grow">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg class="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                v-model="searchTerm"
                                placeholder="Search by CBO or Status..."
                                class="block w-full rounded-lg border-0 py-2.5 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <a href="/mhp/mhp-sites/create" class="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex-shrink-0">
                            <svg class="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                            </svg>
                            <span>New Site</span>
                        </a>
                    </div>
                </div>
            </header>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                <div v-for="site in filteredSites" :key="site.id" class="bg-white rounded-xl shadow-sm border border-slate-200/80 p-4 flex flex-col justify-between">
                    <div>
                        <div class="flex justify-between items-start">
                            <div>
                                <p class="font-semibold text-slate-800">{{ site.cbo?.reference_code ?? 'N/A' }}</p>
                                <p class="text-xs text-slate-500">ID: {{ site.id }}</p>
                            </div>
                            <div class="flex items-center gap-2">
                <span :class="getStatusClass(site.status)" class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                  {{ site.status ?? 'N/A' }}
                </span>
                                <button @click.stop="toggleActionMenu(site.id, $event)" class="p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100">
                                    <span class="text-xl leading-none">⋮</span>
                                </button>
                            </div>
                        </div>

                        <div class="mt-4 pt-4 border-t border-slate-200/80 grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p class="text-xs text-slate-500">Population</p>
                                <p class="font-medium text-slate-700">{{ site.population ?? 'N/A' }}</p>
                            </div>
                            <div>
                                <p class="text-xs text-slate-500">Admin Approval</p>
                                <p :class="site.admin_approval ? 'text-green-600' : 'text-red-600'" class="font-semibold">
                                    {{ site.admin_approval ? '✓ Exists' : '✗ None' }}
                                </p>
                            </div>
                        </div>

                        <div class="mt-4">
                            <p class="text-xs text-slate-500">Attachments</p>
                            <div v-if="site.media.length" class="text-sm font-medium text-slate-700">{{ site.media.length }} file(s)</div>
                            <div v-else class="text-sm text-slate-400">—</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200/80">
                <table class="min-w-full divide-y divide-slate-200">
                    <thead class="bg-slate-100">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Site Info</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Population</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Approval</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Attachments</th>
                        <th scope="col" class="relative px-6 py-3"><span class="sr-only">Actions</span></th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200">
                    <tr v-for="site in filteredSites" :key="site.id" class="hover:bg-slate-50/70 transition-colors duration-150">

                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-slate-900">{{ site.cbo?.reference_code ?? 'N/A' }}</div>
                            <div class="text-xs text-slate-500">ID: {{ site.id }}</div>
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(site.status)" class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                  {{ site.status ?? 'N/A' }}
                </span>
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{{ site.population ?? 'N/A' }}</td>

                        <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                <span :class="site.admin_approval ? 'text-green-600' : 'text-red-600'">
                  {{ site.admin_approval ? '✓ Exists' : '✗ None' }}
                </span>
                        </td>

                        <td class="px-6 py-4">
                            <div v-if="site.media.length" class="space-y-1.5 text-xs max-h-24 overflow-y-auto pr-2">
                                <div v-for="file in site.media" :key="file.id" class="flex items-center gap-1.5" :title="`Size: ${(file.size/1024).toFixed(1)} KB | Uploaded: ${new Date(file.created_at).toLocaleDateString()}`">
                                    <span class="text-slate-500">{{ getFileIcon(file) }}</span>
                                    <a :href="file.original_url" target="_blank" class="text-indigo-600 hover:text-indigo-800 hover:underline truncate">{{ file.file_name }}</a>
                                </div>
                            </div>
                            <span v-else class="text-slate-400 text-xs">—</span>
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                            <button @click.stop="toggleActionMenu(site.id, $event)" class="p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-200/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span class="text-xl leading-none">⋮</span>
                            </button>
                            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                <div v-if="openActionMenuId === site.id" :class="['origin-top-right absolute w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20', menuDirection === 'up' ? 'bottom-full mb-2 right-0' : 'top-full mt-2 right-0']">
                                    <div class="py-1 text-sm text-slate-700">
                                        <a href="#" @click.prevent="selectedSite = site; showDetailsModal = true" class="block px-4 py-2 hover:bg-slate-100">View Details</a>
                                        <a href="#" @click.prevent="selectedSite = site; showEditInfoModal = true" class="block px-4 py-2 hover:bg-slate-100">Edit Info</a>
                                        <a v-if="site.admin_approval" href="#" @click.prevent="selectedSite = site; showApprovalViewModal = true" class="block px-4 py-2 hover:bg-slate-100">View Approval</a>
                                        <a href="#" @click.prevent="selectedSite = site; approvalAction = site.admin_approval ? 'update' : 'create'; showAdminApprovalModal = true" class="block px-4 py-2 hover:bg-slate-100">
                                            {{ site.admin_approval ? 'Edit Approval' : '+ Add Approval' }}
                                        </a>
                                        <a href="#" @click.prevent="openRevisedCostModal(site)" :class="{ 'opacity-50 cursor-not-allowed': !determineNextField(site.admin_approval) }" class="block px-4 py-2 hover:bg-slate-100">
                                            {{ nextRevisedCostLabel(site.admin_approval) }}
                                        </a>
                                        <div class="border-t border-slate-100 my-1"></div>
                                        <a href="#" @click.prevent="selectedSite = site; showReportModal = true" class="block px-4 py-2 hover:bg-slate-100">View Report</a>
                                        <a href="#" @click.prevent="openCompletionModal(site)" class="block px-4 py-2 hover:bg-slate-100">
                                            {{ site.completion ? 'Edit Completion' : '+ Add Completion' }}
                                        </a>
                                        <a v-if="site.completion" href="#" @click.prevent="openCompletionModal(site, 'view')" class="block px-4 py-2 hover:bg-slate-100">
                                            View Completion
                                        </a>
                                        <button
                                            @click="openEmeProgress(site)"
                                            class="px-2 py-1 bg-yellow-500 text-white rounded"
                                        >
                                            EME Progress
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

    <MhpEmeProgressModal
        :show="emeModalVisible"
        :site="selectedSite"
        @close="emeModalVisible = false"
    />

</template>

<style scoped>
button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>

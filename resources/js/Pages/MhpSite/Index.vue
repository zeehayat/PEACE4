<script setup>
import { ref, computed, onMounted } from 'vue'

import MhpSiteDetailsModal from '@/Components/MhpSiteDetailsModal.vue'
import MhpEditInfoModal from '@/Components/MhpEditInfoModal.vue'
import MhpAdminApprovalModal from '@/Components/MhpAdminApprovalModal.vue'
import MhpApprovalViewModal from '@/Components/MhpApprovalViewModal.vue'
import AddRevisedCostModal from '@/Components/AddRevisedCostModal.vue'
import MhpReport from '@/Pages/MhpSite/MhpReport.vue'
import MhpCompletionForm from "@/Pages/MhpCompletion/MhpCompletionForm.vue";

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

function openCompletionModal(site) {
    selectedSite.value = site
    selectedCompletion.value = site.completion || null
    completionMode.value = site.completion ? 'edit' : 'create'
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
    <div class="bg-gray-50/50 min-h-screen">
        <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <h1 class="text-4xl font-bold text-gray-900">MHP Sites</h1>
                    <p class="mt-1 text-md text-gray-600">Manage, view, and update micro-hydel project sites.</p>
                </div>
                <div class="mt-4 md:mt-0">
                    <a href="/mhp/mhp-sites/create" class="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
                        + Add New Site
                    </a>
                </div>
            </div>

            <div class="mb-5">
                <input type="text" v-model="searchTerm" placeholder="Search by CBO or Status..."
                       class="block w-full rounded-md border-0 py-2.5 pl-3 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>

            <div class="hidden md:block bg-white rounded-lg shadow overflow-hidden">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Site Info</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Population</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Approval</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attachments</th>
                        <th class="px-6 py-3 text-right"></th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr v-for="site in filteredSites" :key="site.id" class="hover:bg-gray-50">
                        <!-- Site Info -->
                        <td class="px-6 py-4">
                            {{ site.cbo?.reference_code ?? 'N/A' }}
                            <br />
                            <small>ID: {{ site.id }}</small>
                        </td>

                        <!-- Status -->
                        <td class="px-6 py-4">
          <span
              :class="getStatusClass(site.status)"
              class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
          >
            {{ site.status ?? 'N/A' }}
          </span>
                        </td>

                        <!-- Population -->
                        <td class="px-6 py-4">{{ site.population ?? 'N/A' }}</td>

                        <!-- Approval -->
                        <td class="px-6 py-4">
          <span :class="site.admin_approval ? 'text-green-600' : 'text-red-600'">
            {{ site.admin_approval ? '✓ Exists' : '✗ None' }}
          </span>
                        </td>

                        <!-- Attachments -->
                        <!-- 📁 Attachments for MhpSite -->
                        <td class="px-6 py-4">
                            <div v-if="site.media.length" class="space-y-1 text-xs max-h-20 overflow-y-auto">
                                <div
                                    v-for="file in site.media"
                                    :key="file.id"
                                    class="flex items-center gap-1"
                                    :title="`Size: ${(file.size/1024).toFixed(1)} KB | Uploaded: ${new Date(file.created_at).toLocaleDateString()}`"
                                >
                                    <span>{{ getFileIcon(file) }}</span>
                                    <a
                                        :href="file.original_url"
                                        target="_blank"
                                        class="text-blue-600 underline hover:text-blue-800 truncate"
                                    >
                                        {{ file.file_name }}
                                    </a>
                                </div>
                            </div>
                            <span v-else class="text-gray-400 text-xs">—</span>
                        </td>

                        <!-- Actions -->
                        <td class="px-6 py-4 text-right relative">
                            <button
                                @click.stop="toggleActionMenu(site.id, $event)"
                                class="p-2 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100"
                            >
                                ⋮
                            </button>

                            <transition
                                enter-active-class="transition ease-out duration-100"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95"
                            >
                                <div
                                    v-if="openActionMenuId === site.id"
                                    :class="[
                'origin-top-right absolute w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10',
                menuDirection === 'up' ? 'bottom-full mb-2 right-0' : 'top-full mt-2 right-0'
              ]"
                                >
                                    <div class="py-1 text-sm">
                                        <a href="#" @click.prevent="selectedSite = site; showDetailsModal = true" class="block px-4 py-2 hover:bg-gray-100">View Details</a>
                                        <a href="#" @click.prevent="selectedSite = site; showEditInfoModal = true" class="block px-4 py-2 hover:bg-gray-100">Edit</a>
                                        <a v-if="site.admin_approval" href="#" @click.prevent="selectedSite = site; showApprovalViewModal = true" class="block px-4 py-2 hover:bg-gray-100">View Approval</a>
                                        <a href="#" @click.prevent="selectedSite = site; approvalAction = site.admin_approval ? 'update' : 'create'; showAdminApprovalModal = true" class="block px-4 py-2 hover:bg-gray-100">
                                            {{ site.admin_approval ? 'Edit Approval' : '+ Add Approval' }}
                                        </a>
                                        <a href="#" @click.prevent="openRevisedCostModal(site)" :class="{ 'opacity-50 cursor-not-allowed': !determineNextField(site.admin_approval) }" class="block px-4 py-2 hover:bg-gray-100">
                                            {{ nextRevisedCostLabel(site.admin_approval) }}
                                        </a>
                                        <div class="border-t border-gray-100 my-1"></div>
                                        <a href="#" @click.prevent="selectedSite = site; showReportModal = true" class="block px-4 py-2 hover:bg-gray-100">View Report</a>
                                        <a
                                            href="#"
                                            @click.prevent="
    selectedSite = site;
    selectedCompletion.value = site.completion ?? null;
    completionMode.value = site.completion ? 'edit' : 'create';
    showCompletionModal.value = true;
"
                                        >
                                            {{ site.completion ? 'Edit Completion' : '+ Add Completion' }}
                                        </a>



                                        <a
                                            v-if="site.completion"
                                            href="#"
                                            @click.prevent="
    selectedCompletion.value = site.completion;
    showCompletionModal.value = true;
    completionMode.value = 'view';
  "
                                            class="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            View Completion
                                        </a>

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

    <!-- Modals -->
    <MhpSiteDetailsModal :show="showDetailsModal" :site="selectedSite" @close="showDetailsModal = false; selectedSite = null" />
    <MhpEditInfoModal :show="showEditInfoModal" :site="selectedSite" @close="showEditInfoModal = false; selectedSite = null" @updated="handleUpdated" />
    <MhpAdminApprovalModal v-if="selectedSite" :show="showAdminApprovalModal" :action="approvalAction" :mhp-site-id="selectedSite.id" :approval="selectedSite.admin_approval" :errors="props.errors" @close="showAdminApprovalModal = false; selectedSite = null" @updated="handleUpdated" />
    <MhpApprovalViewModal v-if="selectedSite?.admin_approval" :show="showApprovalViewModal" :approval="selectedSite.admin_approval" @close="showApprovalViewModal = false; selectedSite = null" />
    <AddRevisedCostModal v-if="selectedSite" :show="showRevisedCostModal" :site="selectedSite" :field="revisedCostField" @close="showRevisedCostModal = false; selectedSite = null; revisedCostField = ''" @updated="handleUpdated" />
    <MhpReport v-if="selectedSite" :show="showReportModal" :site="selectedSite" @close="showReportModal = false; selectedSite = null" />
    <MhpCompletionForm
        v-if="selectedSite"
        :show="showCompletionModal"
        :mode="completionMode"
        :site="selectedSite"
        :mhp-completion="selectedCompletion"
        @close="showCompletionModal = false"
        @saved="handleUpdated"
    />


</template>

<style scoped>
button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>

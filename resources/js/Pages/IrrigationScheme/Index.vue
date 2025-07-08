<script setup>
import { ref, computed, onMounted } from 'vue'
import { router, Link } from '@inertiajs/vue3' // Import Link for pagination

import SideBar from "@/Components/SideBar.vue";
import Toast from '@/Components/Toast.vue'; // Assuming you have a Toast component
import IrrigationSchemeCreateModal from '@/Components/IrrigationComponents/IrrigationSchemeForm.vue'; // New Irrigation Create Modal

// Manager Modals (reusable for both MHP and Irrigation)
import ProjectPhysicalProgressManagerModal from '@/Pages/MhpPhysicalProgress/ProjectPhysicalProgressModal.vue';
import ProjectFinancialInstallmentManagerModal from '@/Pages/MhpFinancialProgress/ProjectFinancialInstallmentModal.vue';

// TODO: Add specific irrigation modals (View, Edit Info, Admin Approval, Completion) later
// import IrrigationSchemeDetailsModal from '@/Components/IrrigationSchemeDetailsModal.vue'
// import IrrigationEditInfoModal from '@/Components/IrrigationEditInfoModal.vue'
// import IrrigationAdminApprovalModal from '@/Components/IrrigationAdminApprovalModal.vue'
// import IrrigationApprovalViewModal from '@/Components/IrrigationApprovalViewModal.vue'
// import IrrigationCompletionForm from '@/Pages/IrrigationCompletion/IrrigationCompletionForm.vue';


const props = defineProps({
    irrigationSchemes: Object, // Prop for irrigation schemes data (paginated)
    filters: Object,
    errors: Object // For validation errors
})

const selectedScheme = ref(null) // Renamed from selectedSite for irrigation context
const toastVisible = ref(false)
const toastMessage = ref('')
const toastType = ref('success')
const searchTerm = ref(props.filters.search || '') // Bind search to filter
const openActionMenuId = ref(null)
const menuDirection = ref('down')

// Modals for IrrigationScheme (initially only create modal is active)
const showCreateSchemeModal = ref(false);
// TODO: Add refs for other irrigation-specific modals later (e.g., for editing, details, approvals)
// const showDetailsModal = ref(false)
// const showEditInfoModal = ref(false)
// const showAdminApprovalModal = ref(false)
// const approvalAction = ref('create'); // 'create' or 'update'
// const showApprovalViewModal = ref(false)
// const showCompletionModal = ref(false);
// const completionMode = ref('create');
// const selectedCompletion = ref(null);


// Refs for reusable Manager modals (Project Physical/Financial Progress)
const showProjectPhysicalProgressManagerModal = ref(false);
const showProjectFinancialInstallmentManagerModal = ref(false);


// Functions to open reusable manager modals
function openProjectPhysicalProgressManager(scheme) { // Adapted for irrigation scheme
    selectedScheme.value = scheme;
    showProjectPhysicalProgressManagerModal.value = true;
}

function openProjectFinancialInstallmentManager(scheme) { // Adapted for irrigation scheme
    selectedScheme.value = scheme;
    showProjectFinancialInstallmentManagerModal.value = true;
}

// Function to open New Scheme Modal
function openNewSchemeModal() {
    showCreateSchemeModal.value = true;
}

// TODO: Add functions to open other irrigation-specific modals later (e.g., for editing, details, approvals)
/*
function openDetailsModal(scheme) { selectedScheme.value = scheme; showDetailsModal.value = true; }
function openEditInfoModal(scheme) { selectedScheme.value = scheme; showEditInfoModal.value = true; }
function openAdminApprovalModal(scheme, action) { selectedScheme.value = scheme; approvalAction.value = action; showAdminApprovalModal.value = true; }
function openApprovalViewModal(scheme) { selectedScheme.value = scheme; showApprovalViewModal.value = true; }
function openCompletionModal(scheme, mode) { selectedScheme.value = scheme; selectedCompletion.value = scheme.completion; completionMode.value = mode; showCompletionModal.value = true; }
*/

onMounted(() => {
    // Close action menu when clicking outside
    document.addEventListener('click', (e) => {
        if (openActionMenuId.value && !e.target.closest('.action-menu-container')) {
            openActionMenuId.value = null;
        }
    });
})

// Handles updates (e.g., from modals) to refresh data and show toast
function handleUpdated(message) {
    toastMessage.value = message
    toastType.value = 'success'
    toastVisible.value = true
    setTimeout(() => (toastVisible.value = false), 3000)
    router.reload({ only: ['irrigationSchemes'] }); // Reload irrigation schemes data
}

// Filtered schemes for display based on search term
const filteredSchemes = computed(() => {
    // If search term is empty, return all data provided by prop
    if (!searchTerm.value.trim()) return props.irrigationSchemes.data

    const term = searchTerm.value.trim().toLowerCase()
    return props.irrigationSchemes.data.filter(scheme =>
        (scheme.cbo?.reference_code || '').toLowerCase().includes(term) || // Search by CBO Reference Code
        (scheme.status || '').toLowerCase().includes(term) || // Search by Status
        (scheme.project_id || '').toLowerCase().includes(term) || // Search by Project ID
        (scheme.cbo?.district || '').toLowerCase().includes(term) // Search by CBO District
    )
})

// Helper function to get status classes for styling scheme status pills
function getStatusClass(status) {
    switch (status) {
        case 'New': return 'bg-blue-100 text-blue-800 border border-blue-200';
        case 'Rehabilitation': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
        default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
}

// Toggles the action menu for a specific scheme row
function toggleActionMenu(schemeId, event) {
    if (openActionMenuId.value === schemeId) {
        openActionMenuId.value = null
        return
    }

    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    const menuHeight = 300; // Estimated height of the action menu

    if (spaceBelow < menuHeight && rect.top > spaceBelow) {
        menuDirection.value = 'up' // Open upwards if not enough space below
    } else {
        menuDirection.value = 'down' // Open downwards by default
    }
    openActionMenuId.value = schemeId
}

// File icon helper (reusable for various file types)
function getFileIcon(file) {
    const ext = file.file_name.split('.').pop().toLowerCase()
    if (ext === 'pdf') return '📄'
    if (['doc', 'docx'].includes(ext)) return '📝'
    if (['xls', 'xlsx', 'csv'].includes(ext)) return '📊'
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return '🖼️'
    return '📁'
}

// Function to delete an Irrigation Scheme
function deleteScheme(schemeId) {
    if (confirm('Are you sure you want to delete this Irrigation Scheme? This action cannot be undone.')) {
        router.delete(route('irrigation.irrigation-schemes.destroy', schemeId), { // Use the destroy route
            onSuccess: () => {
                handleUpdated('Irrigation Scheme deleted successfully.');
            },
            onError: (errors) => {
                console.error('Error deleting scheme:', errors);
                handleUpdated('Failed to delete Irrigation Scheme.');
            }
        });
    }
}
</script>

<template>
    <side-bar />

    <div class="bg-gray-100 font-sans antialiased text-gray-800 min-h-screen">
        <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

            <header class="mb-8">
                <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">Irrigation Schemes Overview</h1>
                        <p class="mt-1 text-base text-gray-600">Centralized management for irrigation schemes and their progress.</p>
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
                                @input="router.get(route('irrigation.irrigation-schemes.index'), { search: searchTerm }, { preserveState: true, replace: true })"
                                placeholder="Search by CBO, Status, or ID..."
                                class="block w-full rounded-lg border-gray-300 bg-white py-2.5 pl-10 pr-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200"
                            />
                        </div>
                        <button @click="openNewSchemeModal" class="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200 flex-shrink-0">
                            <svg class="-ml-0.5 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                            </svg>
                            <span>New Scheme</span>
                        </button>
                    </div>
                </div>
            </header>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:hidden">
                <div v-for="scheme in filteredSchemes" :key="scheme.id" class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
                    <div>
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <p class="font-bold text-lg text-gray-900">{{ scheme.cbo?.reference_code ?? 'N/A' }}</p>
                                <p class="text-xs text-gray-500 mt-1">Scheme ID: {{ scheme.project_id }}</p>
                            </div>
                            <div class="relative action-menu-container">
                                <button @click.stop="toggleActionMenu(scheme.id, $event)" class="p-2 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                                </button>
                                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                    <div v-if="openActionMenuId === scheme.id" :class="['origin-top-right absolute w-56 rounded-xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-30 divide-y divide-gray-100', menuDirection === 'up' ? 'bottom-full mb-2 right-0' : 'top-full mt-2 right-0']">
                                        <div class="py-1 text-sm text-gray-700">
                                        </div>
                                        <div class="py-1 text-sm text-gray-700">
                                        </div>
                                        <div class="py-1 text-sm text-gray-700">
                                            <button @click="openProjectPhysicalProgressManager(scheme)" class="w-full text-left block px-4 py-2 hover:bg-gray-100">
                                                Manage Physical Progress
                                            </button>
                                            <button @click="openProjectFinancialInstallmentManager(scheme)" class="w-full text-left block px-4 py-2 hover:bg-gray-100">
                                                Manage Financial Installment
                                            </button>
                                        </div>
                                        <div class="py-1 text-sm text-gray-700">
                                            <button @click="deleteScheme(scheme.id)" class="w-full text-left block px-4 py-2 hover:bg-red-100 text-red-600">Delete Scheme</button>
                                        </div>
                                    </div>
                                </transition>
                            </div>
                        </div>

                        <div class="mt-4 pt-4 border-t border-gray-200">
                            <div class="flex items-center justify-between mb-3">
                                <p class="text-sm text-gray-500">Status</p>
                                <span :class="getStatusClass(scheme.status)" class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border">
                                  {{ scheme.status ?? 'N/A' }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="hidden md:block bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Scheme Info</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Beneficiary Farmers</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Channel Length (km)</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Land Area (Ha)</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Attachments</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Progress Summary</th>
                        <th scope="col" class="relative px-6 py-3"><span class="sr-only">Actions</span></th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                    <tr v-for="scheme in filteredSchemes" :key="scheme.id" class="hover:bg-gray-50 transition-colors duration-150 group">

                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">{{ scheme.cbo?.reference_code ?? 'N/A' }}</div>
                            <div class="text-xs text-gray-500 mt-0.5">Scheme ID: {{ scheme.id }}</div>
                            <div class="text-xs text-gray-500">District: {{ scheme.cbo?.district ?? 'N/A' }}</div>
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap">
                            <span :class="getStatusClass(scheme.status)" class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border">
                              {{ scheme.status ?? 'N/A' }}
                            </span>
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ scheme.beneficiary_farmers ?? 'N/A' }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ scheme.channel_length_km ?? 'N/A' }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ scheme.land_area_hectares ?? 'N/A' }}</td>

                        <td class="px-6 py-4">
                            <div v-if="scheme.media.length" class="space-y-2 text-xs max-h-24 overflow-y-auto pr-2">
                                <div v-for="file in scheme.media" :key="file.id" class="flex items-center gap-2" :title="`Size: ${(file.size/1024).toFixed(1)} KB | Uploaded: ${new Date(file.created_at).toLocaleDateString()}`">
                                    <span class="text-gray-500 flex-shrink-0">{{ getFileIcon(file) }}</span>
                                    <a :href="file.original_url" target="_blank" class="text-indigo-600 hover:text-indigo-800 hover:underline truncate">{{ file.file_name }}</a>
                                </div>
                            </div>
                            <span v-else class="text-gray-400 text-sm">—</span>
                        </td>

                        <td class="px-6 py-4">
                            <div class="space-y-1 text-sm">
                                <div v-if="scheme.physicalProgresses && scheme.physicalProgresses.length">
                                    <p class="font-semibold text-gray-800">Latest Physical:</p>
                                    <span class="text-xs text-gray-600">{{ scheme.physicalProgresses[scheme.physicalProgresses.length - 1].progress_percentage }}% on {{ scheme.physicalProgresses[scheme.physicalProgresses.length - 1].progress_date }}</span>
                                </div>
                                <div v-else class="text-gray-400 text-xs">— No Physical Progress</div>

                                <div v-if="scheme.financialInstallments && scheme.financialInstallments.length" class="pt-1 border-t border-gray-100 mt-1">
                                    <p class="font-semibold text-gray-800">Latest Financial:</p>
                                    <span class="text-xs text-gray-600">Inst. #{{ scheme.financialInstallments[scheme.financialInstallments.length - 1].installment_number }} ({{ scheme.financialInstallments[scheme.financialInstallments.length - 1].installment_amount }})</span>
                                </div>
                                <div v-else class="text-gray-400 text-xs">— No Financial Installments</div>
                            </div>
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative action-menu-container">
                            <button @click.stop="toggleActionMenu(scheme.id, $event)" class="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-200/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                            </button>
                            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                <div v-if="openActionMenuId === scheme.id" :class="['origin-top-right absolute w-56 rounded-xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-30 divide-y divide-gray-100', menuDirection === 'up' ? 'bottom-full mb-2 right-0' : 'top-full mt-2 right-0']">
                                    <div class="py-1 text-sm text-gray-700">
                                    </div>
                                    <div class="py-1 text-sm text-gray-700">
                                    </div>
                                    <div class="py-1 text-sm text-gray-700">
                                        <button @click="openProjectPhysicalProgressManager(scheme)" class="w-full text-left block px-4 py-2 hover:bg-gray-100">
                                            Manage Physical Progress
                                        </button>
                                        <button @click="openProjectFinancialInstallmentManager(scheme)" class="w-full text-left block px-4 py-2 hover:bg-gray-100">
                                            Manage Financial Installment
                                        </button>
                                    </div>
                                    <div class="py-1 text-sm text-gray-700">
                                        <button @click="deleteScheme(scheme.id)" class="w-full text-left block px-4 py-2 hover:bg-red-100 text-red-600">Delete Scheme</button>
                                    </div>
                                </div>
                            </transition>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <nav v-if="irrigationSchemes.links.length > 3" class="mt-8 flex justify-center">
                <div class="flex flex-wrap -mb-1">
                    <template v-for="(link, key) in irrigationSchemes.links" :key="key">
                        <div v-if="link.url === null" class="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded" v-html="link.label" />
                        <Link v-else :href="link.url" class="mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-indigo-500 focus:text-indigo-500" :class="{ 'bg-white text-indigo-500': link.active }" v-html="link.label" />
                    </template>
                </div>
            </nav>

        </div>
    </div>

    <Toast :show="toastVisible" :message="toastMessage" :type="toastType" @hide="toastVisible = false" />

    <IrrigationSchemeCreateModal
        :show="showCreateSchemeModal"
        :errors="props.errors"
        @close="showCreateSchemeModal = false"
        @saved="handleUpdated"
    />
    <ProjectPhysicalProgressManagerModal
        v-if="selectedScheme"
        :show="showProjectPhysicalProgressManagerModal"
        :site="selectedScheme"
        @close="showProjectPhysicalProgressManagerModal = false"
        @saved="handleUpdated"
    />

    <ProjectFinancialInstallmentManagerModal
        v-if="selectedScheme"
        :show="showProjectFinancialInstallmentManagerModal"
        :site="selectedScheme"
        @close="showProjectFinancialInstallmentManagerModal = false"
        @saved="handleUpdated"
    />

</template>

<style scoped>
button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>

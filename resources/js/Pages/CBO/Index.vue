<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { router, Link, usePage } from '@inertiajs/vue3';

import SideBar from "@/Components/SideBar.vue";
import Toast from '@/Components/Toast.vue';
import Pagination from '@/Components/Pagination.vue';

// CBO-specific Components and Modals
import CboDialogueModal from "@/Pages/CBO/Modals/CboDialogueModal.vue";
import CboListCard from '@/Pages/CBO/Components/CboListCard.vue';
import CboCreateModal from '@/Pages/CBO/Modals/CboCreateModal.vue';
import CboEditModal from '@/Pages/CBO/Modals/CboEditModal.vue';
import CboDetailsModal from '@/Pages/CBO/Modals/CboDetailsModal.vue';
import CboExposureVistModal from '@/Pages/CBO/Modals/CboExposureVisitModal.vue'

// Related entity modals (will be created later)


 import CboTrainingModal from '@/Pages/CBO/Modals/CboTrainingModal.vue';
import AppLayout from "@/Layouts/AppLayout.vue";


const props = defineProps({
    cbos: Object, // Paginated data for CBOs
    filters: Object,
    errors: Object, // Validation errors from backend
});

const page = usePage();

const selectedCbo = ref(null);

const toastVisible = ref(false);
const toastMessage = ref('');
const toastType = ref('success');
const searchTerm = ref(props.filters.search || '');

const openActionMenuId = ref(null);
const menuPosition = ref({ top: 0, left: 0, width: 0, direction: 'down' });

const showCboCreateModal = ref(false);
const showCboEditModal = ref(false);
const showCboDetailsModal = ref(false);
const showCboDialogueModal = ref(false); // <--- ENSURE THIS IS DECLARED AND INITIALIZED
const showCboExposureVisitModal = ref(false); // Placeholder flag
const showCboTrainingModal = ref(false); // Placeholder flag


function handleUpdated(message) {
    toastMessage.value = message;
    toastType.value = 'success';
    toastVisible.value = true;
    setTimeout(() => (toastVisible.value = false), 3000);

    router.reload({ only: ['cbos'], preserveState: true });
}

function closeModal() {
    showCboCreateModal.value = false;
    showCboEditModal.value = false;
    showCboDetailsModal.value = false;
    showCboDialogueModal.value = false; // Close dialogue modal
    showCboExposureVisitModal.value = false; // Close exposure visit modal
    showCboTrainingModal.value = false; // Close training modal

    setTimeout(() => {
        selectedCbo.value = null;
        openActionMenuId.value = null; // Ensure menu is closed when any modal closes
    }, 300);
}

async function toggleActionMenu(cboId, event) {
    if (event) {
        event.stopPropagation();
    }

    if (openActionMenuId.value === cboId) {
        openActionMenuId.value = null;
        return;
    }

    const cboToOpen = props.cbos.data.find(c => c.id === cboId);
    if (!cboToOpen) {
        console.error('CBO not found for action menu:', cboId);
        return;
    }
    selectedCbo.value = cboToOpen;

    await nextTick();

    const button = event.currentTarget;
    if (!button) {
      //  console.error('Event target (button) not found for menu toggle.');
        menuPosition.value = { top: 0, left: 0, width: 0, direction: 'down' };
        openActionMenuId.value = cboId;
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

    openActionMenuId.value = cboId;
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
    //console.log('CBO Index page mounted. Full cbos prop:', props.cbos);
    //console.log('CBO Index page mounted. cbos.data:', props.cbos?.data);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', closeAllActionMenus);
});

function handleViewDetails(cbo) { selectedCbo.value = cbo; showCboDetailsModal.value = true; openActionMenuId.value = null; }
function handleEditCbo(cbo) { selectedCbo.value = cbo; showCboEditModal.value = true; openActionMenuId.value = null; }

function handleAddDialogue(cbo) {

    selectedCbo.value = cbo;
    showCboDialogueModal.value = true; // <--- This must be set to true
    openActionMenuId.value = null; // Close action menu
    //console.log('Index.vue: showCboDialogueModal status after click:', showCboDialogueModal.value); // Add this log
}
function handleListDialogues(cbo) {
    //console.log('Index.vue: handleListDialogues called');
    selectedCbo.value = cbo;
    showCboDialogueModal.value = true; // <--- This opens the modal to show the list
    openActionMenuId.value = null; // Close action menu
    //console.log('Index.vue: showCboDialogueModal status after list click:', showCboDialogueModal.value);
}
function handleAddExposureVisit(cbo) { selectedCbo.value = cbo; showCboExposureVisitModal.value = true; openActionMenuId.value = null; }
function handleListExposureVisits(cbo) { selectedCbo.value = cbo;
console.log('Handle Exposure Visits')
    showCboExposureVisitListModal.value = true;
    openActionMenuId.value = null;
}
function handleAddTraining(cbo) {
console.log('Handle Training')
    selectedCbo.value = cbo;
    showCboTrainingModal.value = true;
    openActionMenuId.value = null;
}
function handleListTrainings(cbo) { selectedCbo.value = cbo; /* showCboTrainingListModal.value = true; */ openActionMenuId.value = null; }

function handleDeleteCbo(cboId) {
    openActionMenuId.value = null;
    if (confirm('Are you sure you want to delete this CBO? This action cannot be undone.')) {
        router.delete(route('cbo.cbos.destroy', cboId), {
            onSuccess: () => handleUpdated('CBO deleted successfully!'),
            onError: (errors) => {
                console.error('Error deleting CBO:', errors);
                toastMessage.value = 'Failed to delete CBO.';
                toastType.value = 'error';
                toastVisible.value = true;
                setTimeout(() => (toastVisible.value = false), 3000);
            }
        });
    }
}

const openNewCboModal = () => { selectedCbo.value = null; showCboCreateModal.value = true; openActionMenuId.value = null; };

const filteredCbos = computed(() => {
    const data = props.cbos?.data || [];
    console.log('CBO Index: filteredCbos computed - props.cbos.data (raw):', data);
    if (!searchTerm.value.trim()) return data;
    const term = searchTerm.value.trim().toLowerCase();
    const filtered = data.filter(cbo =>
        (cbo.reference_code || '').toLowerCase().includes(term) ||
        (cbo.district || '').toLowerCase().includes(term) ||
        (cbo.tehsil || '').toLowerCase().includes(term) ||
        (cbo.village || '').toLowerCase().includes(term) ||
        (cbo.president_name || '').toLowerCase().includes(term) ||
        (cbo.secretary_name || '').toLowerCase().includes(term)
    );
    console.log('CBO Index: filteredCbos computed - filtered result:', filtered);
    return filtered;
});

function getStatusClass(status) {
    return 'bg-gray-100 text-gray-800 border border-gray-200';
}

function getFileIcon(file) {
    const ext = file.file_name.split('.').pop().toLowerCase();
    if (ext === 'pdf') return '📄';
    if (['doc', 'docx'].includes(ext)) return '📝';
    if (['xls', 'xlsx', 'csv'].includes(ext)) return '📊';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return '🖼️';
    return '📁';
}

const handlePagination = (url) => {
    router.get(url, { search: searchTerm.value }, { preserveState: true, replace: true });
};
</script>

<template>
    <AppLayout title="Dashboard">
        <template #header>
            <h2 class="text-4xl font-extrabold text-indigo-700 border-collapse">SRSP PEACE 2</h2>
        </template>

    <div class="bg-gray-50 font-sans antialiased text-gray-800 min-h-screen">
        <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

            <header class="mb-8 bg-white p-6 rounded-lg shadow-md">
                <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">CBOs Overview</h1>
                        <p class="mt-1 text-base text-gray-600">Centralized management for Community Based Organizations and their activities.</p>
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
                                @input="router.get(route('cbo.cbos.index'), { search: searchTerm }, { preserveState: true, replace: true })"
                                placeholder="Search by CBO, District, Village..."
                                class="block w-full rounded-lg border-gray-300 bg-white py-2.5 pl-10 pr-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200"
                            />
                        </div>
                        <button @click="openNewCboModal" class="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200 flex-shrink-0">
                            <svg class="-ml-0.5 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                            </svg>
                            <span>New CBO</span>
                        </button>
                    </div>
                </div>
            </header>

            <!-- Card View for smaller screens -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:hidden">
                <CboListCard
                    v-for="cbo in filteredCbos"
                    :key="cbo.id"
                    :cbo="cbo"
                    :open-action-menu-id="openActionMenuId"
                    :menu-position="menuPosition"
                    @toggle-action-menu="toggleActionMenu"
                    @view-details="handleViewDetails"
                    @edit-cbo="handleEditCbo"
                    @add-dialogue="handleAddDialogue"
                    @list-dialogues="handleListDialogues"
                    @add-exposure-visit="handleAddExposureVisit"
                    @list-exposure-visits="handleListExposureVisits"
                    @add-training="handleAddTraining"
                    @list-trainings="handleListTrainings"
                    @delete-cbo="handleDeleteCbo"
                />
                <p v-if="filteredCbos.length === 0" class="text-center py-4 text-gray-500 col-span-full">No CBOs found to display (Card View).</p>
            </div>

            <!-- Table View for larger screens -->
            <div class="bg-white rounded-xl shadow-xl border border-gray-200"> <!-- REMOVED hidden md:block -->

                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">CBO Info</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Members</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Activities</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Attachments</th>
                        <th scope="col" class="relative px-6 py-3"><span class="sr-only">Actions</span></th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                    <tr v-for="cbo in filteredCbos" :key="cbo.id" class="hover:bg-gray-50 transition-colors duration-150 group">
                        <!-- CBO Info Column -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">{{ cbo.reference_code ?? 'N/A' }}</div>
                            <div class="text-xs text-gray-500 mt-0.5">Formed: {{ new Date(cbo.date_of_formation).toLocaleDateString() }}</div>
                            <div class="text-xs text-gray-500 mt-0.5">President: {{ cbo.president_name ?? 'N/A' }} ({{ cbo.president_contact ?? 'N/A' }})</div>
                            <div class="text-xs text-gray-500 mt-0.5">Secretary: {{ cbo.secretary_name ?? 'N/A' }} ({{ cbo.secretary_contact ?? 'N/A' }})</div>
                        </td>

                        <!-- Location Column -->
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            <div>{{ cbo.village ?? 'N/A' }}</div>
                            <div class="text-xs text-gray-500">{{ cbo.village_council ?? 'N/A' }}, {{ cbo.tehsil ?? 'N/A' }}, {{ cbo.district ?? 'N/A' }}</div>
                        </td>

                        <!-- Members Column -->
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            <div>Total: {{ cbo.total_members ?? 'N/A' }}</div>
                            <div class="text-xs text-gray-500">CBO Members: {{ cbo.num_cbo_members ?? 'N/A' }}</div>
                            <div class="text-xs text-gray-500">Gender: {{ cbo.gender ?? 'N/A' }}</div>
                        </td>

                        <!-- Activities Column -->
                        <td class="px-6 py-4">
                            <div class="space-y-1 text-sm">
                                <div>Dialogues: <span class="font-semibold">{{ cbo.dialogues_count ?? 0 }}</span></div>
                                <div>Trainings: <span class="font-semibold">{{ cbo.trainings_count ?? 0 }}</span></div>
                                <div>Exposure Visits: <span class="font-semibold">{{ cbo.exposure_visits_count ?? 0 }}</span></div>
                            </div>
                        </td>

                        <!-- Attachments Column -->
                        <td class="px-6 py-4">
                            <div v-if="cbo.attachments_frontend && cbo.attachments_frontend.length" class="space-y-2 text-xs max-h-24 overflow-y-auto pr-2">
                                <div v-for="file in cbo.attachments_frontend" :key="file.id" class="flex items-center gap-2" :title="`Size: ${(file.size/1024).toFixed(1)} KB | Uploaded: ${new Date(file.created_at).toLocaleDateString()}`">
                                    <span class="text-gray-500 flex-shrink-0">{{ getFileIcon(file) }}</span>
                                    <a :href="file.url" target="_blank" class="text-indigo-600 hover:text-indigo-800 hover:underline truncate">{{ file.file_name }}</a>
                                </div>
                            </div>
                            <span v-else class="text-gray-400 text-sm">—</span>
                        </td>

                        <!-- Actions Column -->
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative action-menu-container">
                            <button @click.stop="toggleActionMenu(cbo.id, $event)" class="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-200/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity action-menu-trigger">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                            </button>
                            <!-- The menu div is now teleported from Index.vue -->
                        </td>
                    </tr>
                    <!-- Fallback row if no CBOs found -->
                    <tr v-if="filteredCbos.length === 0">
                        <td colspan="6" class="px-6 py-4 text-center text-gray-500">No CBOs found to display.</td>
                    </tr>
                    </tbody>
                </table>
            </div>


            <!-- Pagination -->
            <Pagination :links="cbos.links" @pagination-link-clicked="handlePagination" class="mt-8" />

        </div>
    </div>

    <!-- Toast Notification -->
    <Toast :show="toastVisible" :message="toastMessage" :type="toastType" @hide="toastVisible = false" />

    <!-- Modals -->
    <CboCreateModal :show="showCboCreateModal" @close="closeModal" @saved="handleUpdated" />
    <CboEditModal v-if="selectedCbo" :show="showCboEditModal" :cbo="selectedCbo" @close="closeModal" @updated="handleUpdated" />
    <CboDetailsModal v-if="selectedCbo" :show="showCboDetailsModal" :cbo="selectedCbo" @close="closeModal" />
    <CboDialogueModal v-if="selectedCbo" :show="showCboDialogueModal" :cbo="selectedCbo" @close="closeModal" @saved="handleUpdated" />
    <CboExposureVistModal
        v-if="selectedCbo"
        :show="showCboExposureVisitModal"
        :cbo="selectedCbo"
        @close="closeModal"
        @saved="handleUpdated"
    />

    <CboTrainingModal
        v-if="selectedCbo"
        :show="showCboTrainingModal"
        :cbo="selectedCbo"
        @close="closeModal"
        @saved="handleUpdated"
    />
    <!-- Teleported Action Menu -->
    <Teleport to="body">
        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <div
                v-if="openActionMenuId !== null && selectedCbo"
                :class="['action-menu-dropdown origin-top-right absolute w-56 rounded-xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-30 divide-y divide-gray-100', menuPosition.direction === 'up' ? 'bottom-full mb-2 right-0' : 'top-full mt-2 right-0']"
                :style="{
                    top: menuPosition.top + 'px',
                    left: (menuPosition.left + menuPosition.width - 224) + 'px',
                }"
            >
                <!-- Menu items -->
                <div class="py-1 text-sm text-gray-700">
                    <button @click="handleViewDetails(selectedCbo)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                        View Details
                    </button>
                    <button @click="handleEditCbo(selectedCbo)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="M15 5l4 4"/></svg>
                        Edit CBO
                    </button>
                </div>
                <div class="py-1 text-sm text-gray-700">
                    <button @click="handleAddDialogue(selectedCbo)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-circle"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                        Add Dialogue
                    </button>
                    <button @click="handleListDialogues(selectedCbo)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-checks"><path d="m3 12 2 2 4-4"/><path d="M11 6h9"/><path d="M11 12h9"/><path d="M11 18h9"/></svg>
                        List Dialogues
                    </button>
                    <button @click="handleAddExposureVisit(selectedCbo)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-circle"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                        Add Exposure Visit
                    </button>
                    <button @click="handleListExposureVisits(selectedCbo)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-checks"><path d="m3 12 2 2 4-4"/><path d="M11 6h9"/><path d="M11 12h9"/><path d="M11 18h9"/></svg>
                        List Exposure Visits
                    </button>
                    <button @click="handleAddTraining(selectedCbo)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-circle"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                        Add Training
                    </button>
                    <button @click="handleListTrainings(selectedCbo)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-checks"><path d="m3 12 2 2 4-4"/><path d="M11 6h9"/><path d="M11 12h9"/><path d="M11 18h9"/></svg>
                        List Trainings
                    </button>
                </div>
                <div class="py-1 text-sm text-gray-700">
                    <button @click="handleDeleteCbo(selectedCbo.id)" class="w-full text-left block px-4 py-2 hover:bg-red-100 text-red-600 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                        Delete CBO
                    </button>
                </div>
            </div>
        </transition>
    </Teleport>
    </AppLayout>
</template>

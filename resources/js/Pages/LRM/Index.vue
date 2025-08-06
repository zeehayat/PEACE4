<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { router, Link, usePage } from '@inertiajs/vue3';

import SideBar from "@/Components/SideBar.vue";
import Toast from '@/Components/Toast.vue';
import Pagination from '@/Components/Pagination.vue';

// LRM-specific Components and Modals
import LrmListCard from '@/Pages/LRM/Components/LrmListCard.vue'; // For mobile view
import LrmCommitteeCreateModal from '@/Pages/LRM/Modals/LrmCommitteeCreateModal.vue';
import LrmCommitteeEditModal from '@/Pages/LRM/Modals/LrmCommitteeEditModal.vue';
import LrmCommitteeDetailsModal from '@/Pages/LRM/Modals/LrmCommitteeDetailsModal.vue';
import AppLayout from "@/Layouts/AppLayout.vue";


const props = defineProps({
    lrmCommittees: Object, // Paginated data for LRM Committees
    filters: Object,
    errors: Object, // Validation errors from backend
});

const page = usePage();

// --- Reactive State Variables ---
const selectedLrmCommittee = ref(null); // The LRM Committee object currently selected for modal/action

const toastVisible = ref(false);
const toastMessage = ref('');
const toastType = ref('success');
const searchTerm = ref(props.filters.search || '');

// === State for Teleported Action Menu ===
const openActionMenuId = ref(null); // ID of the currently open menu
const menuPosition = ref({ top: 0, left: 0, width: 0, direction: 'down' }); // Stores position for teleported menu
// ========================================

// Modal Visibility Control flags
const showLrmCommitteeCreateModal = ref(false);
const showLrmCommitteeEditModal = ref(false);
const showLrmCommitteeDetailsModal = ref(false);


// --- Centralized Handlers ---

// Handles updates (success messages, data reloads) from various forms/modals
function handleUpdated(message) {
    toastMessage.value = message;
    toastType.value = 'success';
    toastVisible.value = true;
    setTimeout(() => (toastVisible.value = false), 3000);

    router.reload({ only: ['lrmCommittees'], preserveState: true });
}

// Closes any open modal and clears selected data
function closeModal() {
    showLrmCommitteeCreateModal.value = false;
    showLrmCommitteeEditModal.value = false;
    showLrmCommitteeDetailsModal.value = false;

    // Reset selectedLrmCommittee after a slight delay to allow modal transition
    setTimeout(() => {
        selectedLrmCommittee.value = null;
        openActionMenuId.value = null; // Ensure menu is closed when any modal closes
    }, 300);
}

// === Teleported Action Menu Logic ===
async function toggleActionMenu(lrmCommitteeId, event) {
    if (event) {
        event.stopPropagation(); // Stop event bubbling
    }

    if (openActionMenuId.value === lrmCommitteeId) {
        openActionMenuId.value = null;
        return;
    }

    const lrmCommitteeToOpen = props.lrmCommittees.data.find(l => l.id === lrmCommitteeId);
    if (!lrmCommitteeToOpen) {
        console.error('LRM Committee not found for action menu:', lrmCommitteeId);
        return;
    }
    selectedLrmCommittee.value = lrmCommitteeToOpen;

    await nextTick();

    const button = event.currentTarget;
    if (!button) {
        console.error('Event target (button) not found for menu toggle.');
        menuPosition.value = { top: 0, left: 0, width: 0, direction: 'down' };
        openActionMenuId.value = lrmCommitteeId;
        return;
    }

    const rect = button.getBoundingClientRect();
    const menuHeightEstimate = 200; // Estimate menu height
    const direction = (window.innerHeight - rect.bottom < menuHeightEstimate && rect.top > (window.innerHeight - rect.bottom)) ? 'up' : 'down';

    menuPosition.value = {
        top: direction === 'down' ? rect.bottom + window.scrollY : rect.top + window.scrollY - menuHeightEstimate,
        left: rect.left + window.scrollX,
        width: rect.width,
        direction: direction,
    };

    openActionMenuId.value = lrmCommitteeId;
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

// --- Handlers for LRM Committee Actions ---
function handleViewDetails(lrmCommittee) { selectedLrmCommittee.value = lrmCommittee; showLrmCommitteeDetailsModal.value = true; openActionMenuId.value = null; }
function handleEditLrmCommittee(lrmCommittee) { selectedLrmCommittee.value = lrmCommittee; showLrmCommitteeEditModal.value = true; openActionMenuId.value = null; }
function handleDeleteLrmCommittee(lrmCommitteeId) {
    openActionMenuId.value = null;
    if (confirm('Are you sure you want to delete this LRM Committee? This action cannot be undone.')) {
        router.delete(route('lrm.committees.destroy', lrmCommitteeId), {
            onSuccess: () => handleUpdated('LRM Committee deleted successfully!'),
            onError: (errors) => {
                console.error('Error deleting LRM Committee:', errors);
                toastMessage.value = 'Failed to delete LRM Committee.';
                toastType.value = 'error';
                toastVisible.value = true;
                setTimeout(() => (toastVisible.value = false), 3000);
            }
        });
    }
}

const openNewLrmCommitteeModal = () => { selectedLrmCommittee.value = null; showLrmCommitteeCreateModal.value = true; openActionMenuId.value = null; };

// --- Filter and Display Helpers ---
const filteredLrmCommittees = computed(() => {
    const data = props.lrmCommittees?.data || [];
    if (!searchTerm.value.trim()) return data;
    const term = searchTerm.value.trim().toLowerCase();
    return data.filter(lrmCommittee =>
        (lrmCommittee.cbo?.reference_code || '').toLowerCase().includes(term) ||
        (lrmCommittee.remarks || '').toLowerCase().includes(term)
    );
});

function getStatusClass(status) {
    // LRM Committee doesn't have a direct 'status' enum, so this might be simplified or removed
    // if you add a status field to LRM Committee, update this.
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
                        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">LRM Committees Overview</h1>
                        <p class="mt-1 text-base text-gray-600">Manage Land Resource Management Committees and their activities.</p>
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
                                @input="router.get(route('lrm.committees.index'), { search: searchTerm }, { preserveState: true, replace: true })"
                                placeholder="Search by CBO or Remarks..."
                                class="block w-full rounded-lg border-gray-300 bg-white py-2.5 pl-10 pr-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200"
                            />
                        </div>
                        <button @click="openNewLrmCommitteeModal" class="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200 flex-shrink-0">
                            <svg class="-ml-0.5 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                            </svg>
                            <span>New LRM Committee</span>
                        </button>
                    </div>
                </div>
            </header>

            <!-- Card View for smaller screens -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:hidden">
                <LrmListCard
                    v-for="lrmCommittee in filteredLrmCommittees"
                    :key="lrmCommittee.id"
                    :lrm-committee="lrmCommittee"
                    :open-action-menu-id="openActionMenuId"
                    :menu-position="menuPosition"
                    @toggle-action-menu="toggleActionMenu"
                    @view-details="handleViewDetails"
                    @edit-lrm-committee="handleEditLrmCommittee"
                    @delete-lrm-committee="handleDeleteLrmCommittee"
                />
            </div>

            <!-- Table View for larger screens -->
            <div class="hidden md:block bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Committee Info</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">NRM Plan</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Plantation</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Land Covered (Ha)</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Attachments</th>
                        <th scope="col" class="relative px-6 py-3"><span class="sr-only">Actions</span></th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                    <tr v-for="lrmCommittee in filteredLrmCommittees" :key="lrmCommittee.id" class="hover:bg-gray-50 transition-colors duration-150 group">

                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">CBO: {{ lrmCommittee.cbo?.reference_code ?? 'N/A' }}</div>
                            <div class="text-xs text-gray-500 mt-0.5">Formed: {{ new Date(lrmCommittee.date_of_lrm_committee_formation).toLocaleDateString() }}</div>
                            <div class="text-xs text-gray-500 mt-0.5">Members: {{ lrmCommittee.no_of_lrm_committee_members ?? 'N/A' }}</div>
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            <div>Finalized: {{ lrmCommittee.date_of_nrm_plan_finalization ? new Date(lrmCommittee.date_of_nrm_plan_finalization).toLocaleDateString() : 'N/A' }}</div>
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            <div>Afforestation/Reforestation: {{ lrmCommittee.has_afforestation_reforestation ? 'Yes' : 'No' }}</div>
                            <div v-if="lrmCommittee.forest_plants && lrmCommittee.forest_plants.length">Forest: {{ lrmCommittee.forest_plants.join(', ') }}</div>
                            <div v-if="lrmCommittee.fruit_plants && lrmCommittee.fruit_plants.length">Fruit: {{ lrmCommittee.fruit_plants.join(', ') }}</div>
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {{ lrmCommittee.total_land_covered_hectares ?? 'N/A' }}
                        </td>

                        <td class="px-6 py-4">
                            <div v-if="lrmCommittee.attachments_frontend && lrmCommittee.attachments_frontend.length" class="space-y-2 text-xs max-h-24 overflow-y-auto pr-2">
                                <div v-for="file in lrmCommittee.attachments_frontend" :key="file.id" class="flex items-center gap-2" :title="`Size: ${(file.size/1024).toFixed(1)} KB | Uploaded: ${new Date(file.created_at).toLocaleDateString()}`">
                                    <span class="text-gray-500 flex-shrink-0">{{ getFileIcon(file) }}</span>
                                    <a :href="file.url" target="_blank" class="text-indigo-600 hover:text-indigo-800 hover:underline truncate">{{ file.file_name }}</a>
                                </div>
                            </div>
                            <span v-else class="text-gray-400 text-sm">—</span>
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative action-menu-container">
                            <button @click.stop="toggleActionMenu(lrmCommittee.id, $event)" class="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-200/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity action-menu-trigger">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                            </button>
                            <!-- The menu div is now teleported from Index.vue -->
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <Pagination :links="lrmCommittees.links" @pagination-link-clicked="handlePagination" class="mt-8" />

        </div>
    </div>

    <!-- Toast Notification -->
    <Toast :show="toastVisible" :message="toastMessage" :type="toastType" @hide="toastVisible = false" />

    <!-- Modals -->
    <LrmCommitteeCreateModal :show="showLrmCommitteeCreateModal" @close="closeModal" @saved="handleUpdated" />
    <LrmCommitteeEditModal v-if="selectedLrmCommittee" :show="showLrmCommitteeEditModal" :lrm-committee="selectedLrmCommittee" @close="closeModal" @updated="handleUpdated" />
    <LrmCommitteeDetailsModal v-if="selectedLrmCommittee" :show="showLrmCommitteeDetailsModal" :lrm-committee="selectedLrmCommittee" @close="closeModal" />

    <!-- Teleported Action Menu -->
    <Teleport to="body">
        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <div
                v-if="openActionMenuId !== null && selectedLrmCommittee"
                :class="['action-menu-dropdown origin-top-right absolute w-56 rounded-xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-30 divide-y divide-gray-100', menuPosition.direction === 'up' ? 'bottom-full mb-2 right-0' : 'top-full mt-2 right-0']"
                :style="{
                    top: menuPosition.top + 'px',
                    left: (menuPosition.left + menuPosition.width - 224) + 'px',
                }"
            >
                <div class="py-1 text-sm text-gray-700">
                    <button @click="handleViewDetails(selectedLrmCommittee)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                        View Details
                    </button>
                    <button @click="handleEditLrmCommittee(selectedLrmCommittee)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="M15 5l4 4"/></svg>
                        Edit LRM Committee
                    </button>
                </div>
                <div class="py-1 text-sm text-gray-700">
                    <button @click="handleDeleteLrmCommittee(selectedLrmCommittee.id)" class="w-full text-left block px-4 py-2 hover:bg-red-100 text-red-600 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                        Delete LRM Committee
                    </button>
                </div>
            </div>
        </transition>
    </Teleport>
    </AppLayout>
</template>

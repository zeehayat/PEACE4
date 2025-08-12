<script setup>
import { ref, onMounted } from 'vue'
import { useForm, router, usePage, Link } from '@inertiajs/vue3'
import axios from 'axios'
import { toast } from 'vue3-toastify'

import Modal from '@/Components/Modal.vue'
import CBODialogueForm from '@/Components/FormComponents/CBODialogueForm.vue'
import CBOTrainingForm from '@/Pages/CboTraining/Create.vue'
import CboExposureVisitForm from '@/Components/FormComponents/CBOExposureVisitForm.vue' // Reused for edit
import CboDetails from '@/Pages/Cbo/Partials/CboDetails.vue'
import CboListCard from '@/Components/CBO/CboListCard.vue';
import CboDialoguesList from '@/Components/CBO/CboDialoguesList.vue';
import CboTrainingsList from '@/Components/CBO/CboTrainingsList.vue';
import CboExposureVisitsList from '@/Components/CBO/CboExposureVisitsList.vue'; // NEW: Import the new exposure visits list component
import { route } from "ziggy-js"

const props = defineProps({
    cbos: {
        type: Array,
        default: () => []
    },
    filters: {
        type: Object,
        default: () => ({})
    }
})
const page = usePage()

const filters = ref({
    gender: page.props.filters?.gender || '',
    district: page.props.filters?.district || '',
    date_of_formation: page.props.filters?.date_of_formation || '',
})

const modal = ref(null)
const selectedCbo = ref(null)
const dialogueForm = ref(null)
const exposureForm = ref(null) // Reused for edit
const selectedTraining = ref(null);
const selectedExposureVisit = ref(null); // NEW: Ref for selected exposure visit for edit/delete

const openActionMenuId = ref(null)
const menuDirection = ref('down')

const toggleActionMenu = (cboId, event) => {
    if (openActionMenuId.value === cboId) {
        openActionMenuId.value = null
        return
    }

    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    const menuHeight = 250;

    if (spaceBelow < menuHeight && rect.top > menuHeight) {
        menuDirection.value = 'up'
    } else {
        menuDirection.value = 'down'
    }
    openActionMenuId.value = cboId
};

onMounted(() => {
    document.addEventListener('click', (e) => {
        if (openActionMenuId.value && !e.target.closest('.action-menu-container')) {
            openActionMenuId.value = null;
        }
    });
});

// --- Centralized CBO Data Fetcher for Modals ---
const fetchCboDetailsAndOpenModal = (cbo, targetModal) => {
    modal.value = targetModal;
    selectedCbo.value = null; // Clear previous state to show loading message

    axios.get(route('cbo.cbos.details', cbo.id), { params: { _t: Date.now() } })
        .then(res => {
            selectedCbo.value = res.data;
        })
        .catch((error) => {
            console.error(`Failed to load CBO details for ${targetModal}:`, error);
            toast.error(`Failed to load CBO details for ${targetModal}.`);
            closeModal();
        });
};

// --- Form Submission / Data Reload Handlers ---
const onActivityFormSaved = (message) => {
    toast.success(message);
    closeModal();
    if (selectedCbo.value) {
        axios.get(route('cbo.cbos.details', selectedCbo.value.id), { params: { _t: Date.now() } })
            .then(res => {
                selectedCbo.value = res.data;
            })
            .catch(error => {
                console.error("Error reloading CBO data after activity save:", error);
                router.reload({ only: ['cbos'] });
            });
    } else {
        router.reload({ only: ['cbos'] });
    }
};

// --- Modals Close Handler ---
const closeModal = () => {
    modal.value = null;
    setTimeout(() => {
        selectedCbo.value = null;
        selectedTraining.value = null;
        selectedExposureVisit.value = null; // NEW: Clear selected exposure visit
    }, 300);
};

// --- CBO (Main Resource) Handlers ---
const applyFilters = () => {
    router.get(route('cbo.cbos.index'), filters.value, {
        preserveScroll: true,
        preserveState: true,
    });
};

const handleEditCbo = (cbo) => {
    router.visit(route('cbo.cbos.edit', cbo.id));
};

const handleDeleteCbo = (cboId) => {
    if (confirm('Are you sure you want to delete this CBO? This action cannot be undone.')) {
        router.delete(route('cbo.cbos.destroy', cboId), {
            onSuccess: () => {
                toast.success('CBO deleted successfully!');
                router.reload({ only: ['cbos'] });
            },
            onError: (errors) => {
                console.error('Error deleting CBO:', errors);
                toast.error('Failed to delete CBO.');
            }
        });
    }
};

const handleOpenDetails = (cbo) => fetchCboDetailsAndOpenModal(cbo, 'details');


// --- CBO Dialogue Handlers ---
const handleOpenDialogueForm = (cbo) => {
    selectedCbo.value = cbo;
    dialogueForm.value = useForm({
        cbo_id: cbo.id,
        date_of_dialogue: '',
        participants: '',
        remarks: '',
        attachments: [],
        removed_attachments: [],
        existing_attachments: [],
    });
    modal.value = 'dialogue';
};

const submitDialogue = () => {
    dialogueForm.value.post(route('cbo.dialogues.store'), {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => onActivityFormSaved('Dialogue saved successfully!'),
        onError: (errors) => {
            console.error('Dialogue Form Errors:', errors);
            toast.error('Please correct the errors.');
        },
    });
};

const handleViewDialogues = (cbo) => fetchCboDetailsAndOpenModal(cbo, 'view-dialogues');

const handleDeleteDialogue = (dialogueId) => {
    if (confirm('Are you sure you want to delete this Dialogue? This action cannot be undone.')) {
        router.delete(route('cbo.dialogues.destroy', dialogueId), {
            onSuccess: () => onActivityFormSaved('Dialogue deleted successfully!'),
            onError: (errors) => {
                console.error('Error deleting dialogue:', errors);
                toast.error('Failed to delete dialogue.');
            }
        });
    }
};

// --- CBO Training Handlers ---
const handleOpenTrainingForm = (cbo) => {
    selectedCbo.value = cbo;
    modal.value = 'training-add';
};

const handleViewTrainings = (cbo) => fetchCboDetailsAndOpenModal(cbo, 'view-trainings');

const handleDeleteTraining = (trainingId) => {
    if (confirm('Are you sure you want to delete this Training? This action cannot be undone.')) {
        router.delete(route('cbo.trainings.destroy', trainingId), {
            onSuccess: () => onActivityFormSaved('Training deleted successfully!'),
            onError: (errors) => {
                console.error('Error deleting training:', errors);
                toast.error('Failed to delete training.');
            }
        });
    }
};

const handleEditTraining = (trainingId) => {
    axios.get(route('cbo.trainings.show', trainingId))
        .then(res => {
            selectedTraining.value = res.data;
            selectedCbo.value = page.props.cbos.find(c => c.id === selectedTraining.value.cbo_id); // Ensure parent CBO is set for context
            modal.value = 'training-edit';
        })
        .catch(error => {
            console.error('Error fetching training for edit:', error);
            toast.error('Failed to load training for editing.');
        });
};


// --- CBO Exposure Visit Handlers (NEW/UPDATED) ---
const handleOpenExposureForm = (cbo) => {
    selectedCbo.value = cbo;
    exposureForm.value = useForm({
        _method: 'POST', // Default for create
        cbo_id: cbo.id,
        date_of_visit: '',
        participants: '',
        purpose_of_visit: '', // Assuming this field exists based on CboDetails.vue
        remarks: '',
        attachments: [],
        removed_attachments: [],
        existing_attachments: [],
    });
    modal.value = 'exposure-add'; // NEW: Distinct state for adding exposure visits
};

const submitExposure = () => {
    exposureForm.value.post(route('cbo.exposure-visits.store'), {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => onActivityFormSaved('Exposure Visit saved successfully!'),
        onError: (errors) => {
            console.error('Exposure Form Errors:', errors);
            toast.error('Please correct the errors.');
        },
    });
};

const handleViewExposureVisits = (cbo) => fetchCboDetailsAndOpenModal(cbo, 'view-exposure-visits'); // NEW handler

const handleDeleteExposureVisit = (exposureVisitId) => { // NEW handler
    if (confirm('Are you sure you want to delete this Exposure Visit? This action cannot be undone.')) {
        router.delete(route('cbo.exposure-visits.destroy', exposureVisitId), {
            onSuccess: () => onActivityFormSaved('Exposure Visit deleted successfully!'),
            onError: (errors) => {
                console.error('Error deleting exposure visit:', errors);
                toast.error('Failed to delete exposure visit.');
            }
        });
    }
};

const handleEditExposureVisit = (exposureVisitId) => { // NEW handler
    axios.get(route('cbo.exposure-visits.show', exposureVisitId))
        .then(res => {
            selectedExposureVisit.value = res.data; // Set the fetched exposure visit data
            selectedCbo.value = page.props.cbos.find(c => c.id === selectedExposureVisit.value.cbo_id); // Ensure parent CBO is set
            modal.value = 'exposure-edit'; // NEW: Distinct state for editing exposure visits
        })
        .catch(error => {
            console.error('Error fetching exposure visit for edit:', error);
            toast.error('Failed to load exposure visit for editing.');
        });
};
</script>

<template>
    <div class="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6 sm:p-8 md:p-10 font-sans antialiased text-gray-800">
        <header class="text-center mb-10 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h1 class="text-4xl sm:text-5xl font-extrabold text-indigo-800 tracking-tight leading-tight mb-4">
                Community-Based Organizations
            </h1>
            <p class="text-lg text-gray-600 mb-6">Manage and track the progress of your CBOs with ease.</p>

            <div class="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                    class="btn-primary-gradient"
                    :href="route('cbo.cbos.create')"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-circle mr-2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                    <span>Add New CBO</span>
                </Link>

                <Link
                    class="btn-secondary-gradient"
                    :href="route('cbo.report')"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-bar-chart-2 mr-2"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 12v4"/><path d="M14 12v4"/></svg>
                    <span>CBO Activity Report</span>
                </Link>
            </div>
        </header>

        <div class="bg-white shadow-lg rounded-xl p-6 mb-12 border border-gray-200">
            <h2 class="text-2xl font-semibold text-gray-700 mb-5 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                Filter CBOs
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div class="relative">
                    <label for="gender" class="input-label">Gender</label>
                    <select id="gender" v-model="filters.gender" class="input-modern pt-4">
                        <option value="">All</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="mixed">Mixed</option>
                    </select>
                </div>
                <div class="relative">
                    <label for="district" class="input-label">District</label>
                    <input id="district" v-model="filters.district" type="text" class="input-modern pt-4" placeholder="Search District" />
                </div>
                <div class="relative">
                    <label for="date_of_formation" class="block text-sm font-medium text-gray-700 mb-1">Date of Formation</label>
                    <input id="date_of_formation" v-model="filters.date_of_formation" type="date" class="input-modern pt-4" />
                </div>
                <div class="flex items-end justify-end md:justify-start">
                    <button @click="applyFilters" class="btn-filter">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-funnel mr-2"><path d="M6 3h12l-6 9v9H6z"/></svg>
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>

        <div v-if="cbos.length" class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <CboListCard
                v-for="cbo in cbos"
                :key="cbo.id"
                :cbo="cbo"
                :open-action-menu-id="openActionMenuId"
                :menu-direction="menuDirection"
                @toggle-action-menu="toggleActionMenu"
                @edit="handleEditCbo"
                @open-dialogue="handleOpenDialogueForm"
                @open-training="handleOpenTrainingForm"
                @open-exposure="handleOpenExposureForm"
                @open-details="handleOpenDetails"
                @delete-cbo="handleDeleteCbo"
                @view-dialogues="handleViewDialogues"
                @view-trainings="handleViewTrainings"
                @view-exposure-visits="handleViewExposureVisits"
            />
        </div>

        <div v-else class="bg-white shadow-lg rounded-xl p-8 text-center text-gray-500 text-lg mt-8">
            No CBOs found matching your criteria.
        </div>

        <Modal :show="modal === 'dialogue'" @close="closeModal" title="Add CBO Dialogue">
            <CBODialogueForm :form="dialogueForm" :cbo="selectedCbo" :submit="submitDialogue" />
        </Modal>

        <Modal :show="modal === 'training-add'" @close="closeModal" title="Add CBO Training">
            <CBOTrainingForm :cboId="selectedCbo.id" mode="create" @success="onActivityFormSaved" @cancel="closeModal" />
        </Modal>

        <Modal :show="modal === 'training-edit'" @close="closeModal" title="Edit CBO Training">
            <CBOTrainingForm :cboId="selectedCbo.id" :training="selectedTraining" mode="edit" @success="onActivityFormSaved" @cancel="closeModal" />
        </Modal>


        <Modal :show="modal === 'exposure-add'" @close="closeModal" title="Add CBO Exposure Visit">
            <CboExposureVisitForm :form="exposureForm" :cbo="selectedCbo" @submit="submitExposure" mode="create" /> </Modal>

        <Modal :show="modal === 'exposure-edit'" @close="closeModal" title="Edit CBO Exposure Visit">
            <CboExposureVisitForm :form="exposureForm" :cbo="selectedCbo" :exposure-visit="selectedExposureVisit" @submit="submitExposure" mode="edit" /> </Modal>

        <Modal :show="modal === 'details'" @close="closeModal" title="CBO Details Report">
            <CboDetails v-if="selectedCbo" :cbo="selectedCbo" />
            <div v-else class="p-4 text-center text-gray-600">Loading CBO details...</div>
        </Modal>

        <Modal :show="modal === 'view-dialogues'" @close="closeModal" title="CBO Dialogues List">
            <CboDialoguesList v-if="selectedCbo" :cbo="selectedCbo" @delete-dialogue="handleDeleteDialogue"/>
            <div v-else class="p-4 text-center text-gray-600">Loading dialogues...</div>
        </Modal>

        <Modal :show="modal === 'view-trainings'" @close="closeModal" title="CBO Trainings List">
            <CboTrainingsList
                v-if="selectedCbo"
                :cbo="selectedCbo"
                @delete-training="handleDeleteTraining"
                @edit-training="handleEditTraining"
            />
            <div v-else class="p-4 text-center text-gray-600">Loading trainings...</div>
        </Modal>

        <Modal :show="modal === 'view-exposure-visits'" @close="closeModal" title="CBO Exposure Visits List">
            <CboExposureVisitsList
                v-if="selectedCbo && selectedCbo.exposure_visits"
                :cbo="selectedCbo"
                @delete-exposure-visit="handleDeleteExposureVisit"
                @edit-exposure-visit="handleEditExposureVisit"
            />
            <div v-else class="p-4 text-center text-gray-600">Loading exposure visits...</div>
        </Modal>
    </div>
</template>

<style scoped>
/* Modern Input Styling */
.input-modern {
    @apply appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base transition-all duration-200 ease-in-out;
}

/* Input Label (for floating effect) */
.input-label {
    @apply absolute -top-2 left-3 text-xs text-gray-500 bg-white px-1;
}

/* Main Action Buttons (Add CBO, Report) */
.btn-primary-gradient {
    @apply inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-full shadow-lg text-white
    bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
    transition-all duration-300 ease-in-out transform hover:scale-105;
}

.btn-secondary-gradient {
    @apply inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-full shadow-lg text-white
    bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500
    transition-all duration-300 ease-in-out transform hover:scale-105;
}

/* Filter Button */
.btn-filter {
    @apply inline-flex items-center justify-center w-full px-5 py-2.5 border border-transparent text-base font-semibold rounded-lg shadow-md text-white
    bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    transition-colors duration-200 ease-in-out transform hover:scale-105;
}
</style>

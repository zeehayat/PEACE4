<template>
    <div class="p-4 sm:p-6">
        <h1 class="text-3xl font-bold mb-6 text-gray-800 text-center">Community-Based Organizations</h1>

        <!-- Filters -->
        <div class="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
                <label class="block text-sm font-medium text-gray-700">Gender</label>
                <select v-model="filters.gender" class="w-full mt-1 border rounded px-3 py-2">
                    <option value="">All</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="mixed">Mixed</option>
                </select>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700">District</label>
                <input
                    type="text"
                    v-model="filters.district"
                    class="w-full mt-1 border rounded px-3 py-2"
                    placeholder="Search District"
                />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700">Date of Formation</label>
                <input
                    type="date"
                    v-model="filters.date_of_formation"
                    class="w-full mt-1 border rounded px-3 py-2"
                />
            </div>

            <div class="flex items-end">
                <button
                    @click="applyFilters"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-auto"
                >
                    Apply Filters
                </button>
            </div>
        </div>

        <!-- Grid View -->
        <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div v-for="cbo in cbos" :key="cbo.id" class="bg-white shadow rounded p-4 flex flex-col justify-between">
                <div class="space-y-1 text-sm text-gray-700">
                    <p><strong>Ref:</strong> {{ cbo.reference_code }}</p>
                    <p><strong>District:</strong> {{ cbo.district }}</p>
                    <p><strong>Tehsil:</strong> {{ cbo.tehsil }}</p>
                    <p><strong>VC:</strong> {{ cbo.village_council }}</p>
                    <p><strong>Village:</strong> {{ cbo.village }}</p>
                    <p><strong>Date:</strong> {{ cbo.date_of_formation }}</p>
                    <p><strong>Members:</strong> {{ cbo.total_members }}</p>
                    <p><strong>Gender:</strong> {{ cbo.gender }}</p>
                    <p><strong>CBO Members:</strong> {{ cbo.num_cbo_members }}</p>
                    <p><strong>President:</strong> {{ cbo.president_name }}</p>
                    <p><strong>Contact:</strong> {{ cbo.president_contact }}</p>
                </div>

                <!-- Action Buttons -->
                <div class="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <!-- Add this inside the button grid in List.vue -->
                    <button
                        @click="editCbo(cbo)"
                        class="bg-yellow-500 hover:bg-yellow-600 rounded shadow p-2 text-red-600 text-xs font-bold"
                        title="Edit CBO"
                    >
                        <Pencil class="w-5 h-5 text-white" />Edit
                    </button>
                    <button @click="openDialogueForm(cbo)" class="rounded p-2 shadow text-white font-bold text-xs bg-blue-600 hover:bg-blue-700" title="Dialogue">
                        <FilePlus class="w-5 h-5 text-white" /> Dialogue
                    </button>
                    <button @click="openTrainingForm(cbo)" class="rounded p-2 shadow text-white font-bold text-xs bg-orange-600 hover:bg-orange-700" title="Training">
                        <Plus class="w-5 h-5 text-white" /> Training
                    </button>
                    <button @click="openExposureForm(cbo)" class="rounded p-2 shadow text-white font-bold text-xs bg-purple-600 hover:bg-purple-700" title="Exposure">
                        <Globe class="w-5 h-5 text-white" /> Exposure
                    </button>
                    <button @click="openDetails(cbo)" class="rounded p-2 shadow text-white font-bold text-xs  bg-gray-700 hover:bg-gray-800" title="Details">
                        <Eye class="w-5 h-5 text-white" /> Details
                    </button>
                </div>
            </div>
        </div>

        <!-- Modals -->
        <Modal :show="modal === 'dialogue'" @close="closeModal">
            <CBODialogueForm
                :form="dialogueForm"
                :cbo="selectedCbo"
                :submit="submitDialogue"
            />
        </Modal>

        <Modal :show="modal === 'training'" @close="closeModal">
            <CBOTrainingForm :cboId="selectedCbo.id" @success="onTrainingSaved" />
        </Modal>

        <Modal :show="modal === 'exposure'" @close="closeModal">
            <CboExposureVisitForm
                :form="exposureForm"
                :cbo="selectedCbo"
                @submit="submitExposure"
            />
        </Modal>

        <!-- Details Modal -->
        <Modal :show="modal === 'details'" @close="closeModal">
            <CboDetails :cboId="selectedCbo.id" />
        </Modal>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useForm, router, usePage } from '@inertiajs/vue3'
import { toast } from 'vue3-toastify'
import { Pencil, Plus, FilePlus, Globe, Eye } from 'lucide-vue-next'

import Modal from '@/Components/Modal.vue'
import CBODialogueForm from '@/Components/FormComponents/CBODialogueForm.vue'
import CBOTrainingForm from '@/Pages/CboTraining/Create.vue'
import CboExposureVisitForm from '@/Components/FormComponents/CBOExposureVisitForm.vue'
import CboDetails from '@/Pages/Cbo/Partials/CboDetails.vue'

const props = defineProps({ cbos: Array })
const page = usePage()

const filters = ref({
    gender: page.props.filters?.gender || '',
    district: page.props.filters?.district || '',
    date_of_formation: page.props.filters?.date_of_formation || '',
})

const modal = ref(null)
const selectedCbo = ref(null)
const dialogueForm = ref(null)
const exposureForm = ref(null)

const applyFilters = () => {
    router.get(route('cbo.index'), filters.value, {
        preserveScroll: true,
        preserveState: true,
    })
}

const editCbo = (cbo) => {
    router.visit(`/cbos/${cbo.id}/edit`)
}

const openDialogueForm = (cbo) => {
    selectedCbo.value = cbo
    dialogueForm.value = useForm({
        cbo_id: cbo.id,
        date_of_dialogue: '',
        participants: '',
        attachments: [],
        removed_attachments: [],
        existing_attachments: [],
    })
    modal.value = 'dialogue'
}

const submitDialogue = () => {
    dialogueForm.value.post('/cbo/dialogues/store', {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
            toast.success('Dialogue saved successfully!')
            closeModal()
        },
        onError: () => toast.error('Please correct the errors.'),
    })
}

const openTrainingForm = (cbo) => {
    selectedCbo.value = cbo
    modal.value = 'training'
}

const onTrainingSaved = () => {
    toast.success('Training saved successfully!')
    closeModal()
}

const openExposureForm = (cbo) => {
    selectedCbo.value = cbo
    exposureForm.value = useForm({
        cbo_id: cbo.id,
        date_of_visit: '',
        participants: '',
        attachments: [],
        removed_attachments: [],
        existing_attachments: [],
    })
    modal.value = 'exposure'
}

const submitExposure = () => {
    exposureForm.value.post('/cbo/exposure-visits', {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
            toast.success('Exposure Visit saved successfully!')
            closeModal()
        },
        onError: () => toast.error('Please correct the errors.'),
    })
}

const openDetails = (cbo) => {
    selectedCbo.value = cbo
    modal.value = 'details'
}

const closeModal = () => {
    modal.value = null
    setTimeout(() => (selectedCbo.value = null), 300)
}
</script>

<style scoped>
.btn-icon {
    @apply inline-flex items-center justify-center p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-100 transition;
}
</style>

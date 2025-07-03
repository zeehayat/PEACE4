<template>
    <div class="p-4 sm:p-6">
        <h1 class="text-3xl font-bold mb-6 text-gray-800 text-center">Community-Based Organizations</h1>
        <div class="flex justify-center mb-10">
            <Link
                class="bg-orange-600 p-3 rounded-full hover:rounded-2xl shadow-2xl mr-3 hover:bg-orange-800 text-white font-bold flex items-center space-x-2"
                href="/cbo/create"
            >
                <PlusCircle class="w-5 h-5" />
                <span>Add CBO</span>
            </Link>

            <Link
                class="bg-orange-600 p-3 rounded-full hover:rounded-2xl shadow-2xl ml-3 hover:bg-orange-800 text-white font-bold flex items-center space-x-2"
                href="/cbo/report"
            >
                <FileBarChart2 class="w-5 h-5" />
                <span>CBO Activity Report</span>
            </Link>
        </div>
        <!-- Filters -->
        <div class="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
                <label class="block text-sm font-medium text-gray-700">Gender</label>
                <select v-model="filters.gender" class="input">
                    <option value="">All</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="mixed">Mixed</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">District</label>
                <input v-model="filters.district" type="text" class="input" placeholder="Search District" />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Date of Formation</label>
                <input v-model="filters.date_of_formation" type="date" class="input" />
            </div>
            <div class="flex items-end">
                <button @click="applyFilters" class="btn bg-blue-600 hover:bg-blue-700">Apply Filters</button>
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
                    <p><strong>President:</strong> {{ cbo.president_name }}</p>
                </div>

                <!-- Action Buttons -->
                <div class="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <button
                        @click="editCbo(cbo)"
                        class="btn bg-yellow-500 hover:bg-yellow-600 relative group"
                    >
                        <Pencil class="w-4 h-4" />
                        <span class="tooltip">Edit</span>
                    </button>

                    <button
                        @click="openDialogueForm(cbo)"
                        class="btn bg-blue-600 hover:bg-blue-700 relative group"
                    >
                        <MessageCircle class="w-4 h-4" />
                        <span class="tooltip">Dialogue</span>
                    </button>

                    <button
                        @click="openTrainingForm(cbo)"
                        class="btn bg-orange-600 hover:bg-orange-700 relative group"
                    >
                        <GraduationCap class="w-4 h-4" />
                        <span class="tooltip">Training</span>
                    </button>

                    <button
                        @click="openExposureForm(cbo)"
                        class="btn bg-purple-600 hover:bg-purple-700 relative group"
                    >
                        <Globe class="w-4 h-4" />
                        <span class="tooltip">Exposure</span>
                    </button>

                    <button
                        @click="openDetails(cbo)"
                        class="btn bg-gray-700 hover:bg-gray-800 relative group"
                    >
                        <Eye class="w-4 h-4" />
                        <span class="tooltip">Details</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Modals -->
        <Modal :show="modal === 'dialogue'" @close="closeModal">
            <CBODialogueForm :form="dialogueForm" :cbo="selectedCbo" :submit="submitDialogue" />
        </Modal>

        <Modal :show="modal === 'training'" @close="closeModal">
            <CBOTrainingForm :cboId="selectedCbo.id" @success="onTrainingSaved" />
        </Modal>

        <Modal :show="modal === 'exposure'" @close="closeModal">
            <CboExposureVisitForm :form="exposureForm" :cbo="selectedCbo" @submit="submitExposure" />
        </Modal>

        <Modal :show="modal === 'details'" @close="closeModal">
            <CboDetails v-if="selectedCbo" :cbo="selectedCbo" />
            <div v-else class="p-4 text-center">Loading...</div>
        </Modal>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import {useForm, router, usePage, Link} from '@inertiajs/vue3'
import axios from 'axios'
import { toast } from 'vue3-toastify'

import Modal from '@/Components/Modal.vue'
import CBODialogueForm from '@/Components/FormComponents/CBODialogueForm.vue'
import CBOTrainingForm from '@/Pages/CboTraining/Create.vue'
import CboExposureVisitForm from '@/Components/FormComponents/CBOExposureVisitForm.vue'
import CboDetails from '@/Pages/Cbo/Partials/CboDetails.vue'
import { route } from "ziggy-js"
import { Pencil, MessageCircle, GraduationCap, Globe, Eye,PlusCircle, FileBarChart2  } from 'lucide-vue-next'

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
    modal.value = 'details'
    selectedCbo.value = null

    axios.get(`/cbos/${cbo.id}/details`)
        .then(res => {
            selectedCbo.value = res.data
        })
        .catch(() => {
            toast.error("Failed to load CBO details")
            closeModal()
        })
}

const closeModal = () => {
    modal.value = null
    setTimeout(() => selectedCbo.value = null, 300)
}
</script>

<style scoped>
.input {
    @apply border border-gray-300 rounded px-3 py-2 w-full;
}
.btn {
    @apply text-white  px-2 py-1 text-xs font-bold flex justify-center items-center relative rounded-full shadow-2xl drop-shadow-2xl border-separate;
}

.tooltip {
    @apply absolute bottom-full mb-1 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10;
}
</style>

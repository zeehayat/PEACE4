<template>
    <div>
        <h1 class="text-2xl font-bold mb-6">Community-Based Organizations</h1>

        <table class="w-full table-auto border">
            <thead class="bg-gray-100">
            <tr>
                <th class="px-4 py-2 text-left">Reference Code</th>
                <th class="px-4 py-2 text-left">Name</th>
                <th class="px-4 py-2 text-left">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="cbo in cbos" :key="cbo.id" class="border-t">
                <td class="px-4 py-2">{{ cbo.reference_code }}</td>
                <td class="px-4 py-2">{{ cbo.name }}</td>
                <td class="px-4 py-2 space-x-2">
                    <button
                        class="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 hover:text-blue-600 transition"
                        @click="editCbo(cbo)"
                    >
                        <Pencil class="w-4 h-4" /> Edit
                    </button>

                    <button
                        class="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border border-blue-600 bg-blue-600 text-white hover:bg-blue-700 transition"
                        @click="openDialogueForm(cbo)"
                    >
                        <FilePlus class="w-4 h-4" /> Add Dialogue
                    </button>

                    <button
                        class="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border border-green-600 bg-green-600 text-white hover:bg-green-700 transition"
                        @click="openTrainingForm(cbo)"
                    >
                        <Plus class="w-4 h-4" /> Add Training
                    </button>

                    <button
                        class="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border border-purple-600 bg-purple-600 text-white hover:bg-purple-700 transition"
                        @click="openExposureForm(cbo)"
                    >
                        <Globe class="w-4 h-4" /> Add Exposure Visit
                    </button>
                </td>
            </tr>
            </tbody>
        </table>

        <!-- Dialogue Modal -->
        <Modal :show="modal === 'dialogue'" @close="closeModal">
            <CBODialogueForm
                :form="dialogueForm"
                :cbo="selectedCbo"
                :submit="submitDialogue"
            />
        </Modal>

        <!-- Training Modal -->
        <Modal :show="modal === 'training'" @close="closeModal">
            <CBOTrainingForm :cboId="selectedCbo.id" @success="onTrainingSaved" />
        </Modal>

        <!-- Exposure Visit Modal -->
        <Modal :show="modal === 'exposure'" @close="closeModal">
            <CboExposureVisitForm
                :form="exposureForm"
                :cbo="selectedCbo"
                @submit="submitExposure"
            />
        </Modal>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useForm, router } from '@inertiajs/vue3'
import { toast } from 'vue3-toastify'
import { Pencil, Plus, FilePlus, Globe } from 'lucide-vue-next'

import Modal from '@/Components/Modal.vue'
import CBODialogueForm from '@/Components/FormComponents/CBODialogueForm.vue'
import CBOTrainingForm from '@/Pages/CboTraining/Create.vue'
import CboExposureVisitForm from '@/Components/FormComponents/CBOExposureVisitForm.vue'

const props = defineProps({ cbos: Array })

const modal = ref(null)
const selectedCbo = ref(null)

const dialogueForm = ref(null)
const exposureForm = ref(null)

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
        onError: () => {
            toast.error('Please correct the errors.')
        },
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
        onError: () => {
            toast.error('Please correct the errors.')
        },
    })
}

const editCbo = (cbo) => {
    router.visit(`/cbos/${cbo.id}/edit`)
}

const closeModal = () => {
    modal.value = null
    setTimeout(() => {
        selectedCbo.value = null
    }, 300)
}
</script>

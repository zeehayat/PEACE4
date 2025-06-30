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
                    <button class="btn btn-sm btn-secondary m-3 border-2 -p3" @click="editCbo(cbo)">Edit</button>
                    <button class="btn btn-sm btn-primary m-3 border-2 -p3" @click="openDialogueForm(cbo)">Add Dialogue</button>
                    <button class="btn btn-sm btn-primary m-3 border-2 -p3" @click="openTrainingForm(cbo)">Add Training</button>
                    <button class="btn btn-sm btn-primary m-3 border-2 -p3" @click="openExposureForm(cbo)">Add Exposure Visit</button>
                </td>
            </tr>
            </tbody>
        </table>
        <p class="text-sm text-gray-500 mt-4">Current modal: {{ modal }}</p>

        <!-- Dialogue Modal -->
        <Modal v-if="modal === 'dialogue'" @close="closeModal">
            <CBODialogueForm
                :form="dialogueForm"
                :cbo="selectedCbo"
                :submit="submitDialogue"
            />
        </Modal>

        <!-- Training Modal -->
        <Modal :show="modal === 'training'" @close="closeModal">
            <div class="p-4">
                <p class="font-bold mb-2">Add Training for: {{ selectedCbo.reference_code }}</p>
                <CBOTrainingForm :cboId="selectedCbo.id" @success="onTrainingSaved" />
            </div>
        </Modal>

        <!-- Exposure Visit Modal (TODO) -->
        <Modal v-if="modal === 'exposure'" @close="closeModal">
            <div class="p-4">Exposure Visit Form will go here.</div>
        </Modal>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useForm, router } from '@inertiajs/vue3'
import { toast } from 'vue3-toastify'

import Modal from '@/Components/Modal.vue'
import CBODialogueForm from '@/Components/FormComponents/CBODialogueForm.vue'
import CBOTrainingForm from '@/Pages/CboTraining/Create.vue'

const props = defineProps({
    cbos: Array,
})

const modal = ref(null)
const selectedCbo = ref(null)
const dialogueForm = ref(null)

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
    dialogueForm.value.post('/cbodialogues', {
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
    modal.value = 'exposure'
}

const editCbo = (cbo) => {
    router.visit(`/cbos/${cbo.id}/edit`)
}

const closeModal = () => {
    modal.value = null
    selectedCbo.value = null
}
</script>

<template>
    <div>
        <h1 class="text-2xl font-bold mb-4">CBO: {{ item.name }}</h1>

        <!-- Tabs -->
        <div class="border-b mb-4">
            <nav class="flex space-x-4">
                <button @click="activeTab = 'dialogues'" :class="tabClass('dialogues')">Dialogues</button>
                <button @click="activeTab = 'exposure_visits'" :class="tabClass('exposure_visits')">Exposure Visits</button>
                <button @click="activeTab = 'trainings'" :class="tabClass('trainings')">Trainings</button>
            </nav>
        </div>

        <!-- Tab Content -->
        <div v-if="activeTab === 'dialogues'">
            <CBODialogueList :cboId="item.id" @add="showModal('dialogue')" />
        </div>
        <div v-if="activeTab === 'exposure_visits'">
            <CBOExposureVisitList :cboId="item.id" @add="showModal('exposure')" />
        </div>
        <div v-if="activeTab === 'trainings'">
            <CBOTrainingList :cboId="item.id" @add="showModal('training')" />
        </div>

        <!-- Modals -->
        <Modal v-if="modal === 'dialogue'" @close="closeModal">
            <CBODialogueForm
                v-if="dialogueForm"
                :form="dialogueForm"
                :cbo="item"
                :submit="submitDialogue"
            />
        </Modal>

        <Modal v-if="modal === 'exposure'" @close="closeModal">
            <CBOExposureVisitForm :cboId="item.id" @success="onActivityAdded" />
        </Modal>

        <Modal v-if="modal === 'training'" @close="closeModal">
            <CBOTrainingForm :cboId="item.id" @success="onActivityAdded" />
        </Modal>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useForm } from '@inertiajs/vue3'

import CBODialogueList from '@/Components/FormComponents/CBODialogueList.vue'
import CBOExposureVisitList from '@/Components/FormComponents/CBOExposureVisitList.vue'
import CBOTrainingList from '@/Components/FormComponents/CBOTrainingList.vue'

import CBODialogueForm from '@/Components/FormComponents/CBODialogueForm.vue'
import CBOExposureVisitForm from '@/Components/FormComponents/CBOExposureVisitForm.vue'
import CBOTrainingForm from './Create.vue'

import Modal from '@/Components/Modal.vue'

// Props
const props = defineProps({
    item: Object,
})

const item = props.item

// Tab state
const activeTab = ref('dialogues')
const modal = ref(null)

// Dialogue form state
const dialogueForm = ref(null)

const tabClass = (tab) => [
    'px-4 py-2 border-b-2',
    activeTab.value === tab ? 'border-blue-500 font-bold' : 'border-transparent text-gray-500',
]

// Modals control
const showModal = (type) => {
    modal.value = type

    if (type === 'dialogue') {
        createNewDialogueForm()
    }
}

const closeModal = () => {
    modal.value = null
}

const onActivityAdded = () => {
    closeModal()
}

// Form logic
const createNewDialogueForm = () => {
    dialogueForm.value = useForm({
        cbo_id: item.id,
        date_of_dialogue: '',
        participants: '',
        attachments: [],
        removed_attachments: [],
        existing_attachments: [],
    })
}

const submitDialogue = () => {
    dialogueForm.value.post('/cbodialogues', {
        preserveScroll: true,
        onSuccess: () => closeModal(),
    })
}
</script>

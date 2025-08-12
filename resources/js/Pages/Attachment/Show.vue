<template>
    <div class="max-w-5xl mx-auto py-6">
        <h1 class="text-2xl font-bold mb-6">CBO: {{ cbo.reference_code }}</h1>

        <!-- Tabs -->
        <div class="flex space-x-4 border-b mb-4">
            <button
                class="py-2 px-4 font-medium"
                :class="{ 'border-b-2 border-blue-600 text-blue-600': activeTab === 'dialogue' }"
                @click="activeTab = 'dialogue'"
            >
                Dialogue
            </button>
            <button
                class="py-2 px-4 font-medium"
                :class="{ 'border-b-2 border-green-600 text-green-600': activeTab === 'training' }"
                @click="activeTab = 'training'"
            >
                Training
            </button>
            <button
                class="py-2 px-4 font-medium"
                :class="{ 'border-b-2 border-purple-600 text-purple-600': activeTab === 'exposure' }"
                @click="activeTab = 'exposure'"
            >
                Exposure Visit
            </button>
        </div>

        <!-- Add Button -->
        <div>
            <button class="btn" @click="showModal = true">
                + Add {{ tabLabel }}
            </button>
        </div>
        <Modal :show="true" @close="showModal = false">
            <CBOExposureVisitForm :form="activityForm" :cbo="cbo" @submit="handleActivitySubmit" />
        </Modal>
        <!-- Modals -->
        <Modal :show="showModal" @close="showModal = false">
            <template #default>
                <component
                    :is="activeTabComponent"
                    :form="activityForm"
                    :cbo="cbo"
                    @submit="handleActivitySubmit"
                />
            </template>
        </Modal>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useForm, usePage } from '@inertiajs/vue3'

import Modal from '@/Components/Modal.vue'
import CBODialogueForm from '@/Components/FormComponents/CBODialogueForm.vue'
import CBOTrainingForm from '@/Pages/CboTraining/Create.vue'
import CBOExposureVisitForm from '@/Components/FormComponents/CBOExposureVisitForm.vue'

const { props } = usePage()
const cbo = props.cbo

const showModal = ref(false)
const activeTab = ref('dialogue')

const activityForm = useForm({
    cbo_id: cbo.id,
    date_of_dialogue: '',
    participants: '',
    date_of_training: '',
    training_type: '',
    training_gender: '',
    total_participants: '',
    attachments: [],
    existing_attachments: [],
    removed_attachments: [],
})

const activeTabComponent = computed(() => {
    return {
        dialogue: CBODialogueForm,
        training: CBOTrainingForm,
        exposure: CBOExposureVisitForm,
    }[activeTab.value]
})

const tabLabel = computed(() => {
    return {
        dialogue: 'Dialogue',
        training: 'Training',
        exposure: 'Exposure Visit',
    }[activeTab.value]
})

function handleActivitySubmit() {

    let endpoint = ''

    if (activeTab.value === 'dialogue') {
        endpoint = '/cbo/dialogues/store'
    } else if (activeTab.value === 'training') {
        endpoint = '/cbotrainings'
    } else if (activeTab.value === 'exposure') {
        endpoint = '/cbo/exposure-visits'
    }

    activityForm.post(endpoint, {
        forceFormData: true,
        onSuccess: () => {
            activityForm.reset()
            showModal.value = false
        },
        onError: () => {
            // Keep modal open and show errors
        }
    })
}
</script>

<style scoped>
.btn {
    @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700;
}
</style>

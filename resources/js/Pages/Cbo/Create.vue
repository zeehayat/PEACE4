<template>
    <div class="max-w-5xl mx-auto py-6">
        <h1 class="text-2xl font-bold mb-6">Create CBO</h1>

        <CBOForm :form="form" :errors="form.errors" :submit="submit" />

        <!-- Tabs -->
        <div class="mt-8">
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
                    :class="{ 'border-b-2 border-blue-600 text-blue-600': activeTab === 'exposure' }"
                    @click="activeTab = 'exposure'"
                >
                    Exposure Visit
                </button>
            </div>

            <!-- Tab Content -->
            <div>
                <button class="btn" @click="showModal = true">
                    + Add {{ activeTab === 'dialogue' ? 'Dialogue' : 'Exposure Visit' }}
                </button>
            </div>
        </div>

        <!-- Modal -->
        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-xl w-full relative z-50">
                <button @click="showModal = false" class="absolute top-2 right-2 text-gray-500 hover:text-black">&times;</button>

                <component
                    :is="activeTab === 'dialogue' ? 'CBODialogueForm' : 'CBOExposureVisitForm'"
                    :form="activityForm"
                    :cbo="cbo"
                    :submit="handleActivitySubmit"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useForm } from '@inertiajs/vue3'
import CBOForm from '@/Components/FormComponents/CBOForm.vue'
import CBODialogueForm from '@/Components/FormComponents/CBODialogueForm.vue'
import CBOExposureVisitForm from '@/Components/FormComponents/CBOExposureVisitForm.vue'
import {route} from 'ziggy-js'
const activeTab = ref('dialogue')
const showModal = ref(false)
const cbo = ref(null)

const form = useForm({
    reference_code: '',
    district: '',
    tehsil: '',
    village_council: '',
    village: '',
    date_of_formation: '',
    total_members: '',
    gender: '',
    num_cbo_members: '',
    president_name: '',
    president_contact: '',
    secretary_name: '',
    secretary_contact: '',
})

const activityForm = useForm({
    cbo_id: '',
    date_of_dialogue: '', // also reused as date_of_visit
    participants: '',
    attachments: [],
    existing_attachments: [],
    removed_attachments: [],
})

function submit() {
    form.post(route('cbo.cbo.store'), {
        onSuccess: (page) => {
            alert('CBO saved Succesfully')
            cbo.value = page.props?.cbo || page.props?.data?.cbo || null
            if (cbo.value) {

                activityForm.cbo_id = cbo.value.id
            }
        },
    })
}

function handleActivitySubmit() {
    const endpoint = activeTab.value === 'dialogue' ? '/cbo/dialogues/store' : '/cbo/exposure-visits'
    activityForm.post(endpoint, {
        forceFormData: true,
        onSuccess: () => {
            activityForm.reset()
            showModal.value = false
        },
    })
}
</script>

<style scoped>
.btn {
    @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700;
}
</style>

<script setup>
import { ref, computed } from 'vue'
import Modal from '@/Components/Modal.vue'
import ProjectPhysicalProgressModal from '@/Pages/ProjectPhysicalProgresss/ProjectPhysicalProgressModal.vue';
import { router } from '@inertiajs/vue3'

const props = defineProps({
    show: Boolean,
    site: Object, // MhpSite object with physicalProgresses eager loaded
})

const emit = defineEmits(['close', 'saved'])

const showAddEditModal = ref(false)
const selectedProgressToEdit = ref(null)
const addEditMode = ref('create')

function openAddEditPhysicalProgress(progress = null) {

    selectedProgressToEdit.value = progress
    addEditMode.value = progress ? 'edit' : 'create'
    showAddEditModal.value = true
}

function handlePhysicalProgressSaved(message) {
    emit('saved', message) // Bubble up the saved event
    showAddEditModal.value = false
    selectedProgressToEdit.value = null
}

function deletePhysicalProgress(progressId) {
    if (confirm('Are you sure you want to delete this physical progress entry?')) {
        router.delete(`/mhp/project-physical-progress/${progressId}`, {
            onSuccess: () => {
                emit('saved', 'Physical progress deleted successfully.')
                // The main MhpSite/Index page will reload, refreshing this modal's data
            },
            onError: (errors) => {
                console.error('Error deleting physical progress:', errors)
                emit('saved', 'Failed to delete physical progress.')
            }
        })
    }
}

const sortedPhysicalProgresses = computed(() => {
    return [...(props.site.physicalProgresses || [])].sort((a, b) => a.progress_percentage - b.progress_percentage);
});

// Check if 100% milestone has been recorded
const is100PercentRecorded = computed(() => {
    return sortedPhysicalProgresses.value.some(p => p.progress_percentage === 100);
});
</script>

<template>
    <Modal :show="show" @close="emit('close')" :maxWidth="'4xl'" title="Manage Physical Progresses">
        <div class="p-6">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-semibold text-gray-800">Physical Progress Entries for {{ site.cbo?.reference_code }}</h3>
                <button
                    @click="openAddEditPhysicalProgress()"
                    :disabled="is100PercentRecorded"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" /></svg>
                    Add New Progress
                </button>
            </div>

            <div v-if="is100PercentRecorded && sortedPhysicalProgresses.length > 0" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong class="font-bold">Project is 100% physically complete!</strong>
                <span class="block sm:inline">No more physical progress entries can be added.</span>
            </div>


            <div v-if="sortedPhysicalProgresses.length > 0" class="border border-gray-200 rounded-lg overflow-hidden">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attachments</th>
                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="progress in sortedPhysicalProgresses" :key="progress.id">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ progress.progress_percentage }}%</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ progress.progress_date }}</td>
                        <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{{ progress.remarks || '—' }}</td>
                        <td class="px-6 py-4 text-sm text-gray-500">
                                <span v-if="progress.attachments && progress.attachments.length">
                                    {{ progress.attachments.length }} files
                                </span>
                            <span v-else>—</span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button @click="openAddEditPhysicalProgress(progress)" class="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                            <button @click="deletePhysicalProgress(progress.id)" class="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div v-else class="text-center text-gray-500 py-8">
                No physical progress entries found for this project.
            </div>
        </div>

        <ProjectPhysicalProgressModal
            :show="showAddEditModal"
            :site="site"
            :project-physical-progress="selectedProgressToEdit"
            :mode="addEditMode"
            @close="showAddEditModal = false; selectedProgressToEdit = null"
            @saved="handlePhysicalProgressSaved"
        />
    </Modal>
</template>

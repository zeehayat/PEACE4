<script setup>
import { computed } from 'vue';

const props = defineProps({
    cbo: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits([
    'delete-training',
    'edit-training',
]);

// Helper to get file icon (reused from MHP/Irrigation lists)
function getFileIcon(file) {
    const ext = file.file_name.split('.').pop().toLowerCase();
    if (ext === 'pdf') return '📄';
    if (['doc', 'docx'].includes(ext)) return '📝';
    if (['xls', 'xlsx', 'csv'].includes(ext)) return '📊';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return '🖼️';
    return '📁';
}

// You can remove these console.logs now that we know the data is flowing.
// console.log('CboTrainingsList: Received CBO prop:', props.cbo);
// console.log('CboTrainingsList: CBO Trainings array:', props.cbo.trainings);
</script>

<template>
    <div class="p-6">
        <h2 class="text-2xl font-bold text-indigo-700 mb-6 border-b pb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-award"><circle cx="12" cy="8" r="7"/><path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.11"/></svg>
            Trainings for {{ cbo.reference_code }}
        </h2>

        <div v-if="cbo.trainings && cbo.trainings.length > 0" class="space-y-6">
            <div v-for="training in cbo.trainings" :key="training.id" class="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm relative group">
                <div class="flex justify-between items-center mb-2">
                    <p class="text-lg font-semibold text-gray-800">Type: <span class="font-normal">{{ training.training_type }}</span></p>
                    <span class="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                        {{ training.total_participants }} Participants
                    </span>
                </div>
                <p class="text-gray-700 mb-3">Date: {{ training.date_of_training }}</p>
                <p v-if="training.remarks" class="text-gray-700 mb-3">Remarks: {{ training.remarks }}</p>

                <div v-if="training.attachments && training.attachments.length > 0" class="mt-4 border-t border-gray-200 pt-3">
                    <p class="text-sm font-semibold text-gray-700 mb-2">Attachments:</p>
                    <ul class="space-y-2 text-sm text-gray-600">
                        <li v-for="mediaItem in training.attachments" :key="mediaItem.id" class="flex items-center gap-2">
                            <span class="flex-shrink-0" v-html="getFileIcon(mediaItem)"></span>
                            <a :href="mediaItem.url" target="_blank" class="text-indigo-600 hover:underline truncate">
                                {{ mediaItem.file_name }} ({{ (mediaItem.size / 1024).toFixed(1) }} KB)
                            </a>
                        </li>
                    </ul>
                </div>
                <p v-else class="text-gray-500 text-sm italic mt-4">No attachments for this training.</p>

                <div class="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button @click="emit('edit-training', training.id)"
                            class="action-icon-btn bg-yellow-500 hover:bg-yellow-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="M15 5l4 4"/></svg>
                        <span class="tooltip">Edit Training</span>
                    </button>
                    <button @click="emit('delete-training', training.id)"
                            class="action-icon-btn bg-red-600 hover:bg-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                        <span class="tooltip">Delete Training</span>
                    </button>
                </div>
            </div>
        </div>
        <div v-else class="text-center p-6 text-gray-500 italic">
            No trainings recorded for this CBO.
        </div>
    </div>
</template>

<style scoped>
/* NEW: Action icon button styling for the list items */
.action-icon-btn {
    @apply p-1.5 rounded-full text-white flex items-center justify-center relative; /* REMOVED 'group' from here */
}

/* Tooltip Styling (re-defined here for CboTrainingsList) */
.tooltip {
    @apply absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs bg-gray-800 text-white px-2 py-1 rounded-md
    opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10
    pointer-events-none; /* Ensures tooltip doesn't block clicks */
}
</style>

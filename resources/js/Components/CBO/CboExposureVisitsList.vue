<script setup>
import { computed } from 'vue';

const props = defineProps({
    cbo: {
        type: Object,
        required: true,
        // The CBO object is expected to have 'exposure_visits' and each visit 'media' relationships loaded.
    },
});

const emit = defineEmits([
    'delete-exposure-visit', // Emits for deleting an exposure visit
    'edit-exposure-visit',   // Emits for editing an exposure visit
]);

// Helper to get file icon (reused from other list components)
function getFileIcon(file) {
    const ext = file.file_name.split('.').pop().toLowerCase();
    if (ext === 'pdf') return '📄';
    if (['doc', 'docx'].includes(ext)) return '📝';
    if (['xls', 'xlsx', 'csv'].includes(ext)) return '📊';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return '🖼️';
    return '📁';
}
</script>

<template>
    <div class="p-6">
        <h2 class="text-2xl font-bold text-indigo-700 mb-6 border-b pb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-3.5 1.5L13 8 4.8 6.2c-.5-.1-1-.1-1.4.2L.4 7.5c-.3.3-.2.9.2 1.3L5.4 14l-2 2.5c-.3.5-.1 1.1.3 1.5.5.4 1.2.5 1.7.2L7.5 16l2.5 2c.7.6 1.7.7 2.6.5L19.2 17.8c.9-.9 1.2-2.2.4-3.1Z"/><path d="M10.95 20.84 12.22 17.5 15.5 16.22"/></svg>
            Exposure Visits for {{ cbo.reference_code }}
        </h2>

        <div v-if="cbo.exposure_visits && cbo.exposure_visits.length > 0" class="space-y-6">
            <div v-for="visit in cbo.exposure_visits" :key="visit.id" class="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm relative group">
                <div class="flex justify-between items-center mb-2">
                    <p class="text-lg font-semibold text-gray-800">Date: <span class="font-normal">{{ visit.date_of_visit }}</span></p>
                    <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                        {{ visit.participants }} Participants
                    </span>
                </div>
                <p v-if="visit.purpose_of_visit" class="text-gray-700 mb-3">Purpose: {{ visit.purpose_of_visit }}</p>
                <p v-if="visit.remarks" class="text-gray-700 mb-3">Remarks: {{ visit.remarks }}</p>

                <div v-if="visit.attachments && visit.attachments.length > 0" class="mt-4 border-t border-gray-200 pt-3">
                    <p class="text-sm font-semibold text-gray-700 mb-2">Attachments:</p>
                    <ul class="space-y-2 text-sm text-gray-600">
                        <li v-for="mediaItem in visit.attachments" :key="mediaItem.id" class="flex items-center gap-2">
                            <span class="flex-shrink-0" v-html="getFileIcon(mediaItem)"></span>
                            <a :href="mediaItem.url" target="_blank" class="text-indigo-600 hover:underline truncate">
                                {{ mediaItem.file_name }} ({{ (mediaItem.size / 1024).toFixed(1) }} KB)
                            </a>
                        </li>
                    </ul>
                </div>
                <p v-else class="text-gray-500 text-sm italic mt-4">No attachments for this exposure visit.</p>

                <div class="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button @click="emit('edit-exposure-visit', visit.id)"
                            class="action-icon-btn bg-yellow-500 hover:bg-yellow-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="M15 5l4 4"/></svg>
                        <span class="tooltip">Edit Visit</span>
                    </button>
                    <button @click="emit('delete-exposure-visit', visit.id)"
                            class="action-icon-btn bg-red-600 hover:bg-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                        <span class="tooltip">Delete Visit</span>
                    </button>
                </div>
            </div>
        </div>
        <div v-else class="text-center p-6 text-gray-500 italic">
            No exposure visits recorded for this CBO.
        </div>
    </div>
</template>

<style scoped>
/* Action icon button styling for the list items */
.action-icon-btn {
    @apply p-1.5 rounded-full text-white flex items-center justify-center relative;
}

/* Tooltip Styling */
.tooltip {
    @apply absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs bg-gray-800 text-white px-2 py-1 rounded-md
    opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10
    pointer-events-none; /* Ensures tooltip doesn't block clicks */
}
</style>

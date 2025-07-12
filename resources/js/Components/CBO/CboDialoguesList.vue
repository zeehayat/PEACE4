<script setup>
import { computed } from 'vue';

const props = defineProps({
    cbo: {
        type: Object,
        required: true,
        // The CBO object is expected to have 'dialogues' and each dialogue 'media' relationships loaded.
    },
});

// Helper to get file icon (reused from MHP/Irrigation lists)
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Dialogues for {{ cbo.reference_code }}
        </h2>

        <div v-if="cbo.dialogues && cbo.dialogues.length > 0" class="space-y-6">
            <div v-for="dialogue in cbo.dialogues" :key="dialogue.id" class="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                <div class="flex justify-between items-center mb-2">
                    <p class="text-lg font-semibold text-gray-800">Date: <span class="font-normal">{{ dialogue.date_of_dialogue }}</span></p>
                    <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {{ dialogue.participants }} Participants
                    </span>
                </div>
                <p v-if="dialogue.remarks" class="text-gray-700 mb-3">{{ dialogue.remarks }}</p>

                <div v-if="dialogue.media && dialogue.media.length > 0" class="mt-4 border-t border-gray-200 pt-3">
                    <p class="text-sm font-semibold text-gray-700 mb-2">Attachments:</p>
                    <ul class="space-y-2 text-sm text-gray-600">
                        <li v-for="mediaItem in dialogue.media" :key="mediaItem.id" class="flex items-center gap-2">
                            <span class="flex-shrink-0" v-html="getFileIcon(mediaItem)"></span>
                            <a :href="mediaItem.original_url" target="_blank" class="text-indigo-600 hover:underline truncate">
                                {{ mediaItem.file_name }} ({{ (mediaItem.size / 1024).toFixed(1) }} KB)
                            </a>
                        </li>
                    </ul>
                </div>
                <p v-else class="text-gray-500 text-sm italic mt-4">No attachments for this dialogue.</p>
            </div>
        </div>
        <div v-else class="text-center p-6 text-gray-500 italic">
            No dialogues recorded for this CBO.
        </div>
    </div>
</template>

<style scoped>
/* No specific scoped styles needed yet, relies on Tailwind utilities */
</style>

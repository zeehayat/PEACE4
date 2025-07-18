<script setup>
import { computed } from 'vue';

const props = defineProps({
    attachments: {
        type: Array,
        default: () => [],
        // attachments should be an array of objects like:
        // { id: 1, name: 'document.pdf', file_name: 'document.pdf', url: '/storage/media/1/document.pdf', size: 12345, mime_type: 'application/pdf' }
    },
});

const getFileIcon = (file) => {
    const ext = file.file_name.split('.').pop().toLowerCase();
    if (ext === 'pdf') return '📄';
    if (['doc', 'docx'].includes(ext)) return '📝';
    if (['xls', 'xlsx', 'csv'].includes(ext)) return '📊';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return '🖼️';
    return '📁';
};

const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const hasAttachments = computed(() => props.attachments && props.attachments.length > 0);
</script>

<template>
    <div v-if="hasAttachments" class="space-y-2">
        <div
            v-for="file in attachments"
            :key="file.id"
            class="flex items-center gap-2 p-2 bg-gray-100 rounded-md text-sm text-gray-800 hover:bg-gray-200 transition-colors duration-150"
            :title="`Size: ${formatBytes(file.size)} | Type: ${file.mime_type || 'N/A'}`"
        >
            <span class="text-gray-500 flex-shrink-0">{{ getFileIcon(file) }}</span>
            <a
                :href="file.url"
                target="_blank"
                class="text-indigo-600 hover:text-indigo-800 hover:underline truncate flex-grow"
            >
                {{ file.file_name }}
            </a>
        </div>
    </div>
    <div v-else class="text-gray-500 text-sm italic">
        No attachments.
    </div>
</template>

<style scoped>
/* No specific scoped styles needed here, as styling is handled by Tailwind */
</style>

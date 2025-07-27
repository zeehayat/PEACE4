<script setup>
import { computed } from 'vue';

const props = defineProps({
    cbo: { type: Object, required: true },
    openActionMenuId: [Number, null], // ID of the currently open menu
    menuPosition: { // Receives position for teleported menu
        type: Object,
        default: () => ({ top: 0, left: 0, width: 0, direction: 'down' }),
    },
});

const emit = defineEmits([
    'toggle-action-menu',
    'view-details',
    'edit-cbo',
    'add-dialogue',
    'list-dialogues',
    'add-exposure-visit',
    'list-exposure-visits',
    'add-training',
    'list-trainings',
    'delete-cbo',
]);

// Helper to get file icon (can be shared utility)
function getFileIcon(file) {
    const ext = file.file_name.split('.').pop().toLowerCase();
    if (ext === 'pdf') return '📄';
    if (['doc', 'docx'].includes(ext)) return '📝';
    if (['xls', 'xlsx', 'csv'].includes(ext)) return '📊';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return '🖼️';
    return '📁';
}

// Helper to get status class (example, adjust based on your CBO status enum)
function getStatusClass(status) {
    switch (status) {
        case 'New': return 'bg-blue-100 text-blue-800 border border-blue-200';
        case 'Active': return 'bg-green-100 text-green-800 border border-green-200';
        case 'Inactive': return 'bg-red-100 text-red-800 border border-red-200';
        default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
}
</script>

<template>
    <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:scale-[1.01] relative">
        <div class="absolute top-4 right-4 z-10">
            <button
                @click.stop="emit('toggle-action-menu', cbo.id, $event)"
                class="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-200/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-opacity action-menu-trigger"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
            </button>
            <!-- Menu content is teleported from CBO/Index.vue -->
        </div>

        <div class="mt-4 pt-4 border-t border-gray-200">
            <div class="flex items-center justify-between mb-3">
                <p class="text-sm text-gray-500">Status</p>
                <span :class="getStatusClass(cbo.status)" class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border">
                  {{ cbo.status ?? 'N/A' }}
                </span>
            </div>
            <div class="flex items-center justify-between">
                <p class="text-sm text-gray-500">Members</p>
                <p class="font-semibold text-sm text-gray-900">{{ cbo.total_members ?? 'N/A' }}</p>
            </div>
            <div class="flex items-center justify-between">
                <p class="text-sm text-gray-500">Dialogues</p>
                <p class="font-semibold text-sm text-gray-900">{{ cbo.dialogues_count ?? 0 }}</p>
            </div>
            <div class="flex items-center justify-between">
                <p class="text-sm text-gray-500">Trainings</p>
                <p class="font-semibold text-sm text-gray-900">{{ cbo.trainings_count ?? 0 }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* No specific scoped styles needed here, as styling is handled by Tailwind and parent */
</style>

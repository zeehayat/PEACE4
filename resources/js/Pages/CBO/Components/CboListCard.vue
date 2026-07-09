<script setup>
import { computed } from 'vue';

const props = defineProps({
    cbo: { type: Object, required: true },
    openActionMenuId: [Number, null],
    menuPosition: {
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

// Helper functions (getFileIcon, getStatusClass)
function getFileIcon(file) { /* ... */ return '📁'; }
function getStatusClass(status) { /* ... */ return 'bg-paper-100 text-ink-800 border border-ink-200'; }

// Function to emit toggle with the button's event
const triggerToggle = (event) => {
    // Ensure stopPropagation is called here as well, if event is passed
    event.stopPropagation(); // <--- ADD THIS LINE
    emit('toggle-action-menu', props.cbo.id, event);
};
</script>

<template>
    <div class="bg-surface rounded-xl shadow-lg border border-ink-200 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:scale-[1.01] relative">
        <div class="absolute top-4 right-4 z-10">
            <button
                @click.stop="triggerToggle"
            class="p-2 text-ink-500 hover:text-ink-900 rounded-full hover:bg-paper-200/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 transition-opacity action-menu-trigger"
            >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
            </button>
        </div>
        <!-- ... rest of template ... -->
    </div>
</template>

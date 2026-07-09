<script setup>
defineProps({
    label: {
        type: String,
        required: true
    },
    value: {
        type: [String, Number],
        default: 'N/A'
    },
    tooltip: {
        type: String,
        default: ''
    }
});
</script>

<template>
    <div class="flex flex-col border-b border-ink-100 pb-2 relative group">
        <div class="flex items-center gap-1.5">
            <span class="text-xs font-semibold text-ink-500 uppercase tracking-wider">{{ label }}</span>
            <span 
                v-if="tooltip" 
                class="material-symbols-outlined text-xs text-ink-400 cursor-help select-none hover:text-emerald-600 transition"
            >
                info
            </span>

            <!-- Tooltip Popup -->
            <div 
                v-if="tooltip"
                class="absolute bottom-full mb-1 left-0 bg-paper-900 text-white text-[11px] py-1.5 px-3 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition duration-150 shadow-xl border border-white/10 z-50 max-w-[200px]"
            >
                {{ tooltip }}
            </div>
        </div>
        <span class="text-sm font-medium text-ink-900 mt-0.5">{{ value }}</span>
    </div>
</template>

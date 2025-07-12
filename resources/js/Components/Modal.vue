<script setup>
import { computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
    show: { type: Boolean, default: false },
    maxWidth: { type: String, default: '2xl' },
    closeable: { type: Boolean, default: true },
    title: { type: String, default: 'Modal Title' }, // Default title for clarity
})

const emit = defineEmits(['close'])

const close = () => {
    if (props.closeable) emit('close')
}

const closeOnEscape = (e) => {
    if (e.key === 'Escape') {
        e.preventDefault()
        if (props.show) close()
    }
}

onMounted(() => document.addEventListener('keydown', closeOnEscape))
onUnmounted(() => document.removeEventListener('keydown', closeOnEscape))

const maxWidthClass = computed(() => ({
    'sm': 'sm:max-w-sm',
    'md': 'sm:max-w-md',
    'lg': 'sm:max-w-lg',
    'xl': 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
    '3xl': 'sm:max-w-3xl',
    '4xl': 'sm:max-w-4xl',
    '5xl': 'sm:max-w-5xl',
    '6xl': 'sm:max-w-6xl',
    '7xl': 'sm:max-w-7xl',
}[props.maxWidth]))
</script>

<template>
    <transition name="fade">
        <div
            v-if="show"
            class="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black bg-opacity-50 shadow-2xl overflow-y-auto" aria-modal="true"
            role="dialog"
            @click.self="close" >
            <div
                class="relative w-full rounded-lg shadow-lg transform transition-all bg-white max-h-[95vh] overflow-hidden flex flex-col" :class="maxWidthClass"
                @click.stop
            >
                <div class="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4 text-white font-semibold text-lg flex items-center justify-between rounded-t-lg flex-shrink-0"> <span>{{title}} </span>
                    <button
                        @click="close"
                        class="text-white hover:text-gray-200 text-2xl font-bold leading-none focus:outline-none"
                        aria-label="Close modal"
                    >
                        &times;
                    </button>
                </div>

                <div class="p-6 flex-grow overflow-y-auto"> <slot />
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>

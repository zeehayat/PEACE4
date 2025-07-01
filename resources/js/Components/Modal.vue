<script setup>
import { computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
    show: { type: Boolean, default: false },
    maxWidth: { type: String, default: '2xl' },
    closeable: { type: Boolean, default: true },
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
}[props.maxWidth]))
</script>

<template>
    <transition name="fade">
        <div
            v-if="show"
            class="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black bg-opacity-50"
            aria-modal="true"
            role="dialog"
        >
            <!-- Modal wrapper to stop background click from closing it -->
            <div
                class="relative bg-white rounded-lg shadow-lg transform transition-all w-full"
                :class="maxWidthClass"
                @click.stop
            >
                <!-- Header -->
                <div class="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4 text-white font-semibold text-lg flex items-center justify-between rounded-t-lg">
                    <span>Add CBO Activity</span>
                    <button
                        @click="close"
                        class="text-white hover:text-gray-200 text-2xl font-bold leading-none focus:outline-none"
                        aria-label="Close modal"
                    >
                        &times;
                    </button>
                </div>

                <!-- Slot content -->
                <div class="p-6">
                    <slot />
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

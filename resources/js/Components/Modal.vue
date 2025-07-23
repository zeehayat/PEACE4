<script setup>
import { computed, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '2xl',
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    title: { // Add a title prop for the modal header
        type: String,
        default: 'Modal Title',
    },
});

const emit = defineEmits(['close']);

watch(
    () => props.show,
    () => {
        if (props.show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = null;
        }
    },
);

const close = () => {
    if (props.closeable) {
        emit('close');
    }
};

const maxWidthClass = computed(() => {
    return {
        'sm': 'sm:max-w-sm',
        'md': 'sm:max-w-md',
        'lg': 'sm:max-w-lg',
        'xl': 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
        '3xl': 'sm:max-w-3xl', // Added for larger modals
        '4xl': 'sm:max-w-4xl', // Added for even larger modals
        '5xl': 'sm:max-w-5xl', // And even larger ones
        '6xl': 'sm:max-w-6xl',
    }[props.maxWidth];
});

onMounted(() => document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && props.show) {
        close();
    }
}));

onUnmounted(() => document.removeEventListener('keydown', (e) => {
    if (e.key === 'Escape' && props.show) {
        close();
    }
}));
</script>

<template>
    <Transition leave-active-class="duration-200">
        <div v-show="show" class="modal-container fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-40" scroll-region>
            <Transition
                enter-active-class="ease-out duration-300"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="ease-in duration-200"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div v-show="show" class="modal-backdrop fixed inset-0 transform transition-all" @click="close">
                    <div class="absolute inset-0 bg-gray-500 opacity-75" />
                </div>
            </Transition>

            <Transition
                enter-active-class="ease-out duration-300"
                enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                leave-active-class="ease-in duration-200"
                leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
                <div
                    v-show="show"
                    :class="maxWidthClass"
                    class="mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto"
                >
                    <div class="flex items-center justify-between p-4 border-b modal-header"> <h3 class=" font-extrabold md:text-2xl text-blue-950 ">{{ title }}</h3>
                        <button @click="close" class="text-gray-400 hover:text-gray-600">
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <div class="modal-content-body relative max-h-[70vh] overflow-y-auto"> <slot />
                    </div>
                </div>
            </Transition>
        </div>
    </Transition>
</template>

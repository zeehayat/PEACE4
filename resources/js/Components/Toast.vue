<!-- src/Components/Toast.vue -->
<script setup>
const props = defineProps({
    show: Boolean,
    message: String,
    type: { type: String, default: 'success' } // success|error
})
</script>

<template>
    <transition name="fade">
        <div
            v-if="show"
            :class="`fixed top-4 right-4 px-4 py-2 rounded shadow-lg z-50 text-white ${type === 'error' ? 'bg-red-600' : 'bg-green-600'}`"
        >
            {{ message }}
        </div>
    </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>

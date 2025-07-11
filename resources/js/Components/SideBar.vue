<script setup>
import { ref } from 'vue'
import {Link} from "@inertiajs/vue3";

const isOpen = ref(false)

const toggle = () => {
    isOpen.value = !isOpen.value
}

defineExpose({ toggle })
</script>

<template>
    <!-- Toggle Button -->
    <button
        @click="toggle"
        class="fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md shadow hover:bg-blue-700 "
    >
        ☰
    </button>

    <!-- Overlay -->
    <transition name="fade">
        <div
            v-if="isOpen"
            class="fixed inset-0 bg-black bg-opacity-50 z-40"
            @click="toggle"
        ></div>
    </transition>

    <!-- Sidebar -->
    <transition name="slide">
        <aside
            :class="['fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 p-4 transform transition-transform duration-300', isOpen ? 'translate-x-0' : '-translate-x-full']"
        >
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold">Navigation</h2>
                <button @click="toggle" class="text-gray-500 hover:text-black">✖</button>
            </div>
            <nav class="space-y-2">
                <a
                    href="#"
                    class="block px-3 py-2 rounded hover:bg-blue-100 text-gray-700"
                >
                    Dashboard
                </a>
                <Link
                    href="/mhp/mhp-sites"
                    class="block px-3 py-2 rounded hover:bg-blue-100 text-gray-700"
                >
                    MHP Cpanel
                </Link>
                <Link
                    href="/irrigation/irrigation-schemes"
                    class="block px-3 py-2 rounded hover:bg-blue-100 text-gray-700"
                >
                    Irrigation CPanel
                </Link>
                <a
                    href="#"
                    class="block px-3 py-2 rounded hover:bg-blue-100 text-gray-700"
                >
                    Settings
                </a>
            </nav>
        </aside>
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

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
    transform: translateX(-100%);
}
</style>

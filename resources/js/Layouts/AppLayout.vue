<script setup>
import { Head } from '@inertiajs/vue3';
import SideBar from '@/Components/SideBar.vue';

defineProps({ title: String });
</script>

<template>
    <div class="min-h-screen flex bg-background-light">
        <Head :title="title" class="bg-black" />

        <!-- Sidebar (part of flex row) -->
        <SideBar />

        <!-- Main content area (fills rest of screen) -->
        <div class="flex-1 flex flex-col min-w-0 ml-20 transition-all duration-300">
            <header v-if="$slots.header" class="bg-white shadow-sm">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <slot name="header" />
                </div>
            </header>

            <main class="flex-1 overflow-y-auto bg-background-light p-6">
                <slot />
            </main>
        </div>
    </div>
</template>

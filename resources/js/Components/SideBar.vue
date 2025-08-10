<script setup>
import { Link, usePage, router } from '@inertiajs/vue3'; // FIX: Add 'router' to imports
import { ref, computed } from 'vue';

const page = usePage();
const isOpen = ref(false);

const toggleSidebar = () => {
    isOpen.value = !isOpen.value;
};

const isActive = (routeName) => {
    return route().current(routeName) || route().current(routeName + '.*');
};

const user = computed(() => page.props.auth.user);
</script>

<template>
    <button @click="toggleSidebar" class="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-indigo-600 text-white shadow-lg">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>

    <div v-if="isOpen" @click="toggleSidebar" class="fixed inset-0 bg-black opacity-50 z-40 md:hidden"></div>

    <aside
        :class="{ 'translate-x-0': isOpen, '-translate-x-full': !isOpen }"
        class="fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-4 space-y-6 z-50 transform md:relative md:translate-x-0 transition-transform duration-200 ease-in-out"
    >
        <div class="flex items-center justify-center h-16 border-b border-gray-700">
            <Link :href="route('dashboard')" class="text-2xl font-bold text-indigo-400">
                SRSP PEACE 2
            </Link>
        </div>

        <div v-if="user" class="flex items-center space-x-3 p-2 border-b border-gray-700">
            <img :src="user.profile_photo_url || '/images/default-profile.png'" alt="Profile Photo" class="h-10 w-10 rounded-full object-cover">
            <div>
                <div class="font-semibold text-sm">{{ user.name }}</div>
                <div class="text-xs text-gray-400">{{ user.email }}</div>
            </div>
        </div>
        <div v-else class="p-2 text-sm text-gray-400 border-b border-gray-700">
            Guest User
        </div>

        <nav class="space-y-2">
            <Link :href="route('dashboard')" :class="['flex items-center p-2 rounded-md transition duration-150 ease-in-out', isActive('dashboard') ? 'bg-indigo-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white']">
                <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l7 7m-2 2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                Dashboard
            </Link>

            <h3 class="text-xs uppercase text-gray-500 pt-4 pb-2">Modules</h3>

            <Link :href="route('cbo.cbos.index')" :class="['flex items-center p-2 rounded-md transition duration-150 ease-in-out', isActive('cbo.cbos.index') ? 'bg-indigo-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white']">
                <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h2a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2m0 0l4-4m-4 4l-4-4m4 4V4"/></svg>
                CBOs
            </Link>

            <Link :href="route('mhp.sites.index')" :class="['flex items-center p-2 rounded-md transition duration-150 ease-in-out', isActive('mhp.sites.index') ? 'bg-indigo-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white']">
                <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                MHP Sites
            </Link>

            <Link :href="route('irrigation.schemes.index')" :class="['flex items-center p-2 rounded-md transition duration-150 ease-in-out', isActive('irrigation.schemes.index') ? 'bg-indigo-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white']">
                <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                Irrigation Schemes
            </Link>

            <Link :href="route('vendor.vendors.index')" :class="['flex items-center p-2 rounded-md transition duration-150 ease-in-out', isActive('vendor.vendors.index') ? 'bg-indigo-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white']">
                <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 01-2 2h4M10 6h4M10 6h4M14 6h4a2 2 0 012 2v10a2 2 0 01-2 2h-4M14 6h-4m0 0V4m0 2v4"/></svg>
                Vendors
            </Link>

            <Link :href="route('lrm.committees.index')" :class="['flex items-center p-2 rounded-md transition duration-150 ease-in-out', isActive('lrm.committees.index') ? 'bg-indigo-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white']">
                <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h2a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2m0 0l4-4m-4 4l-4-4m4 4V4"/></svg>
                LRM Committees
            </Link>

            <button @click="router.post(route('main.logout'))" class="w-full flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition duration-150 ease-in-out">
                <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                Log Out
            </button>
        </nav>
    </aside>
</template>

<script setup>
import { Link, usePage, router } from '@inertiajs/vue3';
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
    <button @click="toggleSidebar" class="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-indigo-600 text-white shadow-lg transition-all duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>

    <Transition
        enter-active-class="transition-opacity ease-linear duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-linear duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div v-if="isOpen" @click="toggleSidebar" class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"></div>
    </Transition>

    <aside
        :class="{ 'translate-x-0': isOpen, '-translate-x-full': !isOpen }"
        class="fixed inset-y-0 left-0 w-64 bg-gray-900 text-gray-200 p-4 space-y-8 z-50 transform md:relative md:translate-x-0 transition-transform duration-300 ease-in-out shadow-xl"
    >
        <div class="flex items-center justify-center h-16 border-b border-gray-700">
            <Link :href="route('dashboard')" class="text-xl md:text-2xl font-extrabold text-indigo-400 tracking-wider">
                SRSP PEACE 2
            </Link>
        </div>

        <div v-if="user" class="flex items-center space-x-4 p-3 border-b border-gray-700/50">
            <div class="relative">
                <img :src="user.profile_photo_url || 'https://i.postimg.cc/DzL69Yng/images.png'" alt="Profile Photo" class="h-12 w-12 rounded-full object-cover border-2 border-indigo-400 transition-all duration-200 hover:scale-105">
                <span class="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 ring-2 ring-gray-900"></span>
            </div>
            <div>
                <div class="font-semibold text-white">{{ user.name }}</div>
                <div class="text-xs text-gray-400">{{ user.email }}</div>
            </div>
        </div>
        <div v-else class="p-3 text-sm text-gray-400 border-b border-gray-700/50">
            Guest User
        </div>

        <nav class="space-y-2 font-medium">
            <h3 class="text-xs uppercase tracking-wider text-gray-500 px-3 pt-2 pb-1">Dashboards</h3>

            <Link :href="route('mhp.dashboard')" :class="['nav-link group', isActive('mhp.dashboard') ? 'bg-indigo-700 text-white shadow-md' : 'text-gray-300 hover:bg-gray-800 hover:text-white']">
                <svg class="h-5 w-5 mr-3 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                <span class="transition-colors duration-200">MHP Dashboard</span>
            </Link>
            <Link :href="route('irrigation.dashboard')" :class="['nav-link group', isActive('irrigation.dashboard') ? 'bg-indigo-700 text-white shadow-md' : 'text-gray-300 hover:bg-gray-800 hover:text-white']">
                <svg class="h-5 w-5 mr-3 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                <span class="transition-colors duration-200">Irrigation Dashboard</span>
            </Link>

            <h3 class="text-xs uppercase tracking-wider text-gray-500 px-3 pt-4 pb-1">Modules</h3>

            <Link :href="route('cbo.cbos.index')" :class="['nav-link group', isActive('cbo.cbos.index') ? 'bg-indigo-700 text-white shadow-md' : 'text-gray-300 hover:bg-gray-800 hover:text-white']">
                <svg class="h-5 w-5 mr-3 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h2a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2m0 0l4-4m-4 4l-4-4m4 4V4"/></svg>
                <span class="transition-colors duration-200">CBOs</span>
            </Link>
            <Link :href="route('mhp.sites.index')" :class="['nav-link group', isActive('mhp.sites.index') ? 'bg-indigo-700 text-white shadow-md' : 'text-gray-300 hover:bg-gray-800 hover:text-white']">
                <svg class="h-5 w-5 mr-3 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                <span class="transition-colors duration-200">MHP Sites</span>
            </Link>
            <Link :href="route('irrigation.schemes.index')" :class="['nav-link group', isActive('irrigation.schemes.index') ? 'bg-indigo-700 text-white shadow-md' : 'text-gray-300 hover:bg-gray-800 hover:text-white']">
                <svg class="h-5 w-5 mr-3 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                <span class="transition-colors duration-200">Irrigation Schemes</span>
            </Link>
            <Link :href="route('vendor.vendors.index')" :class="['nav-link group', isActive('vendor.vendors.index') ? 'bg-indigo-700 text-white shadow-md' : 'text-gray-300 hover:bg-gray-800 hover:text-white']">
                <svg class="h-5 w-5 mr-3 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 01-2 2h4M10 6h4M10 6h4M14 6h4a2 2 0 012 2v10a2 2 0 01-2 2h-4M14 6h-4m0 0V4m0 2v4"/></svg>
                <span class="transition-colors duration-200">Vendors</span>
            </Link>
            <Link :href="route('lrm.committees.index')" :class="['nav-link group', isActive('lrm.committees.index') ? 'bg-indigo-700 text-white shadow-md' : 'text-gray-300 hover:bg-gray-800 hover:text-white']">
                <svg class="h-5 w-5 mr-3 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h2a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2m0 0l4-4m-4 4l-4-4m4 4V4"/></svg>
                <span class="transition-colors duration-200">LRM Committees</span>
            </Link>

            <button @click="router.post(route('logout'))" class="w-full flex items-center p-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200">
                <svg class="h-5 w-5 mr-3 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                <span class="transition-colors duration-200">Log Out</span>
            </button>
        </nav>
    </aside>
</template>

<style scoped>
.nav-link {
    @apply flex items-center p-3 rounded-xl transition-all duration-200 ease-in-out transform hover:translate-x-1;
}

.nav-link svg, .nav-link span {
    transition: all 0.2s ease-in-out;
}

/* Staggered fade-in animation for mobile */
.sidebar-open .nav-link {
    animation: fadeInSlide 0.5s ease-out forwards;
}

@keyframes fadeInSlide {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.nav-link:nth-child(2) { animation-delay: 0.1s; }
.nav-link:nth-child(3) { animation-delay: 0.2s; }
.nav-link:nth-child(4) { animation-delay: 0.3s; }
.nav-link:nth-child(5) { animation-delay: 0.4s; }
.nav-link:nth-child(6) { animation-delay: 0.5s; }
.nav-link:nth-child(7) { animation-delay: 0.6s; }
.nav-link:nth-child(8) { animation-delay: 0.7s; }
.nav-link:nth-child(9) { animation-delay: 0.8s; }
</style>

<script setup>
import { Link, usePage, router } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import { useNavigation } from '@/Composables/useNavigation';

const page = usePage();
const isOpen = ref(false); // Mobile drawer open/close
const { toggleReportsHub, toggleCommandPalette } = useNavigation();

const toggleSidebarMobile = () => {
    isOpen.value = !isOpen.value;
};

const isActive = (routeName) => {
    return route().current(routeName) || route().current(routeName + '.*');
};

const user = computed(() => page.props.auth.user);
const isAdmin = computed(() => user.value?.roles?.some((r) => ['Admin', 'Root'].includes(r)));
</script>

<template>
    <!-- Mobile Hamburger Toggle -->
    <button @click="toggleSidebarMobile" class="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-accent-600 text-white shadow-lg focus:outline-none transition hover:bg-accent-700">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>

    <!-- Mobile Backdrop -->
    <Transition enter-active-class="transition-opacity ease-linear duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition-opacity ease-linear duration-300" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="isOpen" @click="toggleSidebarMobile" class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"></div>
    </Transition>

    <!-- Sidebar Container -->
    <aside
        :class="{ 'translate-x-0': isOpen, '-translate-x-full': !isOpen }"
        class="fixed inset-y-0 left-0 w-20 bg-paper-950 text-white p-4 flex flex-col items-center justify-between z-40 transform md:translate-x-0 transition-transform duration-300 ease-in-out shadow-2xl"
    >
        <!-- Top Section: Logo & Modules -->
        <div class="flex flex-col items-center gap-6 w-full">
            <Link :href="route('dashboard')" class="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center ring-1 ring-white/20 hover:bg-white/15 transition group">
                <span class="material-symbols-outlined text-emerald-400 font-bold text-2xl group-hover:scale-110 transition duration-200">spa</span>
                <div class="tooltip">SRSP PEACE 2</div>
            </Link>

            <hr class="w-8 border-white/10" />

            <!-- Nav Links -->
            <nav class="flex flex-col gap-3 w-full items-center">
                <!-- Dashboards -->
                <Link :href="route('mhp.overview')" :class="['nav-btn relative group', isActive('mhp.overview') ? 'active' : '']">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    <div class="tooltip">MHP Dashboard</div>
                </Link>

                <Link :href="route('irrigation.overview')" :class="['nav-btn relative group', isActive('irrigation.overview') ? 'active' : '']">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                    <div class="tooltip">Irrigation Dashboard</div>
                </Link>

                <hr class="w-8 border-white/10 my-1" />

                <!-- Modules (Quick Access) -->
                <Link :href="route('cbo.cbos.index')" :class="['nav-btn relative group', isActive('cbo.cbos.index') ? 'active' : '']">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h2a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2m0 0l4-4m-4 4l-4-4m4 4V4"/></svg>
                    <div class="tooltip">CBOs</div>
                </Link>

                <Link :href="route('cro.cros.index')" :class="['nav-btn relative group', isActive('cro.cros.index') ? 'active' : '']">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                    <div class="tooltip">CROs</div>
                </Link>

                <Link :href="route('mhp.sites.index')" :class="['nav-btn relative group', isActive('mhp.sites.index') ? 'active' : '']">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    <div class="tooltip">MHP Sites</div>
                </Link>

                <Link :href="route('irrigation.schemes.index')" :class="['nav-btn relative group', isActive('irrigation.schemes.index') ? 'active' : '']">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                    <div class="tooltip">Irrigation Schemes</div>
                </Link>

                <Link :href="route('vendor.vendors.index')" :class="['nav-btn relative group', isActive('vendor.vendors.index') ? 'active' : '']">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 01-2 2h4M10 6h4M10 6h4M14 6h4a2 2 0 012 2v10a2 2 0 01-2 2h-4M14 6h-4m0 0V4m0 2v4"/></svg>
                    <div class="tooltip">Vendors</div>
                </Link>

                <Link :href="route('lrm.committees.index')" :class="['nav-btn relative group', isActive('lrm.committees.index') ? 'active' : '']">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h2a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2m0 0l4-4m-4 4l-4-4m4 4V4"/></svg>
                    <div class="tooltip">LRM Committees</div>
                </Link>

                <hr class="w-8 border-white/10 my-1" />

                <!-- Open Reports Hub (Triggers Modal) -->
                <button @click="toggleReportsHub" class="nav-btn relative group">
                    <span class="material-symbols-outlined text-2xl">analytics</span>
                    <div class="tooltip">Reports Hub</div>
                </button>

                <!-- Search / Command Palette -->
                <button @click="toggleCommandPalette" class="nav-btn relative group bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/25">
                    <span class="material-symbols-outlined text-2xl">search</span>
                    <div class="tooltip">Search (Ctrl+K)</div>
                </button>
            </nav>
        </div>

        <!-- Footer / User Area -->
        <div class="flex flex-col items-center gap-4 w-full">
            <!-- Admin Dashboard -->
            <Link v-if="isAdmin" :href="route('admin.dashboard')" :class="['nav-btn relative group', isActive('admin.dashboard') ? 'active' : '']">
                <span class="material-symbols-outlined text-2xl text-amber-400">admin_panel_settings</span>
                <div class="tooltip">Admin Panel</div>
            </Link>

            <!-- User Profile -->
            <Link v-if="user" :href="route('profile.show')" class="relative group cursor-pointer flex flex-col items-center">
                <img :src="user.profile_photo_url || 'https://i.postimg.cc/DzL69Yng/images.png'" alt="User Profile" class="h-10 w-10 rounded-xl object-cover ring-2 ring-emerald-500/30 hover:scale-105 transition duration-200">
                <div class="tooltip text-center">
                    <div class="font-semibold">{{ user.name }}</div>
                    <div class="text-[10px] text-ink-400">{{ user.email }}</div>
                </div>
            </Link>

            <!-- Logout -->
            <button @click="router.post(route('logout'))" class="nav-btn relative group text-rose-400 hover:bg-rose-500/10 hover:text-rose-300">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                <div class="tooltip">Log Out</div>
            </button>
        </div>
    </aside>
</template>

<style scoped>
.nav-btn {
    @apply flex items-center justify-center h-11 w-11 rounded-xl text-ink-300 hover:text-white hover:bg-paper-800 transition duration-150;
}
.nav-btn.active {
    @apply bg-accent-600 text-white shadow-sm;
}
.tooltip {
    @apply absolute left-16 bg-gray-950 text-white text-xs py-1.5 px-3 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition duration-150 shadow-xl border border-white/5 whitespace-nowrap z-50;
}
</style>

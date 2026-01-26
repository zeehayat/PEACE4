<script setup>
import { Link, usePage, router } from '@inertiajs/vue3';
import { ref, computed } from 'vue';

const page = usePage();
const isOpen = ref(false);
const isCollapsed = ref(true);

const toggleSidebar = () => {
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
        isCollapsed.value = false; // ensure readability on mobile when opened
    }
};

const isActive = (routeName) => {
    return route().current(routeName) || route().current(routeName + '.*');
};

const user = computed(() => page.props.auth.user);

// --- Dynamic Report Menu Logic ---

// 1. Define the report menu structure
const reportMenu = ref([
    {
        title: 'CBO',
        key: 'cbo',
        links: [
            // Example reports under CBO
            { name: 'CBO Report', route: 'cbo.reports.cbo.index', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
            //{ name: 'CBO Report 2', route: 'cbo.report2', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        ]
    },
    {
        title: 'MHP',
        key: 'mhp',
        links: [
            // Example reports under MHP
            { name: 'MHP Alpha', route: 'mhp.reports.index', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
            { name: 'District Wise MHP', route: 'mhp.reports.district', icon: 'M4 6h16M4 12h12M4 18h8' },
            { name: 'Instructions CSV', route: 'mhp.reports.district.instructions', icon: 'M3 6h18M3 12h18M3 18h10' },
            { name: 'MHP Detailed Report', route: 'mhp.reports.detailed', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
            //{ name: 'MHP Beta', route: 'mhp.report.beta', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
        ]
    },
    {
        title: 'Irrigation',
        key: 'irrigation',
        links: [
            // Example reports under Irrigation
            { name: 'Irrigation Scheme Report', route: 'irrigation.reports.schemes', icon: 'M4 6h16M4 12h16M4 18h16' },
        ]
    },
]);

// 2. Centralized state for collapse status
const reportCollapseState = ref({
    cbo: true,
    mhp: true,
    irrigation: true,
});

// 3. Reusable toggle function
const toggleReportSection = (key) => {
    reportCollapseState.value[key] = !reportCollapseState.value[key];
};

const isAdmin = computed(() => user.value?.roles?.some((r) => ['Admin', 'Root'].includes(r.name)));
// --- End Dynamic Report Menu Logic ---
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
        class="fixed inset-y-0 left-0 bg-gradient-to-b from-[#0f2a1b] via-[#122f1f] to-[#0c1f15] text-white p-5 space-y-6 z-50 transform md:relative md:translate-x-0 transition-all duration-300 ease-in-out shadow-2xl"
        :style="{ width: isCollapsed ? '5rem' : '18rem' }"
    >
        <div class="flex items-center justify-between h-14 rounded-xl bg-white/5 px-4 ring-1 ring-white/10">
            <Link :href="route('dashboard')" class="text-xl font-bold tracking-wide text-white" v-show="!isCollapsed">
                SRSP PEACE 2
            </Link>
            <span class="material-symbols-outlined text-primary bg-white/10 rounded-full p-1">
                {{ isCollapsed ? 'menu' : 'spa' }}
            </span>
        </div>

        <button
            @click="isCollapsed = !isCollapsed"
            class="flex items-center gap-2 rounded-xl bg-white/10 text-white px-3 py-2 text-xs font-semibold ring-1 ring-white/10 hover:bg-white/15 transition"
        >
            <span class="material-symbols-outlined text-sm">{{ isCollapsed ? 'chevron_right' : 'chevron_left' }}</span>
            <span v-show="!isCollapsed">Collapse</span>
        </button>

        <div v-if="user" class="flex items-center space-x-4 p-3 rounded-xl bg-white/5 ring-1 ring-white/10">
            <div class="relative shrink-0">
                <img :src="user.profile_photo_url || 'https://i.postimg.cc/DzL69Yng/images.png'" alt="Profile Photo" class="h-12 w-12 rounded-full object-cover border-2 border-primary transition-all duration-200 hover:scale-105">
                <span class="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-[#0f2a1b]"></span>
            </div>
            <div>
                <div class="font-semibold text-white" v-show="!isCollapsed">{{ user.name }}</div>
                <div class="text-xs text-gray-300" v-show="!isCollapsed">{{ user.email }}</div>
            </div>
        </div>
        <div v-else class="p-3 text-sm text-gray-200 rounded-xl bg-white/5 ring-1 ring-white/10">
            Guest User
        </div>

        <nav class="space-y-4 font-medium">
            <h3 class="text-xs uppercase tracking-[0.2em] text-gray-400 px-3" v-show="!isCollapsed">Dashboards</h3>

            <Link :href="route('mhp.dashboard')" :class="['nav-link group', isActive('mhp.dashboard') ? 'bg-primary/20 text-white ring-1 ring-primary/40' : 'text-gray-200 hover:bg-white/5 hover:text-white']">
                <svg class="h-5 w-5 mr-3 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                <span class="transition-colors duration-200" v-show="!isCollapsed">MHP Dashboard</span>
            </Link>
            <Link :href="route('irrigation.dashboard')" :class="['nav-link group', isActive('irrigation.dashboard') ? 'bg-primary/20 text-white ring-1 ring-primary/40' : 'text-gray-200 hover:bg-white/5 hover:text-white']">
                <svg class="h-5 w-5 mr-3 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                <span class="transition-colors duration-200" v-show="!isCollapsed">Irrigation Dashboard</span>
            </Link>

            <h3 class="text-xs uppercase tracking-[0.2em] text-gray-400 px-3 pt-2" v-show="!isCollapsed">Modules</h3>

            <Link :href="route('cbo.cbos.index')" :class="['nav-link group', isActive('cbo.cbos.index') ? 'bg-primary/20 text-white ring-1 ring-primary/40' : 'text-gray-200 hover:bg-white/5 hover:text-white']">
                <svg class="h-5 w-5 mr-3 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h2a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2m0 0l4-4m-4 4l-4-4m4 4V4"/></svg>
                <span class="transition-colors duration-200" v-show="!isCollapsed">CBOs</span>
            </Link>
            <Link :href="route('mhp.sites.index')" :class="['nav-link group', isActive('mhp.sites.index') ? 'bg-primary/20 text-white ring-1 ring-primary/40' : 'text-gray-200 hover:bg-white/5 hover:text-white']">
                <svg class="h-5 w-5 mr-3 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                <span class="transition-colors duration-200" v-show="!isCollapsed">MHP Sites</span>
            </Link>
            <Link :href="route('irrigation.schemes.index')" :class="['nav-link group', isActive('irrigation.schemes.index') ? 'bg-primary/20 text-white ring-1 ring-primary/40' : 'text-gray-200 hover:bg-white/5 hover:text-white']">
                <svg class="h-5 w-5 mr-3 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                <span class="transition-colors duration-200" v-show="!isCollapsed">Irrigation Schemes</span>
            </Link>
            <Link :href="route('vendor.vendors.index')" :class="['nav-link group', isActive('vendor.vendors.index') ? 'bg-primary/20 text-white ring-1 ring-primary/40' : 'text-gray-200 hover:bg-white/5 hover:text-white']">
                <svg class="h-5 w-5 mr-3 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 01-2 2h4M10 6h4M10 6h4M14 6h4a2 2 0 012 2v10a2 2 0 01-2 2h-4M14 6h-4m0 0V4m0 2v4"/></svg>
                <span class="transition-colors duration-200" v-show="!isCollapsed">Vendors</span>
            </Link>
            <Link :href="route('lrm.committees.index')" :class="['nav-link group', isActive('lrm.committees.index') ? 'bg-primary/20 text-white ring-1 ring-primary/40' : 'text-gray-200 hover:bg-white/5 hover:text-white']">
                <svg class="h-5 w-5 mr-3 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h2a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2m0 0l4-4m-4 4l-4-4m4 4V4"/></svg>
                <span class="transition-colors duration-200" v-show="!isCollapsed">LRM Committees</span>
            </Link>

            <div v-if="isAdmin" class="pt-4 border-t border-gray-800 mt-2">
                <h3 class="text-xs uppercase tracking-[0.2em] text-gray-400 px-3 pt-1 pb-2" v-show="!isCollapsed">Admin</h3>
                <Link :href="route('admin.dashboard')" :class="['nav-link group', isActive('admin.dashboard') ? 'bg-primary/20 text-white ring-1 ring-primary/40' : 'text-gray-200 hover:bg-white/5 hover:text-white']">
                    <svg class="h-5 w-5 mr-3 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                    <span class="transition-colors duration-200" v-show="!isCollapsed">Admin Dashboard</span>
                </Link>
                <Link :href="route('admin.users.index')" :class="['nav-link group', isActive('admin.users.index') ? 'bg-primary/20 text-white ring-1 ring-primary/40' : 'text-gray-200 hover:bg-white/5 hover:text-white']">
                    <svg class="h-5 w-5 mr-3 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 14a4 4 0 10-8 0m8 0a4 4 0 01-8 0m8 0v1a4 4 0 01-8 0v-1m8 0a5 5 0 015 5v1H3v-1a5 5 0 015-5"/></svg>
                    <span class="transition-colors duration-200" v-show="!isCollapsed">Users</span>
                </Link>
                <Link :href="route('admin.roles.index')" :class="['nav-link group', isActive('admin.roles.index') ? 'bg-primary/20 text-white ring-1 ring-primary/40' : 'text-gray-200 hover:bg-white/5 hover:text-white']">
                    <svg class="h-5 w-5 mr-3 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6l4 2"/></svg>
                    <span class="transition-colors duration-200" v-show="!isCollapsed">Roles</span>
                </Link>
                <Link :href="route('admin.access-control.index')" :class="['nav-link group', isActive('admin.access-control.index') ? 'bg-primary/20 text-white ring-1 ring-primary/40' : 'text-gray-200 hover:bg-white/5 hover:text-white']">
                    <svg class="h-5 w-5 mr-3 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.4 15a1 1 0 010 2.1A7.964 7.964 0 0112 19a7.964 7.964 0 01-7.4-1.9A1 1 0 014.6 15a9.967 9.967 0 0114.8 0z"/></svg>
                    <span class="transition-colors duration-200" v-show="!isCollapsed">Access Control</span>
                </Link>
            </div>
            <button @click="router.post(route('logout'))" class="w-full flex items-center p-3 rounded-xl text-gray-200 hover:bg-white/5 hover:text-white transition-colors duration-200">
                <svg class="h-5 w-5 mr-3 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                <span class="transition-colors duration-200" v-show="!isCollapsed">Log Out</span>
            </button>

            <h3 class="text-xs uppercase tracking-[0.2em] text-gray-400 px-3 pt-4 pb-1" v-show="!isCollapsed">Reports</h3>

            <div class="space-y-1">
                <div v-for="section in reportMenu" :key="section.key">
                    <h4
                        class="text-xs uppercase tracking-wider text-gray-500 px-3 pt-4 pb-1 cursor-pointer select-none flex justify-between items-center"
                        @click="toggleReportSection(section.key)"
                    >
                        {{ section.title }}
                        <svg
                            :class="{'rotate-180': !reportCollapseState[section.key]}"
                            class="h-4 w-4 transition-transform duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </h4>

                    <Transition name="slide-fade">
                        <div v-show="!reportCollapseState[section.key]" class="pl-2 space-y-1">

                            <Link
                                v-for="link in section.links"
                                :key="link.route"
                                :href="route(link.route)"
                                :class="['w-full flex items-center p-3 rounded-xl text-gray-300 transition-colors duration-200',
                                         // Highlight active link inside the collapsed menu
                                         isActive(link.route) ? 'bg-gray-800 text-white shadow-md' : 'hover:bg-gray-800 hover:text-white']"
                            >
                                <svg class="h-5 w-5 mr-3 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="link.icon" />
                                </svg>
                                <span class="transition-colors duration-200 text-sm">{{ link.name }}</span>
                            </Link>

                        </div>
                    </Transition>
                </div>
            </div>
        </nav>
    </aside>
</template>

<style scoped>
/* The CSS for nav-link and slide-fade remains correct and is appended below for completeness */

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

/* CSS for the collapse animation */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease-out;
    overflow: hidden; /* Essential for height transition */
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    height: 0;
    opacity: 0;
}
</style>

<script setup>
import { Link } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import { useNavigation } from '@/Composables/useNavigation';

const { isReportsHubOpen } = useNavigation();

const reportMenu = ref([
    {
        title: 'CBO',
        key: 'cbo',
        links: [
            { name: 'CBO Report', route: 'cbo.reports.cbo.index', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        ]
    },
    {
        title: 'CRO',
        key: 'cro',
        links: [
            { name: 'CRO Report', route: 'cro.reports.index', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
        ]
    },
    {
        title: 'MHP',
        key: 'mhp',
        links: [
            { name: 'MHP Overview Dashboard', route: 'mhp.overview', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
            { name: 'MHP Alpha', route: 'mhp.reports.index', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
            { name: 'District Wise MHP', route: 'mhp.reports.district', icon: 'M4 6h16M4 12h12M4 18h8' },
            { name: 'Instructions CSV', route: 'mhp.reports.district.instructions', icon: 'M3 6h18M3 12h18M3 18h10' },
            { name: 'MHP Detailed Report', route: 'mhp.reports.detailed', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
            { name: 'MHP Detailed V2 (Fresh)', route: 'mhp.reports.detailed-v2', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
        ]
    },
    {
        title: 'Irrigation',
        key: 'irrigation',
        links: [
            { name: 'Irrigation Overview Dashboard', route: 'irrigation.overview', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
            { name: 'Irrigation Scheme Report', route: 'irrigation.reports.schemes', icon: 'M4 6h16M4 12h16M4 18h16' },
        ]
    },
    {
        title: 'LRM',
        key: 'lrm',
        links: [
            { name: 'LRM/NRM Report', route: 'lrm.report.index', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        ]
    },
]);

const searchQuery = ref('');

const filteredMenu = computed(() => {
    if (!searchQuery.value) return reportMenu.value;
    
    return reportMenu.value.map(section => ({
        ...section,
        links: section.links.filter(link => 
            link.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    })).filter(section => section.links.length > 0);
});

const close = () => {
    isReportsHubOpen.value = false;
};
</script>

<template>
    <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
    >
        <div v-if="isReportsHubOpen" @click.self="close" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a1b11]/80 backdrop-blur-sm">
            <div class="bg-[#122f1f] border border-white/10 rounded-2xl max-w-4xl w-full p-6 text-white shadow-2xl relative flex flex-col max-h-[85vh]">
                
                <!-- Header -->
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <h2 class="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                            <span class="material-symbols-outlined text-emerald-400">analytics</span>
                            Reports Hub
                        </h2>
                        <p class="text-xs text-emerald-300/60 mt-1">Select and generate custom analytical reports</p>
                    </div>
                    <button @click="close" class="p-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
                        <span class="material-symbols-outlined text-slate-400 hover:text-white">close</span>
                    </button>
                </div>

                <!-- Quick Filter Input -->
                <div class="relative mb-6">
                    <input 
                        v-model="searchQuery"
                        type="text" 
                        placeholder="Search for a specific report..." 
                        class="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-white/30"
                    />
                    <span class="material-symbols-outlined absolute left-4 top-3.5 text-white/30">search</span>
                </div>

                <!-- Grid Columns -->
                <div class="flex-1 overflow-y-auto pr-2 space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div v-for="section in filteredMenu" :key="section.key" class="bg-white/5 rounded-xl border border-white/10 p-5 hover:border-emerald-500/30 transition duration-200">
                            <div class="flex items-center gap-2 mb-4">
                                <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
                                <h3 class="text-sm font-semibold uppercase tracking-wider text-emerald-400">{{ section.title }}</h3>
                            </div>
                            
                            <ul class="space-y-2">
                                <li v-for="link in section.links" :key="link.route">
                                    <Link 
                                        :href="route(link.route)" 
                                        @click="close"
                                        class="flex items-center gap-3 p-3 rounded-lg text-slate-300 hover:bg-emerald-500/10 hover:text-white group transition duration-150"
                                    >
                                        <svg class="h-5 w-5 text-slate-500 group-hover:text-emerald-400 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="link.icon" />
                                        </svg>
                                        <span class="text-sm font-medium">{{ link.name }}</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

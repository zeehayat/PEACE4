<script setup>
import { Link, usePage } from '@inertiajs/vue3';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useNavigation } from '@/Composables/useNavigation';

const page = usePage();
const { isCommandPaletteOpen } = useNavigation();
const searchQuery = ref('');

const user = computed(() => page.props.auth.user);
const isAdmin = computed(() => user.value?.roles?.some((r) => ['Admin', 'Root'].includes(r)));

// Global routes list
const commandItems = computed(() => {
    const items = [
        { name: 'MHP Dashboard', description: 'View MHP data charts and graphs', route: 'mhp.overview', category: 'Dashboards' },
        { name: 'Irrigation Dashboard', description: 'View irrigation flow statistics', route: 'irrigation.overview', category: 'Dashboards' },
        { name: 'CBO Registry', description: 'Manage Community Based Organizations', route: 'cbo.cbos.index', category: 'Modules' },
        { name: 'CRO Registry', description: 'Manage Community Resource Organizations', route: 'cro.cros.index', category: 'Modules' },
        { name: 'MHP Site List', description: 'Micro Hydro Power Site Locations', route: 'mhp.sites.index', category: 'Modules' },
        { name: 'Irrigation Schemes', description: 'Water flow structures', route: 'irrigation.schemes.index', category: 'Modules' },
        { name: 'Vendors Directory', description: 'Vendor companies and contacts', route: 'vendor.vendors.index', category: 'Modules' },
        { name: 'LRM Committees', description: 'Land Resource Management', route: 'lrm.committees.index', category: 'Modules' },
    ];

    if (isAdmin.value) {
        items.push(
            { name: 'Admin Dashboard', description: 'Overall administration overview', route: 'admin.dashboard', category: 'Admin' },
            { name: 'Users Panel', description: 'Manage users, verification and contact info', route: 'admin.users.index', category: 'Admin' },
            { name: 'Roles Management', description: 'Define and assign custom system roles', route: 'admin.roles.index', category: 'Admin' },
            { name: 'Access Control Matrix', description: 'Configure granular permission rules', route: 'admin.access-control.index', category: 'Admin' }
        );
    }

    return items;
});

const filteredItems = computed(() => {
    if (!searchQuery.value) return commandItems.value;
    return commandItems.value.filter(item => 
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const close = () => {
    isCommandPaletteOpen.value = false;
    searchQuery.value = '';
};

// Keyboard listener for Cmd+K or Ctrl+K
const handleGlobalKeydown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isCommandPaletteOpen.value = !isCommandPaletteOpen.value;
    }
};

onMounted(() => document.addEventListener('keydown', handleGlobalKeydown));
onUnmounted(() => document.removeEventListener('keydown', handleGlobalKeydown));
</script>

<template>
    <Transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0 translate-y-[-20px]"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-[-20px]"
    >
        <div v-if="isCommandPaletteOpen" @click.self="close" class="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[15vh] bg-[#0a1b11]/70 backdrop-blur-sm">
            <div class="bg-[#122f1f] border border-white/10 rounded-xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col max-h-[50vh]">
                <!-- Input Box -->
                <div class="relative border-b border-white/10">
                    <input 
                        v-model="searchQuery"
                        type="text" 
                        placeholder="Search pages, settings..." 
                        class="w-full bg-transparent py-4 pl-12 pr-4 text-white focus:outline-none text-base placeholder-white/20"
                        autofocus
                    />
                    <span class="material-symbols-outlined absolute left-4 top-4 text-white/20">search</span>
                </div>

                <!-- Results List -->
                <div class="overflow-y-auto flex-1 p-2">
                    <div v-if="filteredItems.length === 0" class="p-4 text-center text-sm text-white/30">
                        No pages match your query
                    </div>
                    <div v-else class="space-y-1">
                        <Link 
                            v-for="item in filteredItems" 
                            :key="item.route"
                            :href="route(item.route)"
                            @click="close"
                            class="flex items-center justify-between p-3 rounded-lg text-slate-300 hover:bg-emerald-500/20 hover:text-white transition group"
                        >
                            <div>
                                <div class="text-sm font-semibold text-white group-hover:text-emerald-400">{{ item.name }}</div>
                                <div class="text-xs text-slate-400/80 mt-0.5">{{ item.description }}</div>
                            </div>
                            <span class="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 rounded text-slate-400 group-hover:border-emerald-500/20">
                                {{ item.category }}
                            </span>
                        </Link>
                    </div>
                </div>

                <!-- Help footer -->
                <div class="p-3 bg-white/5 border-t border-white/10 text-[10px] text-slate-400 flex justify-between items-center">
                    <span>Press <kbd class="px-1.5 py-0.5 bg-slate-900 border border-white/10 rounded">ESC</kbd> to exit</span>
                    <span>Use search keywords to filter instantly</span>
                </div>
            </div>
        </div>
    </Transition>
</template>

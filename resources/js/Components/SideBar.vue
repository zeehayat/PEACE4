<script setup>
import { Link, usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue';

// Map icon names to Lucide SVG strings
// You will need to ensure 'lucide-vue-next' is installed and its icons are compiled/available.
// For robust usage with many icons, you might create a dedicated component that imports
// icons dynamically based on their name. For this example, embedding common ones as SVGs.
const icons = {
    'home': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    'zap': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    'droplet': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-droplet"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3-2-3s-2.5 1-3.5 2c-1 1-2 2-3.5 2s-2.5-1-3.5-2c-1-1-2-2-2-3a7 7 0 0 1 7-7Z"/></svg>`,
    'clipboard': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>`,
    'file-text': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`,
    'chevrons-down': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-down"><path d="m7 6 5 5 5-5"/><path d="m7 13 5 5 5-5"/></svg>`,
    'chevrons-right': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-right"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>`,
    // Add more icons as needed for your menu items
};

const page = usePage();

// Access the mainMenu prop from shared data
const mainMenu = computed(() => page.props.mainMenu || []);
const currentUrl = computed(() => page.url); // Get the current full URL

// For managing dropdown open/close state for parent items
const openParentMenu = ref({}); // Stores { parentId: true/false }

// Function to toggle parent menu dropdown
const toggleParent = (parentId) => {
    openParentMenu.value[parentId] = !openParentMenu.value[parentId];
};

// Function to check if a menu item is active
const isActive = (menuItem) => {
    if (!menuItem.url) return false;
    // Compare full current URL with the menu item's URL
    // Use startsWith for parent routes that have dynamic segments
    return currentUrl.value.startsWith(menuItem.url);
};

// Function to render icon safely
const renderIcon = (iconName) => {
    return icons[iconName] || `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg>`; // Default square icon
};

const showSidebar = ref(true); // Control sidebar visibility for responsive design

const toggleSidebar = () => {
    showSidebar.value = !showSidebar.value;
};
</script>

<template>
    <div class="fixed inset-y-0 left-0 z-40 bg-gray-900 text-gray-200 w-64 p-4 shadow-lg flex flex-col transition-transform duration-300 ease-in-out"
         :class="{ '-translate-x-full md:translate-x-0': !showSidebar }">
        <div class="text-white text-2xl font-bold mb-8 border-b border-gray-700 pb-4 flex items-center justify-between">
            <span class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wind mr-2"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.5 12.5a2.5 2.5 0 1 1 1.8 4.3H2"/></svg>
                Project App
            </span>
            <button @click="toggleSidebar" class="md:hidden text-gray-400 hover:text-white focus:outline-none">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>

        <nav class="flex-grow space-y-2 overflow-y-auto pb-4">
            <template v-for="menuItem in mainMenu" :key="menuItem.id">
                <template v-if="menuItem.url">
                    <Link :href="menuItem.url"
                          class="flex items-center px-4 py-2 rounded-lg transition-colors duration-200"
                          :class="{ 'bg-blue-700 text-white shadow-md': isActive(menuItem), 'hover:bg-gray-700 text-gray-300': !isActive(menuItem) }"
                          :target="menuItem.target || '_self'">
                        <span class="mr-3" v-html="renderIcon(menuItem.icon_class)"></span>
                        <span>{{ menuItem.title }}</span>
                    </Link>
                </template>
                <template v-else-if="menuItem.children && menuItem.children.length > 0">
                    <div @click="toggleParent(menuItem.id)"
                         class="flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200"
                         :class="{ 'bg-gray-700 text-white': openParentMenu[menuItem.id], 'hover:bg-gray-700 text-gray-300': !openParentMenu[menuItem.id] }">
                        <span class="flex items-center gap-3">
                            <span v-html="renderIcon(menuItem.icon_class)"></span>
                            <span class="font-semibold">{{ menuItem.title }}</span>
                        </span>
                        <span v-html="openParentMenu[menuItem.id] ? icons['chevrons-down'] : icons['chevrons-right']"></span>
                    </div>
                    <div v-show="openParentMenu[menuItem.id]" class="ml-6 space-y-1 mt-1">
                        <template v-for="subItem in menuItem.children" :key="subItem.id">
                            <Link :href="subItem.url"
                                  class="flex items-center px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
                                  :class="{ 'bg-blue-700 text-white shadow-md': isActive(subItem), 'hover:bg-gray-700 text-gray-300': !isActive(subItem) }"
                                  :target="subItem.target || '_self'">
                                <span class="mr-3" v-html="renderIcon(subItem.icon_class)"></span>
                                <span>{{ subItem.title }}</span>
                            </Link>
                        </template>
                    </div>
                </template>
            </template>
        </nav>

        <button @click="toggleSidebar" class="fixed top-4 left-4 z-50 md:hidden bg-indigo-600 p-2 rounded-full text-white shadow-lg focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
    </div>

    <div :class="{ 'md:ml-64': showSidebar }" class="transition-all duration-300 ease-in-out">
        <slot />
    </div>
</template>

<style scoped>
/* You can add specific sidebar styles here if needed */
</style>

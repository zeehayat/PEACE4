<script setup>
import { computed } from 'vue';

const props = defineProps({
    vendor: { type: Object, required: true },
    openActionMenuId: [Number, null], // ID of the currently open menu
    menuPosition: { // Receives position for teleported menu
        type: Object,
        default: () => ({ top: 0, left: 0, width: 0, direction: 'down' }),
    },
});

const emit = defineEmits([
    'toggle-action-menu',
    'view-details',
    'edit-vendor',
    'delete-vendor',
]);

// Helper function to get status class
function getStatusClass(status) {
    switch (status) {
        case 'APPROVED': return 'bg-green-100 text-green-800 border border-green-200';
        case 'NEW': return 'bg-blue-100 text-blue-800 border border-blue-200';
        case 'BLACK-LISTED': return 'bg-red-100 text-red-800 border border-red-200';
        case 'UNAPPROVED': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
        case 'OLD': return 'bg-gray-100 text-gray-800 border border-gray-200';
        default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
}
</script>

<template>
    <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:scale-[1.01] relative">
        <div class="absolute top-4 right-4 z-10">
            <button
                @click.stop="emit('toggle-action-menu', vendor.id, $event)"
                class="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-200/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-opacity action-menu-trigger"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
            </button>
            <!-- Menu content is teleported from Vendor/Index.vue -->
        </div>

        <div class="mt-4 pt-4 border-t border-gray-200">
            <div class="flex items-center justify-between mb-3">
                <p class="text-sm text-gray-500">Status</p>
                <span :class="getStatusClass(vendor.status)" class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border">
                  {{ vendor.status ?? 'N/A' }}
                </span>
            </div>
            <div class="flex items-center justify-between">
                <p class="text-sm text-gray-500">Name</p>
                <p class="font-semibold text-sm text-gray-900">{{ vendor.name ?? 'N/A' }}</p>
            </div>
            <div class="flex items-center justify-between">
                <p class="text-sm text-gray-500">Contact Person</p>
                <p class="font-semibold text-sm text-gray-900">{{ vendor.contact_person ?? 'N/A' }}</p>
            </div>
            <div class="flex items-center justify-between">
                <p class="text-sm text-gray-500">Phone</p>
                <p class="font-semibold text-sm text-gray-900">{{ vendor.phone ?? 'N/A' }}</p>
            </div>
            <div class="flex items-center justify-between">
                <p class="text-sm text-gray-500">Email</p>
                <p class="font-semibold text-sm text-gray-900">{{ vendor.email ?? 'N/A' }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

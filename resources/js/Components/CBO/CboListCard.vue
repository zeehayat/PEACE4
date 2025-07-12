<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    cbo: Object,
    openActionMenuId: [Number, null],
    menuDirection: String,
});

const emit = defineEmits([
    'toggle-action-menu',
    'edit',
    'open-dialogue',
    'open-training',
    'open-exposure',
    'open-details',
    'delete-cbo',
    'view-dialogues',
    'view-trainings',
    'view-exposure-visits', // NEW: Emit this event
]);

const formattedGender = computed(() => {
    if (!props.cbo.gender) return 'N/A';
    return props.cbo.gender.charAt(0).toUpperCase() + props.cbo.gender.slice(1);
});

// A simple mapping of district names to approximate coordinates.
const districtCoordinates = {
    'Peshawar': { lat: 34.0049, lng: 71.5458 },
    'Mardan': { lat: 34.1953, lng: 72.0378 },
    'Swabi': { lat: 34.1167, lng: 72.4667 },
    'Kohat': { lat: 33.5833, lng: 71.4500 },
    // Add more districts and their coordinates as needed for your data
};

const mapImageUrl = computed(() => {
    const district = props.cbo.district;
    const coords = districtCoordinates[district];

    if (coords) {
        return `https://via.placeholder.com/400x200/F0F4F8/607C8C?text=${encodeURIComponent(district)}+District+Map`;
    } else {
        return `https://via.placeholder.com/400x200/F0F4F8/607C8C?text=Map+Unavailable`;
    }
});

const mapLinkUrl = computed(() => {
    const district = props.cbo.district;
    const coords = districtCoordinates[district];
    if (coords) {
        return `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`;
    } else {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(district)}`;
    }
});

const handleToggleActionMenu = (event) => {
    emit('toggle-action-menu', props.cbo.id, event);
};
</script>

<template>
    <div class="cbo-card relative">
        <div class="absolute top-4 right-4 z-50 action-menu-container">
            <button @click.stop="handleToggleActionMenu($event)"
                    class="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-200/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
            </button>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <div v-if="openActionMenuId === cbo.id"
                     :class="['origin-top-right absolute w-56 rounded-xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-30 divide-y divide-gray-100', menuDirection === 'up' ? 'bottom-full mb-2 right-0' : 'top-full mt-2 right-0']">
                    <div class="py-1 text-sm text-gray-700">
                        <button @click="emit('edit', cbo)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="M15 5l4 4"/></svg>
                            Edit CBO Info
                        </button>
                        <button @click="emit('open-details', cbo)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                            View Details
                        </button>
                        <a :href="mapLinkUrl" target="_blank" rel="noopener noreferrer" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map"><path d="M14.5 4H10A2 2 0 0 0 8 6v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7.5L14.5 4z"/><polyline points="14 2 14 8 20 8"/><line x1="8" x2="8" y1="18" y2="22"/><line x1="10" x2="10" y1="13" y2="22"/><line x1="12" x2="12" y1="13" y2="22"/><line x1="14" x2="14" y1="18" y2="22"/></svg>
                            View on Map
                        </a>
                    </div>
                    <div class="py-1 text-sm text-gray-700">
                        <button @click="emit('open-dialogue', cbo)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle"><path d="M7.9 20A9.9 9.9 0 1 0 4 16.1L2 22Z"/></svg>
                            Add Dialogue
                        </button>
                        <button @click="emit('view-dialogues', cbo)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-messages-square"><path d="M14 2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2v4l4-4h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/><path d="M2 14h2v4l4-4h6"/><path d="M18 10h.01"/></svg>
                            View Dialogues
                        </button>
                        <button @click="emit('open-training', cbo)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-graduation-cap"><path d="M21.43 14.7l-4.14 4.14a2.43 2.43 0 0 1-3.42 0L2.79 9.91a2.43 2.43 0 0 1 0-3.42l4.14-4.14a2.43 2.43 0 0 1 3.42 0l7.08 7.08a2.43 2.43 0 0 1 0 3.42ZM22.5 12.5 11.25 1.25"/><path d="M5.62 10.62 1.25 15.01"/><path d="M12.5 22.5 21.21 13.79"/><path d="M18.88 16.88 14.51 21.25"/></svg>
                            Add Training
                        </button>
                        <button @click="emit('view-trainings', cbo)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open-text"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h6z"/><path d="M10 12H7"/><path d="M13 16h-3"/></svg>
                            View Trainings
                        </button>
                        <button @click="emit('open-exposure', cbo)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-3.5 1.5L13 8 4.8 6.2c-.5-.1-1-.1-1.4.2L.4 7.5c-.3.3-.2.9.2 1.3L5.4 14l-2 2.5c-.3.5-.1 1.1.3 1.5.5.4 1.2.5 1.7.2L7.5 16l2.5 2c.7.6 1.7.7 2.6.5L19.2 17.8c.9-.9 1.2-2.2.4-3.1Z"/><path d="M10.95 20.84 12.22 17.5 15.5 16.22"/></svg>
                            Add Exposure Visit
                        </button>
                        <button @click="emit('view-exposure-visits', cbo)" class="w-full text-left block px-4 py-2 hover:bg-gray-100 flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M12 2v20M18 6H6M22 18H2"/></svg>
                            View Exposure Visits
                        </button>
                    </div>
                    <div class="py-1 text-sm text-gray-700">
                        <button @click="emit('delete-cbo', cbo.id)" class="w-full text-left block px-4 py-2 hover:bg-red-100 text-red-600 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                            Delete CBO
                        </button>
                    </div>
                </div>
            </transition>
        </div>

        <div class="mb-4">
            <div class="flex items-center justify-between pb-3 border-b border-gray-200">
                <h3 class="text-xl font-bold text-indigo-700">{{ cbo.reference_code }}</h3>
                <span class="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">ID: {{ cbo.id }}</span>
            </div>
            <div class="mt-4 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <a :href="mapLinkUrl" target="_blank" rel="noopener noreferrer" class="block w-full">
                    <img :src="mapImageUrl" :alt="`Map of ${cbo.district}`" class="w-full h-48 object-cover object-center" />
                </a>
            </div>
        </div>

        <div class="space-y-2 text-sm text-gray-700 mb-6">
            <p><strong>District:</strong> {{ cbo.district }}</p>
            <p><strong>Tehsil:</strong> {{ cbo.tehsil }}</p>
            <p><strong>VC:</strong> {{ cbo.village_council }}</p>
            <p><strong>Village:</strong> {{ cbo.village }}</p>
            <p><strong>Date Formed:</strong> {{ cbo.date_of_formation }}</p>
            <p><strong>Total Members:</strong> {{ cbo.total_members }}</p>
            <p><strong>Gender:</strong> {{ formattedGender }}</p>
            <p><strong>President:</strong> {{ cbo.president_name }}</p>
        </div>
    </div>
</template>

<style scoped>
.cbo-card {
    @apply bg-white shadow-xl rounded-xl p-6 border border-gray-200
    flex flex-col transform transition-all duration-300
    hover:scale-[1.01] hover:shadow-2xl;
}

/* Tooltip Styling */
.tooltip {
    @apply absolute bottom-full left-1/2 -translate-x-1/2 mb-2 text-xs bg-gray-800 text-white px-2.5 py-1.5 rounded-md
    opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10
    pointer-events-none; /* Ensures tooltip doesn't block clicks */
}
</style>

<script setup>
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps({
    links: {
        type: Array,
        required: true,
    },
});

const emit = defineEmits(['pagination-link-clicked']);

const filteredLinks = computed(() => {
    // Filter out '...' links if they don't have a URL, and map to a simpler structure
    return props.links.map(link => ({
        url: link.url,
        label: link.label,
        active: link.active,
        // Add a unique key for v-for if not already present, e.g., using label+url
        key: `${link.label}-${link.url || 'null'}`,
    }));
});

function handleClick(url) {
    if (url) {
        emit('pagination-link-clicked', url);
    }
}
</script>

<template>
    <div v-if="links.length > 3" class="mt-8 flex justify-center">
        <div class="flex flex-wrap -mb-1">
            <template v-for="link in filteredLinks" :key="link.key">
                <div
                    v-if="link.url === null"
                    class="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded"
                    v-html="link.label"
                />
                <Link
                    v-else
                    :href="link.url"
                    class="mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-indigo-500 focus:text-indigo-500"
                    :class="{ 'bg-white text-indigo-500': link.active }"
                    @click.prevent="handleClick(link.url)"
                    v-html="link.label"
                />
            </template>
        </div>
    </div>
</template>

<style scoped>
/* Add any specific styles for your pagination component here if needed */
</style>

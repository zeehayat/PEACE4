<script setup>
import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const page = usePage();
const user = computed(() => page.props.auth.user);

const isActive = (routeName) => {
    return route().current(routeName) || route().current(routeName + '.*');
};
</script>

<template>
    <aside class="w-64 bg-gray-800 text-white h-screen p-4">


        <div v-if="user" class="mb-6">
            <div>{{ user.name }}</div>
            <div class="text-sm text-gray-400">{{ user.email }}</div>
        </div>

        <nav class="space-y-2">
            <Link :href="route('dashboard')" class="block p-2 rounded hover:bg-gray-700"
                  :class="isActive('dashboard') ? 'bg-indigo-700' : ''">Dashboard</Link>

            <Link :href="route('cbo.cbos.index')" class="block p-2 rounded hover:bg-gray-700"
                  :class="isActive('cbo.cbos') ? 'bg-indigo-700' : ''">CBOs</Link>

            <Link :href="route('mhp.sites.index')" class="block p-2 rounded hover:bg-gray-700"
                  :class="isActive('mhp.sites') ? 'bg-indigo-700' : ''">MHP Sites</Link>

            <Link :href="route('irrigation.schemes.index')" class="block p-2 rounded hover:bg-gray-700"
                  :class="isActive('irrigation.schemes') ? 'bg-indigo-700' : ''">Irrigation Schemes</Link>
        </nav>
    </aside>
</template>

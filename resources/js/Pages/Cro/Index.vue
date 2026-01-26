<script setup>
import { ref, watch } from 'vue';
import { router } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import Pagination from '@/Components/Pagination.vue';
import { debounce } from 'lodash-es';

const props = defineProps({
    cros: Object,
    filters: Object,
});

const search = ref(props.filters.search || '');

watch(search, debounce((value) => {
    router.get(route('cro.cros.index'), { search: value }, { preserveState: true, replace: true });
}, 300));

const formatDate = (value) => {
    if (!value) return '-';
    return new Date(value).toLocaleDateString('en-GB');
}

const deleteCro = (id) => {
    if (confirm('Are you sure you want to delete this CRO?')) {
        router.delete(route('cro.cros.destroy', id));
    }
};
</script>

<template>
    <AppLayout title="CROs">
        <template #header>
            <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h2 class="text-xl font-semibold leading-tight text-gray-800">
                    Community Representative Organizations (CROs)
                </h2>
                <button
                    @click="router.visit(route('cro.cros.create'))"
                    class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Create New CRO
                </button>
            </div>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <div class="flex items-center justify-between p-4 bg-white border-b border-gray-200">
                        <div class="flex-1 min-w-0">
                            <input
                                v-model="search"
                                type="text"
                                placeholder="Search CROs..."
                                class="w-full max-w-xs px-4 py-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">CRO Name</th>
                                    <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">District</th>
                                    <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Location</th>
                                    <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Formation Date</th>
                                    <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">President</th>
                                    <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="cro in cros.data" :key="cro.id" class="hover:bg-gray-50">
                                    <td class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{{ cro.cro_name }}</td>
                                    <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{{ cro.district }}</td>
                                    <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                        {{ cro.tehsil }}, {{ cro.village_council }}
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{{ formatDate(cro.date_of_cro_formation) }}</td>
                                    <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{{ cro.president_name }}</td>
                                    <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                        <button @click="router.visit(route('cro.cros.edit', cro.id))" class="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                                        <button @click="deleteCro(cro.id)" class="text-red-600 hover:text-red-900">Delete</button>
                                    </td>
                                </tr>
                                <tr v-if="cros.data.length === 0">
                                    <td colspan="6" class="px-6 py-4 text-center text-gray-500">No CROs found.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
                        <Pagination :links="cros.links" />
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

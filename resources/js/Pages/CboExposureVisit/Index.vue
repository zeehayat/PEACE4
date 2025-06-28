<template>
    <div class="max-w-6xl mx-auto py-6">
        <h1 class="text-2xl font-bold mb-6">CBO Exposure Visits</h1>

        <div class="mb-4">
            <Link
                href="/cbo/exposure-visits/create"
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                + New Visit
            </Link>
        </div>

        <div class="overflow-x-auto">
            <table class="min-w-full border text-sm">
                <thead class="bg-gray-100">
                <tr>
                    <th class="p-2 text-left">CBO Code</th>
                    <th class="p-2 text-left">District</th>
                    <th class="p-2 text-left">Date of Visit</th>
                    <th class="p-2 text-left">Attachments</th>
                    <th class="p-2 text-left">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="visit in visits.data"
                    :key="visit.id"
                    class="border-t hover:bg-gray-50"
                >
                    <td class="p-2">{{ visit.cbo?.reference_code ?? '—' }}</td>
                    <td class="p-2">{{ visit.cbo?.district ?? '—' }}</td>
                    <td class="p-2">{{ visit.date_of_visit }}</td>
                    <td class="p-2 space-y-1">
                        <div v-if="visit.media?.length" v-for="file in visit.media" :key="file.id">
                            <a
                                :href="file.original_url"
                                target="_blank"
                                class="text-blue-600 underline break-words"
                            >
                                {{ file.file_name }}
                            </a>
                        </div>
                        <div v-else class="text-gray-400 italic">No files</div>
                    </td>
                    <td class="p-2">
                        <Link
                            :href="`/cbo/exposure-visits/${visit.id}/edit`"
                            class="text-indigo-600 hover:underline"
                        >
                            Edit
                        </Link>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3'

const props = defineProps({
    visits: Object,
})
</script>

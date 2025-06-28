<template>
    <div class="max-w-6xl mx-auto py-6">
        <h1 class="text-2xl font-bold mb-4">Community Dialogues</h1>

        <!-- Filters -->
        <div class="mb-6 flex flex-wrap gap-4">
            <input
                v-model="filters.district"
                type="text"
                placeholder="Filter by District"
                class="input"
            />
            <input
                v-model="filters.date"
                type="date"
                class="input"
            />
            <button class="btn" @click="applyFilters">Filter</button>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
            <table class="min-w-full border text-sm">
                <thead class="bg-gray-100">
                <tr>
                    <th class="p-2 text-left">CBO Code</th>
                    <th class="p-2 text-left">District</th>
                    <th class="p-2 text-left">Date</th>
                    <th class="p-2 text-left">Participants</th>
                    <th class="p-2 text-left">Attachments</th>
                    <th class="p-2 text-left">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="dialogue in dialogues.data" :key="dialogue.id" class="border-t hover:bg-gray-50">
                    <td class="p-2">{{ dialogue.cbo?.reference_code ?? '—' }}</td>
                    <td class="p-2">{{ dialogue.cbo?.district ?? '—' }}</td>
                    <td class="p-2">{{ dialogue.date_of_dialogue ?? '—' }}</td>
                    <td class="p-2">{{ dialogue.participants ?? '—' }}</td>
                    <td class="p-2 space-y-1">
                        <div v-if="dialogue.media?.length" v-for="file in dialogue.media" :key="file.id">
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
                            :href="route('cbo.dialogues.edit', dialogue.id)"
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
import { reactive } from 'vue'
import { router, Link } from '@inertiajs/vue3'

const props = defineProps({
    dialogues: Object,
    filters: Object,
})

const filters = reactive({
    district: props.filters?.district || '',
    date: props.filters?.date || '',
})

function applyFilters() {
    router.get('/cbo/dialogues', filters, {
        preserveState: true,
        replace: true,
    })
}
</script>

<style scoped>
.input {
    @apply border border-gray-300 rounded px-3 py-2;
}
.btn {
    @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700;
}
</style>

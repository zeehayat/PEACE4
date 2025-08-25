<script setup>
import { computed } from 'vue'

const props = defineProps({
    // Full CBO record with nested relations already loaded
    cbo: {
        type: Object,
        required: true,
    },
})

// ---- Safe accessors (API shape may differ across views) ----
const dialogues = computed(() => props.cbo?.dialogues || props.cbo?.cbo_dialogues || [])
const trainings = computed(() => props.cbo?.trainings || props.cbo?.cbo_trainings || [])
const exposureVisits = computed(
    () => props.cbo?.exposure_visits || props.cbo?.cbo_exposure_visits || []
)
const attachments = computed(() => props.cbo?.attachments || props.cbo?.media || [])

// ---- Helpers ----
const asInt = (v) => {
    const n = Number(String(v ?? 0).toString().replace(/[^\d.-]/g, ''))
    return Number.isFinite(n) ? n : 0
}

const sumBy = (rows, key) => rows.reduce((acc, r) => acc + asInt(r?.[key]), 0)

const formatDate = (d) => {
    if (!d) return '—'
    const dt = new Date(d)
    return Number.isNaN(dt.getTime())
        ? String(d)
        : dt.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        })
}

const fileExt = (name = '') => (name.split('.').pop() || '').toLowerCase()
const isImage = (m = '', name = '') => m?.startsWith('image/') || ['jpg','jpeg','png','gif','bmp','webp','svg'].includes(fileExt(name))

// ---- Stats ----
const stats = computed(() => {
    const totalDialogueParticipants = sumBy(dialogues.value, 'participants')
    const totalTrainingParticipants = sumBy(trainings.value, 'participants')
    const totalExposureParticipants = sumBy(exposureVisits.value, 'participants')
    const totalParticipants =
        totalDialogueParticipants + totalTrainingParticipants + totalExposureParticipants

    return [
        { label: 'Dialogues', value: dialogues.value.length },
        { label: 'Trainings', value: trainings.value.length },
        { label: 'Exposure Visits', value: exposureVisits.value.length },
        { label: 'Total Participants', value: totalParticipants },
    ]
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header / Identity -->
        <section class="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 class="text-2xl md:text-3xl font-extrabold text-indigo-900 tracking-tight">
                        {{ cbo?.name || cbo?.title || 'CBO' }}
                    </h2>
                    <p class="text-sm text-gray-600 mt-1">
                        <span v-if="cbo?.reference_code" class="mr-3"><span class="font-medium text-gray-700">Ref:</span> {{ cbo.reference_code }}</span>
                        <span v-if="cbo?.district" class="mr-3"><span class="font-medium text-gray-700">District:</span> {{ cbo.district }}</span>
                        <span v-if="cbo?.gender" class="mr-3"><span class="font-medium text-gray-700">Gender:</span> {{ cbo.gender }}</span>
                        <span v-if="cbo?.date_of_formation"><span class="font-medium text-gray-700">Formed:</span> {{ formatDate(cbo.date_of_formation) }}</span>
                    </p>
                </div>

                <div class="flex items-center gap-2">
                    <button class="px-4 py-2 rounded-xl text-sm font-semibold bg-white border border-indigo-200 shadow-sm hover:bg-indigo-50">
                        Print
                    </button>
                    <button class="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white shadow hover:bg-indigo-700">
                        Export CSV
                    </button>
                </div>
            </div>
        </section>

        <!-- Quick Stats -->
        <section>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div
                    v-for="(s, i) in stats"
                    :key="i"
                    class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                    <div class="text-sm text-gray-500">{{ s.label }}</div>
                    <div class="mt-1 text-2xl font-bold text-gray-900">{{ s.value }}</div>
                </div>
            </div>
        </section>

        <!-- Dialogues -->
        <section class="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <header class="p-5 border-b border-gray-100 flex items-center justify-between">
                <h3 class="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square-text"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M13 8H7"/><path d="M17 12H7"/></svg>
                    Dialogues
                </h3>
                <div class="text-sm text-gray-500">Total participants: {{ sumBy(dialogues, 'participants') }}</div>
            </header>

            <div class="overflow-x-auto">
                <table class="min-w-full text-sm">
                    <thead>
                    <tr class="bg-gray-50 text-gray-600">
                        <th class="text-left font-semibold px-4 py-3">Date</th>
                        <th class="text-left font-semibold px-4 py-3">Participants</th>
                        <th class="text-left font-semibold px-4 py-3">Remarks</th>
                        <th class="text-left font-semibold px-4 py-3">Attachments</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="!dialogues.length">
                        <td colspan="4" class="px-4 py-6 text-center text-gray-500">No dialogues recorded.</td>
                    </tr>
                    <tr v-for="d in dialogues" :key="d.id" class="border-t border-gray-100">
                        <td class="px-4 py-3">{{ formatDate(d?.date_of_dialogue || d?.date) }}</td>
                        <td class="px-4 py-3">{{ asInt(d?.participants) }}</td>
                        <td class="px-4 py-3 max-w-xl">
                            <p class="line-clamp-3">{{ d?.remarks || '—' }}</p>
                        </td>
                        <td class="px-4 py-3">
                            <div class="flex flex-wrap gap-2">
                                <a v-for="m in d?.attachments || d?.media || []" :key="m.id || m.url" :href="m.url || m.original_url" target="_blank" class="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">
                                    <span class="i-file w-4 h-4" />
                                    <span class="truncate max-w-[10rem]">{{ m.name || m.file_name || 'file' }}</span>
                                </a>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Trainings -->
        <section class="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <header class="p-5 border-b border-gray-100 flex items-center justify-between">
                <h3 class="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-graduation-cap"><path d="m22 10-10-5L2 10l10 5 10-5Z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                    Trainings
                </h3>
                <div class="text-sm text-gray-500">Total participants: {{ sumBy(trainings, 'participants') }}</div>
            </header>

            <div class="overflow-x-auto">
                <table class="min-w-full text-sm">
                    <thead>
                    <tr class="bg-gray-50 text-gray-600">
                        <th class="text-left font-semibold px-4 py-3">Date</th>
                        <th class="text-left font-semibold px-4 py-3">Topic</th>
                        <th class="text-left font-semibold px-4 py-3">Participants</th>
                        <th class="text-left font-semibold px-4 py-3">Remarks</th>
                        <th class="text-left font-semibold px-4 py-3">Attachments</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="!trainings.length">
                        <td colspan="5" class="px-4 py-6 text-center text-gray-500">No trainings recorded.</td>
                    </tr>
                    <tr v-for="t in trainings" :key="t.id" class="border-t border-gray-100">
                        <td class="px-4 py-3">{{ formatDate(t?.date || t?.date_of_training) }}</td>
                        <td class="px-4 py-3">{{ t?.topic || t?.title || '—' }}</td>
                        <td class="px-4 py-3">{{ asInt(t?.participants) }}</td>
                        <td class="px-4 py-3 max-w-xl"><p class="line-clamp-3">{{ t?.remarks || '—' }}</p></td>
                        <td class="px-4 py-3">
                            <div class="flex flex-wrap gap-2">
                                <a v-for="m in t?.attachments || t?.media || []" :key="m.id || m.url" :href="m.url || m.original_url" target="_blank" class="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">
                                    <span class="i-file w-4 h-4" />
                                    <span class="truncate max-w-[10rem]">{{ m.name || m.file_name || 'file' }}</span>
                                </a>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Exposure Visits -->
        <section class="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <header class="p-5 border-b border-gray-100 flex items-center justify-between">
                <h3 class="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-route"><circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M6 22V8a2 2 0 0 1 2-2h7"/></svg>
                    Exposure Visits
                </h3>
                <div class="text-sm text-gray-500">Total participants: {{ sumBy(exposureVisits, 'participants') }}</div>
            </header>

            <div class="overflow-x-auto">
                <table class="min-w-full text-sm">
                    <thead>
                    <tr class="bg-gray-50 text-gray-600">
                        <th class="text-left font-semibold px-4 py-3">Date</th>
                        <th class="text-left font-semibold px-4 py-3">Purpose</th>
                        <th class="text-left font-semibold px-4 py-3">Participants</th>
                        <th class="text-left font-semibold px-4 py-3">Remarks</th>
                        <th class="text-left font-semibold px-4 py-3">Attachments</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="!exposureVisits.length">
                        <td colspan="5" class="px-4 py-6 text-center text-gray-500">No exposure visits recorded.</td>
                    </tr>
                    <tr v-for="e in exposureVisits" :key="e.id" class="border-t border-gray-100">
                        <td class="px-4 py-3">{{ formatDate(e?.date_of_visit || e?.date) }}</td>
                        <td class="px-4 py-3">{{ e?.purpose_of_visit || e?.purpose || '—' }}</td>
                        <td class="px-4 py-3">{{ asInt(e?.participants) }}</td>
                        <td class="px-4 py-3 max-w-xl"><p class="line-clamp-3">{{ e?.remarks || '—' }}</p></td>
                        <td class="px-4 py-3">
                            <div class="flex flex-wrap gap-2">
                                <a v-for="m in e?.attachments || e?.media || []" :key="m.id || m.url" :href="m.url || m.original_url" target="_blank" class="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">
                                    <span class="i-file w-4 h-4" />
                                    <span class="truncate max-w-[10rem]">{{ m.name || m.file_name || 'file' }}</span>
                                </a>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Attachments (Gallery) -->
        <section class="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <header class="p-5 border-b border-gray-100">
                <h3 class="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-paperclip"><path d="M13.5 3.5 5 12a5 5 0 1 0 7.5 6.5L20 11"/><path d="M8.5 8.5 15 2"/></svg>
                    CBO Attachments
                </h3>
            </header>

            <div v-if="!attachments.length" class="p-6 text-center text-gray-500">
                No attachments uploaded for this CBO.
            </div>

            <div v-else class="p-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <a
                    v-for="m in attachments"
                    :key="m.id || m.url"
                    :href="m.url || m.original_url"
                    target="_blank"
                    class="group block rounded-xl border border-gray-200 overflow-hidden bg-gray-50 hover:bg-gray-100"
                >
                    <div class="aspect-video bg-white flex items-center justify-center overflow-hidden">
                        <img
                            v-if="isImage(m?.mime_type, m?.name || m?.file_name)"
                            :src="m.url || m.preview_url || m.original_url"
                            :alt="m.name || m.file_name || 'image'"
                            class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
                        />
                        <div v-else class="p-4 text-center">
                            <div class="text-5xl">📄</div>
                            <div class="mt-2 text-xs text-gray-600 truncate">
                                {{ m.name || m.file_name || 'file' }}
                            </div>
                        </div>
                    </div>
                    <div class="p-3 border-t border-gray-200">
                        <div class="text-sm font-medium text-gray-800 truncate">{{ m.name || m.file_name || 'file' }}</div>
                        <div class="text-xs text-gray-500 truncate">{{ m.mime_type || fileExt(m?.name || m?.file_name) }}</div>
                    </div>
                </a>
            </div>
        </section>
    </div>
</template>

<style scoped>
.i-file { display: inline-block; }
</style>

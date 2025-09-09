<template>
    <AppLayout title="Dashboard">
        <div class="space-y-10 p-6 sm:p-8 bg-gray-50 min-h-screen text-gray-800">

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div
                    v-for="s in statItems"
                    :key="s.title"
                    class="relative flex items-center p-6 bg-white text-gray-900 rounded-2xl shadow-lg border-t-4 border-indigo-500 transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:border-indigo-600"
                >
                    <div class="p-4 rounded-full bg-indigo-100 text-indigo-600 mr-4 flex-shrink-0">
                        <svg class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                        </svg>
                    </div>
                    <div>
                        <div class="text-sm font-semibold uppercase opacity-75 tracking-wider">{{ s.title }}</div>
                        <div class="text-3xl font-extrabold mt-1">
                            {{ s.formatted ?? s.value }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="flex items-center gap-3 w-full sm:w-auto">
                    <span class="text-sm font-bold text-gray-600">GROUP BY:</span>
                    <select v-model="groupBy" class="appearance-none border-2 border-gray-300 rounded-full pl-5 pr-10 py-2 text-sm bg-gray-50 text-gray-700 shadow-inner transition-colors hover:border-indigo-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="cbo">CBO</option>
                        <option value="district">District</option>
                    </select>
                </div>
                <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button @click="expandAll" class="text-sm font-semibold px-4 py-2 rounded-full border border-indigo-500 text-indigo-500 bg-white hover:bg-indigo-50 transition-colors shadow-sm">
                        <svg class="h-4 w-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" /></svg>
                        Expand all
                    </button>
                    <button @click="collapseAll" class="text-sm font-semibold px-4 py-2 rounded-full border border-gray-400 text-gray-600 bg-white hover:bg-gray-100 transition-colors shadow-sm">
                        <svg class="h-4 w-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" /></svg>
                        Collapse all
                    </button>
                </div>
            </div>

            <section>
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-2xl font-bold text-gray-900">MHP Schemes</h2>
                    <span class="text-sm font-medium text-gray-600 bg-white px-3 py-1.5 rounded-full shadow-sm">{{ mhp_projects?.length || 0 }} project(s)</span>
                </div>

                <div v-if="Object.keys(groupedMhp).length" class="space-y-4">
                    <div
                        v-for="(items, key) in groupedMhp"
                        :key="'mhp-' + key"
                        class="bg-white rounded-xl shadow-md border border-gray-200 transition-all duration-300 overflow-hidden"
                    >
                        <button
                            class="w-full flex items-center justify-between p-5 bg-gray-100 hover:bg-gray-200 transition-colors"
                            @click="toggle('mhp', key)"
                        >
                            <div class="flex items-center gap-3">
                                <span class="font-bold text-lg text-gray-800">{{ key }}</span>
                                <span class="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded-full shadow-inner">
                                    {{ items.length }} project{{ items.length > 1 ? 's' : '' }}
                                </span>
                            </div>
                            <svg
                                class="h-5 w-5 text-gray-500 transition-transform duration-300"
                                :class="isOpen('mhp', key) ? 'rotate-180' : ''"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <div v-show="isOpen('mhp', key)" class="p-5 bg-white">
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                <div
                                    v-for="project in items"
                                    :key="'mhp-item-' + project.id"
                                    class="relative p-5 bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:border-indigo-400 hover:shadow-lg"
                                >
                                    <div class="flex items-start justify-between mb-4">
                                        <div class="font-bold text-lg truncate pr-2 text-gray-900">{{ project.name }}</div>
                                        <div class="shrink-0">
                                            <svg
                                                :width="ringSize"
                                                :height="ringSize"
                                                viewBox="0 0 42 42"
                                                class="block"
                                            >
                                                <circle
                                                    cx="21" cy="21" :r="ringR"
                                                    fill="none" stroke="#e5e7eb" :stroke-width="ringStroke"
                                                />
                                                <circle
                                                    cx="21" cy="21" :r="ringR"
                                                    fill="none"
                                                    :stroke="(project.completion_percentage ?? 0) >= 100 ? '#10b981' : '#6366f1'"
                                                    :stroke-width="ringStroke"
                                                    stroke-linecap="round"
                                                    :stroke-dasharray="dashArray(project.completion_percentage)"
                                                    :transform="'rotate(-90 21 21)'"
                                                />
                                                <text x="21" y="22.5" text-anchor="middle" font-size="10" fill="#111827" font-weight="700">
                                                    {{ toInt(project.completion_percentage) }}%
                                                </text>
                                            </svg>
                                        </div>
                                    </div>

                                    <div class="mt-2 flex flex-wrap gap-2">
                                        <template v-for="chip in physicalChips(project)" :key="'phys-' + project.id + '-' + chip.label">
                                            <span
                                                class="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-800 font-medium"
                                            >
                                                <span class="font-bold">Physical:</span>
                                                <span class="font-normal">{{ chip.label }}</span>
                                                <span class="opacity-70 font-normal">· {{ chip.value }}</span>
                                            </span>
                                        </template>
                                        <template v-for="chip in financialChips(project)" :key="'fin-' + project.id + '-' + chip.label">
                                            <span
                                                class="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border border-amber-200 bg-amber-50 text-amber-800 font-medium"
                                            >
                                                <span class="font-bold">Financial:</span>
                                                <span class="font-normal">{{ chip.label }}</span>
                                                <span class="opacity-70 font-normal">· {{ chip.value }}</span>
                                            </span>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="text-center text-gray-500 bg-white rounded-2xl border-2 border-dashed border-gray-300 py-12 px-6 shadow-md">
                    <p class="font-semibold text-lg">No MHP projects to show.</p>
                </div>
            </section>

            <section>
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-2xl font-bold text-gray-900">Irrigation Schemes</h2>
                    <span class="text-sm font-medium text-gray-600 bg-white px-3 py-1.5 rounded-full shadow-sm">{{ irrigation_projects?.length || 0 }} project(s)</span>
                </div>

                <div v-if="Object.keys(groupedIrrigation).length" class="space-y-4">
                    <div
                        v-for="(items, key) in groupedIrrigation"
                        :key="'irr-' + key"
                        class="bg-white rounded-xl shadow-md border border-gray-200 transition-all duration-300 overflow-hidden"
                    >
                        <button
                            class="w-full flex items-center justify-between p-5 bg-gray-100 hover:bg-gray-200 transition-colors"
                            @click="toggle('irrigation', key)"
                        >
                            <div class="flex items-center gap-3">
                                <span class="font-bold text-lg text-gray-800">{{ key }}</span>
                                <span class="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded-full shadow-inner">
                                    {{ items.length }} project{{ items.length > 1 ? 's' : '' }}
                                </span>
                            </div>
                            <svg
                                class="h-5 w-5 text-gray-500 transition-transform duration-300"
                                :class="isOpen('irrigation', key) ? 'rotate-180' : ''"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <div v-show="isOpen('irrigation', key)" class="p-5 bg-white">
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                <div
                                    v-for="project in items"
                                    :key="'irr-item-' + project.id"
                                    class="relative p-5 bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:border-green-400 hover:shadow-lg"
                                >
                                    <div class="flex items-start justify-between mb-4">
                                        <div class="font-bold text-lg truncate pr-2 text-gray-900">{{ project.name }}</div>
                                        <div class="shrink-0">
                                            <svg
                                                :width="ringSize"
                                                :height="ringSize"
                                                viewBox="0 0 42 42"
                                                class="block"
                                            >
                                                <circle cx="21" cy="21" :r="ringR" fill="none" stroke="#e5e7eb" :stroke-width="ringStroke" />
                                                <circle
                                                    cx="21" cy="21" :r="ringR" fill="none"
                                                    :stroke="(project.completion_percentage ?? 0) >= 100 ? '#10b981' : '#6366f1'"
                                                    :stroke-width="ringStroke" stroke-linecap="round"
                                                    :stroke-dasharray="dashArray(project.completion_percentage)"
                                                    :transform="'rotate(-90 21 21)'"
                                                />
                                                <text x="21" y="22.5" text-anchor="middle" font-size="10" fill="#111827" font-weight="700">
                                                    {{ toInt(project.completion_percentage) }}%
                                                </text>
                                            </svg>
                                        </div>
                                    </div>

                                    <div class="mt-2 flex flex-wrap gap-2">
                                        <template v-for="chip in physicalChips(project, true)" :key="'physI-' + project.id + '-' + chip.label">
                                            <span
                                                class="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-800 font-medium"
                                            >
                                                <span class="font-bold">Physical:</span>
                                                <span class="font-normal">{{ chip.label }}</span>
                                                <span class="opacity-70 font-normal">· {{ chip.value }}</span>
                                            </span>
                                        </template>
                                        <template v-for="chip in financialChips(project, true)" :key="'finI-' + project.id + '-' + chip.label">
                                            <span
                                                class="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border border-amber-200 bg-amber-50 text-amber-800 font-medium"
                                            >
                                                <span class="font-bold">Financial:</span>
                                                <span class="font-normal">{{ chip.label }}</span>
                                                <span class="opacity-70 font-normal">· {{ chip.value }}</span>
                                            </span>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="text-center text-gray-500 bg-white rounded-2xl border-2 border-dashed border-gray-300 py-12 px-6 shadow-md">
                    <p class="font-semibold text-lg">No Irrigation projects to show.</p>
                </div>
            </section>
        </div>
    </AppLayout>
</template>

<script setup>
import { ref, reactive, computed, watchEffect } from 'vue'
import AppLayout from '@/Layouts/AppLayout.vue'

const props = defineProps({
    stats: { type: Object, default: () => ({}) },
    mhp_projects: { type: Array, default: () => [] },
    irrigation_projects: { type: Array, default: () => [] },
})

/* ---------- Stats rendering ---------- */
function formatNumber(n) {
    if (n == null) return '0'
    const num = Number(n)
    if (Number.isNaN(num)) return String(n)
    return new Intl.NumberFormat().format(num)
}
const statItems = computed(() => ([
    { title: 'MHPs Approved', value: props.stats?.total_mhps_approved ?? 0 },
    { title: 'MHPs Completed', value: props.stats?.total_mhps_completed ?? 0 },
    { title: 'Irrigation Approved', value: props.stats?.total_irrigation_systems_approved ?? 0 },
    { title: 'Irrigation Completed', value: props.stats?.total_irrigation_systems_completed ?? 0 },
    { title: 'CBO Dialogues', value: props.stats?.total_cbo_dialogues ?? 0 },
    { title: 'CBOs Formed', value: props.stats?.total_cbos_formed ?? 0 },
    { title: 'O&M Trainings', value: props.stats?.total_om_training ?? 0 },
    { title: 'Safe Use Trainings', value: props.stats?.total_safe_use_training ?? 0 },
    { title: 'Capacity Installed (kW)', value: props.stats?.total_capacity_installed ?? 0, formatted: String(props.stats?.total_capacity_installed ?? 0) },
    { title: 'Operational Cost (₨)', value: props.stats?.total_operational_cost ?? 0, formatted: formatNumber(props.stats?.total_operational_cost ?? 0) },
    { title: 'Initiated MHPs', value: props.stats?.total_initiated_mhps ?? 0 },
]))

/* ---------- Grouping ---------- */
const groupBy = ref('cbo') // 'cbo' | 'district'
const open = reactive({
    mhp: new Set(),
    irrigation: new Set(),
})

function cboFromName(name) {
    if (!name) return 'Unknown CBO'
    const idx = String(name).indexOf(' - ')
    return idx >= 0 ? name.slice(0, idx) : String(name)
}

function resolveKey(project) {
    if (groupBy.value === 'district') {
        return project?.district || project?.cbo?.district || 'Unknown District'
    }
    return project?.cbo_reference_code || cboFromName(project?.name) || 'Unknown CBO'
}

function groupByKey(items = []) {
    const out = {}
    for (const it of items) {
        const k = resolveKey(it)
        if (!out[k]) out[k] = []
        out[k].push(it)
    }
    const sorted = {}
    Object.keys(out).sort((a, b) => a.localeCompare(b)).forEach(k => {
        sorted[k] = out[k].slice().sort((a, b) => String(a.name).localeCompare(String(b.name)))
    })
    return sorted
}

const groupedMhp = computed(() => groupByKey(props.mhp_projects))
const groupedIrrigation = computed(() => groupByKey(props.irrigation_projects))

function isOpen(scheme, key) {
    return open[scheme].has(key)
}
function toggle(scheme, key) {
    if (open[scheme].has(key)) open[scheme].delete(key)
    else open[scheme].add(key)
}
function expandAll() {
    Object.keys(groupedMhp.value).forEach(k => open.mhp.add(k))
    Object.keys(groupedIrrigation.value).forEach(k => open.irrigation.add(k))
}
function collapseAll() {
    open.mhp.clear()
    open.irrigation.clear()
}
watchEffect(() => {
    open.mhp.clear()
    open.irrigation.clear()
    Object.keys(groupedMhp.value).slice(0, 3).forEach(k => open.mhp.add(k))
    Object.keys(groupedIrrigation.value).slice(0, 3).forEach(k => open.irrigation.add(k))
})

/* ---------- Donut graph helpers ---------- */
const ringR = 18
const ringStroke = 4
const ringC = 2 * Math.PI * ringR
const ringSize = 42
function clamp01(v) {
    const n = Number(v ?? 0)
    if (!isFinite(n) || n < 0) return 0
    if (n > 100) return 100
    return n
}
function dashArray(pct) {
    const p = clamp01(pct)
    const filled = (p / 100) * ringC
    return `${filled} ${ringC}`
}

/* ---------- Chips helpers (hide zeroes) ---------- */
const labelMap = { overall: 'Overall', mhp: 'MHP', eme: 'EME', tnd: 'T&D' }
function toInt(n) {
    const x = Number(n ?? 0)
    return isNaN(x) ? 0 : Math.round(x)
}
function toPct(n) {
    const x = Number(n ?? 0)
    if (!isFinite(x) || x <= 0) return '0%'
    return `${Math.round(x)}%`
}
function hasValue(n) {
    const x = Number(n ?? 0)
    return isFinite(x) && x > 0
}
function physicalChips(project, irrigationOnly = false) {
    const m = project?.metrics?.physical || {}
    const keys = irrigationOnly ? ['overall'] : ['overall', 'mhp', 'eme', 'tnd']
    const chips = []
    for (const k of keys) {
        const v = m[k]
        if (hasValue(v)) chips.push({ label: labelMap[k] ?? k, value: toPct(v) })
    }
    return chips
}
function financialChips(project, irrigationOnly = false) {
    const m = project?.metrics?.financial || {}
    const keys = irrigationOnly ? ['overall'] : ['overall', 'mhp', 'eme', 'tnd']
    const chips = []
    for (const k of keys) {
        const v = m[k]
        if (hasValue(v)) chips.push({ label: labelMap[k] ?? k, value: toPct(v) })
    }
    return chips
}
</script>

<style scoped>
/* Scoped styles for subtle animations and polished look */
.chip {
    transition: all 0.2s ease-in-out;
}
.chip:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
.progress-ring__circle {
    transition: stroke-dasharray 0.5s ease-out;
}
</style>

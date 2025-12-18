<template>
    <AppLayout>
        <div class="space-y-10 p-6 sm:p-8 bg-background-light min-h-screen text-gray-900">

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                <div
                    v-for="s in statItems"
                    :key="s.title"
                    class="card flex items-center gap-4 p-5 sm:p-6"
                >
                    <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                        <span class="material-symbols-outlined">insights</span>
                    </div>
                    <div class="space-y-1">
                        <p class="text-xs uppercase tracking-wide text-gray-500">{{ s.title }}</p>
                        <p class="text-2xl font-bold text-gray-900">{{ s.formatted ?? s.value }}</p>
                    </div>
                </div>
            </div>

            <div class="card p-5 sm:p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div class="flex items-center gap-3">
                    <span class="text-sm font-semibold text-gray-700">Group by</span>
                    <select v-model="groupBy" class="rounded-full border-gray-200 bg-white px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-primary focus:border-primary">
                        <option value="cbo">CBO</option>
                        <option value="district">District</option>
                    </select>
                </div>
                <div class="flex flex-wrap items-center gap-3">
                    <button @click="expandAll" class="btn-secondary rounded-full px-4 py-2 text-sm">
                        <span class="material-symbols-outlined text-base">unfold_more</span>
                        Expand all
                    </button>
                    <button @click="collapseAll" class="btn-secondary rounded-full px-4 py-2 text-sm">
                        <span class="material-symbols-outlined text-base">unfold_less</span>
                        Collapse all
                    </button>
                </div>
            </div>

            <section class="space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h2 class="text-2xl font-bold text-gray-900">MHP Schemes</h2>
                    <span class="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm border border-gray-200">
                        {{ mhp_projects?.length || 0 }} project(s)
                    </span>
                </div>

                <div v-if="Object.keys(groupedMhp).length" class="space-y-4">
                    <div
                        v-for="(items, key) in groupedMhp"
                        :key="'mhp-' + key"
                        class="card overflow-hidden"
                    >
                        <button
                            class="w-full flex items-center justify-between px-5 py-4 bg-primary/5 text-left hover:bg-primary/10 transition"
                            @click="toggle('mhp', key)"
                        >
                            <div class="flex items-center gap-3">
                                <span class="text-lg font-semibold text-gray-900">{{ key }}</span>
                                <span class="text-xs font-semibold text-primary bg-white px-3 py-1 rounded-full border border-primary/30">
                                    {{ items.length }} project{{ items.length > 1 ? 's' : '' }}
                                </span>
                            </div>
                            <span class="material-symbols-outlined text-gray-600 transition" :class="isOpen('mhp', key) ? 'rotate-180' : ''">
                                expand_more
                            </span>
                        </button>

                        <div v-show="isOpen('mhp', key)" class="p-5">
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div
                                    v-for="project in items"
                                    :key="'mhp-item-' + project.id"
                                    class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:border-primary/50 hover:shadow-lg transition"
                                >
                                    <div class="flex items-start justify-between gap-3">
                                        <div class="space-y-1">
                                            <p class="text-base font-semibold text-gray-900 truncate">{{ project.name }}</p>
                                            <p class="text-xs text-gray-500">Progress overview</p>
                                        </div>
                                        <svg
                                            :width="ringSize"
                                            :height="ringSize"
                                            viewBox="0 0 42 42"
                                            class="shrink-0"
                                        >
                                            <circle cx="21" cy="21" :r="ringR" fill="none" stroke="#e5e7eb" :stroke-width="ringStroke" />
                                            <circle
                                                cx="21" cy="21" :r="ringR"
                                                fill="none"
                                                :stroke="(project.completion_percentage ?? 0) >= 100 ? '#11d45f' : '#2563eb'"
                                                :stroke-width="ringStroke"
                                                stroke-linecap="round"
                                                :stroke-dasharray="dashArray(project.completion_percentage)"
                                                :transform="'rotate(-90 21 21)'"
                                            />
                                            <text x="21" y="22.5" text-anchor="middle" font-size="10" fill="#0f172a" font-weight="700">
                                                {{ toInt(project.completion_percentage) }}%
                                            </text>
                                        </svg>
                                    </div>

                                    <div class="mt-3 flex flex-wrap gap-2">
                                        <template v-for="chip in physicalChips(project)" :key="'phys-' + project.id + '-' + chip.label">
                                            <span class="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                                <span>Physical</span>
                                                <span class="text-gray-700">{{ chip.label }}</span>
                                                <span class="text-gray-500">· {{ chip.value }}</span>
                                            </span>
                                        </template>
                                        <template v-for="chip in financialChips(project)" :key="'fin-' + project.id + '-' + chip.label">
                                            <span class="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                                                <span>Financial</span>
                                                <span class="text-gray-700">{{ chip.label }}</span>
                                                <span class="text-gray-500">· {{ chip.value }}</span>
                                            </span>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="card text-center py-10">
                    <p class="font-semibold text-lg">No MHP projects to show.</p>
                    <p class="text-sm text-gray-500">Check your filters or grouping.</p>
                </div>
            </section>

            <section class="space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h2 class="text-2xl font-bold text-gray-900">Irrigation Schemes</h2>
                    <span class="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm border border-gray-200">
                        {{ irrigation_projects?.length || 0 }} project(s)
                    </span>
                </div>

                <div v-if="Object.keys(groupedIrrigation).length" class="space-y-4">
                    <div
                        v-for="(items, key) in groupedIrrigation"
                        :key="'irr-' + key"
                        class="card overflow-hidden"
                    >
                        <button
                            class="w-full flex items-center justify-between px-5 py-4 bg-primary/5 text-left hover:bg-primary/10 transition"
                            @click="toggle('irrigation', key)"
                        >
                            <div class="flex items-center gap-3">
                                <span class="text-lg font-semibold text-gray-900">{{ key }}</span>
                                <span class="text-xs font-semibold text-primary bg-white px-3 py-1 rounded-full border border-primary/30">
                                    {{ items.length }} project{{ items.length > 1 ? 's' : '' }}
                                </span>
                            </div>
                            <span class="material-symbols-outlined text-gray-600 transition" :class="isOpen('irrigation', key) ? 'rotate-180' : ''">
                                expand_more
                            </span>
                        </button>

                        <div v-show="isOpen('irrigation', key)" class="p-5">
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div
                                    v-for="project in items"
                                    :key="'irr-item-' + project.id"
                                    class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:border-primary/50 hover:shadow-lg transition"
                                >
                                    <div class="flex items-start justify-between gap-3">
                                        <div class="space-y-1">
                                            <p class="text-base font-semibold text-gray-900 truncate">{{ project.name }}</p>
                                            <p class="text-xs text-gray-500">Progress overview</p>
                                        </div>
                                        <svg
                                            :width="ringSize"
                                            :height="ringSize"
                                            viewBox="0 0 42 42"
                                            class="shrink-0"
                                        >
                                            <circle cx="21" cy="21" :r="ringR" fill="none" stroke="#e5e7eb" :stroke-width="ringStroke" />
                                            <circle
                                                cx="21" cy="21" :r="ringR" fill="none"
                                                :stroke="(project.completion_percentage ?? 0) >= 100 ? '#11d45f' : '#2563eb'"
                                                :stroke-width="ringStroke" stroke-linecap="round"
                                                :stroke-dasharray="dashArray(project.completion_percentage)"
                                                :transform="'rotate(-90 21 21)'"
                                            />
                                            <text x="21" y="22.5" text-anchor="middle" font-size="10" fill="#0f172a" font-weight="700">
                                                {{ toInt(project.completion_percentage) }}%
                                            </text>
                                        </svg>
                                    </div>

                                    <div class="mt-3 flex flex-wrap gap-2">
                                        <template v-for="chip in physicalChips(project, true)" :key="'physI-' + project.id + '-' + chip.label">
                                            <span class="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                                <span>Physical</span>
                                                <span class="text-gray-700">{{ chip.label }}</span>
                                                <span class="text-gray-500">· {{ chip.value }}</span>
                                            </span>
                                        </template>
                                        <template v-for="chip in financialChips(project, true)" :key="'finI-' + project.id + '-' + chip.label">
                                            <span class="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                                                <span>Financial</span>
                                                <span class="text-gray-700">{{ chip.label }}</span>
                                                <span class="text-gray-500">· {{ chip.value }}</span>
                                            </span>
                                        </template>
                                    </div>

                                    <p class="mt-2 text-xs text-gray-500 italic">Showing overall Physical & Financial only.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="card text-center py-10">
                    <p class="font-semibold text-lg">No Irrigation projects to show.</p>
                    <p class="text-sm text-gray-500">Check your filters or grouping.</p>
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
const ringSize = 60
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
/* Custom style for a subtle pulsating effect on hover */
@keyframes pulse-light {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.02);
    }
}

.animate-pulse-on-hover:hover {
    animation: pulse-light 0.5s ease-in-out infinite;
}
</style>

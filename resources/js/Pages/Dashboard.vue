<template>
    <AppLayout>
        <div class="space-y-8 p-6 sm:p-8 bg-paper-50/50 min-h-screen text-ink-900 font-sans antialiased">

            <!-- Bright & Colorful Stats Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                <div
                    v-for="s in statItems"
                    :key="s.title"
                    class="bg-surface border rounded-2xl p-5 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 flex items-center gap-4 group"
                    :class="statIcons[s.title]?.border || 'border-paper-200'"
                >
                    <div class="flex h-12 w-12 items-center justify-center rounded-xl shrink-0 transition-transform group-hover:scale-110 duration-200" :class="statIcons[s.title]?.bg || 'bg-paper-100'">
                        <span class="material-symbols-outlined text-2xl" :class="statIcons[s.title]?.text || 'text-ink-600'">
                            {{ statIcons[s.title]?.icon || 'insights' }}
                        </span>
                    </div>
                    <div class="space-y-0.5">
                        <p class="text-[10px] font-extrabold uppercase tracking-widest text-ink-400">{{ s.title }}</p>
                        <p class="text-2xl font-black text-ink-900 tracking-tight">{{ s.formatted ?? s.value }}</p>
                    </div>
                </div>
            </div>

            <!-- Group & Collapse Control panel -->
            <div class="bg-surface border border-paper-200 rounded-2xl p-4 sm:p-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between shadow-sm">
                <div class="flex items-center gap-3">
                    <span class="text-xs font-bold text-ink-500 uppercase tracking-wider">Group projects by</span>
                    <div class="relative">
                        <select v-model="groupBy" class="appearance-none rounded-full border border-paper-200 bg-paper-50/50 pl-4 pr-10 py-1.5 text-xs font-bold text-ink-700 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors">
                            <option value="cbo">CBO</option>
                            <option value="district">District</option>
                        </select>
                        <span class="material-symbols-outlined text-ink-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-base">expand_more</span>
                    </div>
                </div>
                <div class="flex flex-wrap items-center gap-2">
                    <button @click="expandAll" class="inline-flex items-center gap-1.5 px-4 py-2 bg-surface hover:bg-paper-50 border border-paper-200 rounded-full text-xs font-bold text-ink-600 shadow-sm transition">
                        <span class="material-symbols-outlined text-base">unfold_more</span>
                        Expand all
                    </button>
                    <button @click="collapseAll" class="inline-flex items-center gap-1.5 px-4 py-2 bg-surface hover:bg-paper-50 border border-paper-200 rounded-full text-xs font-bold text-ink-600 shadow-sm transition">
                        <span class="material-symbols-outlined text-base">unfold_less</span>
                        Collapse all
                    </button>
                </div>
            </div>

            <!-- MHP Projects Section -->
            <section class="space-y-4">
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-black text-ink-900 flex items-center gap-2">
                        <span class="material-symbols-outlined text-hydro-600">electric_bolt</span>
                        MHP Schemes
                    </h2>
                    <span class="inline-flex items-center rounded-full bg-hydro-50 border border-hydro-200 px-3 py-1 text-xs font-extrabold text-hydro-700 shadow-sm">
                        {{ mhp_projects?.length || 0 }} project(s)
                    </span>
                </div>

                <div v-if="Object.keys(groupedMhp).length" class="space-y-4">
                    <div
                        v-for="(items, key) in groupedMhp"
                        :key="'mhp-' + key"
                        class="bg-surface border border-ink-200 rounded-2xl shadow-sm overflow-hidden"
                    >
                        <button
                            class="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-hydro-500/5 to-hydro-600/5 text-left hover:from-hydro-500/10 hover:to-hydro-600/10 transition-all duration-150"
                            @click="toggle('mhp', key)"
                        >
                            <div class="flex items-center gap-3">
                                <span class="text-sm font-extrabold text-ink-800 tracking-tight">{{ key }}</span>
                                <span class="text-[10px] font-black text-hydro-700 bg-surface border border-hydro-200/50 px-2.5 py-0.5 rounded-full shadow-sm">
                                    {{ items.length }} project{{ items.length > 1 ? 's' : '' }}
                                </span>
                            </div>
                            <span class="material-symbols-outlined text-hydro-600 transition-transform duration-200" :class="isOpen('mhp', key) ? 'rotate-180' : ''">
                                expand_more
                            </span>
                        </button>

                        <div v-show="isOpen('mhp', key)" class="p-5 border-t border-ink-100 bg-surface/50">
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div
                                    v-for="project in items"
                                    :key="'mhp-item-' + project.id"
                                    class="rounded-xl border border-ink-200 bg-surface p-5 shadow-sm hover:border-hydro-300 hover:shadow-lg hover:shadow-hydro-50/20 transition-all duration-200"
                                >
                                    <div class="flex items-start justify-between gap-3">
                                        <div class="space-y-1">
                                            <p class="text-sm font-black text-ink-900 tracking-tight leading-tight">{{ project.name }}</p>
                                            <p class="text-[11px] font-semibold text-ink-400 uppercase tracking-wider">MHP Scheme</p>
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
                                                :stroke="(project.completion_percentage ?? 0) >= 100 ? '#10b981' : '#0ea5e9'"
                                                :stroke-width="ringStroke"
                                                stroke-linecap="round"
                                                :stroke-dasharray="dashArray(project.completion_percentage)"
                                                :transform="'rotate(-90 21 21)'"
                                            />
                                            <text x="21" y="24" text-anchor="middle" font-size="9" fill="#0f172a" font-weight="900">
                                                {{ toInt(project.completion_percentage) }}%
                                            </text>
                                        </svg>
                                    </div>

                                    <div class="mt-4 flex flex-wrap gap-1.5">
                                        <template v-for="chip in physicalChips(project)" :key="'phys-' + project.id + '-' + chip.label">
                                            <span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 shadow-sm">
                                                <span class="opacity-80">Phys: {{ chip.label }}</span>
                                                <span class="font-extrabold text-emerald-900">{{ chip.value }}</span>
                                            </span>
                                        </template>
                                        <template v-for="chip in financialChips(project)" :key="'fin-' + project.id + '-' + chip.label">
                                            <span class="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 shadow-sm">
                                                <span class="opacity-80">Fin: {{ chip.label }}</span>
                                                <span class="font-extrabold text-amber-900">{{ chip.value }}</span>
                                            </span>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="bg-surface border border-ink-200 border-dashed rounded-2xl text-center py-10">
                    <p class="font-bold text-ink-500">No MHP projects to show.</p>
                </div>
            </section>

            <!-- Irrigation Schemes Section -->
            <section class="space-y-4">
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-black text-ink-900 flex items-center gap-2">
                        <span class="material-symbols-outlined text-irrigation-600">water_drop</span>
                        Irrigation Schemes
                    </h2>
                    <span class="inline-flex items-center rounded-full bg-irrigation-50 border border-irrigation-200 px-3 py-1 text-xs font-extrabold text-irrigation-700 shadow-sm">
                        {{ irrigation_projects?.length || 0 }} project(s)
                    </span>
                </div>

                <div v-if="Object.keys(groupedIrrigation).length" class="space-y-4">
                    <div
                        v-for="(items, key) in groupedIrrigation"
                        :key="'irr-' + key"
                        class="bg-surface border border-ink-200 rounded-2xl shadow-sm overflow-hidden"
                    >
                        <button
                            class="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-irrigation-500/5 to-irrigation-600/5 text-left hover:from-irrigation-500/10 hover:to-irrigation-600/10 transition-all duration-150"
                            @click="toggle('irrigation', key)"
                        >
                            <div class="flex items-center gap-3">
                                <span class="text-sm font-extrabold text-ink-800 tracking-tight">{{ key }}</span>
                                <span class="text-[10px] font-black text-irrigation-700 bg-surface border border-irrigation-200/50 px-2.5 py-0.5 rounded-full shadow-sm">
                                    {{ items.length }} project{{ items.length > 1 ? 's' : '' }}
                                </span>
                            </div>
                            <span class="material-symbols-outlined text-irrigation-600 transition-transform duration-200" :class="isOpen('irrigation', key) ? 'rotate-180' : ''">
                                expand_more
                            </span>
                        </button>

                        <div v-show="isOpen('irrigation', key)" class="p-5 border-t border-ink-100 bg-surface/50">
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div
                                    v-for="project in items"
                                    :key="'irr-item-' + project.id"
                                    class="rounded-xl border border-ink-200 bg-surface p-5 shadow-sm hover:border-irrigation-300 hover:shadow-lg hover:shadow-irrigation-50/20 transition-all duration-200"
                                >
                                    <div class="flex items-start justify-between gap-3">
                                        <div class="space-y-1">
                                            <p class="text-sm font-black text-ink-900 tracking-tight leading-tight">{{ project.name }}</p>
                                            <p class="text-[11px] font-semibold text-ink-400 uppercase tracking-wider">Irrigation Scheme</p>
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
                                                :stroke="(project.completion_percentage ?? 0) >= 100 ? '#10b981' : '#0ea5e9'"
                                                :stroke-width="ringStroke" stroke-linecap="round"
                                                :stroke-dasharray="dashArray(project.completion_percentage)"
                                                :transform="'rotate(-90 21 21)'"
                                            />
                                            <text x="21" y="24" text-anchor="middle" font-size="9" fill="#0f172a" font-weight="900">
                                                {{ toInt(project.completion_percentage) }}%
                                            </text>
                                        </svg>
                                    </div>

                                    <div class="mt-4 flex flex-wrap gap-1.5">
                                        <template v-for="chip in physicalChips(project, true)" :key="'physI-' + project.id + '-' + chip.label">
                                            <span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 shadow-sm">
                                                <span class="opacity-80">Phys: {{ chip.label }}</span>
                                                <span class="font-extrabold text-emerald-900">{{ chip.value }}</span>
                                            </span>
                                        </template>
                                        <template v-for="chip in financialChips(project, true)" :key="'finI-' + project.id + '-' + chip.label">
                                            <span class="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 shadow-sm">
                                                <span class="opacity-80">Fin: {{ chip.label }}</span>
                                                <span class="font-extrabold text-amber-900">{{ chip.value }}</span>
                                            </span>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="bg-surface border border-ink-200 border-dashed rounded-2xl text-center py-10">
                    <p class="font-bold text-ink-500">No Irrigation projects to show.</p>
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

/* ---------- Stats rendering configuration with bright themes ---------- */
const statIcons = {
    'MHPs Approved': { icon: 'verified_user', bg: 'bg-hydro-500/10', text: 'text-hydro-600', border: 'border-hydro-200' },
    'MHPs Completed': { icon: 'task_alt', bg: 'bg-hydro-700/10', text: 'text-hydro-700', border: 'border-hydro-300' },
    'Irrigation Approved': { icon: 'water_drop', bg: 'bg-irrigation-500/10', text: 'text-irrigation-600', border: 'border-irrigation-200' },
    'Irrigation Completed': { icon: 'waves', bg: 'bg-irrigation-700/10', text: 'text-irrigation-700', border: 'border-irrigation-300' },
    'CBO Dialogues': { icon: 'forum', bg: 'bg-violet-500/10', text: 'text-violet-600', border: 'border-violet-200' },
    'CBOs Formed': { icon: 'group_add', bg: 'bg-fuchsia-500/10', text: 'text-fuchsia-600', border: 'border-fuchsia-200' },
    'O&M Trainings': { icon: 'build_circle', bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-200' },
    'Safe Use Trainings': { icon: 'health_and_safety', bg: 'bg-rose-500/10', text: 'text-rose-600', border: 'border-rose-200' },
    'Capacity Installed (kW)': { icon: 'bolt', bg: 'bg-yellow-500/10', text: 'text-yellow-600', border: 'border-yellow-200' },
    'Operational Cost (₨)': { icon: 'payments', bg: 'bg-orange-500/10', text: 'text-orange-600', border: 'border-orange-200' },
    'Initiated MHPs': { icon: 'rocket_launch', bg: 'bg-sky-500/10', text: 'text-sky-600', border: 'border-sky-200' }
};

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
const groupBy = ref('cbo')
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

function isOpen(sec, key) {
    return open[sec].has(key)
}

function toggle(sec, key) {
    if (open[sec].has(key)) {
        open[sec].delete(key)
    } else {
        open[sec].add(key)
    }
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
/* No extra overrides required */
</style>

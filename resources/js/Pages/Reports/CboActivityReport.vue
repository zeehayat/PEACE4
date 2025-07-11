<template>
    <div class="bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen p-8 font-sans antialiased text-gray-800">
        <header class="text-center mb-10">
            <h1 class="text-5xl font-extrabold text-indigo-800 tracking-tight leading-tight">CBO Activity Report</h1>
            <p class="text-xl text-gray-600 mt-2">Comprehensive Overview of Community Based Organizations' Engagements</p>
            <div class="mt-4 text-gray-500 text-sm">
                Generated: {{ new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
                at {{ new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }}
            </div>
        </header>

        <div class="bg-white shadow-lg rounded-xl p-6 mb-12 border border-gray-200">
            <h2 class="text-2xl font-semibold text-gray-700 mb-5 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                Filter Report Data
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                <input v-model="filters.reference_code" type="text" class="input-modern" placeholder="Reference Code" />
                <input v-model="filters.district" type="text" class="input-modern" placeholder="District" />
                <select v-model="filters.gender" class="input-modern">
                    <option value="">All Genders</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="mixed">Mixed</option>
                </select>
                <div class="relative">
                    <label for="from_date" class="absolute -top-2 left-3 text-xs text-gray-500 bg-white px-1">From Date</label>
                    <input id="from_date" v-model="filters.from" type="date" class="input-modern pt-4" />
                </div>
                <div class="relative">
                    <label for="to_date" class="absolute -top-2 left-3 text-xs text-gray-500 bg-white px-1">To Date</label>
                    <input id="to_date" v-model="filters.to" type="date" class="input-modern pt-4" />
                </div>
            </div>
            <div class="flex justify-end mt-7 space-x-3">
                <button @click="applyFilters" class="btn-primary-filled">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-funnel text-white mr-2"><path d="M6 3h12l-6 9v9H6z"/></svg>
                    Apply Filters
                </button>
                <button @click="exportCSV" class="btn-success-outline">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text text-green-700 mr-2"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
                    Export to CSV
                </button>
            </div>
        </div>

        <section v-if="cbos.length" class="space-y-10">
            <div v-for="cbo in cbos" :key="cbo.id" class="bg-white shadow-xl rounded-xl p-8 border border-gray-200 transform transition-all duration-300 hover:scale-[1.005] hover:shadow-2xl">
                <div class="flex items-center justify-between mb-4 border-b pb-4">
                    <h2 class="text-3xl font-extrabold text-indigo-700">CBO: {{ cbo.reference_code }}</h2>
                    <span class="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">ID: {{ cbo.id }}</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700 mb-6 text-base">
                    <div>
                        <strong class="text-gray-600">District:</strong> {{ cbo.district }}
                    </div>
                    <div>
                        <strong class="text-gray-600">Gender:</strong> {{ cbo.gender.charAt(0).toUpperCase() + cbo.gender.slice(1) }}
                    </div>
                    <div>
                        <strong class="text-gray-600">Formed:</strong> {{ cbo.date_of_formation }}
                    </div>
                </div>

                <div class="space-y-8 mt-6">

                    <div class="bg-blue-50/70 p-5 rounded-lg border border-blue-200">
                        <h3 class="text-xl font-bold text-blue-700 mb-3 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle"><path d="M7.9 20A9.9 9.9 0 1 0 4 16.1L2 22Z"/></svg>
                            CBO Dialogues
                        </h3>
                        <ul v-if="cbo.dialogues?.length" class="space-y-2 text-gray-700">
                            <li v-for="d in cbo.dialogues" :key="d.id" class="bg-blue-100/50 p-3 rounded-md flex items-center shadow-sm text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-days mr-2 text-blue-600 flex-shrink-0"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
                                <span class="font-medium text-blue-800">{{ d.date_of_dialogue }}</span> –
                                <span class="ml-1">{{ d.participants }} participants</span>
                            </li>
                        </ul>
                        <p v-else class="text-gray-500 italic p-3 text-center">No dialogues recorded for this CBO.</p>
                    </div>

                    <div class="bg-green-50/70 p-5 rounded-lg border border-green-200">
                        <h3 class="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-award"><circle cx="12" cy="8" r="7"/><path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.11"/></svg>
                            CBO Trainings
                        </h3>
                        <ul v-if="cbo.trainings?.length" class="space-y-2 text-gray-700">
                            <li v-for="t in cbo.trainings" :key="t.id" class="bg-green-100/50 p-3 rounded-md flex items-center shadow-sm text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-graduation-cap mr-2 text-green-600 flex-shrink-0"><path d="M21.43 14.7l-4.14 4.14a2.43 2.43 0 0 1-3.42 0L2.79 9.91a2.43 2.43 0 0 1 0-3.42l4.14-4.14a2.43 2.43 0 0 1 3.42 0l7.08 7.08a2.43 2.43 0 0 1 0 3.42ZM22.5 12.5 11.25 1.25"/><path d="M5.62 10.62 1.25 15.01"/><path d="M12.5 22.5 21.21 13.79"/><path d="M18.88 16.88 14.51 21.25"/></svg>
                                <span class="font-medium text-green-800">{{ t.training_type }}</span> –
                                <span class="ml-1">{{ t.total_participants }} participants</span>
                            </li>
                        </ul>
                        <p v-else class="text-gray-500 italic p-3 text-center">No trainings recorded for this CBO.</p>
                    </div>

                    <div class="bg-purple-50/70 p-5 rounded-lg border border-purple-200">
                        <h3 class="text-xl font-bold text-purple-700 mb-3 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-3.5 1.5L13 8 4.8 6.2c-.5-.1-1-.1-1.4.2L.4 7.5c-.3.3-.2.9.2 1.3L5.4 14l-2 2.5c-.3.5-.1 1.1.3 1.5.5.4 1.2.5 1.7.2L7.5 16l2.5 2c.7.6 1.7.7 2.6.5L19.2 17.8c.9-.9 1.2-2.2.4-3.1Z"/><path d="M10.95 20.84 12.22 17.5 15.5 16.22"/></svg>
                            CBO Exposure Visits
                        </h3>
                        <ul v-if="cbo.exposureVisits?.length" class="space-y-2 text-gray-700">
                            <li v-for="e in cbo.exposureVisits" :key="e.id" class="bg-purple-100/50 p-3 rounded-md flex items-center shadow-sm text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin mr-2 text-purple-600 flex-shrink-0"><path d="M12 2v20M18 6H6M22 18H2"/></svg>
                                <span class="font-medium text-purple-800">{{ e.date_of_visit }}</span> –
                                <span class="ml-1">{{ e.participants }} participants</span>
                            </li>
                        </ul>
                        <p v-else class="text-gray-500 italic p-3 text-center">No exposure visits recorded for this CBO.</p>
                    </div>
                </div>
            </div>
        </section>

        <section v-else class="bg-white shadow-lg rounded-xl p-8 text-center text-gray-500 text-lg">
            No CBO data found for the selected filters.
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
// Assuming Filter, MessageCircle, Award, Plane, CalendarDays, MapPin, FileText are available from lucide-vue-next
// If not, you'll need to import them:
// import { Filter, MessageCircle, Award, Plane, CalendarDays, MapPin, FileText, Funnel } from 'lucide-vue-next';
// For this example, I'm embedding the SVG directly to ensure it works even if you haven't explicitly imported each one.
// For a real application, importing them is better practice.

const props = defineProps({
    cbos: {
        type: Array,
        default: () => []
    },
    filters: {
        type: Object,
        default: () => ({})
    }
})

const filters = ref({
    reference_code: props.filters?.reference_code || '',
    district: props.filters?.district || '',
    gender: props.filters?.gender || '',
    from: props.filters?.from || '',
    to: props.filters?.to || '',
})

const applyFilters = () => {
    router.get(route('cbo.report'), filters.value, {
        preserveScroll: true,
        preserveState: true,
    })
}

const exportCSV = () => {
    // Ensure filters are passed correctly for the export
    const query = new URLSearchParams(filters.value).toString()
    // It's good practice to make this a named route if possible, like route('cbo.report.export')
    window.open(`/cbo/report/export?${query}`, '_blank')
}
</script>

<style scoped>
/* Base input styling for consistency */
.input-modern {
    @apply appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base transition-all duration-200 ease-in-out;
}

/* Primary Button with Fill */
.btn-primary-filled {
    @apply inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-base font-semibold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ease-in-out transform hover:scale-105;
}

/* Success Button with Outline */
.btn-success-outline {
    @apply inline-flex items-center justify-center px-6 py-2.5 border border-green-600 text-base font-semibold rounded-lg shadow-md text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 ease-in-out transform hover:scale-105;
}

/* Optional: Subtle animation on CBO cards */
section > div:hover {
    box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.1);
}
</style>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    cbo: {
        type: Object,
        required: true,
    },
});

// Helper to capitalize gender for display
const formattedGender = computed(() => {
    if (!props.cbo.gender) return 'N/A';
    return props.cbo.gender.charAt(0).toUpperCase() + props.cbo.gender.slice(1);
});

// --- NEW: Computed properties for Summary Statistics ---
const summaryStats = computed(() => {
    const cbo = props.cbo;

    // Dialogues
    const totalDialogues = cbo.dialogues?.length || 0;
    const totalDialogueParticipants = cbo.dialogues?.reduce((sum, d) => sum + (d.participants || 0), 0) || 0;

    // Trainings
    const totalTrainings = cbo.trainings?.length || 0;
    const totalTrainingParticipants = cbo.trainings?.reduce((sum, t) => sum + (t.total_participants || 0), 0) || 0;

    // Exposure Visits
    const totalExposureVisits = cbo.exposureVisits?.length || 0;
    const totalExposureParticipants = cbo.exposureVisits?.reduce((sum, e) => sum + (e.participants || 0), 0) || 0;

    return {
        dialogues: { count: totalDialogues, participants: totalDialogueParticipants },
        trainings: { count: totalTrainings, participants: totalTrainingParticipants },
        exposureVisits: { count: totalExposureVisits, participants: totalExposureParticipants },
        // You can add more derived stats here if needed, e.g., total activities
        totalActivities: totalDialogues + totalTrainings + totalExposureVisits,
        totalOverallParticipants: totalDialogueParticipants + totalTrainingParticipants + totalExposureParticipants,
    };
});
// --- END NEW: Computed properties for Summary Statistics ---


// Function to trigger print
const printReport = () => {
    window.print();
};
</script>

<template>
    <div class="p-4 md:p-8 bg-gray-50 print:p-0 print:m-0 print:shadow-none">
        <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-xl print:shadow-none print:rounded-none print:border-none">
            <div class="bg-indigo-700 text-white p-6 md:p-8 flex justify-between items-center print:bg-gray-100 print:text-gray-800 print:border-b-2 print:border-gray-300">
                <div>
                    <h1 class="text-3xl md:text-4xl font-extrabold mb-1">CBO Activity Report</h1>
                    <h2 class="text-xl md:text-2xl font-semibold">For: {{ cbo.reference_code }}</h2>
                </div>
                <button @click="printReport" class="btn-print hidden print:hidden lg:inline-flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-printer"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14H6.01"/><path d="M18 14H18.01"/><path d="M16 18H8m0-4h8"/></svg>
                    <span>Print Report</span>
                </button>
            </div>

            <div class="p-6 md:p-8">

                <section class="mb-8 border border-indigo-200 rounded-lg p-5 bg-indigo-50/70">
                    <h3 class="text-2xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-check"><path d="M10 2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 1 2 2v2"/><path d="M14.5 2.5L17.5 5.5"/><path d="M6 16V4a2 2 0 0 1 2-2h4L16 8v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><path d="m3 12 2 2 4-4"/></svg>
                        Activity Summary
                    </h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-lg text-gray-700">
                        <div class="summary-item">
                            <strong>Dialogues:</strong> {{ summaryStats.dialogues.count }}
                            <span class="text-sm text-gray-600">({{ summaryStats.dialogues.participants }} participants)</span>
                        </div>
                        <div class="summary-item">
                            <strong>Trainings:</strong> {{ summaryStats.trainings.count }}
                            <span class="text-sm text-gray-600">({{ summaryStats.trainings.participants }} participants)</span>
                        </div>
                        <div class="summary-item">
                            <strong>Exposure Visits:</strong> {{ summaryStats.exposureVisits.count }}
                            <span class="text-sm text-gray-600">({{ summaryStats.exposureVisits.participants }} participants)</span>
                        </div>
                        <div class="summary-item col-span-full border-t border-indigo-300 pt-2 mt-2">
                            <strong>Total Activities:</strong> {{ summaryStats.totalActivities }}
                        </div>
                        <div class="summary-item col-span-full">
                            <strong>Total Overall Participants:</strong> {{ summaryStats.totalOverallParticipants }}
                        </div>
                    </div>
                </section>
                <section class="mb-8 border border-gray-200 rounded-lg p-5 bg-gray-50">
                    <h3 class="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                        CBO Basic Information
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                        <p><strong>Reference Code:</strong> {{ cbo.reference_code }}</p>
                        <p><strong>District:</strong> {{ cbo.district }}</p>
                        <p><strong>Tehsil:</strong> {{ cbo.tehsil }}</p>
                        <p><strong>Village Council:</strong> {{ cbo.village_council }}</p>
                        <p><strong>Village:</strong> {{ cbo.village }}</p>
                        <p><strong>Date of Formation:</strong> {{ cbo.date_of_formation }}</p>
                        <p><strong>Total Members:</strong> {{ cbo.total_members }}</p>
                        <p><strong>Gender:</strong> {{ formattedGender }}</p>
                        <p><strong>President:</strong> {{ cbo.president_name }}</p>
                    </div>
                </section>

                <section class="mb-8 border border-blue-200 rounded-lg p-5 bg-blue-50/70">
                    <h3 class="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle"><path d="M7.9 20A9.9 9.9 0 1 0 4 16.1L2 22Z"/></svg>
                        CBO Dialogues
                    </h3>
                    <ul v-if="cbo.dialogues?.length" class="space-y-3">
                        <li v-for="dialogue in cbo.dialogues" :key="dialogue.id" class="bg-blue-100/50 p-4 rounded-md shadow-sm text-base">
                            <strong class="text-blue-800">{{ dialogue.date_of_dialogue }}</strong> –
                            {{ dialogue.participants }} participants
                            <div v-if="dialogue.media?.length" class="mt-2 text-sm text-gray-700">
                                <strong>Attachments:</strong>
                                <ul class="list-disc ml-5 space-y-1">
                                    <li v-for="mediaItem in dialogue.media" :key="mediaItem.id">
                                        <a :href="mediaItem.original_url" target="_blank" class="text-indigo-600 hover:underline">
                                            {{ mediaItem.file_name }} ({{ (mediaItem.size / 1024).toFixed(1) }} KB)
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    <p v-else class="text-gray-500 italic text-center p-3">No dialogues recorded for this CBO.</p>
                </section>

                <section class="mb-8 border border-green-200 rounded-lg p-5 bg-green-50/70">
                    <h3 class="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-award"><circle cx="12" cy="8" r="7"/><path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.11"/></svg>
                        CBO Trainings
                    </h3>
                    <ul v-if="cbo.trainings?.length" class="space-y-3">
                        <li v-for="training in cbo.trainings" :key="training.id" class="bg-green-100/50 p-4 rounded-md shadow-sm text-base">
                            <strong class="text-green-800">{{ training.training_type }}</strong> on
                            {{ training.date_of_training }} with {{ training.total_participants }} participants.
                            <div v-if="training.media?.length" class="mt-2 text-sm text-gray-700">
                                <strong>Attachments:</strong>
                                <ul class="list-disc ml-5 space-y-1">
                                    <li v-for="mediaItem in training.media" :key="mediaItem.id">
                                        <a :href="mediaItem.original_url" target="_blank" class="text-indigo-600 hover:underline">
                                            {{ mediaItem.file_name }} ({{ (mediaItem.size / 1024).toFixed(1) }} KB)
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    <p v-else class="text-gray-500 italic text-center p-3">No trainings recorded for this CBO.</p>
                </section>

                <section class="mb-8 border border-purple-200 rounded-lg p-5 bg-purple-50/70">
                    <h3 class="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-3.5 1.5L13 8 4.8 6.2c-.5-.1-1-.1-1.4.2L.4 7.5c-.3.3-.2.9.2 1.3L5.4 14l-2 2.5c-.3.5-.1 1.1.3 1.5.5.4 1.2.5 1.7.2L7.5 16l2.5 2c.7.6 1.7.7 2.6.5L19.2 17.8c.9-.9 1.2-2.2.4-3.1Z"/><path d="M10.95 20.84 12.22 17.5 15.5 16.22"/></svg>
                        CBO Exposure Visits
                    </h3>
                    <ul v-if="cbo.exposureVisits?.length" class="space-y-3">
                        <li v-for="visit in cbo.exposureVisits" :key="visit.id" class="bg-purple-100/50 p-4 rounded-md shadow-sm text-base">
                            <strong class="text-purple-800">{{ visit.date_of_visit }}</strong> –
                            {{ visit.participants }} participants in {{ visit.purpose_of_visit }}.
                            <div v-if="visit.media?.length" class="mt-2 text-sm text-gray-700">
                                <strong>Attachments:</strong>
                                <ul class="list-disc ml-5 space-y-1">
                                    <li v-for="mediaItem in visit.media" :key="mediaItem.id">
                                        <a :href="mediaItem.original_url" target="_blank" class="text-indigo-600 hover:underline">
                                            {{ mediaItem.file_name }} ({{ (mediaItem.size / 1024).toFixed(1) }} KB)
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    <p v-else class="text-gray-500 italic text-center p-3">No exposure visits recorded for this CBO.</p>
                </section>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Print Button Styling (only visible on screen, hidden when printing) */
.btn-print {
    @apply px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
    transition-colors duration-200;
}

/* Custom Print-specific styles */
@media print {
    /* Hide everything on the body by default, except the main content area */
    body * {
        visibility: hidden;
    }

    /* Make the main report container and its direct children visible */
    .max-w-4xl, /* The main report wrapper */
    .max-w-4xl * { /* And all its children */
        visibility: visible !important;
    }

    /* Ensure the main report container takes full width on print */
    .max-w-4xl {
        width: 100% !important; /* Ensure the report takes full width on print */
        max-width: 100% !important;
        margin: 0 !important; /* Override mx-auto if it's causing issues */
        box-shadow: none !important; /* Remove shadows */
        border-radius: 0 !important; /* Remove rounded corners */
        border: none !important; /* Remove borders */
        padding: 0 !important; /* Remove padding from the main wrapper */
    }

    /* Ensure background colors for sections/headers are respected */
    .bg-indigo-700, .bg-gray-50, .bg-blue-50\/70, .bg-green-50\/70, .bg-purple-50\/70,
    .bg-blue-100\/50, .bg-green-100\/50, .bg-purple-100\/50 {
        -webkit-print-color-adjust: exact; /* For WebKit browsers (Chrome, Safari) */
        print-color-adjust: exact; /* Corrected: Standard property */
    }

    /* Ensure text colors are maintained */
    .text-white {
        color: black !important; /* Or a darker color for print readability */
    }
    .text-indigo-700, .text-blue-700, .text-green-700, .text-purple-700,
    .text-blue-800, .text-green-800, .text-purple-800 {
        color: inherit !important; /* Or set to a specific dark color */
    }

    /* Ensure specific elements are hidden (like the print button) */
    .btn-print,
    .hidden.print\:hidden.lg\:inline-flex { /* This targets the print button */
        display: none !important;
    }

    /* Optional: Ensure attachment links are readable in print */
    a {
        text-decoration: underline !important;
        color: #1a0dab !important; /* Standard blue for links */
    }
}
</style>

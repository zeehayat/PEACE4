<template>
    <div class="max-w-3xl mx-auto p-4">
        <h2 class="text-xl font-bold text-gray-800 mb-4">
            Details for {{ cbo.reference_code }}
        </h2>

        <div class="space-y-6">
            <!-- Dialogues -->
            <div>
                <h3 class="text-lg font-semibold text-blue-700">Dialogues</h3>
                <ul v-if="dialogues.length" class="list-disc list-inside mt-2 text-sm text-gray-700">
                    <li v-for="dialogue in dialogues" :key="dialogue.id">
                        <span class="font-medium">Date:</span> {{ dialogue.date_of_dialogue }} |
                        <span class="font-medium">Participants:</span> {{ dialogue.participants }}
                    </li>
                </ul>
                <p v-else class="text-gray-500 text-sm">No dialogues found.</p>
            </div>

            <!-- Trainings -->
            <div>
                <h3 class="text-lg font-semibold text-green-700">Trainings</h3>
                <ul v-if="trainings.length" class="list-disc list-inside mt-2 text-sm text-gray-700">
                    <li v-for="training in trainings" :key="training.id">
                        <span class="font-medium">Date:</span> {{ training.date_of_training }} |
                        <span class="font-medium">Type:</span> {{ training.training_type }} |
                        <span class="font-medium">Gender:</span> {{ training.training_gender }}
                    </li>
                </ul>
                <p v-else class="text-gray-500 text-sm">No trainings found.</p>
            </div>

            <!-- Exposure Visits -->
            <div>
                <h3 class="text-lg font-semibold text-purple-700">Exposure Visits</h3>
                <ul v-if="exposures.length" class="list-disc list-inside mt-2 text-sm text-gray-700">
                    <li v-for="visit in exposures" :key="visit.id">
                        <span class="font-medium">Date:</span> {{ visit.date_of_visit }} |
                        <span class="font-medium">Participants:</span> {{ visit.participants }}
                    </li>
                </ul>
                <p v-else class="text-gray-500 text-sm">No exposure visits found.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    cbo: Object,
    dialogues: Array,
    trainings: Array,
    exposures: Array,
})
</script>

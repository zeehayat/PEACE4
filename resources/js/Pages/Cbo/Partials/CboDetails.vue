<template>
    <div class="p-4 space-y-6">
        <h2 class="text-xl font-bold text-gray-800">CBO Details - {{ cbo.reference_code }}</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div><strong>District:</strong> {{ cbo.district }}</div>
            <div><strong>Tehsil:</strong> {{ cbo.tehsil }}</div>
            <div><strong>VC:</strong> {{ cbo.village_council }}</div>
            <div><strong>Village:</strong> {{ cbo.village }}</div>
            <div><strong>Date of Formation:</strong> {{ cbo.date_of_formation }}</div>
            <div><strong>Gender:</strong> {{ cbo.gender }}</div>
            <div><strong>President:</strong> {{ cbo.president_name }}</div>
            <div><strong>Contact:</strong> {{ cbo.president_contact }}</div>
        </div>

        <div v-if="cbo.dialogues?.length">
            <h3 class="text-lg font-semibold text-gray-700">Dialogues</h3>
            <ul>
                <li v-for="d in cbo.dialogues" :key="d.id">{{ d.date_of_dialogue }} — {{ d.participants }} Participants</li>
            </ul>
        </div>

        <div v-if="cbo.trainings?.length">
            <h3 class="text-lg font-semibold text-gray-700">Trainings</h3>
            <ul>
                <li v-for="t in cbo.trainings" :key="t.id">{{ t.date_of_training }} — {{ t.training_type }} — {{ t.total_participants }} Participants</li>
            </ul>
        </div>

        <div v-if="cbo.exposures?.length">
            <h3 class="text-lg font-semibold text-gray-700">Exposure Visits</h3>
            <ul>
                <li v-for="e in cbo.exposures" :key="e.id">{{ e.date_of_visit }} — {{ e.participants }} Participants</li>
            </ul>
        </div>

        <div v-if="cbo.attachments?.length">
            <h3 class="text-lg font-semibold text-gray-700">Attachments</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div v-for="file in cbo.attachments" :key="file.id" class="p-2 border rounded shadow-sm bg-white">
                    <div v-if="isImage(file.mime_type)">
                        <img :src="file.original_url" class="h-20 object-cover mx-auto" />
                        <a :href="file.original_url" target="_blank" class="text-blue-600 text-xs hover:underline">Download</a>
                    </div>
                    <div v-else>
                        <span>{{ file.name }}</span>
                        <a :href="file.original_url" target="_blank" class="text-blue-600 text-xs hover:underline">Download</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({ cbo: Object })

function isImage(mime) {
    return mime.startsWith('image/')
}
</script>

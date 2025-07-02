<template>
    <div class="p-4 space-y-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">
            CBO Details - {{ cbo.name }}
        </h2>

        <!-- Basic Info -->
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

        <!-- Dialogues -->
        <div v-if="cbo.dialogues?.length" class="mt-4">
            <h3 class="text-lg font-semibold text-gray-700 mb-2">Dialogues</h3>
            <ul class="list-disc list-inside text-sm text-gray-800">
                <li v-for="d in cbo.dialogues" :key="d.id">
                    {{ d.date_of_dialogue }} — {{ d.participants }} Participants
                </li>
            </ul>
        </div>

        <!-- Trainings -->
        <div v-if="cbo.trainings?.length" class="mt-4">
            <h3 class="text-lg font-semibold text-gray-700 mb-2">Trainings</h3>
            <ul class="list-disc list-inside text-sm text-gray-800">
                <li v-for="t in cbo.trainings" :key="t.id">
                    {{ t.date_of_training }} — {{ t.training_type }} — {{ t.total_participants }} Participants
                </li>
            </ul>
        </div>

        <!-- Exposure Visits -->
        <div v-if="cbo.exposures?.length" class="mt-4">
            <h3 class="text-lg font-semibold text-gray-700 mb-2">Exposure Visits</h3>
            <ul class="list-disc list-inside text-sm text-gray-800">
                <li v-for="e in cbo.exposures" :key="e.id">
                    {{ e.date_of_visit }} — {{ e.participants }} Participants
                </li>
            </ul>
        </div>

        <!-- Attachments -->
        <div v-if="cbo.attachments?.length" class="mt-6">
            <h3 class="text-lg font-semibold text-gray-700 mb-2">Attachments</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <div
                    v-for="file in cbo.attachments"
                    :key="file.id"
                    class="border rounded p-2 shadow-sm bg-white flex flex-col items-center text-center"
                >
                    <div v-if="isImage(file.mime_type)" class="w-full">
                        <img
                            :src="file.original_url"
                            alt="Attachment"
                            class="w-full h-32 object-cover rounded"
                        />
                        <a
                            :href="file.original_url"
                            target="_blank"
                            download
                            class="text-blue-600 text-sm mt-1 hover:underline"
                        >
                            Download
                        </a>
                    </div>

                    <div v-else class="flex flex-col items-center">
                        <component
                            :is="getFileIcon(file.mime_type)"
                            class="w-8 h-8 text-gray-500 mb-1"
                        />
                        <a
                            :href="file.original_url"
                            target="_blank"
                            download
                            class="text-blue-600 text-sm hover:underline truncate w-32"
                        >
                            {{ file.name }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { File, FileText, FileImage } from 'lucide-vue-next'

const props = defineProps({
    cbo: Object,
})

function isImage(mime) {
    return mime.startsWith('image/')
}

function getFileIcon(mime) {
    if (mime.includes('pdf')) return FileText
    if (mime.includes('word')) return FileText
    if (mime.startsWith('image/')) return FileImage
    return File
}
</script>

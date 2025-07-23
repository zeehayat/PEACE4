<template>
   <div class="flex place-content-center items-center">

    <form @submit.prevent="submit" class="space-y-6 md-p-5 bg-gray-400 shadow-2xl">
        <!-- CBO (read-only) -->
        <div>
            <label class="block text-sm font-medium">CBO</label>
            <input
                type="text"
                :value="cbo.reference_code"
                readonly
                class="mt-1 w-full bg-gray-100 border rounded px-3 py-2"
            />
            <input type="hidden" v-model="form.cbo_id" />
        </div>

        <!-- Date -->
        <div>
            <label class="block text-sm font-medium">Date of Dialogue</label>
            <input
                v-model="form.date_of_dialogue"
                type="date"
                class="mt-1 w-full border rounded px-3 py-2"
            />
            <div v-if="form.errors.date_of_dialogue" class="text-red-500 text-sm">{{ form.errors.date_of_dialogue }}</div>
        </div>

        <!-- Participants -->
        <div>
            <label class="block text-sm font-medium">Participants</label>
            <input
                v-model="form.participants"
                type="number"
                min="0"
                class="mt-1 w-full border rounded px-3 py-2"
            />
            <div v-if="form.errors.participants" class="text-red-500 text-sm">{{ form.errors.participants }}</div>
        </div>

        <!-- File Upload -->
        <div>
            <label class="block text-sm font-medium">Attachments</label>
            <FileUploader
                v-model="form.attachments"
                :existing-media="form.existing_attachments"
                :errors="form.errors.attachments"
                @remove-existing="removeExisting"
            />
        </div>

        <!-- Submit -->
        <div>
            <button :disabled="form.processing" type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Submit
            </button>
        </div>
    </form>
   </div>
</template>

<script setup>
import FileUploader from '@/Components/FormComponents/FileUploader.vue'

const props = defineProps({
    form: Object,
    cbo: Object,
    submit: Function,
})

function removeExisting(mediaId) {
    if (!props.form.removed_attachments) props.form.removed_attachments = []
    props.form.removed_attachments.push(mediaId)
}
</script>

<template>
    {{cbos}}
    <form @submit.prevent="submit" class="space-y-6">
        <!-- CBO Dropdown -->

        <div>
            <label class="block text-sm font-medium text-gray-700">CBO</label>
            <select v-model="form.cbo_id" class="mt-1 w-full border rounded px-3 py-2">
                <option value="">Select a CBO</option>
                <option v-for="cbo in cbos" :key="cbo.id" :value="cbo.id">
                    {{ cbo.reference_code }}
                </option>
            </select>
            <div v-if="form.errors.cbo_id" class="text-sm text-red-500">{{ form.errors.cbo_id }}</div>
        </div>

        <!-- Date of Visit -->
        <div>
            <label class="block text-sm font-medium">Date of Visit</label>
            <input v-model="form.date_of_visit" type="date" class="mt-1 w-full border rounded px-3 py-2" />
            <div v-if="form.errors.date_of_visit" class="text-red-500 text-sm">{{ form.errors.date_of_visit }}</div>
        </div>

        <!-- Attachments -->
        <div>
            <label class="block text-sm font-medium text-gray-700">Attachments</label>
            <FileUploader
                v-model="form.attachments"
                :existing-media="form.existing_attachments"
                :errors="form.errors.attachments"
                @remove-existing="removeExisting"
            />
        </div>

        <!-- Submit Button -->
        <div>
            <button
                type="submit"
                :disabled="form.processing"
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Submit
            </button>
        </div>
    </form>
</template>

<script setup>
import FileUploader from '@/Components/FormComponents/FileUploader.vue'

const props = defineProps({
    form: Object,
    cbos: Array,
    submit: Function,
})

function removeExisting(mediaId) {
    if (!props.form.removed_attachments) {
        props.form.removed_attachments = []
    }
    props.form.removed_attachments.push(mediaId)
}
</script>

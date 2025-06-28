<template>
    <div>
        <FilePond
            ref="pond"
            :files="initialPondFiles"
            :allow-multiple="multiple"
            :accepted-file-types="acceptedTypes"
            :max-file-size="maxFileSize"
            label-idle="Drag & Drop files or <span class='filepond--label-action'>Browse</span>"
            @updatefiles="onUpdateFiles"
        />
        <div v-if="errors?.length" class="text-red-500 text-sm mt-1">
            <div v-for="err in errors" :key="err">{{ err }}</div>
        </div>

        <div v-if="existingMedia?.length" class="mt-4 space-y-2">
            <h3 class="text-sm font-semibold mb-1">Existing Attachments</h3>
            <ul>
                <li v-for="file in existingMedia" :key="file.id" class="flex justify-between items-center bg-gray-100 px-3 py-2 rounded text-sm">
                    <a :href="file.original_url" target="_blank" class="text-blue-600 hover:underline">
                        {{ file.file_name }}
                    </a>
                    <button
                        type="button"
                        @click="$emit('remove-existing', file.id)"
                        class="text-red-600 hover:underline text-xs"
                    >
                        Delete
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'

const FilePond = vueFilePond(
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType,
    FilePondPluginFileValidateSize
)

const props = defineProps({
    modelValue: Array,
    existingMedia: {
        type: Array,
        default: () => []
    },
    errors: {
        type: Array,
        default: () => []
    },
    multiple: {
        type: Boolean,
        default: true
    },
    acceptedTypes: {
        type: Array,
        default: () => ['image/*', 'application/pdf']
    },
    maxFileSize: {
        type: String,
        default: '10MB'
    }
})

const emit = defineEmits(['update:modelValue', 'remove-existing'])

const initialPondFiles = props.modelValue.map(file => ({
    source: file,
    options: { type: 'local' }
}))

function onUpdateFiles(fileItems) {
    const files = fileItems.map(item => {
        if (item.file) return item.file
        return item.serverId || null
    }).filter(Boolean)

    emit('update:modelValue', files)
}
</script>

<script setup>
import { ref, watch } from 'vue'
import { router } from '@inertiajs/vue3'

// 🪄 import the factory function & plugins
import vueFilePond from 'vue-filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// 🔷 create the component
const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginFileValidateSize,
    FilePondPluginImagePreview
)

const props = defineProps({
    modelValue: Array, // two-way binding for new uploads
    existing: { type: Array, default: () => [] }, // already uploaded files
    multiple: { type: Boolean, default: true },
    acceptedFileTypes: { type: Array, default: () => ['image/*', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'] },
    maxFileSize: { type: String, default: '20MB' },
    label: { type: String, default: 'Attachments' }
})

const emit = defineEmits(['update:modelValue', 'removeExisting'])

const pondFiles = ref([])

watch(pondFiles, (newVal) => {
    emit('update:modelValue', newVal.map(file => file.file))
})
</script>

<template>
    <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">{{ label }}</label>

        <FilePond
            ref="pond"
            name="attachments"
            :allow-multiple="multiple"
            :accepted-file-types="acceptedFileTypes"
            :max-file-size="maxFileSize"
            label-idle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            class="mb-4"
            @updatefiles="pondFiles = $event"
        />


        <div v-if="existing.length" class="mt-4">
            <h4 class="text-sm font-medium text-gray-700 mb-1">Existing Attachments:</h4>
            <ul class="space-y-1">
                <li
                    v-for="file in existing"
                    :key="file.id"
                    class="flex justify-between items-center bg-gray-50 rounded px-2 py-1"
                >
                    <a :href="file.url" target="_blank" class="text-blue-600 hover:underline text-sm">
                        {{ file.name }}
                    </a>
                    <button
                        type="button"
                        @click="$emit('removeExisting', file)"
                        class="text-red-500 text-xs hover:underline"
                    >
                        Remove
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>


<style>
/* We use :deep() or global styles to override FilePond's default theme.
  This provides a much cleaner, modern look and feel.
*/

.filepond-wrapper {
    /* Base styles for the root element */
    --filepond-font-family: 'Inter', sans-serif;
    --filepond-label-color: #475569; /* slate-600 */
}

.filepond--root {
    font-family: var(--filepond-font-family);
    background-color: #f8fafc; /* slate-50 */
    border-radius: 0.75rem; /* rounded-xl */
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

/* The drop panel */
.filepond--panel-root {
    background-color: #f1f5f9; /* slate-100 */
    border-radius: 0.5rem; /* rounded-lg */
    border: 2px dashed #cbd5e1; /* slate-300 */
    transition: all 0.2s ease-in-out;
}

.filepond--panel-root:hover,
.filepond--drophover .filepond--panel-root {
    border-color: #6366f1; /* indigo-500 */
    background-color: #eef2ff; /* indigo-50 */
}

/* The label */
.filepond--label-action {
    text-decoration: none;
}

/* Image preview styles */
.filepond--item-panel {
    background-color: #e2e8f0; /* slate-200 */
    border-radius: 0.5rem;
}

/* Remove border from the file info and image edit sections */
.filepond--file-info, .filepond--image-edit-button {
    color: var(--filepond-label-color);
}
.filepond--file-action-button {
    background-color: rgba(0,0,0,0.5);
    color: white;
}
</style>

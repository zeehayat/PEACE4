<script setup>
import { ref, watch, onMounted } from 'vue';
import { usePage } from '@inertiajs/vue3';
import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import InputError from '@/Components/InputError.vue';

// Register plugins
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

const props = defineProps({
    modelValue: {
        type: [Array, Object], // modelValue will be an array of native File objects for new uploads
        default: () => [],
    },
    existingAttachments: {
        type: Array, // This prop contains objects representing already uploaded files (id, url, name, etc.)
        default: () => [],
    },
    errorMessage: String,
});

const emit = defineEmits(['update:modelValue', 'remove-existing']);

const pondFiles = ref([]); // Internal state for FilePond
const filepondOptions = {
    allowMultiple: true,
    allowReorder: true,
    acceptedFileTypes: ['image/jpeg', 'image/png', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    labelIdle: 'Drag & Drop your files or <span class="filepond--label-action"> Browse </span>',
};

// Map existing attachments to FilePond files for display only
const mapExistingAttachmentsToFilePond = (attachments) => {
    return attachments.map(att => ({
        source: att.url,
        options: {
            type: 'local', // Treat existing files as local to prevent re-upload
            file: {
                name: att.file_name,
                size: att.size,
                type: att.mime_type,
            },
            metadata: {
                id: att.id, // Store the media ID
            },
        },
    }));
};

// Sync parent prop `existingAttachments` with internal `pondFiles` for display
watch(() => props.existingAttachments, (newVal, oldVal) => {
    // This watcher ensures that files already on the server are displayed in FilePond.
    // It should NOT add new files for upload to modelValue.

    // Filter out files that are already in pondFiles to prevent duplicates
    const newFilesToDisplay = newVal.filter(newAtt => !pondFiles.value.some(pondFile => pondFile.options?.metadata?.id === newAtt.id));

    // Filter out files that were removed from the existingAttachments prop
    const remainingPondFiles = pondFiles.value.filter(pondFile =>
        pondFile.options?.metadata?.id !== undefined && newVal.some(newAtt => newAtt.id === pondFile.options.metadata.id)
    );

    // Combine remaining existing files with newly added existing files for display
    pondFiles.value = [...remainingPondFiles, ...mapExistingAttachmentsToFilePond(newFilesToDisplay)];

}, { immediate: true, deep: true });

// Handle events from FilePond component
const handleUpdatefiles = (files) => {
    // This event is fired when files are added, processed, reordered, or removed.
    // We need to filter for *new* files that are ready for upload (i.e., they have a native File object).
    const newFilesForUpload = files
        .filter(item => item.file instanceof File) // FIX: Only include native File objects
        .map(item => item.file);

    // Update the parent's modelValue with ONLY the new files to be uploaded
    emit('update:modelValue', newFilesForUpload);
};

const handleRemoveFile = (error, file) => {
    const isExistingFile = file.getMetadata('id') !== undefined;
    if (isExistingFile) {
        // This is an existing file, notify the parent to add it to the deletion list
        emit('remove-existing', file.getMetadata('id'));
    }
    // `handleUpdatefiles` will be called after this, which updates the modelValue correctly.
};
</script>

<template>
    <div class="mt-2">
        <FilePond
            ref="pond"
            name="attachments[]"
            :files="pondFiles"
            :allow-multiple="filepondOptions.allowMultiple"
            :allow-reorder="filepondOptions.allowReorder"
            :accepted-file-types="filepondOptions.acceptedFileTypes"
            :label-idle="filepondOptions.labelIdle"
            @updatefiles="handleUpdatefiles"
            @removefile="handleRemoveFile"
        />
        <InputError v-if="errorMessage" class="mt-2" :message="errorMessage" />
    </div>
</template>

<style>
@import 'filepond/dist/filepond.min.css';
@import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
</style>

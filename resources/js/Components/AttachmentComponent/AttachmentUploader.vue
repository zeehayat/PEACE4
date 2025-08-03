<script setup>
import { ref, watch, onMounted } from 'vue';
import { usePage } from '@inertiajs/vue3';
import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import InputError from '@/Components/InputError.vue'; // Ensure this is imported

// Register plugins
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

const props = defineProps({
    modelValue: {
        type: [Array, Object],
        default: () => [],
    },
    existingAttachments: {
        type: Array,
        default: () => [],
    },
    errorMessage: String,
});

const emit = defineEmits(['update:modelValue', 'remove-existing']);

const pondFiles = ref([]); // Internal state for FilePond
const filepondOptions = {
    allowMultiple: true,
    allowReorder: true,
    acceptedFileTypes: ['image/jpeg', 'image/png', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'], // Expanded types
    labelIdle: 'Drag & Drop your files or <span class="filepond--label-action"> Browse </span>',
};

// Map existing attachments to FilePond files
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
                id: att.id,
            },
        },
    }));
};

// Watch for changes to the parent's `existingAttachments` prop
watch(() => props.existingAttachments, (newVal, oldVal) => {
    // This watcher handles the reconciliation of existing files with the files in FilePond
    if (newVal?.length > 0) {
        // Keep files that are already in the pond if they are not being deleted
        const remainingPondFiles = pondFiles.value.filter(pondFile =>
            newVal.some(newAtt => newAtt.id === pondFile.options?.metadata?.id)
        );

        // Add any new files from the prop
        const filesToAdd = newVal.filter(newAtt =>
            !pondFiles.value.some(pondFile => pondFile.options?.metadata?.id === newAtt.id)
        ).map(att => ({
            source: att.url,
            options: {
                type: 'local',
                file: {
                    name: att.file_name,
                    size: att.size,
                    type: att.mime_type,
                },
                metadata: {
                    id: att.id,
                },
            },
        }));

        pondFiles.value = [...remainingPondFiles, ...filesToAdd];
    } else {
        // If newVal is empty, clear the pond. This happens on form reset/create.
        pondFiles.value = [];
    }
}, { immediate: true, deep: true });

// Handle events from FilePond component
// This event is fired on a successful file upload (for new files) and when files are reordered or removed.
const handleUpdatefiles = (files) => {
    // Extract native File objects for new files
    const newFilesForUpload = files
        .filter(item => item.file) // Only take new files
        .map(item => item.file);

    // Update the parent's modelValue
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

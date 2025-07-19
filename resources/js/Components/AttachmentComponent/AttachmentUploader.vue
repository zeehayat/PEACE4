<script setup>
import { ref, watch } from 'vue'

import vueFilePond from 'vue-filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginFileValidateSize,
    FilePondPluginImagePreview
)

const modelValue = defineModel({ type: Array, default: () => [] })

const props = defineProps({
    existingAttachments: { type: Array, default: () => [] },
    multiple: { type: Boolean, default: true },
    acceptedFileTypes: { type: Array, default: () => ['image/*', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'] },
    maxFileSize: { type: String, default: '20MB' },
    label: { type: String, default: 'Attachments' },
    errorMessage: { type: String, default: '' }
})

const emit = defineEmits(['removeExisting'])

const pondFiles = ref([])

watch(pondFiles, async (newVal) => {
    console.log('--- AttachmentUploader: pondFiles watcher triggered ---');
    console.log('pondFiles newVal:', newVal);

    const validFilesPromises = newVal
        .filter(fileItem => {
            console.log('  Filtering fileItem:', {
                status: fileItem.status,
                optionsType: fileItem.options ? fileItem.options.type : 'no_options',
                hasRawFileObject: fileItem.file instanceof File,
                hasGetRawFileMethod: typeof fileItem.getRawFile === 'function',
                fileName: fileItem.file && fileItem.file.name ? fileItem.file.name : 'unknown'
            });

            const isNewFileForUpload = (fileItem.status !== 4 && fileItem.status !== 8) &&
                !(fileItem.options && fileItem.options.type === 'local') && // Exclude existing files
                (fileItem.file instanceof File || typeof fileItem.getRawFile === 'function'); // Must have file data

            console.log('  Is new file for upload (after stricter check):', isNewFileForUpload);
            return isNewFileForUpload;
        })
        .map(async fileItem => {
            if (typeof fileItem.getRawFile === 'function') {
                try {
                    const rawFile = await fileItem.getRawFile();
                    console.log('  Got rawFile via getRawFile() for:', fileItem.file ? fileItem.file.name : 'unknown', rawFile);
                    return rawFile;
                } catch (e) {
                    console.warn('  Error getting rawFile via getRawFile() for', fileItem.file ? fileItem.file.name : 'unknown', e);
                    return null;
                }
            } else if (fileItem.file instanceof File) {
                console.log('  Using direct file property for:', fileItem.file.name, fileItem.file);
                return fileItem.file;
            }
            console.warn('  No raw file or getRawFile method found for fileItem:', fileItem);
            return null;
        });

    const validFiles = await Promise.all(validFilesPromises);
    const filteredValidFiles = validFiles.filter(file => file instanceof File);

    console.log('--- AttachmentUploader: Emitting modelValue ---');
    console.log('Final files to emit (modelValue):', filteredValidFiles);
    modelValue.value = filteredValidFiles;
}, { deep: true });

// === MODIFIED watch for existingAttachments ===
watch(() => props.existingAttachments, (newVal, oldVal) => {
    console.log('--- AttachmentUploader: existingAttachments watcher triggered ---');
    console.log('existingAttachments newVal:', newVal);
    console.log('existingAttachments oldVal:', oldVal);

    // If newVal is explicitly empty and oldVal was not (e.g., after a successful save/form reset),
    // then clear all files in FilePond.
    // This assumes the parent (e.g., MhpSiteForm) calls form.reset() which clears existingAttachments.value.
    if ((!newVal || newVal.length === 0) && (oldVal && oldVal.length > 0)) {
        console.log('Explicitly clearing all pondFiles (due to existingAttachments becoming empty).');
        pondFiles.value = []; // Clear all files, including new ones, because the parent implicitly reset the form
    }
    // Otherwise, only add new existing attachments, but don't remove new uploads.
    else if (newVal && newVal.length > 0) {
        const currentPondLocalFileIds = new Set(pondFiles.value.filter(f => f.options && f.options.type === 'local' && f.getMetadata('id')).map(f => f.getMetadata('id')));

        const filesToAdd = newVal.filter(att =>
            !currentPondLocalFileIds.has(att.id) // Filter out existing files already in pondFiles
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

        if (filesToAdd.length > 0) {
            console.log('Adding existing files to pondFiles:', filesToAdd);
            pondFiles.value = [...pondFiles.value, ...filesToAdd]; // Append to existing files (could include new uploads)
        }
    }
    console.log('pondFiles after existingAttachments update logic:', pondFiles.value);
}, { immediate: true, deep: true }); // immediate: true is important for initial setup

const handleRemoveExistingFile = (fileId) => {
    console.log('Attempting to remove existing file with ID:', fileId);
    emit('removeExisting', fileId);
    pondFiles.value = pondFiles.value.filter(fileItem => {
        const isLocalFile = fileItem.options && fileItem.options.type === 'local';
        const isMatchingId = fileItem.getMetadata && fileItem.getMetadata('id') === fileId;
        console.log('  Filtering item for removal:', { fileItemName: fileItem.file ? fileItem.file.name : 'unknown', isLocalFile, isMatchingId });
        return !(isLocalFile && isMatchingId);
    });
    console.log('pondFiles after remove:', pondFiles.value);
};
</script>

<template>
    <div class="filepond-wrapper">
        <FilePond
            ref="pond"
            name="attachments"
            :allow-multiple="multiple"
            :accepted-file-types="acceptedFileTypes"
            :max-file-size="maxFileSize"
            label-idle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            class="mb-4"
            :files="pondFiles"
            @updatefiles="pondFiles = $event"
            @removefile="handleRemoveExistingFile($event.file.getMetadata('id'))"
            :allow-revert="false"
            :allow-process="false"
            :chunk-uploads="false"
            :max-files="multiple ? null : 1"
        />
        <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>
    </div>
</template>

<style>
/* ... (existing FilePond styles) ... */
</style>

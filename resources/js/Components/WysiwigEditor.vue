<script setup>
import Editor from '@tinymce/tinymce-vue'; // Import the TinyMCE Vue component
import { ref, watch } from 'vue';

// Define the v-model for two-way data binding
const modelValue = defineModel(); // For Vue 3.4+
// If you are on an older Vue 3 version (e.g., <3.4), use:
// const props = defineProps({ modelValue: String });
// const emit = defineEmits(['update:modelValue']);

// TinyMCE configuration options
const editorConfig = ref({
    height: 300, // Height of the editor
    menubar: false, // Hide the menubar (File, Edit, View, etc.)
    plugins: [ // Basic plugins for common formatting
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
    ],
    toolbar: // Toolbar buttons
        'undo redo | formatselect | bold italic backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | help',
    // Optional: Content CSS for styling within the editor
    content_css: '/css/tinymce-content.css', // You might need to create this for custom styling
    // Optional: API Key if you're using TinyMCE Cloud (for production, usually required)
    // tinymce-vue will prompt for a key if it's not set and you're using cloud.
    // For local development, you might not need it if using community version.
    // api_key: 'YOUR_TINYMCE_API_KEY', // Uncomment and replace if using cloud
});

// Internal ref to hold the editor's content
const editorContent = ref(modelValue.value);

// Watch for external changes to modelValue and update editorContent
watch(modelValue, (newValue) => {
    if (newValue !== editorContent.value) {
        editorContent.value = newValue;
    }
});

// Watch for internal changes to editorContent and emit to modelValue
watch(editorContent, (newValue) => {
    if (newValue !== modelValue.value) {
        modelValue.value = newValue; // For Vue 3.4+ defineModel
        // For older Vue 3: emit('update:modelValue', newValue);
    }
});

// Handle the editor's update event (e.g., when content changes)
const handleEditorChange = (newValue) => {
    editorContent.value = newValue;
};
</script>

<template>
    <div>
        <Editor
            v-model="editorContent"
            :init="editorConfig"
            @change="handleEditorChange"
        />
    </div>
</template>

<style scoped>
/* Any scoped styles for the wrapper div if needed */
</style>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import Editor from '@tinymce/tinymce-vue'; // Import TinyMCE Vue component
import InputLabel from '@/Components/InputLabel.vue'; // Ensure InputLabel is imported

const props = defineProps({
    modelValue: String, // Expects a String
    label: {
        type: String,
        default: 'Content',
    },
    id: {
        type: String,
        default: () => `tinymce-${Math.random().toString(36).substr(2, 9)}`,
    },
    height: {
        type: Number,
        default: 300,
    },
    menubar: {
        type: [Boolean, String],
        default: false,
    },
    toolbar: {
        type: [String, Array],
        default: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help',
    },
    plugins: {
        type: [String, Array],
        default: 'lists help',
    },
    options: {
        type: Object,
        default: () => ({}),
    },
});

const emit = defineEmits(['update:modelValue']);

const editorRef = ref(null);
const content = ref(props.modelValue);

// Watch for external modelValue changes and update internal content
watch(() => props.modelValue, (newVal) => {
    if (editorRef.value && editorRef.value.editor && newVal !== editorRef.value.editor.getContent()) {
        editorRef.value.editor.setContent(newVal || ''); // Update editor content if modelValue changes externally
    }
    content.value = newVal; // Keep internal ref in sync
});

// FIX: Get content from the editor instance
const handleEditorChange = (editor) => { // The 'editor' instance is passed as the argument
    const newContent = editor.getContent(); // Get the HTML content as a string
    if (newContent !== content.value) { // Prevent infinite loop if content is the same
        content.value = newContent;
        emit('update:modelValue', newContent); // Emit the string content
    }
};

// TinyMCE API Key
const tinymceApiKey = import.meta.env.VITE_TINYMCE_API_KEY || 'no-api-key';

onMounted(() => {
    //
});

onBeforeUnmount(() => {
    //
});
</script>

<template>
    <div>
        <InputLabel v-if="label" :for="id" :value="label" class="mb-1" />
        <Editor
            :id="id"
            v-model="content"
            :api-key="tinymceApiKey"
            :init="{
                height: height,
                menubar: menubar,
                plugins: plugins,
                toolbar: toolbar,
                content_style: 'body { font-family:Inter,sans-serif; font-size:14px }',
                ...options,
            }"
            @change="handleEditorChange"
        ref="editorRef"
        />
    </div>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

<script setup>
import { ref, watch } from 'vue';
import Editor from '@tinymce/tinymce-vue';
import InputLabel from '@/Components/InputLabel.vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
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
        default:
            'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help',
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

watch(
    () => props.modelValue,
    (newVal) => {
        if (typeof newVal !== 'string') return;
        if (editorRef.value?.editor && newVal !== editorRef.value.editor.getContent()) {
            editorRef.value.editor.setContent(newVal || '');
        }
        content.value = newVal;
    }
);

const handleEditorChange = (newContent) => {
    if (newContent !== content.value) {
        content.value = newContent;
        emit('update:modelValue', newContent);
    }
};

const tinymceApiKey = import.meta.env.VITE_TINYMCE_API_KEY || 'no-api-key';
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
            :onEditorChange="handleEditorChange"
            ref="editorRef"
        />
    </div>
</template>

<style scoped>
/* No scoped styles required */
</style>

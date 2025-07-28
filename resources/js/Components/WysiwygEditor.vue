<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';

import { watch, onMounted, onBeforeUnmount } from 'vue';
import InputLabel from '@/Components/InputLabel.vue'; // Assuming InputLabel exists

const props = defineProps({
    modelValue: String, // The HTML content (expected by v-model)
    label: {
        type: String,
        default: 'Content',
    },
    id: {
        type: String,
        default: () => `wysiwyg-${Math.random().toString(36).substr(2, 9)}`,
    },
    height: { // This prop will now control min-height via CSS
        type: Number,
        default: 300,
    },
    // These TinyMCE-specific props are no longer directly used by TipTap,
    // but we keep them in props to avoid breaking existing forms' prop validation.
    // They can be removed from props if you're sure no forms pass them.
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
    options: { // This can be used to pass TipTap-specific options if needed
        type: Object,
        default: () => ({}),
    },
    placeholder: { // New prop for TipTap placeholder
        type: String,
        default: 'Write your remarks here...',
    },
    editable: { // New prop to control if editor is editable (for view modes)
        type: Boolean,
        default: true,
    }
});

const emit = defineEmits(['update:modelValue']);

const editor = useEditor({
    content: props.modelValue,
    extensions: [
        StarterKit,
        Link.configure({
            openOnClick: false,
            autolink: true,
            linkOnPaste: true,
        }),
        Placeholder.configure({
            placeholder: props.placeholder,
        }),
    ],
    editable: props.editable, // Control editability based on prop
    onUpdate: ({ editor }) => {
        // When editor content changes, emit the HTML
        emit('update:modelValue', editor.getHTML());
    },
});

// Watch for external modelValue changes and update the editor
watch(() => props.modelValue, (newVal) => {
    // Check if the editor exists and content actually needs updating
    // Use `editor.commands.setContent` for programmatic updates
    if (editor.value && newVal !== editor.value.getHTML()) {
        editor.value.commands.setContent(newVal || '', false); // false to prevent dispatching another update event
    }
});

// Clean up editor instance on component unmount
onBeforeUnmount(() => {
    editor.value?.destroy();
});
</script>

<template>
    <div>
        <InputLabel v-if="label" :for="id" :value="label" class="mb-1" />

        <div class="border border-gray-300 rounded-md shadow-sm">
            <!-- Toolbar - only show if editable -->
            <div v-if="editor && editable" class="p-2 border-b border-gray-200 bg-gray-50 flex flex-wrap gap-1">
                <button type="button" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }" class="editor-btn">
                    <strong>B</strong>
                </button>
                <button type="button" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }" class="editor-btn">
                    <em>I</em>
                </button>
                <button type="button" @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }" class="editor-btn">
                    <s>S</s>
                </button>
                <button type="button" @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }" class="editor-btn">
                    Code
                </button>
                <button type="button" @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }" class="editor-btn">
                    P
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }" class="editor-btn">
                    H1
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }" class="editor-btn">
                    H2
                </button>
                <button type="button" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }" class="editor-btn">
                    UL
                </button>
                <button type="button" @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }" class="editor-btn">
                    OL
                </button>
                <button type="button" @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }" class="editor-btn">
                    BQ
                </button>
                <button type="button" @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }" class="editor-btn">
                    Code Block
                </button>
                <button type="button" @click="setLink" :class="{ 'is-active': editor.isActive('link') }" class="editor-btn">
                    Set Link
                </button>
                <button type="button" @click="unsetLink" :disabled="!editor.isActive('link')" class="editor-btn">
                    Unset Link
                </button>
            </div>

            <!-- Editor Content -->
            <EditorContent :editor="editor" class="prose max-w-none p-3" :class="{'bg-gray-100 text-gray-500': !editable}" :style="{ 'min-height': height + 'px' }" />
        </div>
    </div>
</template>

<style scoped>
.editor-btn {
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem; /* rounded-md */
    background-color: #e5e7eb; /* gray-200 */
    color: #4b5563; /* gray-700 */
    font-weight: 500; /* font-medium */
    font-size: 0.75rem; /* text-xs */
    line-height: 1rem; /* leading-4 */
    text-transform: uppercase;
    letter-spacing: 0.05em; /* tracking-widest */
    transition: all 0.15s ease-in-out;
}

.editor-btn:hover {
    background-color: #d1d5db; /* gray-300 */
}

.editor-btn.is-active {
    background-color: #4f46e5; /* indigo-600 */
    color: #ffffff; /* white */
}

.editor-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Basic ProseMirror styling for lists, etc. */
:deep(.ProseMirror) {
    min-height: 150px; /* Default min-height, overridden by height prop */
    outline: none;
    padding: 0.75rem;
}

/* Placeholder styling */
:deep(.ProseMirror p.is-editor-empty:first-child::before) {
    content: attr(data-placeholder);
    float: left;
    color: #adb5bd; /* gray-400 */
    pointer-events: none;
    height: 0;
}
</style>

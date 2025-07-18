<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
    modelValue: String,
    id: String, // Allow passing an ID for accessibility
});

const emit = defineEmits(['update:modelValue']);

const textarea = ref(null);

onMounted(() => {
    if (textarea.value.hasAttribute('autofocus')) {
        textarea.value.focus();
    }
});

// We use a watch here to update the modelValue from the parent
// and also emit the change back. This makes it compatible with v-model.
const onInput = (event) => {
    emit('update:modelValue', event.target.value);
};
</script>

<template>
    <textarea
        :id="id"
        ref="textarea"
        class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
        :value="modelValue"
        @input="onInput"
    ></textarea>
</template>

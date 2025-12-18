<script setup>
defineProps({
    type: {
        type: String,
        default: 'submit',
    },
});
</script>

<template>
    <button :type="type" class="btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
        <slot />
    </button>
</template>

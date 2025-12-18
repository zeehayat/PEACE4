<script setup>
defineProps({
    type: {
        type: String,
        default: 'button',
    },
});
</script>

<template>
    <button :type="type" class="btn-secondary disabled:opacity-60 disabled:cursor-not-allowed">
        <slot />
    </button>
</template>

<template>
    <div v-if="error" class="text-red-600 text-xs mt-1">
        {{ error }}
    </div>
</template>

<script setup>
defineProps({ error: String })
</script>

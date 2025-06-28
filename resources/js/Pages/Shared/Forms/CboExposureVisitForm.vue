<template>
  <form @submit.prevent="submit">
    <div>
      <label for="name">Name</label>
      <input id="name" v-model="form.name" type="text" />
      <div v-if="errors.name" class="text-red-500">{{ errors.name }}</div>
    </div>

    <div class="mt-4">
      <label for="description">Description</label>
      <textarea id="description" v-model="form.description"></textarea>
      <div v-if="errors.description" class="text-red-500">{{ errors.description }}</div>
    </div>

    <button type="submit" class="mt-4 btn btn-primary" :disabled="form.processing">
      Submit
    </button>
  </form>
</template>

<script setup>
const props = defineProps(['form', 'errors', 'submit'])
</script>

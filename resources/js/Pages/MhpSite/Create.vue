<template>
  <div class="mhpsite-create">
    <h1>Create - MhpSite</h1>
  </div>
</template>

<script setup>
import { useForm, usePage } from '@inertiajs/vue3'

const props = defineProps({})
const errors = usePage().props.errors

// Example form
const form = useForm({
  name: '',
  description: '',
})

// Example submit function
function submit() {
  form.post('/your-endpoint')
}
</script>


<template>
    <div class="max-w-4xl mx-auto py-6">
        <h1 class="text-2xl font-bold mb-4">Create CBO Dialogue</h1>

        <CboDialogueForm :form="form" :cbos="cbos" :submit="submit" />
    </div>
</template>

<script setup>
import { useForm } from '@inertiajs/vue3'
import { usePage } from '@inertiajs/vue3'
import CboDialogueForm from '@/Components/FormComponents/CBODialogueForm.vue'

const props = defineProps({
    cbos: Array
})

const form = useForm({
    cbo_id: '',
    date_of_dialogue: '',
    participants: '',
    attachments: [],
})


function submit() {

    form.post('/cbo/dialogues/store', {
        forceFormData: true,
        onSuccess: () => form.reset(),
    })
}
</script>

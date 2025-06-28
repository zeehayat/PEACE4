<script setup>
import { useForm } from '@inertiajs/vue3'
import CboDialogueForm from '@/Components/FormComponents/CBODialogueForm.vue'

const props = defineProps({
    cbos: Array,
    dialogue: Object,
})

// Make sure to pass media data to `existing_attachments`
const form = useForm({
    id: props.dialogue.id,
    cbo_id: props.dialogue.cbo_id,
    date_of_dialogue: props.dialogue.date_of_dialogue,
    participants: props.dialogue.participants,
    attachments: [],
    removed_attachments: [],
    existing_attachments: props.dialogue.media ?? [], // 👈 Add this
})

function submit() {
    form.post(`/cbo/dialogues/${form.id}/update`, {
        forceFormData: true,
    })
}
</script>
<template>
    <div class="max-w-4xl mx-auto py-6">
        <h1 class="text-2xl font-bold mb-4">Edit CBO Dialogue</h1>
        <CboDialogueForm :form="form" :cbos="cbos" :existingMedia="dialogue.media" :submit="submit" />
    </div>
</template>



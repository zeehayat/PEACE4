<template>
    <div class="max-w-4xl mx-auto py-6">
        <h1 class="text-2xl font-bold mb-6">Edit Exposure Visit</h1>

        <CboExposureVisitForm
            :form="form"
            :cbos="cbos"
            :submit="submit"
        />
    </div>
</template>

<script setup>
import { useForm } from '@inertiajs/vue3'
import CboExposureVisitForm from '@/Components/FormComponents/CBOExposureVisitForm.vue'

const props = defineProps({
    visit: Object,
    cbos: Array,
})

const form = useForm({
    cbo_id: props.visit.cbo_id ?? '',
    date_of_visit: props.visit.date_of_visit ?? '',
    attachments: [],
    existing_attachments: props.visit.media ?? [],
    removed_attachments: [],
})

function submit() {
    form.post(`/cbo/exposure-visits/${props.visit.id}`, {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => form.reset('attachments', 'removed_attachments'),
    })
}
</script>

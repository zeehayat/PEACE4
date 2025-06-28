<template>
    <div class="max-w-4xl mx-auto py-6">
        <h1 class="text-2xl font-bold mb-6">Create CBO Exposure Visit</h1>
        <CboExposureVisitForm :form="form" :cbos="cbos" :submit="submit" />
    </div>
</template>

<script setup>
import { useForm } from '@inertiajs/vue3'
import CboExposureVisitForm from '@/Components/FormComponents/CBOExposureVisitForm.vue'

const props = defineProps({
    cbos: Array
})

const form = useForm({
    cbo_id: '',
    date_of_visit: '',
    attachments: [],
})

function submit() {
    form.post(route('cbo.exposure-visits.store'), {
        forceFormData: true,
        onSuccess: () => form.reset(),
    })
}
</script>

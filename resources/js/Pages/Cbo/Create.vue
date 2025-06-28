<template>
    <div class="max-w-4xl mx-auto py-6">
        <h1 class="text-2xl font-bold mb-4">Create CBO</h1>

        <CBOForm :form="form" :errors="form.errors" :submit="submit" />
    </div>
</template>

<script setup>
import { useForm } from '@inertiajs/vue3'
import CBOForm from '@/Components/FormComponents/CBOForm.vue'

// Initialize form fields
const form = useForm({
    reference_code: '',
    district: '',
    tehsil: '',
    village_council: '',
    village: '',
    date_of_formation: '',
    total_members: '',
    gender: '',
    num_cbo_members: '',
    president_name: '',
    president_contact: '',
    secretary_name: '',
    secretary_contact: '',
})

// Submit handler with basic client-side validation (optional)
function submit() {
    // Optionally add client-side validation before posting
    const requiredFields = [
        'reference_code', 'district', 'tehsil', 'village',
        'date_of_formation', 'gender', 'president_name', 'secretary_name'
    ]

    const missing = requiredFields.filter(field => !form[field])
    if (missing.length) {
        alert(`Please fill in required fields: ${missing.join(', ')}`)
        return
    }

    form.post('/cbo/store', {
        onSuccess: () => {
            form.reset()
        },
    })
}
</script>

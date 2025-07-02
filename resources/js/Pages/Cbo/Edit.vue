<template>
    <div class="max-w-4xl mx-auto py-10">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">Edit Community-Based Organization</h1>

        <form @submit.prevent="submit" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Reference Code" required>
                    <input v-model="form.reference_code" class="input" type="text" />
                    <InputError :message="form.errors.reference_code" />
                </InputGroup>

                <InputGroup label="District" required>
                    <input v-model="form.district" class="input" type="text" />
                    <InputError :message="form.errors.district" />
                </InputGroup>

                <InputGroup label="Tehsil">
                    <input v-model="form.tehsil" class="input" type="text" />
                    <InputError :message="form.errors.tehsil" />
                </InputGroup>

                <InputGroup label="Village Council">
                    <input v-model="form.village_council" class="input" type="text" />
                    <InputError :message="form.errors.village_council" />
                </InputGroup>

                <InputGroup label="Village">
                    <input v-model="form.village" class="input" type="text" />
                    <InputError :message="form.errors.village" />
                </InputGroup>

                <InputGroup label="Date of Formation" required>
                    <input v-model="form.date_of_formation" class="input" type="date" />
                    <InputError :message="form.errors.date_of_formation" />
                </InputGroup>

                <InputGroup label="Total Members" required>
                    <input v-model="form.total_members" class="input" type="number" min="1" />
                    <InputError :message="form.errors.total_members" />
                </InputGroup>

                <InputGroup label="Gender" required>
                    <select v-model="form.gender" class="input">
                        <option value="" disabled>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="mixed">Mixed</option>
                    </select>
                    <InputError :message="form.errors.gender" />
                </InputGroup>

                <InputGroup label="Number of CBO Members">
                    <input v-model="form.num_cbo_members" class="input" type="number" min="0" />
                    <InputError :message="form.errors.num_cbo_members" />
                </InputGroup>

                <InputGroup label="President Name">
                    <input v-model="form.president_name" class="input" type="text" />
                    <InputError :message="form.errors.president_name" />
                </InputGroup>

                <InputGroup label="President Contact">
                    <input v-model="form.president_contact" class="input" type="text" />
                    <InputError :message="form.errors.president_contact" />
                </InputGroup>
            </div>

            <div class="text-right mt-6">
                <button
                    type="submit"
                    class="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition"
                    :disabled="form.processing"
                >
                    Update CBO
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import {router, useForm} from '@inertiajs/vue3'

import InputGroup from '@/Components/FormComponents/InputGroup.vue'
import InputError from '@/Components/InputError.vue'

const props = defineProps({ cbo: Object })

const form = useForm({
    reference_code: props.cbo.reference_code,
    district: props.cbo.district,
    tehsil: props.cbo.tehsil,
    village_council: props.cbo.village_council,
    village: props.cbo.village,
    date_of_formation: props.cbo.date_of_formation,
    total_members: props.cbo.total_members,
    gender: props.cbo.gender,
    num_cbo_members: props.cbo.num_cbo_members,
    president_name: props.cbo.president_name,
    president_contact: props.cbo.president_contact,
})

const submit = () => {
    form.put(`/cbos/${props.cbo.id}`, {
        preserveScroll: true,
        onSuccess: () => {
            router.visit(route('cbo.index'))
        },
    })
}
</script>

<style scoped>
.input {
    @apply w-full border border-gray-300 rounded px-3 py-2 mt-1;
}
</style>

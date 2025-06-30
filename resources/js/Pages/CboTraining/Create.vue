<template>
    <form @submit.prevent="submit" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputGroup label="Training Type" required>
                <select v-model="form.training_type" class="input">
                    <option value="" disabled>Select Type</option>
                    <option value="capacity_building">Capacity Building</option>
                    <option value="skill_development">Skill Development</option>
                    <option value="awareness">Awareness</option>
                    <!-- Add more as needed -->
                </select>
            </InputGroup>

            <InputGroup label="Gender Focus" required>
                <select v-model="form.training_gender" class="input">
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="mixed">Mixed</option>
                </select>
            </InputGroup>

            <InputGroup label="Date of Training" required>
                <input type="date" v-model="form.date_of_training" class="input" />
            </InputGroup>

            <InputGroup label="Total Participants" required>
                <input type="number" v-model="form.total_participants" min="1" class="input" />
            </InputGroup>
        </div>

        <InputGroup label="Attachments">
            <FileUploader v-model="form.attachments" />
        </InputGroup>

        <div class="text-right">
            <button
                type="submit"
                class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md shadow transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="form.processing"
            >
                Save Training
            </button>

        </div>
    </form>
</template>

<script setup>
import { useForm } from '@inertiajs/vue3'
import InputGroup from '@/Components/FormComponents/InputGroup.vue'
import FileUploader from '@/Components/FormComponents/FileUploader.vue'

const props = defineProps({
    cboId: [String, Number],
})

const emit = defineEmits(['success'])

const form = useForm({
    cbo_id: props.cboId,
    training_type: '',
    training_gender: '',
    date_of_training: '',
    total_participants: null,
    attachments: [],
})

const submit = () => {
    form.post('/cbotrainings', {
        preserveScroll: true,
        onSuccess: () => emit('success'),
    })
}
</script>

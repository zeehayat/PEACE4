<script setup>
import { watch } from 'vue'
import { useForm } from '@inertiajs/vue3'

const props = defineProps({
    show: Boolean,
    site: { type: Object, required: true },
    field: { type: String, required: true }, // e.g., revised_cost_1
})

const emit = defineEmits(['close', 'updated'])

const form = useForm({
    value: '',
})

watch(() => props.site, () => {
    form.value = ''
})

const submit = () => {
    form.put(
        `/mhp/revise-cost/${props.site.id}/${props.field}`,
        {
            onSuccess: () => {
                emit('updated', 'Revised cost updated successfully.')
                emit('close')
            },
        }
    )
}
</script>


<template>
    <div
        v-if="show"
        class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
        <div class="bg-white rounded-lg shadow-lg p-4 max-w-md w-full relative">
            <button @click="$emit('close')" class="absolute top-2 right-2 text-lg">
                ✖
            </button>

            <h2 class="text-xl font-bold mb-4 text-blue-700">
                ➕ Add {{ field.replace('_', ' ').toUpperCase() }}
            </h2>

            <form @submit.prevent="submit">
                <div>
                    <label class="font-semibold">New {{ field.replace('_', ' ').toUpperCase() }}</label>
                    <input
                        v-model="form.value"
                        type="number"
                        step="0.01"
                        class="input"
                    />
                    <div v-if="form.errors.value" class="text-red-500 text-xs">
                        {{ form.errors.value }}
                    </div>
                </div>

                <div class="text-right mt-4">
                    <button
                        type="button"
                        @click="$emit('close')"
                        class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        :disabled="form.processing"
                        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        {{ form.processing ? 'Saving…' : 'Save' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>


<style scoped>
.input {
    @apply w-full border border-gray-300 rounded px-2 py-1 mt-1
    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-sm;
}
</style>

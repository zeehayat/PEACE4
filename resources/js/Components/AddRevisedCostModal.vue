<script setup>
import { ref, watch } from 'vue'
import { router } from '@inertiajs/vue3'

const props = defineProps({
    show: Boolean,
    onClose: Function,
    site: Object,
    nextField: String // e.g. "revised_cost_1"
})

const revisedCostValue = ref('')
const loading = ref(false)

const submit = () => {
    if (!props.site || !props.nextField) return

    loading.value = true

    router.put(
        `/mhp/revise-cost/${props.site.id}/${props.nextField}`,
        { value: revisedCostValue.value },
        {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                revisedCostValue.value = ''
                loading.value = false
                props.onClose?.()
                // refresh table
                router.reload({ preserveState: true, preserveScroll: true })
            },
            onError: () => {
                loading.value = false
            }
        }
    )
}

watch(() => props.show, (val) => {
    if (!val) revisedCostValue.value = ''
})
</script>

<template>
    <transition name="fade">
        <div
            v-if="show"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <div class="bg-white rounded-lg shadow-lg p-4 relative max-w-md w-full">
                <button
                    class="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                    @click="onClose"
                >
                    ✖
                </button>

                <h2 class="text-lg font-bold mb-2">Add {{ nextField.replace('_', ' ') }}</h2>

                <form @submit.prevent="submit">
                    <input
                        v-model="revisedCostValue"
                        type="number"
                        placeholder="Enter revised cost"
                        class="border w-full p-2 rounded mb-4"
                    />

                    <div class="text-right">
                        <button
                            type="submit"
                            :disabled="loading"
                            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {{ loading ? 'Saving...' : 'Save' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>

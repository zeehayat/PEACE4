<script setup>
import { computed } from 'vue';
import Modal from '@/Components/Modal.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';

const props = defineProps({
    show: Boolean,
    tAndDWork: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close']);

const formatNullableDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid Date';
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const hasRemarks = computed(() => {
    return props.tAndDWork.remarks && props.tAndDWork.remarks.trim() !== '';
});

const hasScopeOfWork = computed(() => {
    return props.tAndDWork.scope_of_work && props.tAndDWork.scope_of_work.trim() !== '';
});
</script>

<template>
    <Modal :show="show" @close="emit('close')" :maxWidth="'3xl'" title="T&D Work Details">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div class="detail-item">
                    <p class="font-semibold text-gray-700">Work Name / Title:</p>
                    <p class="text-gray-900">{{ tAndDWork.name || 'N/A' }}</p>
                </div>
                <div class="detail-item">
                    <p class="font-semibold text-gray-700">Date of Initiation:</p>
                    <p class="text-gray-900">{{ formatNullableDate(tAndDWork.date_of_initiation) }}</p>
                </div>
                <div class="detail-item">
                    <p class="font-semibold text-gray-700">HT Poles Quantity:</p>
                    <p class="text-gray-900">{{ tAndDWork.ht_poles_quantity ?? 'N/A' }}</p>
                </div>
                <div class="detail-item">
                    <p class="font-semibold text-gray-700">LT Poles Quantity:</p>
                    <p class="text-gray-900">{{ tAndDWork.lt_poles_quantity ?? 'N/A' }}</p>
                </div>
                <div class="detail-item">
                    <p class="font-semibold text-gray-700">HT Conductor Length (KM):</p>
                    <p class="text-gray-900">{{ tAndDWork.ht_conductor_length_km ?? 'N/A' }}</p>
                </div>
                <div class="detail-item">
                    <p class="font-semibold text-gray-700">HT Conductor Type:</p>
                    <p class="text-gray-900">{{ tAndDWork.ht_conductor_type || 'N/A' }}</p>
                </div>
                <div class="detail-item">
                    <p class="font-semibold text-gray-700">LT Conductor Length (KM):</p>
                    <p class="text-gray-900">{{ tAndDWork.lt_conductor_length_km ?? 'N/A' }}</p>
                </div>
                <div class="detail-item">
                    <p class="font-semibold text-gray-700">LT Conductor Type:</p>
                    <p class="text-gray-900">{{ tAndDWork.lt_conductor_type || 'N/A' }}</p>
                </div>
            </div>

            <div v-if="tAndDWork.step_up_transformers && tAndDWork.step_up_transformers.length" class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 class="text-lg font-medium text-gray-900 mb-3">Step-Up Transformers</h3>
                <div v-for="(transformer, index) in tAndDWork.step_up_transformers" :key="index" class="grid grid-cols-2 gap-x-4 mb-2 text-sm">
                    <p>KVA: <span class="font-medium">{{ transformer.kva ?? 'N/A' }}</span></p>
                    <p>Quantity: <span class="font-medium">{{ transformer.qty ?? 'N/A' }}</span></p>
                </div>
            </div>

            <div v-if="tAndDWork.step_down_transformers && tAndDWork.step_down_transformers.length" class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 class="text-lg font-medium text-gray-900 mb-3">Step-Down Transformers</h3>
                <div v-for="(transformer, index) in tAndDWork.step_down_transformers" :key="index" class="grid grid-cols-2 gap-x-4 mb-2 text-sm">
                    <p>KVA: <span class="font-medium">{{ transformer.kva ?? 'N/A' }}</span></p>
                    <p>Quantity: <span class="font-medium">{{ transformer.qty ?? 'N/A' }}</span></p>
                </div>
            </div>

            <div v-if="hasScopeOfWork" class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p class="font-semibold text-gray-700 mb-2">Scope of Work:</p>
                <p class="text-gray-800 whitespace-pre-wrap">{{ tAndDWork.scope_of_work }}</p>
            </div>

            <div v-if="hasRemarks" class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p class="font-semibold text-gray-700 mb-2">Remarks:</p>
                <p class="text-gray-800 whitespace-pre-wrap">{{ tAndDWork.remarks }}</p>
            </div>

            <div v-if="tAndDWork.attachments_frontend && tAndDWork.attachments_frontend.length" class="mt-6">
                <p class="font-semibold text-gray-700 mb-2">Attachments:</p>
                <AttachmentViewer :attachments="tAndDWork.attachments_frontend" />
            </div>
            <div v-else class="mt-6 text-gray-500 text-sm">
                No attachments available.
            </div>

            <div class="flex justify-end mt-6">
                <PrimaryButton @click="emit('close')">Close</PrimaryButton>
            </div>
        </div>
    </Modal>
</template>

<style scoped>
.detail-item {
    padding: 0.5rem 0;
}
</style>

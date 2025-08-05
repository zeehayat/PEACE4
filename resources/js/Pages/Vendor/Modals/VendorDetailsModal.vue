<script setup>
import { computed } from 'vue';
import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';
import WysiwygEditor from '@/Components/WysiwygEditor.vue'; // For displaying remarks

const props = defineProps({
    show: Boolean,
    vendor: {
        type: Object, // The full Vendor object with loaded relationships
        required: true,
    },
});

const emit = defineEmits(['close']);

const hasAttachments = computed(() => props.vendor.attachments_frontend && props.vendor.attachments_frontend.length > 0);
const hasRemarks = computed(() => props.vendor.remarks && props.vendor.remarks.trim() !== '');
</script>

<template>
    <Modal :show="show" @close="emit('close')" :maxWidth="'3xl'" :title="`Vendor Details: ${vendor.name}`">
        <div class="p-6 overflow-y-auto max-h-[85vh] text-gray-800 print-content">
            <section class="mb-8 border-b pb-6">
                <h2 class="text-xl font-bold mb-4">General Information</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div class="detail-item"><p class="font-semibold text-gray-700">Name:</p><p>{{ vendor.name ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Contact Person:</p><p>{{ vendor.contact_person ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Phone:</p><p>{{ vendor.phone ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Email:</p><p>{{ vendor.email ?? 'N/A' }}</p></div>
                    <div class="detail-item md:col-span-2"><p class="font-semibold text-gray-700">Address:</p><p>{{ vendor.address ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">NTN No.:</p><p>{{ vendor.ntn_no ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Status:</p><p>{{ vendor.status ?? 'N/A' }}</p></div>
                </div>
            </section>

            <div v-if="hasRemarks" class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h2 class="text-xl font-bold mb-4">Remarks</h2>
                <!-- Display remarks using WysiwygEditor in read-only mode -->
                <WysiwygEditor
                    id="remarks-view"
                    v-model="vendor.remarks"
                    :editable="false"
                    :height="150"
                />
            </div>

            <div v-if="hasAttachments" class="mt-6">
                <h2 class="text-xl font-bold mb-4">Attachments</h2>
                <AttachmentViewer :attachments="vendor.attachments_frontend" />
            </div>
            <div v-else class="mt-6 text-gray-500 text-sm">
                No attachments available.
            </div>

            <div class="flex justify-end mt-6 print:hidden">
                <PrimaryButton @click="emit('close')">Close</PrimaryButton>
            </div>
        </div>
    </Modal>
</template>

<style scoped>
.detail-item p {
    margin-bottom: 0.25rem;
}
.detail-item p:last-child {
    margin-bottom: 0;
}
</style>

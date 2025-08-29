<script setup>
import { computed } from 'vue';
import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';
import WysiwygEditor from '@/Components/WysiwygEditor.vue';

const props = defineProps({
    show: Boolean,
    cbo: {
        type: Object, // The full CBO object with loaded relationships
        required: true,
    },
});

const emit = defineEmits(['close']);

// Helper function to format nullable dates for display
const formatNullableDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
        return 'Invalid Date';
    }
};

const hasAttachments = computed(() => props.cbo.attachments_frontend && props.cbo.attachments_frontend.length > 0);
const hasRemarks = computed(() => props.cbo.remarks && props.cbo.remarks.trim() !== '');

// Computed properties to check for related records
const hasDialogues = computed(() => props.cbo.dialogues && props.cbo.dialogues.length > 0);
const hasExposureVisits = computed(() => props.cbo.exposure_visits && props.cbo.exposure_visits.length > 0);
const hasTrainings = computed(() => props.cbo.trainings && props.cbo.trainings.length > 0);
</script>

<template>
    <Modal :show="show" @close="emit('close')" :maxWidth="'6xl'" :title="`CBO Details: ${cbo.reference_code}`">
        <div class="p-6 overflow-y-auto max-h-[85vh] text-gray-800 print-content">

            <section class="mb-8 border-b pb-6">
                <h2 class="text-xl font-bold mb-4">General Information</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div class="detail-item"><p class="font-semibold text-gray-700">Reference Code:</p><p>{{ cbo.reference_code }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">District:</p><p>{{ cbo.district ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Tehsil:</p><p>{{ cbo.tehsil ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Village Council:</p><p>{{ cbo.village_council ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Village:</p><p>{{ cbo.village ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Date of Formation:</p><p>{{ formatNullableDate(cbo.date_of_formation) }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Total Members:</p><p>{{ cbo.total_members ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Gender:</p><p>{{ cbo.gender ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">No. of CBO Members:</p><p>{{ cbo.num_cbo_members ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">President Name:</p><p>{{ cbo.president_name ?? 'N/A' }} ({{ cbo.president_contact ?? 'N/A' }})</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Secretary Name:</p><p>{{ cbo.secretary_name ?? 'N/A' }} ({{ cbo.secretary_contact ?? 'N/A' }})</p></div>
                </div>
            </section>

            <div v-if="hasRemarks" class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h2 class="text-xl font-bold mb-4">Remarks</h2>
                <WysiwygEditor
                    id="remarks-view"
                    v-model="cbo.remarks"
                    :editable="false"
                    :height="150"
                />
            </div>

            <section v-if="hasDialogues" class="mt-6 border-b pb-6">
                <h2 class="text-xl font-bold mb-4">Community Dialogues ({{ cbo.dialogues.length }})</h2>
                <div v-for="dialogue in cbo.dialogues" :key="dialogue.id" class="p-4 border rounded-md mb-2 bg-gray-50">
                    <p class="font-semibold text-indigo-700">Date: {{ formatNullableDate(dialogue.date_of_dialogue) }}</p>
                    <p class="text-sm">Participants: {{ dialogue.participants }}</p>
                    <div v-if="dialogue.remarks" class="text-xs mt-1" v-html="dialogue.remarks"></div>
                    <div v-if="dialogue.attachments_frontend.length" class="mt-2"><AttachmentViewer :attachments="dialogue.attachments_frontend" /></div>
                </div>
            </section>

            <section v-if="hasExposureVisits" class="mt-6 border-b pb-6">
                <h2 class="text-xl font-bold mb-4">Exposure Visits ({{ cbo.exposure_visits.length }})</h2>
                <div v-for="visit in cbo.exposure_visits" :key="visit.id" class="p-4 border rounded-md mb-2 bg-gray-50">
                    <p class="font-semibold text-indigo-700">Date: {{ formatNullableDate(visit.date_of_visit) }}</p>
                    <p class="text-sm">Purpose: {{ visit.purpose_of_visit }}</p>
                    <p class="text-sm">Participants: {{ visit.participants }}</p>
                    <div v-if="visit.attachments_frontend.length" class="mt-2"><AttachmentViewer :attachments="visit.attachments_frontend" /></div>
                </div>
            </section>

            <section v-if="hasTrainings" class="mt-6">
                <h2 class="text-xl font-bold mb-4">Trainings ({{ cbo.trainings.length }})</h2>
                <div v-for="training in cbo.trainings" :key="training.id" class="p-4 border rounded-md mb-2 bg-gray-50">
                    <p class="font-semibold text-indigo-700">Date: {{ formatNullableDate(training.date_of_training) }}</p>
                    <p class="text-sm">Type: {{ training.training_type }}</p>
                    <p class="text-sm">Participants: {{ training.total_participants }}</p>
                    <div v-if="training.attachments_frontend.length" class="mt-2"><AttachmentViewer :attachments="training.attachments_frontend" /></div>
                </div>
            </section>

            <div v-if="hasAttachments" class="mt-6">
                <h2 class="text-xl font-bold mb-4">Attachments</h2>
                <AttachmentViewer :attachments="cbo.attachments_frontend" />
            </div>

            <div class="flex justify-end mt-6 print:hidden">
                <button
                    type="button"
                    @click="window.print()"
                    class="inline-flex items-center px-4 py-2 mr-3 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                    Print
                </button>
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
@media print {
    .print-content {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
    }
    .print-content .border-b {
        border-bottom: 1px solid #e5e7eb !important;
    }
    .print-content .bg-gray-50 {
        background-color: #f9fafb !important;
    }
}
</style>

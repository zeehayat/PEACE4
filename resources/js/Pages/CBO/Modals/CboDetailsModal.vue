<script setup>
import { computed } from 'vue';
import Modal from '@/Components/Modal.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue'; // Needed for the close button

const props = defineProps({
    show: Boolean,
    cbo: {
        type: Object, // The full CBO object with loaded relationships
        required: true,
    },
});

const emit = defineEmits(['close']);

// Helper function to format nullable dates
const formatNullableDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid Date';
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

// Computed properties for conditional rendering
const hasCboAttachments = computed(() => props.cbo.attachments_frontend && props.cbo.attachments_frontend.length > 0);
const hasRemarks = computed(() => props.cbo.remarks && props.cbo.remarks.trim() !== '');
const hasDialogues = computed(() => props.cbo.dialogues && props.cbo.dialogues.length > 0);
const hasExposureVisits = computed(() => props.cbo.exposure_visits && props.cbo.exposure_visits.length > 0);
const hasTrainings = computed(() => props.cbo.trainings && props.cbo.trainings.length > 0);
</script>

<template>
    <Modal :show="show" @close="emit('close')" :maxWidth="'5xl'" :title="`CBO Details: ${cbo.reference_code}`">
        <div class="p-6 overflow-y-auto max-h-[85vh] text-gray-800 print-content">

            <section class="mb-8 border-b pb-6">
                <h2 class="text-xl font-bold mb-4">General Information</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div class="detail-item"><p class="font-semibold text-gray-700">Reference Code:</p><p>{{ cbo.reference_code ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">District:</p><p>{{ cbo.district ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Tehsil:</p><p>{{ cbo.tehsil ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Village Council:</p><p>{{ cbo.village_council ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Village:</p><p>{{ cbo.village ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Date of Formation:</p><p>{{ formatNullableDate(cbo.date_of_formation) }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Total Members:</p><p>{{ cbo.total_members ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Gender:</p><p>{{ cbo.gender ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Number of CBO Members:</p><p>{{ cbo.num_cbo_members ?? 'N/A' }}</p></div>
                </div>
            </section>


            <section class="mb-8 border-b pb-6">
                <h2 class="text-xl font-bold mb-4">Contact Persons</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div class="detail-item"><p class="font-semibold text-gray-700">President Name:</p><p>{{ cbo.president_name ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">President Contact:</p><p>{{ cbo.president_contact ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Secretary Name:</p><p>{{ cbo.secretary_name ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Secretary Contact:</p><p>{{ cbo.secretary_contact ?? 'N/A' }}</p></div>
                </div>
            </section>

            <div v-if="hasRemarks" class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h2 class="text-xl font-bold mb-4">Remarks</h2>
                <div class="text-gray-800 prose max-w-none" v-html="cbo.remarks"></div>
            </div>

            <div v-if="hasCboAttachments" class="mt-6">
                <h2 class="text-xl font-bold mb-4">Attachments</h2>
                <AttachmentViewer :attachments="cbo.attachments_frontend" />
            </div>


            <section v-if="hasDialogues" class="mt-8 border-b pb-6">
                <h2 class="text-xl font-bold mb-4">Dialogues</h2>
                <div v-for="dialogue in cbo.dialogues" :key="dialogue.id" class="mb-4 p-4 border rounded-lg bg-gray-50">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div class="detail-item"><p class="font-semibold text-gray-700">Date:</p><p>{{ formatNullableDate(dialogue.date_of_dialogue) }}</p></div>
                        <div class="detail-item"><p class="font-semibold text-gray-700">Participants:</p><p>{{ dialogue.participants ?? 'N/A' }}</p></div>
                        <div v-if="dialogue.remarks" class="md:col-span-2"><p class="font-semibold text-gray-700">Remarks:</p><p class="text-gray-900 prose max-w-none" v-html="dialogue.remarks"></p></div>
                    </div>
                    <div v-if="dialogue.attachments_frontend && dialogue.attachments_frontend.length" class="mt-4">
                        <p class="font-semibold text-gray-700 mb-2">Attachments:</p>
                        <AttachmentViewer :attachments="dialogue.attachments_frontend" />
                    </div>
                </div>
            </section>


            <section v-if="hasExposureVisits" class="mt-8 border-b pb-6">
                <h2 class="text-xl font-bold mb-4">Exposure Visits</h2>
                <div v-for="visit in cbo.exposure_visits" :key="visit.id" class="mb-4 p-4 border rounded-lg bg-gray-50">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div class="detail-item"><p class="font-semibold text-gray-700">Date:</p><p>{{ formatNullableDate(visit.date_of_visit) }}</p></div>
                        <div class="detail-item"><p class="font-semibold text-gray-700">Purpose:</p><p>{{ visit.purpose_of_visit ?? 'N/A' }}</p></div>
                        <div class="detail-item"><p class="font-semibold text-gray-700">Participants:</p><p>{{ visit.participants ?? 'N/A' }}</p></div>
                        <div v-if="visit.remarks" class="md:col-span-2"><p class="font-semibold text-gray-700">Remarks:</p><p class="text-gray-900 prose max-w-none" v-html="visit.remarks"></p></div>
                    </div>
                    <div v-if="visit.attachments_frontend && visit.attachments_frontend.length" class="mt-4">
                        <p class="font-semibold text-gray-700 mb-2">Attachments:</p>
                        <AttachmentViewer :attachments="visit.attachments_frontend" />
                    </div>
                </div>
            </section>


            <section v-if="hasTrainings" class="mt-8 border-b pb-6">
                <h2 class="text-xl font-bold mb-4">Trainings</h2>
                <div v-for="training in cbo.trainings" :key="training.id" class="mb-4 p-4 border rounded-lg bg-gray-50">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div class="detail-item"><p class="font-semibold text-gray-700">Date:</p><p>{{ formatNullableDate(training.date_of_training) }}</p></div>
                        <div class="detail-item"><p class="font-semibold text-gray-700">Type:</p><p>{{ training.training_type ?? 'N/A' }}</p></div>
                        <div class="detail-item"><p class="font-semibold text-gray-700">Gender:</p><p>{{ training.training_gender ?? 'N/A' }}</p></div>
                        <div class="detail-item"><p class="font-semibold text-gray-700">Participants:</p><p>{{ training.total_participants ?? 'N/A' }}</p></div>
                        <div v-if="training.remarks" class="md:col-span-2"><p class="font-semibold text-gray-700">Remarks:</p><p class="text-gray-900 prose max-w-none" v-html="training.remarks"></p></div>
                    </div>
                    <div v-if="training.attachments_frontend && training.attachments_frontend.length" class="mt-4">
                        <p class="font-semibold text-gray-700 mb-2">Attachments:</p>
                        <AttachmentViewer :attachments="training.attachments_frontend" />
                    </div>
                </div>
            </section>

            <div class="flex justify-end mt-6">
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

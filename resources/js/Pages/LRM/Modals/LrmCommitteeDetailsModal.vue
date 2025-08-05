<script setup>
import { computed } from 'vue';
import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';
import WysiwygEditor from '@/Components/WysiwygEditor.vue';

const props = defineProps({
    show: Boolean,
    lrmCommittee: {
        type: Object, // The full LRM Committee object with loaded relationships
        required: true,
    },
});

const emit = defineEmits(['close']);

// Helper function to format nullable dates
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

const hasAttachments = computed(() => props.lrmCommittee.attachments_frontend && props.lrmCommittee.attachments_frontend.length > 0);
const hasRemarks = computed(() => props.lrmCommittee.remarks && props.lrmCommittee.remarks.trim() !== '');
const hasForestPlants = computed(() => props.lrmCommittee.forest_plants && props.lrmCommittee.forest_plants.length > 0);
const hasFruitPlants = computed(() => props.lrmCommittee.fruit_plants && props.lrmCommittee.fruit_plants.length > 0);
</script>

<template>
    <Modal :show="show" @close="emit('close')" :maxWidth="'4xl'" :title="`LRM Committee Details`">
        <div class="p-6 overflow-y-auto max-h-[85vh] text-gray-800 print-content">
            <section class="mb-8 border-b pb-6">
                <h2 class="text-xl font-bold mb-4">Committee Information</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div class="detail-item"><p class="font-semibold text-gray-700">CBO:</p><p>{{ lrmCommittee.cbo?.reference_code ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Date of Formation:</p><p>{{ formatNullableDate(lrmCommittee.date_of_lrm_committee_formation) }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">No. of Members:</p><p>{{ lrmCommittee.no_of_lrm_committee_members ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">NRM Plan Finalized:</p><p>{{ lrmCommittee.date_of_nrm_plan_finalization ? formatNullableDate(lrmCommittee.date_of_nrm_plan_finalization) : 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Afforestation/Reforestation:</p><p>{{ lrmCommittee.has_afforestation_reforestation ? 'Yes' : 'No' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-gray-700">Total Land Covered (Ha):</p><p>{{ lrmCommittee.total_land_covered_hectares ?? 'N/A' }}</p></div>
                </div>
            </section>

            <section v-if="hasForestPlants || hasFruitPlants" class="mb-8 border-b pb-6">
                <h2 class="text-xl font-bold mb-4">Plantation Details</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div v-if="hasForestPlants" class="detail-item"><p class="font-semibold text-gray-700">Forest Plants:</p><p>{{ lrmCommittee.forest_plants.join(', ') }}</p></div>
                    <div v-if="hasFruitPlants" class="detail-item"><p class="font-semibold text-gray-700">Fruit Plants:</p><p>{{ lrmCommittee.fruit_plants.join(', ') }}</p></div>
                </div>
            </section>

            <div v-if="hasRemarks" class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h2 class="text-xl font-bold mb-4">Remarks</h2>
                <WysiwygEditor
                    id="remarks-view"
                    v-model="lrmCommittee.remarks"
                    :editable="false"
                    :height="150"
                />
            </div>

            <div v-if="hasAttachments" class="mt-6">
                <h2 class="text-xl font-bold mb-4">Attachments</h2>
                <AttachmentViewer :attachments="lrmCommittee.attachments_frontend" />
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

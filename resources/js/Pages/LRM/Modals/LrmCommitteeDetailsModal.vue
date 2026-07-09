<script setup>
import { computed, ref } from 'vue';
import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';
import WysiwygEditor from '@/Components/WysiwygEditor.vue';
import { router } from '@inertiajs/vue3';
import LrmAchievementModal from '@/Pages/LRM/Modals/LrmAchievementModal.vue';
import LrmCroModal from '@/Pages/LRM/Modals/LrmCroModal.vue';

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

const showAchievementModal = ref(false);
const selectedAchievement = ref(null);

const openNewAchievementModal = () => {
    selectedAchievement.value = null;
    showAchievementModal.value = true;
};

const editAchievement = (achievement) => {
    selectedAchievement.value = achievement;
    showAchievementModal.value = true;
};

const deleteAchievement = (achievement) => {
    if (!confirm('Delete this NRM achievement entry?')) return;
    router.delete(route('lrm.committees.achievements.destroy', [props.lrmCommittee.id, achievement.id]), {
        preserveScroll: true,
    });
};

const showCroModal = ref(false);
const selectedCro = ref(null);

const openNewCroModal = () => {
    selectedCro.value = null;
    showCroModal.value = true;
};

const editCro = (cro) => {
    selectedCro.value = cro;
    showCroModal.value = true;
};

const deleteCro = (cro) => {
    if (!confirm('Delete this CRO record?')) return;
    router.delete(route('lrm.committees.cros.destroy', [props.lrmCommittee.id, cro.id]), {
        preserveScroll: true,
    });
};
</script>

<template>
    <Modal :show="show" @close="emit('close')" :maxWidth="'4xl'" :title="`LRM Committee Details`">
        <div class="p-6 overflow-y-auto max-h-[85vh] text-ink-800 print-content">
            <section class="mb-8 border-b pb-6">
                <h2 class="text-xl font-bold mb-4">Committee Information</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div class="detail-item"><p class="font-semibold text-ink-700">CBO:</p><p>{{ lrmCommittee.cbo?.reference_code ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-ink-700">Date of Formation:</p><p>{{ formatNullableDate(lrmCommittee.date_of_lrm_committee_formation) }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-ink-700">No. of Members:</p><p>{{ lrmCommittee.no_of_lrm_committee_members ?? 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-ink-700">NRM Plan Finalized:</p><p>{{ lrmCommittee.date_of_nrm_plan_finalization ? formatNullableDate(lrmCommittee.date_of_nrm_plan_finalization) : 'N/A' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-ink-700">Afforestation/Reforestation:</p><p>{{ lrmCommittee.has_afforestation_reforestation ? 'Yes' : 'No' }}</p></div>
                    <div class="detail-item"><p class="font-semibold text-ink-700">Total Land Covered (Ha):</p><p>{{ lrmCommittee.total_land_covered_hectares ?? 'N/A' }}</p></div>
                </div>
            </section>

            <section v-if="hasForestPlants || hasFruitPlants" class="mb-8 border-b pb-6">
                <h2 class="text-xl font-bold mb-4">Plantation Details</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div v-if="hasForestPlants" class="detail-item"><p class="font-semibold text-ink-700">Forest Plants:</p><p>{{ lrmCommittee.forest_plants.join(', ') }}</p></div>
                    <div v-if="hasFruitPlants" class="detail-item"><p class="font-semibold text-ink-700">Fruit Plants:</p><p>{{ lrmCommittee.fruit_plants.join(', ') }}</p></div>
                </div>
            </section>

            <section class="mb-8 border-b pb-6">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-bold">NRM Achievements</h2>
                    <PrimaryButton @click="openNewAchievementModal">Record Achievement</PrimaryButton>
                </div>
                <div v-if="lrmCommittee.lrm_nrm_achievements && lrmCommittee.lrm_nrm_achievements.length" class="overflow-x-auto">
                    <table class="min-w-full text-sm text-left border-collapse">
                        <thead>
                            <tr class="border-b">
                                <th class="py-2 pr-4">Date</th>
                                <th class="py-2 pr-4">Forest Plants</th>
                                <th class="py-2 pr-4">Fruit Plants</th>
                                <th class="py-2 pr-4">DRR Trained</th>
                                <th class="py-2 pr-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="achievement in lrmCommittee.lrm_nrm_achievements" :key="achievement.id" class="border-b">
                                <td class="py-2 pr-4">{{ formatNullableDate(achievement.date) }}</td>
                                <td class="py-2 pr-4">{{ achievement.achieved_forest_plants_count ?? 'N/A' }}</td>
                                <td class="py-2 pr-4">{{ achievement.achieved_fruit_plants_count ?? 'N/A' }}</td>
                                <td class="py-2 pr-4">{{ achievement.achieved_drr_training_persons ?? 'N/A' }}</td>
                                <td class="py-2 pr-4 space-x-2">
                                    <button @click="editAchievement(achievement)" class="text-accent-600 hover:underline">Edit</button>
                                    <button @click="deleteAchievement(achievement)" class="text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p v-else class="text-ink-500 text-sm">No NRM achievements recorded yet.</p>
            </section>

            <section class="mb-8 border-b pb-6">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-bold">Community Resource Organisations</h2>
                    <PrimaryButton @click="openNewCroModal">Add CRO</PrimaryButton>
                </div>
                <div v-if="lrmCommittee.lrm_cros && lrmCommittee.lrm_cros.length" class="overflow-x-auto">
                    <table class="min-w-full text-sm text-left border-collapse">
                        <thead>
                            <tr class="border-b">
                                <th class="py-2 pr-4">Name</th>
                                <th class="py-2 pr-4">Village</th>
                                <th class="py-2 pr-4">Type</th>
                                <th class="py-2 pr-4">Members (M/F/Total)</th>
                                <th class="py-2 pr-4">President</th>
                                <th class="py-2 pr-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="cro in lrmCommittee.lrm_cros" :key="cro.id" class="border-b">
                                <td class="py-2 pr-4">{{ cro.name }}</td>
                                <td class="py-2 pr-4">{{ cro.village ?? 'N/A' }}</td>
                                <td class="py-2 pr-4">{{ cro.type ?? 'N/A' }}</td>
                                <td class="py-2 pr-4">{{ cro.male_members ?? '—' }} / {{ cro.female_members ?? '—' }} / {{ cro.total_members ?? '—' }}</td>
                                <td class="py-2 pr-4">{{ cro.president_name ?? 'N/A' }}</td>
                                <td class="py-2 pr-4 space-x-2">
                                    <button @click="editCro(cro)" class="text-accent-600 hover:underline">Edit</button>
                                    <button @click="deleteCro(cro)" class="text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p v-else class="text-ink-500 text-sm">No CROs recorded yet.</p>
            </section>

            <LrmCroModal
                :show="showCroModal"
                :lrm-committee-id="lrmCommittee.id"
                :cro="selectedCro"
                @close="showCroModal = false"
                @saved="() => router.reload({ only: ['lrmCommittees'] })"
            />

            <LrmAchievementModal
                :show="showAchievementModal"
                :lrm-committee-id="lrmCommittee.id"
                :achievement="selectedAchievement"
                @close="showAchievementModal = false"
                @saved="() => router.reload({ only: ['lrmCommittees'] })"
            />

            <div v-if="hasRemarks" class="mt-6 p-4 bg-paper-50 rounded-lg border border-ink-200">
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
            <div v-else class="mt-6 text-ink-500 text-sm">
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

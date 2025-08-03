<script setup>
import { computed, ref, watch, nextTick } from 'vue';
import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';
import IrrigationAdminApprovalForm from '@/Pages/Irrigation/Forms/IrrigationAdminApprovalForm.vue';
import IrrigationCostRevisionForm from '@/Pages/Irrigation/Forms/IrrigationCostRevisionForm.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';
import axios from 'axios';
import { router } from '@inertiajs/vue3';

const props = defineProps({
    show: Boolean,
    irrigationSchemeId: { type: Number, required: true },
    approval: { type: Object, default: null },
    action: { type: String, default: 'create' },
});

const emit = defineEmits(['close', 'updated']);

const showCostRevisionForm = ref(false);
const costRevisions = ref([]);
const selectedCostRevision = ref(null);
const costRevisionMode = ref('create');

const modalTitle = computed(() => {
    if (showCostRevisionForm.value) {
        return `${costRevisionMode.value === 'create' ? 'Add' : 'Edit'} Cost Revision`;
    }
    return `${props.action === 'update' ? 'Edit' : 'Add'} Admin Approval`;
});

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

// Fetch cost revisions for the current approval
const fetchCostRevisions = async () => {
    if (!props.approval?.id) {
        costRevisions.value = [];
        return;
    }
    try {
        const response = await axios.get(
            route('irrigation.admin-approvals.cost-revisions.index', { admin_approval: props.approval.id, 'only-data': true })
        );
        costRevisions.value = response.data.costRevisions ?? [];
    } catch (error) {
        console.error('Error fetching cost revisions:', error);
    }
};

// Handlers for cost revision form
const openCreateRevisionForm = () => {
    selectedCostRevision.value = null;
    costRevisionMode.value = 'create';
    showCostRevisionForm.value = true;
};
const openEditRevisionForm = (revision) => {
    selectedCostRevision.value = revision;
    costRevisionMode.value = 'update';
    showCostRevisionForm.value = true;
};
const handleRevisionFormSuccess = (message) => {
    showCostRevisionForm.value = false;
    fetchCostRevisions();
    emit('updated', message);
};
const handleRevisionFormCancel = () => {
    showCostRevisionForm.value = false;
};
const handleDeleteRevision = (revisionId) => {
    if (confirm('Are you sure you want to delete this cost revision?')) {
        router.delete(route('irrigation.admin-approvals.cost-revisions.destroy', { admin_approval: props.approval.id, cost_revision: revisionId }), {
            onSuccess: () => {
                emit('updated', 'Cost Revision deleted successfully!');
                fetchCostRevisions();
            },
            onError: (errors) => {
                console.error('Error deleting cost revision:', errors);
            }
        });
    }
};

// Handlers for the main Admin Approval form
const handleFormSuccess = (message) => {
    emit('updated', message);
    emit('close');
};
const handleFormCancel = () => {
    emit('close');
};


// Watch for prop.show to trigger data fetching
watch(() => props.show, (newVal) => {
    if (newVal) {
        fetchCostRevisions();
        showCostRevisionForm.value = false;
    } else {
        costRevisions.value = [];
    }
}, { immediate: true });

</script>

<template>
    <Modal :show="show" @close="handleFormCancel" :maxWidth="'5xl'" :title="modalTitle">
        <div v-if="showCostRevisionForm">
            <IrrigationCostRevisionForm
                :approval-id="props.approval.id"
                :revision="selectedCostRevision"
                :mode="costRevisionMode"
                @success="handleRevisionFormSuccess"
                @cancel="handleRevisionFormCancel"
            />
        </div>
        <div v-else>
            <IrrigationAdminApprovalForm
                :irrigation-scheme-id="irrigationSchemeId"
                :approval="approval"
                :action="action"
                @success="handleFormSuccess"
                @cancel="handleFormCancel"
            />

            <div v-if="props.approval" class="p-6 mt-4 border-t">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-semibold text-gray-800">Cost Revisions</h3>
                    <PrimaryButton @click="openCreateRevisionForm">
                        + Add New Revision
                    </PrimaryButton>
                </div>

                <div v-if="costRevisions.length > 0">
                    <div v-for="revision in costRevisions" :key="revision.id" class="border rounded-md p-4 mb-2 flex justify-between items-center bg-gray-50">
                        <div>
                            <p class="font-semibold">Revision #{{ revision.revision_number }}</p>
                            <p class="text-sm">Cost: PKR {{ revision.revised_cost }} on {{ formatNullableDate(revision.approved_on) }}</p>
                            <p v-if="revision.remarks" class="text-xs text-gray-600 mt-1" v-html="revision.remarks"></p>
                        </div>
                        <div class="flex space-x-2">
                            <PrimaryButton @click="openEditRevisionForm(revision)" class="px-3 py-1 text-sm">Edit</PrimaryButton>
                            <DangerButton @click="handleDeleteRevision(revision.id)" class="px-3 py-1 text-sm">Delete</DangerButton>
                        </div>
                    </div>
                </div>
                <p v-else class="text-gray-500 text-center">No cost revisions have been recorded.</p>
            </div>
        </div>
    </Modal>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

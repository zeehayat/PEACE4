<script setup>
import { computed, ref, watch } from 'vue';
import { router } from '@inertiajs/vue3';
import axios from 'axios';
import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';
import IrrigationCostRevisionForm from '@/Pages/Irrigation/Forms/IrrigationCostRevisionForm.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';

const props = defineProps({
    show: Boolean,
    scheme: {
        type: Object,
        required: true,
    },
    // The existing admin approval object is passed to find the revisions
    approval: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close', 'saved']);

const costRevisions = ref([]);
const isLoading = ref(true);
const showForm = ref(false);
const selectedCostRevision = ref(null);
const formMode = ref('create');

const modalTitle = computed(() => {
    if (showForm.value) {
        return formMode.value === 'create' ? 'Add Cost Revision' : 'Edit Cost Revision';
    }
    return `Cost Revisions for ${props.scheme.name}`;
});

const formatNullableDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
        return 'Invalid Date';
    }
};

const fetchCostRevisions = async () => {
    if (!props.approval?.id) {
        costRevisions.value = [];
        isLoading.value = false;
        return;
    }
    isLoading.value = true;
    try {
        const response = await axios.get(
            route('irrigation.admin-approvals.cost-revisions.index', { admin_approval: props.approval.id })
        );
        costRevisions.value = response.data.costRevisions ?? [];
    } catch (error) {
        console.error('Error fetching cost revisions:', error);
    } finally {
        isLoading.value = false;
    }
};

watch(() => props.show, (newVal) => {
    if (newVal) {
        fetchCostRevisions();
        showForm.value = false;
        selectedCostRevision.value = null;
    }
}, { immediate: true });

const openCreateForm = () => {
    selectedCostRevision.value = null;
    formMode.value = 'create';
    showForm.value = true;
};

const openEditForm = (revision) => {
    selectedCostRevision.value = revision;
    formMode.value = 'update';
    showForm.value = true;
};

const handleFormSuccess = (message) => {
    showForm.value = false;
    selectedCostRevision.value = null;
    fetchCostRevisions();
    emit('saved', message);
};

const handleFormCancel = () => {
    showForm.value = false;
    selectedCostRevision.value = null;
};

const handleDeleteRevision = (revisionId) => {
    if (confirm('Are you sure you want to delete this cost revision?')) {
        router.delete(route('irrigation.admin-approvals.cost-revisions.destroy', {
            admin_approval: props.approval.id,
            cost_revision: revisionId
        }), {
            onSuccess: () => {
                emit('saved', 'Cost Revision deleted successfully!');
                fetchCostRevisions();
            },
            onError: (errors) => {
                console.error('Error deleting cost revision:', errors);
            },
        });
    }
};

const closeModal = () => {
    emit('close');
};
</script>

<template>
    <Modal :show="show" @close="closeModal" :max-width="'5xl'" :title="modalTitle">
        <div class="p-6">
            <div v-if="!showForm" class="space-y-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-semibold text-gray-800">Existing Cost Revisions</h3>
                    <PrimaryButton @click="openCreateForm">
                        + Add New Revision
                    </PrimaryButton>
                </div>

                <div v-if="isLoading" class="text-center py-8 text-gray-500">
                    Loading cost revisions...
                </div>

                <div v-else-if="costRevisions.length === 0" class="text-center py-8 text-gray-500">
                    No cost revisions have been recorded.
                </div>

                <div v-else class="grid grid-cols-1 gap-4">
                    <div v-for="revision in costRevisions" :key="revision.id" class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <p class="text-lg font-semibold text-indigo-700">Revision #{{ revision.revision_number }}</p>
                                <p class="text-sm text-gray-600">Cost: PKR {{ revision.revised_cost }} on {{ formatNullableDate(revision.approved_on) }}</p>
                            </div>
                            <div class="flex space-x-2">
                                <PrimaryButton @click="openEditForm(revision)" class="px-3 py-1 text-sm">Edit</PrimaryButton>
                                <DangerButton @click="handleDeleteRevision(revision.id)" class="px-3 py-1 text-sm">Delete</DangerButton>
                            </div>
                        </div>
                        <div v-if="revision.remarks" class="text-sm text-gray-700 mt-2">
                            Remarks: <span class="text-gray-600 prose max-w-none" v-html="revision.remarks"></span>
                        </div>
                        <div v-if="revision.attachments_frontend && revision.attachments_frontend.length" class="mt-3">
                            <p class="text-sm font-semibold text-gray-700 mb-1">Attachments:</p>
                            <AttachmentViewer :attachments="revision.attachments_frontend" />
                        </div>
                    </div>
                </div>
            </div>

            <div v-else>
                <IrrigationCostRevisionForm
                    :approval-id="props.approval.id"
                    :revision="selectedCostRevision"
                    :mode="formMode"
                    @success="handleFormSuccess"
                    @cancel="handleFormCancel"
                />
            </div>
        </div>
    </Modal>
</template>

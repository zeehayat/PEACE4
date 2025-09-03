<script setup>
import { watch, ref, computed } from 'vue';
import axios from 'axios';
import { router } from '@inertiajs/vue3';

import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';
import ProjectFinancialInstallmentForm from '@/Pages/MHP/Forms/ProjectFinancialInstallmentForm.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';

const props = defineProps({
    show: Boolean,
    site: {
        type: Object,
        required: true,
    },
    progressType: {
        type: String,
        required: true,
        validator: (value) => ['Civil', 'EME', 'T&D'].includes(value),
    },
});

const emit = defineEmits(['close', 'saved']);

const isLoadingInstallments = ref(true);
const financialInstallments = ref([]);
const showForm = ref(false);
const selectedInstallment = ref(null);
const formMode = ref('create');

const fetchFinancialInstallments = async () => {
    if (!props.site || !props.progressType) return;
    isLoadingInstallments.value = true;
    try {
        const response = await axios.get(
            route('sites.financial-progress', { site: props.site.id }),
            { params: { payment_for: props.progressType } }
        );
        financialInstallments.value = response.data.financialInstallments;
    } catch (error) {
        console.error(`API call failed to fetch ${props.progressType} financial installments:`, error);
        financialInstallments.value = [];
    } finally {
        isLoadingInstallments.value = false;
    }
};

watch(() => props.show, (newVal) => {
    if (newVal) {
        fetchFinancialInstallments();
        showForm.value = false;
        selectedInstallment.value = null;
        formMode.value = 'create';
    } else {
        financialInstallments.value = [];
    }
}, { immediate: true });

const openCreateForm = () => {
    selectedInstallment.value = null;
    formMode.value = 'create';
    showForm.value = true;
};

const openEditForm = (installment) => {
    selectedInstallment.value = installment;
    formMode.value = 'update';
    showForm.value = true;
};

const handleFormSuccess = (message) => {
    showForm.value = false;
    selectedInstallment.value = null;
    fetchFinancialInstallments();
    emit('saved', message);
};

const handleFormCancel = () => {
    showForm.value = false;
    selectedInstallment.value = null;
};

const handleDeleteInstallment = (installmentId) => {
    if (confirm(`Are you sure you want to delete this ${props.progressType} financial installment?`)) {
        router.delete(route('financial-installments.destroy', { site: props.site.id, financial_installment: installmentId }), {
            onSuccess: () => {
                emit('saved', 'Financial Installment deleted successfully!');
                fetchFinancialInstallments();
            },
            onError: (errors) => {
                console.error('Error deleting financial installment:', errors);
            }
        });
    }
};

const closeModal = () => {
    emit('close');
};

const modalTitle = computed(() => {
    const typeLabel = props.progressType ? `${props.progressType} ` : '';
    if (showForm.value) {
        return formMode.value === 'create'
            ? `Record ${typeLabel}Financial Installment`
            : `Edit ${typeLabel}Financial Installment`;
    }
    return `Manage ${typeLabel}Financial Progress`;
});
</script>

<template>
    <Modal :show="show" @close="closeModal" :maxWidth="'5xl'" :title="modalTitle">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <div v-if="!showForm" class="space-y-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-semibold text-gray-800">
                        Existing {{ progressType }} Financial Installments
                    </h3>
                    <PrimaryButton @click="openCreateForm">
                        + Record New {{ progressType }} Installment
                    </PrimaryButton>
                </div>

                <div v-if="isLoadingInstallments" class="text-center py-8 text-gray-500">
                    Loading {{ progressType }} financial installments...
                </div>

                <div v-else-if="financialInstallments.length === 0" class="text-center py-8 text-gray-500">
                    No {{ progressType }} financial installments recorded yet.
                </div>

                <div v-else class="grid grid-cols-1 gap-4">
                    <div v-for="installment in financialInstallments" :key="installment.id" class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <p class="text-lg font-semibold text-indigo-700">{{ installment.installment_amount }} PKR</p>
                                <p class="text-sm text-gray-600">Inst. #{{ installment.installment_number }} on {{ new Date(installment.installment_date).toLocaleDateString() }}</p>
                            </div>
                            <div class="flex space-x-2">
                                <PrimaryButton @click="openEditForm(installment)" class="px-3 py-1 text-sm">Edit</PrimaryButton>
                                <DangerButton @click="handleDeleteInstallment(installment.id)" class="px-3 py-1 text-sm">Delete</DangerButton>
                            </div>
                        </div>
                        <p v-if="installment.remarks" class="text-sm text-gray-700 mt-2">
                            Remarks: <span class="text-gray-600">{{ installment.remarks }}</span>
                        </p>
                        <div v-if="installment.attachments_frontend && installment.attachments_frontend.length" class="mt-3">
                            <p class="text-sm font-semibold text-gray-700 mb-1">Attachments:</p>
                            <AttachmentViewer :attachments="installment.attachments_frontend" />
                        </div>
                    </div>
                </div>
            </div>

            <ProjectFinancialInstallmentForm
                v-else
                :mhp-site-id="site.id"
                :installment="selectedInstallment"
                :mode="formMode"
                :progress-type="progressType"
                @success="handleFormSuccess"
                @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

<script setup>
import { reactive, watch, ref, computed } from 'vue';
import { router } from '@inertiajs/vue3';
import axios from 'axios';

import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';
import ProjectFinancialInstallmentForm from '@/Pages/Irrigation/Forms/ProjectFinancialInstallmentForm.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';

const props = defineProps({
    show: Boolean,
    scheme: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close', 'saved']);

const isLoadingInstallments = ref(true);
const financialInstallments = ref([]);
const showForm = ref(false);
const selectedInstallment = ref(null);
const formMode = ref('create');

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

const formatCurrency = (value) => {
    if (value === null || value === undefined) return 'N/A';
    return `PKR ${parseFloat(value).toFixed(2)}`;
};

const fetchInstallments = async () => {
    isLoadingInstallments.value = true;
    try {
        const response = await axios.get(
            route('irrigation.schemes.financial-installments.index', { scheme: props.scheme.id, 'only-data': true })
        );
        financialInstallments.value = response.data.financialInstallments ?? [];
    } catch (error) {
        console.error('Error fetching financial installments:', error);
    } finally {
        isLoadingInstallments.value = false;
    }
};

watch(() => props.show, (newVal) => {
    if (newVal && props.scheme) {
        fetchInstallments();
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
    fetchInstallments();
    emit('saved', message);
};
const handleFormCancel = () => {
    showForm.value = false;
    selectedInstallment.value = null;
};
const handleDeleteInstallment = (installmentId) => {
    if (confirm('Are you sure you want to delete this financial installment?')) {
        router.delete(route('irrigation.schemes.financial-installments.destroy', { scheme: props.scheme.id, financial_installment: installmentId }), {
            onSuccess: () => {
                emit('saved', 'Financial Installment deleted successfully!');
                fetchInstallments();
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
    if (showForm.value) {
        return formMode.value === 'create' ? `Add Financial Installment` : `Edit Financial Installment`;
    }
    return `Manage Financial Installments`;
});
</script>

<template>
    <Modal :show="show" @close="closeModal" :maxWidth="'5xl'" :title="modalTitle">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <div v-if="!showForm" class="space-y-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-semibold text-gray-800">Existing Financial Installments</h3>
                    <PrimaryButton @click="openCreateForm">
                        + Add New Installment
                    </PrimaryButton>
                </div>

                <div v-if="isLoadingInstallments" class="text-center py-8 text-gray-500">
                    Loading financial installments...
                </div>

                <div v-else-if="financialInstallments.length === 0" class="text-center py-8 text-gray-500">
                    No financial installments recorded yet.
                </div>

                <div v-else class="grid grid-cols-1 gap-4">
                    <div v-for="installment in financialInstallments" :key="installment.id" class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <p class="text-lg font-semibold text-indigo-700">Installment #{{ installment.installment_number }} ({{ installment.payment_for ?? 'N/A' }})</p>
                                <p class="text-sm text-gray-600">Amount: {{ formatCurrency(installment.installment_amount) }} on {{ formatNullableDate(installment.installment_date) }}</p>
                            </div>
                            <div class="flex space-x-2">
                                <PrimaryButton @click="openEditForm(installment)" class="px-3 py-1 text-sm">Edit</PrimaryButton>
                                <DangerButton @click="handleDeleteInstallment(installment.id)" class="px-3 py-1 text-sm">Delete</DangerButton>
                            </div>
                        </div>
                        <div v-if="installment.remarks" class="text-sm text-gray-700 mt-2">
                            Remarks: <span class="text-gray-600 prose max-w-none" v-html="installment.remarks"></span>
                        </div>
                        <div v-if="installment.attachments_frontend && installment.attachments_frontend.length" class="mt-3">
                            <p class="text-sm font-semibold text-gray-700 mb-1">Attachments:</p>
                            <AttachmentViewer :attachments="installment.attachments_frontend" />
                        </div>
                    </div>
                </div>
            </div>

            <ProjectFinancialInstallmentForm
                v-else
                :scheme-id="scheme.id"
                :installment="selectedInstallment"
                :mode="formMode"
                @success="handleFormSuccess"
                @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

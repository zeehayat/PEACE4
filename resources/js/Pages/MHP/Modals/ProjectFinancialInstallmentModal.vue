<script setup>
import { reactive, watch, ref, computed } from 'vue';
import { router } from '@inertiajs/vue3';

import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';
import ProjectFinancialInstallmentForm from '@/Pages/MHP/Forms/ProjectFinancialInstallmentForm.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';

const props = defineProps({
    show: Boolean, // Controls modal visibility
    site: { // The MHP Site object whose installments we are managing
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close', 'saved']);

const isLoadingInstallments = ref(true);
const financialInstallments = ref([]); // Local state for the list of installments
const showForm = ref(false); // Controls visibility of the form within this modal
const selectedInstallment = ref(null); // The installment item being edited (or null for new)
const formMode = ref('create'); // 'create' or 'update' for the form

// Fetch financial installments for the current site
const fetchFinancialInstallments = async () => {
    isLoadingInstallments.value = true;
    try {
        const response = await router.get(
            route('mhp.sites.financial-installments.index', { site: props.site.id }),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onSuccess: (page) => {
                    financialInstallments.value = page.props.financialInstallments.data;
                },
                onError: (errors) => {
                    console.error('Error fetching financial installments:', errors);
                }
            }
        );
    } catch (error) {
        console.error('API call failed to fetch financial installments:', error);
    } finally {
        isLoadingInstallments.value = false;
    }
};

// Watch for modal visibility to fetch data when it opens
watch(() => props.show, (newVal) => {
    if (newVal && props.site) {
        fetchFinancialInstallments();
        showForm.value = false; // Start by showing the list, not the form
        selectedInstallment.value = null;
        formMode.value = 'create';
    } else {
        financialInstallments.value = []; // Clear data when modal closes
    }
});

// Handlers for managing the form state
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
    showForm.value = false; // Hide form, show list
    selectedInstallment.value = null; // Clear selected item
    fetchFinancialInstallments(); // Re-fetch list to show updated data
    emit('saved', message); // Notify parent (Index.vue) for toast
};

const handleFormCancel = () => {
    showForm.value = false; // Hide form, show list
    selectedInstallment.value = null; // Clear selected item
};

const handleDeleteInstallment = (installmentId) => {
    if (confirm('Are you sure you want to delete this financial installment entry?')) {
        router.delete(route('mhp.sites.financial-installments.destroy', { site: props.site.id, financial_installment: installmentId }), {
            onSuccess: () => {
                emit('saved', 'Financial Installment deleted successfully!');
                fetchFinancialInstallments(); // Re-fetch the list
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
        return formMode.value === 'create' ? `Record Financial Installment for ${props.site.project_id}` : `Edit Financial Installment for ${props.site.project_id}`;
    }
    return `Manage Financial Installments for ${props.site.project_id}`;
});
</script>

<template>
    <Modal :show="show" @close="closeModal" :maxWidth="'5xl'" :title="modalTitle">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <div v-if="!showForm" class="space-y-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-semibold text-gray-800">Existing Financial Installments</h3>
                    <PrimaryButton @click="openCreateForm">
                        + Record New Installment
                    </PrimaryButton>
                </div>

                <div v-if="isLoadingInstallments" class="text-center py-8 text-gray-500">
                    Loading financial installments...
                </div>

                <div v-else-if="financialInstallments.length === 0" class="text-center py-8 text-gray-500">
                    No financial installments recorded yet for this site.
                </div>

                <div v-else class="grid grid-cols-1 gap-4">
                    <div v-for="installment in financialInstallments" :key="installment.id" class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <p class="text-lg font-semibold text-indigo-700">{{ installment.installment_amount }} PKR</p>
                                <p class="text-sm text-gray-600">Inst. #{{ installment.installment_number }} on {{ new Date(installment.installment_date).toLocaleDateString() }}</p>
                                <p class="text-sm text-gray-500">Type: <span class="font-medium">{{ installment.payment_for }}</span></p>
                                <p v-if="installment.activity" class="text-xs text-gray-500">
                                    Activity: {{ installment.activity.name || `T&D Work #${installment.activity.id}` }}
                                </p>
                                <p v-if="installment.category" class="text-xs text-gray-500">Category: {{ installment.category }}</p>
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
                @success="handleFormSuccess"
                @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

<style scoped>
/* No specific scoped styles needed here */
</style>

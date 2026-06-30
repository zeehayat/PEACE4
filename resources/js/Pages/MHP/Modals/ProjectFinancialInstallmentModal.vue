<script setup>
import { watch, ref, computed } from 'vue';
import axios from 'axios';
import { router } from '@inertiajs/vue3';

import Modal from '@/Components/Modal.vue';
import ProjectFinancialInstallmentForm from '@/Pages/MHP/Forms/ProjectFinancialInstallmentForm.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';
import { formatCurrency, formatDate } from '@/Utils/formatters';

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
            route('mhp.sites.financial-progress', { site: props.site.id }),
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
        router.delete(route('mhp.sites.financial-installments.destroy', { site: props.site.id, financial_installment: installmentId }), {
            onSuccess: () => {
                emit('saved', 'Financial Installment deleted successfully!');
                fetchFinancialInstallments();
            },
            preserveScroll: true,
        });
    }
};

const modalTitle = computed(() => {
    const typeLabel = props.progressType ? `${props.progressType} ` : '';
    if (showForm.value) {
        return formMode.value === 'create'
            ? `Record ${typeLabel}Installment - ${props.site.project_id}`
            : `Edit ${typeLabel}Installment - ${props.site.project_id}`;
    }
    return `Manage ${typeLabel}Financial Progress: ${props.site.project_id}`;
});
</script>

<template>
    <Modal :show="show" @close="emit('close')" :maxWidth="'4xl'" :title="modalTitle">
        <!-- Form View -->
        <div v-if="showForm" class="p-6 max-h-[75vh] overflow-y-auto">
            <ProjectFinancialInstallmentForm
                v-if="site"
                :mhp-site-id="site.id"
                :installment="selectedInstallment"
                :mode="formMode"
                :progress-type="progressType"
                @success="handleFormSuccess"
                @cancel="handleFormCancel"
            />
        </div>

        <!-- List View -->
        <div v-else class="p-6 max-h-[75vh] overflow-y-auto space-y-5">
            <!-- Record New Action Header -->
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 border border-gray-200 rounded-xl p-4 gap-3">
                <span class="text-xs font-bold text-gray-500 uppercase tracking-wider">Add Installment Record</span>
                <button
                    @click="openCreateForm"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
                    type="button"
                >
                    <span class="material-symbols-outlined text-[15px]">add_circle</span>
                    Record New {{ progressType }} Installment
                </button>
            </div>

            <!-- List entries -->
            <div class="space-y-3">
                <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base">payments</span>
                    {{ progressType }} Financial Installments
                </h4>

                <div v-if="isLoadingInstallments" class="text-center py-8 text-gray-400 text-sm font-semibold">
                    Loading {{ progressType }} financial installments...
                </div>
                <div v-else-if="financialInstallments.length === 0" class="text-center py-8 bg-gray-50 border border-dashed rounded-xl text-gray-500 text-sm">
                    No {{ progressType }} financial installments recorded yet.
                </div>
                <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div
                        v-for="installment in financialInstallments"
                        :key="installment.id"
                        class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow transition flex flex-col justify-between"
                    >
                        <div class="space-y-2">
                            <div class="flex justify-between items-start">
                                <div>
                                    <span class="text-emerald-700 font-bold text-base">
                                        {{ formatCurrency(installment.installment_amount) }}
                                    </span>
                                    <p class="text-xs font-semibold text-gray-500 mt-0.5">
                                        Installment Number: <span class="text-gray-900 font-bold">#{{ installment.installment_number }}</span>
                                    </p>
                                </div>
                                <div class="flex items-center gap-1">
                                    <button
                                        @click="openEditForm(installment)"
                                        class="p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition"
                                        title="Edit"
                                    >
                                        <span class="material-symbols-outlined text-lg">edit</span>
                                    </button>
                                    <button
                                        @click="handleDeleteInstallment(installment.id)"
                                        class="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition"
                                        title="Delete"
                                    >
                                        <span class="material-symbols-outlined text-lg">delete</span>
                                    </button>
                                </div>
                            </div>
                            
                            <p class="text-xs text-gray-500 flex items-center gap-1">
                                <span class="material-symbols-outlined text-[13px]">calendar_today</span>
                                Date: {{ formatDate(installment.installment_date) }}
                            </p>

                            <p v-if="installment.remarks" class="text-sm text-gray-700 leading-relaxed bg-gray-50 p-2 rounded-lg border border-gray-100">
                                <span class="font-medium text-xs text-gray-500 block mb-0.5">Remarks</span>
                                {{ installment.remarks }}
                            </p>

                            <div v-if="installment.attachments_frontend?.length" class="mt-2 pt-2 border-t">
                                <span class="text-xs font-semibold text-gray-500 block mb-1">Attachments</span>
                                <AttachmentViewer :attachments="installment.attachments_frontend" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer actions -->
            <div class="flex justify-end pt-2 border-t border-gray-100">
                <button
                    type="button"
                    @click="emit('close')"
                    class="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg font-semibold text-xs text-gray-700 uppercase hover:bg-gray-200 transition shadow-sm"
                >
                    Close
                </button>
            </div>
        </div>
    </Modal>
</template>

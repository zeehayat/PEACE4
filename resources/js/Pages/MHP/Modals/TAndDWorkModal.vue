<script setup>
import { ref, computed, watch } from 'vue';
import { router } from '@inertiajs/vue3';
import Modal from '@/Components/Modal.vue';
import TAndDWorkForm from '@/Pages/MHP/Forms/TAndDWorkForm.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';
import { formatCurrency, formatDate } from '@/Utils/formatters';

const props = defineProps({
    show: Boolean,
    site: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close', 'updated']);

// Modes: 'list' | 'create' | 'edit' | 'view'
const mode = ref('list');
const selectedWork = ref(null);

watch(() => props.show, (isVisible) => {
    if (isVisible) {
        mode.value = 'list';
        selectedWork.value = null;
    }
});

const modalTitle = computed(() => {
    switch (mode.value) {
        case 'create':
            return `Add T&D Work for ${props.site.project_id}`;
        case 'edit':
            return `Edit T&D Work: ${selectedWork.value?.name || 'Details'}`;
        case 'view':
            return `T&D Work Details: ${selectedWork.value?.name || 'Details'}`;
        default:
            return `T&D Works Manager - ${props.site.project_id}`;
    }
});

const handleFormSuccess = (message) => {
    emit('updated', message);
    mode.value = 'list';
    selectedWork.value = null;
};

const handleFormCancel = () => {
    mode.value = 'list';
    selectedWork.value = null;
};

const handleEdit = (work) => {
    selectedWork.value = work;
    mode.value = 'edit';
};

const handleView = (work) => {
    selectedWork.value = work;
    mode.value = 'view';
};

const handleAdd = () => {
    selectedWork.value = null;
    mode.value = 'create';
};

const handleDelete = (workId) => {
    if (confirm('Are you sure you want to delete this T&D Work? This action cannot be undone.')) {
        router.delete(route('mhp.sites.t-and-d-works.destroy', { site: props.site.id, t_and_d_work: workId }), {
            onSuccess: () => {
                emit('updated', 'T&D Work deleted successfully!');
            },
            preserveScroll: true,
        });
    }
};
</script>

<template>
    <Modal :show="show" @close="emit('close')" :maxWidth="'4xl'" :title="modalTitle">
        
        <!-- List Mode -->
        <div v-if="mode === 'list'" class="p-6 max-h-[75vh] overflow-y-auto space-y-4">
            <div class="flex justify-between items-center pb-2 border-b">
                <p class="text-sm text-gray-500 font-medium">
                    Total: {{ site.t_and_d_works?.length || 0 }} T&D records
                </p>
                <button
                    @click="handleAdd"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
                    type="button"
                >
                    <span class="material-symbols-outlined text-[16px]">add_circle</span>
                    Add T&D Work
                </button>
            </div>

            <!-- T&D List Grid -->
            <div v-if="site.t_and_d_works?.length" class="grid grid-cols-1 gap-3">
                <div
                    v-for="work in site.t_and_d_works"
                    :key="work.id"
                    class="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 hover:bg-gray-100/70 border border-gray-200 rounded-xl p-4 transition gap-3"
                >
                    <div class="space-y-1">
                        <h4 class="text-sm font-bold text-gray-900">
                            {{ work.name || `T&D Initiation: ${formatDate(work.date_of_initiation)}` }}
                        </h4>
                        <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                            <span class="flex items-center gap-1">
                                <span class="material-symbols-outlined text-[14px]">calendar_today</span>
                                Initiation: {{ formatDate(work.date_of_initiation) }}
                            </span>
                            <span v-if="work.ht_poles_quantity" class="flex items-center gap-1">
                                <span class="material-symbols-outlined text-[14px]">bolt</span>
                                HT Poles: {{ work.ht_poles_quantity }}
                            </span>
                            <span v-if="work.lt_poles_quantity" class="flex items-center gap-1">
                                <span class="material-symbols-outlined text-[14px]">electric_bolt</span>
                                LT Poles: {{ work.lt_poles_quantity }}
                            </span>
                            <span v-if="work.estimated_cost" class="flex items-center gap-1 font-semibold text-emerald-800">
                                <span class="material-symbols-outlined text-[14px]">payments</span>
                                Cost: {{ formatCurrency(work.estimated_cost) }}
                            </span>
                        </div>
                    </div>

                    <!-- Row Action buttons -->
                    <div class="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-2 md:pt-0">
                        <button
                            @click="handleView(work)"
                            class="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg shadow-sm transition"
                        >
                            <span class="material-symbols-outlined text-[14px]">visibility</span>
                            View
                        </button>
                        <button
                            @click="handleEdit(work)"
                            class="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg shadow-sm transition"
                        >
                            <span class="material-symbols-outlined text-[14px]">edit</span>
                            Edit
                        </button>
                        <button
                            @click="handleDelete(work.id)"
                            class="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-lg transition"
                        >
                            <span class="material-symbols-outlined text-[14px]">delete</span>
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <span class="material-symbols-outlined text-4xl text-gray-300 mb-2">construction</span>
                <p class="text-sm font-semibold text-gray-500">No T&D Work records found for this MHP Site.</p>
                <p class="text-xs text-gray-400 mt-0.5">Click the "Add T&D Work" button above to register the first scope.</p>
            </div>

            <div class="flex justify-end pt-2 border-t">
                <button
                    type="button"
                    @click="emit('close')"
                    class="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg font-semibold text-xs text-gray-700 uppercase hover:bg-gray-200 transition shadow-sm"
                >
                    Close
                </button>
            </div>
        </div>

        <!-- View Mode -->
        <div v-else-if="mode === 'view' && selectedWork" class="p-6 max-h-[75vh] overflow-y-auto space-y-6">
            
            <!-- Specifications -->
            <div class="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
                <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base">bolt</span>
                    T&D Work Specification Summary
                </h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                    <div class="flex flex-col">
                        <span class="text-xs font-semibold text-gray-500">Date of Initiation</span>
                        <span class="text-gray-900 font-medium mt-0.5">{{ formatDate(selectedWork.date_of_initiation) }}</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-xs font-semibold text-gray-500">Date of Completion</span>
                        <span class="text-gray-900 font-medium mt-0.5">{{ formatDate(selectedWork.completion_date) }}</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-xs font-semibold text-gray-500">Estimated Cost</span>
                        <span class="text-emerald-700 font-bold mt-0.5">{{ formatCurrency(selectedWork.estimated_cost) }}</span>
                    </div>
                    <div class="flex flex-col border-t pt-2 md:border-t-0 md:pt-0">
                        <span class="text-xs font-semibold text-gray-500">HT Poles Quantity</span>
                        <span class="text-gray-900 font-semibold mt-0.5">{{ selectedWork.ht_poles_quantity || '—' }}</span>
                    </div>
                    <div class="flex flex-col border-t pt-2 md:border-t-0 md:pt-0">
                        <span class="text-xs font-semibold text-gray-500">LT Poles Quantity</span>
                        <span class="text-gray-900 font-semibold mt-0.5">{{ selectedWork.lt_poles_quantity || '—' }}</span>
                    </div>
                    <div class="flex flex-col border-t pt-2 md:border-t-0 md:pt-0">
                        <span class="text-xs font-semibold text-gray-500">HT Conductor Length / Type</span>
                        <span class="text-gray-900 font-medium mt-0.5">
                            {{ selectedWork.ht_conductor_length_km ? `${selectedWork.ht_conductor_length_km} KM` : '—' }} / {{ selectedWork.ht_conductor_type || '—' }}
                        </span>
                    </div>
                    <div class="flex flex-col border-t pt-2 md:border-t-0 md:pt-0">
                        <span class="text-xs font-semibold text-gray-500">LT Conductor Length / Type</span>
                        <span class="text-gray-900 font-medium mt-0.5">
                            {{ selectedWork.lt_conductor_length_km ? `${selectedWork.lt_conductor_length_km} KM` : '—' }} / {{ selectedWork.lt_conductor_type || '—' }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Transformers details -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-3">
                    <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">expand_less</span>
                        Step-Up Transformers
                    </h4>
                    <ul v-if="selectedWork.step_up_transformers?.length" class="text-sm space-y-1.5">
                        <li v-for="(t, i) in selectedWork.step_up_transformers" :key="i" class="flex justify-between font-medium text-gray-700 border-b pb-1">
                            <span>Capacity: {{ t.kva }} KVA</span>
                            <span>Qty: {{ t.qty }}</span>
                        </li>
                    </ul>
                    <p v-else class="text-xs text-gray-400 italic">No Step-Up Transformers configured.</p>
                </div>

                <div class="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-3">
                    <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base">expand_more</span>
                        Step-Down Transformers
                    </h4>
                    <ul v-if="selectedWork.step_down_transformers?.length" class="text-sm space-y-1.5">
                        <li v-for="(t, i) in selectedWork.step_down_transformers" :key="i" class="flex justify-between font-medium text-gray-700 border-b pb-1">
                            <span>Capacity: {{ t.kva }} KVA</span>
                            <span>Qty: {{ t.qty }}</span>
                        </li>
                    </ul>
                    <p v-else class="text-xs text-gray-400 italic">No Step-Down Transformers configured.</p>
                </div>
            </div>

            <!-- Procurement & Agreement -->
            <div class="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
                <h4 class="text-xs font-bold text-indigo-800 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base">gavel</span>
                    Procurement & Contract Details
                </h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                    <div class="flex flex-col">
                        <span class="text-xs font-semibold text-gray-500">Advertisement Date</span>
                        <span class="text-gray-900 font-medium mt-0.5">{{ formatDate(selectedWork.advertisement_date) }}</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-xs font-semibold text-gray-500">Pre-Bid Meeting Date</span>
                        <span class="text-gray-900 font-medium mt-0.5">{{ formatDate(selectedWork.pre_bid_meeting_date) }}</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-xs font-semibold text-gray-500">Technical Bid Opening</span>
                        <span class="text-gray-900 font-medium mt-0.5">{{ formatDate(selectedWork.technical_bid_opening_date) }}</span>
                    </div>
                    <div class="flex flex-col border-t pt-2 md:border-t-0 md:pt-0">
                        <span class="text-xs font-semibold text-gray-500">Financial Bid Opening</span>
                        <span class="text-gray-900 font-medium mt-0.5">{{ formatDate(selectedWork.financial_bid_opening_date) }}</span>
                    </div>
                    <div class="flex flex-col border-t pt-2 md:border-t-0 md:pt-0">
                        <span class="text-xs font-semibold text-gray-500">Contract Award Date</span>
                        <span class="text-gray-900 font-medium mt-0.5">{{ formatDate(selectedWork.contract_award_date) }}</span>
                    </div>
                    <div class="flex flex-col border-t pt-2 md:border-t-0 md:pt-0">
                        <span class="text-xs font-semibold text-gray-500">Cost Per Bid (PKR)</span>
                        <span class="text-indigo-700 font-bold mt-0.5">{{ formatCurrency(selectedWork.contractor_amount) }}</span>
                    </div>
                </div>
            </div>

            <!-- Progress section -->
            <div class="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
                <h4 class="text-xs font-bold text-amber-800 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base">trending_up</span>
                    Physical & Financial Progress
                </h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 text-sm mb-4">
                    <div class="flex flex-col">
                        <span class="text-xs font-semibold text-gray-500">Physical Progress</span>
                        <span class="text-gray-900 font-bold mt-0.5">{{ selectedWork.physical_progress_percent ? `${selectedWork.physical_progress_percent}%` : '0%' }}</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-xs font-semibold text-gray-500">Financial Progress</span>
                        <span class="text-gray-900 font-bold mt-0.5">{{ selectedWork.financial_progress_percent ? `${selectedWork.financial_progress_percent}%` : '0%' }}</span>
                    </div>
                    <div class="flex flex-col border-t pt-2 md:border-t-0 md:pt-0">
                        <span class="text-xs font-semibold text-gray-500">Amount Disbursed</span>
                        <span class="text-amber-700 font-bold mt-0.5">{{ formatCurrency(selectedWork.amount_disbursed) }}</span>
                    </div>
                    <div class="flex flex-col border-t pt-2 md:border-t-0 md:pt-0">
                        <span class="text-xs font-semibold text-gray-500">Amount Remaining</span>
                        <span class="text-amber-700 font-bold mt-0.5">{{ formatCurrency(selectedWork.amount_remaining) }}</span>
                    </div>
                </div>

                <div v-if="selectedWork.progress_description" class="pt-2 border-t border-gray-200">
                    <span class="text-xs font-semibold text-gray-500">Progress Description</span>
                    <p class="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed mt-1">{{ selectedWork.progress_description }}</p>
                </div>
            </div>

            <div v-if="selectedWork.scope_of_work" class="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-2">
                <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base">description</span>
                    Scope of Work
                </h4>
                <p class="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed pt-1">{{ selectedWork.scope_of_work }}</p>
            </div>

            <div v-if="selectedWork.remarks" class="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-2">
                <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base">comment</span>
                    Remarks
                </h4>
                <p class="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed pt-1">{{ selectedWork.remarks }}</p>
            </div>

            <div v-if="selectedWork.attachments_frontend?.length" class="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-3">
                <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base">attachment</span>
                    Attachments
                </h4>
                <div class="pt-1">
                    <AttachmentViewer :attachments="selectedWork.attachments_frontend" />
                </div>
            </div>

            <!-- Footer view actions -->
            <div class="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
                <button
                    type="button"
                    @click="mode = 'list'"
                    class="inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-200 focus:outline-none transition shadow-sm"
                >
                    Back to List
                </button>
                <button
                    type="button"
                    @click="handleEdit(selectedWork)"
                    class="inline-flex items-center px-4 py-2 bg-emerald-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-700 focus:outline-none transition shadow-sm"
                >
                    Edit Details
                </button>
            </div>
        </div>

        <!-- Create or Edit Mode -->
        <div v-else-if="(mode === 'create' || mode === 'edit')" class="p-6 max-h-[75vh] overflow-y-auto">
            <TAndDWorkForm
                :mhp-site-id="site.id"
                :t-and-d-work="selectedWork"
                :action="mode === 'edit' ? 'update' : 'create'"
                @success="handleFormSuccess"
                @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

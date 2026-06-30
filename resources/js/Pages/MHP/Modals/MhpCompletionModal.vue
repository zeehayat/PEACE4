<script setup>
import { ref, computed, watch } from 'vue';
import Modal from '@/Components/Modal.vue';
import MhpCompletionForm from '@/Pages/MHP/Forms/MhpCompletionForm.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';
import { formatDate } from '@/Utils/formatters';

const props = defineProps({
    show: Boolean,
    site: {
        type: Object,
        required: true,
    },
    completion: {
        type: Object,
        default: null,
    },
    action: {
        type: String,
        default: 'create',
    },
});

const emit = defineEmits(['close', 'saved']);

const isEditing = ref(false);

watch(() => props.show, (isVisible) => {
    if (isVisible) {
        isEditing.value = !props.completion || props.action === 'update';
    }
});

const modalTitle = computed(() => {
    if (isEditing.value) {
        return props.completion ? `Edit MHP Completion for ${props.site.project_id}` : `Add MHP Completion for ${props.site.project_id}`;
    }
    return `MHP Completion Details for ${props.site.project_id}`;
});

const handleFormSuccess = (message) => {
    emit('saved', message);
    emit('close');
};

const handleFormCancel = () => {
    if (props.completion) {
        isEditing.value = false;
    } else {
        emit('close');
    }
};

const hasRemarks = computed(() => {
    return props.completion?.remarks && props.completion.remarks.trim() !== '';
});
</script>

<template>
    <Modal :show="show" @close="emit('close')" :maxWidth="'3xl'" :title="modalTitle">
        <!-- Edit Mode (Form View) -->
        <div v-if="isEditing" class="p-6 max-h-[75vh] overflow-y-auto">
            <MhpCompletionForm
                :mhp-site-id="site.id"
                :completion="completion"
                :action="completion ? 'update' : 'create'"
                @success="handleFormSuccess"
                @cancel="handleFormCancel"
            />
        </div>

        <!-- View Mode (Details View) -->
        <div v-else-if="completion" class="p-6 max-h-[75vh] overflow-y-auto space-y-6">
            <div class="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
                <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base">verified_user</span>
                    Inauguration & Handover Schedule
                </h4>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    <div class="flex flex-col">
                        <span class="text-xs font-semibold text-gray-500">Scheme Inauguration Date</span>
                        <span class="text-gray-900 font-semibold mt-0.5">{{ formatDate(completion.scheme_inauguration_date) }}</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-xs font-semibold text-gray-500">Testing & Commissioning Date</span>
                        <span class="text-gray-900 font-semibold mt-0.5">{{ formatDate(completion.testing_commissioning_date) }}</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-xs font-semibold text-gray-500">Handover Date</span>
                        <span class="text-gray-900 font-semibold mt-0.5">{{ formatDate(completion.handover_date) }}</span>
                    </div>
                </div>
            </div>

            <div v-if="hasRemarks" class="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-2">
                <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base">notes</span>
                    Remarks
                </h4>
                <p class="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed pt-1">{{ completion.remarks }}</p>
            </div>

            <div v-if="completion.attachments_frontend?.length" class="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-3">
                <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base">attachment</span>
                    Attachments
                </h4>
                <div class="pt-1">
                    <AttachmentViewer :attachments="completion.attachments_frontend" />
                </div>
            </div>

            <!-- Footer view actions -->
            <div class="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
                <button
                    type="button"
                    @click="emit('close')"
                    class="inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-200 focus:outline-none transition shadow-sm"
                >
                    Close
                </button>
                <button
                    type="button"
                    @click="isEditing = true"
                    class="inline-flex items-center px-4 py-2 bg-emerald-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-700 focus:outline-none transition shadow-sm"
                >
                    Edit Completion
                </button>
            </div>
        </div>
    </Modal>
</template>

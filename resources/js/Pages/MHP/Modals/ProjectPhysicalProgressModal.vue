<script setup>
import { reactive, watch, ref, computed } from 'vue';
import { router } from '@inertiajs/vue3';
import axios from 'axios';

import Modal from '@/Components/Modal.vue';
import ProjectPhysicalProgressForm from '@/Pages/MHP/Forms/ProjectPhysicalProgressForm.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';
import { formatDate } from '@/Utils/formatters';

const props = defineProps({
    show: Boolean,
    site: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close', 'saved']);

const isLoadingProgress = ref(true);
const physicalProgresses = ref([]);
const showForm = ref(false);
const selectedProgress = ref(null);
const formMode = ref('create');
const progressTypeForForm = ref('Civil');

const fetchPhysicalProgress = async () => {
    isLoadingProgress.value = true;
    try {
        const { data } = await axios.get(
            route('mhp.sites.physical-progresses.index', { site: props.site.id }),
            { headers: { Accept: 'application/json' } }
        );

        const raw = Array.isArray(data) ? data : (data?.physicalProgresses ?? []);
        physicalProgresses.value = raw.map(p => ({
            id: p.id,
            percentage: p.progress_percentage ?? p.percentage ?? 0,
            date: p.progress_date ?? p.date,
            type: p.payment_for ?? p.type,
            remarks: p.remarks ?? '',
            attachments: p.attachments_frontend ?? p.attachments ?? [],
            original_model: p,
        }));
    } catch (error) {
        console.error('API call failed to fetch physical progress:', error);
        physicalProgresses.value = [];
    } finally {
        isLoadingProgress.value = false;
    }
};

watch(() => props.show, (newVal) => {
    if (newVal && props.site) {
        fetchPhysicalProgress();
        showForm.value = false;
        selectedProgress.value = null;
        formMode.value = 'create';
    } else {
        physicalProgresses.value = [];
    }
});

const openCreateForm = (type) => {
    selectedProgress.value = null;
    formMode.value = 'create';
    progressTypeForForm.value = type;
    showForm.value = true;
};

const openEditForm = (progress) => {
    selectedProgress.value = progress.original_model;
    progressTypeForForm.value = progress.type;
    formMode.value = 'update';
    showForm.value = true;
};

const handleFormSuccess = (message) => {
    showForm.value = false;
    selectedProgress.value = null;
    fetchPhysicalProgress();
    emit('saved', message);
};

const handleFormCancel = () => {
    showForm.value = false;
    selectedProgress.value = null;
};

const handleDeleteProgress = (progress) => {
    const progressId = progress.original_model.id;
    const progressType = progress.type;

    if (confirm(`Are you sure you want to delete this ${progressType} progress entry?`)) {
        router.delete(route('mhp.sites.physical-progresses.destroy', { physical_progress: progressId }), {
            onSuccess: () => {
                emit('saved', 'Physical Progress deleted successfully!');
                fetchPhysicalProgress();
            },
            preserveScroll: true,
        });
    }
};

const modalTitle = computed(() => {
    if (showForm.value) {
        const action = formMode.value === 'create' ? 'Record' : 'Edit';
        return `${action} ${progressTypeForForm.value} Progress - ${props.site.project_id}`;
    }
    return `Manage Physical Progress: ${props.site.project_id}`;
});
</script>

<template>
    <Modal :show="show" @close="emit('close')" :maxWidth="'4xl'" :title="modalTitle">
        <!-- Form View -->
        <div v-if="showForm" class="p-6 max-h-[75vh] overflow-y-auto">
            <ProjectPhysicalProgressForm
                :mhp-site-id="site.id"
                :progress="selectedProgress"
                :mode="formMode"
                :progress-type="progressTypeForForm"
                @success="handleFormSuccess"
                @cancel="handleFormCancel"
            />
        </div>

        <!-- List View -->
        <div v-else class="p-6 max-h-[75vh] overflow-y-auto space-y-5">
            <!-- Record New Action Buttons Header -->
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-paper-50 border border-ink-200 rounded-xl p-4 gap-3">
                <span class="text-xs font-bold text-ink-500 uppercase tracking-wider">Record New Progress</span>
                <div class="flex flex-wrap gap-2">
                    <button
                        @click="openCreateForm('Civil')"
                        class="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
                        type="button"
                    >
                        <span class="material-symbols-outlined text-[15px]">add</span>
                        Civil
                    </button>
                    <button
                        @click="openCreateForm('T&D')"
                        class="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
                        type="button"
                    >
                        <span class="material-symbols-outlined text-[15px]">add</span>
                        T&D
                    </button>
                    <button
                        @click="openCreateForm('EME')"
                        class="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
                        type="button"
                    >
                        <span class="material-symbols-outlined text-[15px]">add</span>
                        EME
                    </button>
                </div>
            </div>

            <!-- List entries -->
            <div class="space-y-3">
                <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base">timeline</span>
                    Physical Progress Timeline
                </h4>

                <div v-if="isLoadingProgress" class="text-center py-8 text-ink-400 text-sm font-semibold">
                    Loading physical progress entries...
                </div>
                <div v-else-if="physicalProgresses.length === 0" class="text-center py-8 bg-paper-50 border border-dashed rounded-xl text-ink-500 text-sm">
                    No physical progress entries recorded yet for this site.
                </div>
                <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div
                        v-for="progress in physicalProgresses"
                        :key="progress.id"
                        class="bg-surface border border-ink-200 rounded-xl p-4 shadow-sm hover:shadow transition flex flex-col justify-between"
                    >
                        <div class="space-y-2">
                            <div class="flex justify-between items-start">
                                <div>
                                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                                        {{ progress.percentage }}% Progress
                                    </span>
                                    <p class="text-xs font-semibold text-ink-500 mt-1">
                                        Component: <span class="text-ink-900 font-bold">{{ progress.type }}</span>
                                    </p>
                                </div>
                                <div class="flex items-center gap-1">
                                    <button
                                        @click="openEditForm(progress)"
                                        class="p-1 text-ink-500 hover:text-ink-900 hover:bg-paper-100 rounded-md transition"
                                        title="Edit"
                                    >
                                        <span class="material-symbols-outlined text-lg">edit</span>
                                    </button>
                                    <button
                                        @click="handleDeleteProgress(progress)"
                                        class="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition"
                                        title="Delete"
                                    >
                                        <span class="material-symbols-outlined text-lg">delete</span>
                                    </button>
                                </div>
                            </div>
                            
                            <p class="text-xs text-ink-500 flex items-center gap-1">
                                <span class="material-symbols-outlined text-[13px]">calendar_today</span>
                                Registered on {{ formatDate(progress.date) }}
                            </p>

                            <p v-if="progress.remarks" class="text-sm text-ink-700 leading-relaxed bg-paper-50 p-2 rounded-lg border border-ink-100">
                                <span class="font-medium text-xs text-ink-500 block mb-0.5">Remarks</span>
                                {{ progress.remarks }}
                            </p>

                            <div v-if="progress.attachments?.length" class="mt-2 pt-2 border-t">
                                <span class="text-xs font-semibold text-ink-500 block mb-1">Attachments</span>
                                <AttachmentViewer :attachments="progress.attachments" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer view actions -->
            <div class="flex justify-end pt-2 border-t border-ink-100">
                <button
                    type="button"
                    @click="emit('close')"
                    class="px-4 py-2 bg-paper-100 border border-ink-300 rounded-lg font-semibold text-xs text-ink-700 uppercase hover:bg-paper-200 transition shadow-sm"
                >
                    Close
                </button>
            </div>
        </div>
    </Modal>
</template>

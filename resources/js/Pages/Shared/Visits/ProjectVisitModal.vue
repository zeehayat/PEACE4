<script setup>
import { ref, watch, computed } from 'vue';
import { router } from '@inertiajs/vue3';
import axios from 'axios';

import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';
import AttachmentViewer from '@/Components/AttachmentComponent/AttachmentViewer.vue';
import ProjectVisitForm from './ProjectVisitForm.vue';

const props = defineProps({
    show: Boolean,
    parentId: { type: Number, required: true },
    visitableType: { type: String, required: true }, // 'irrigation_scheme' or 'mhp_site'
    projectName: { type: String, default: '' },
});

const emit = defineEmits(['close', 'saved']);

const isLoadingVisits = ref(true);
const visits = ref([]);
const showForm = ref(false);
const selectedVisit = ref(null);
const formMode = ref('create');

const formatDate = (dateString) => {
    if (!dateString) return '—';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
        return dateString;
    }
};

const fetchVisits = async () => {
    isLoadingVisits.value = true;
    try {
        const routeName = props.visitableType === 'irrigation_scheme'
            ? 'irrigation.schemes.visits.index'
            : 'mhp.sites.visits.index';

        const params = props.visitableType === 'irrigation_scheme'
            ? { scheme: props.parentId }
            : { site: props.parentId };

        const response = await axios.get(route(routeName, params));
        visits.value = response.data.visits ?? [];
    } catch (error) {
        console.error('Error fetching project visits:', error);
    } finally {
        isLoadingVisits.value = false;
    }
};

watch(() => props.show, (newVal) => {
    if (newVal) {
        fetchVisits();
        showForm.value = false;
        selectedVisit.value = null;
        formMode.value = 'create';
    } else {
        visits.value = [];
    }
}, { immediate: true });

const openCreateForm = () => {
    selectedVisit.value = null;
    formMode.value = 'create';
    showForm.value = true;
};

const openEditForm = (visit) => {
    selectedVisit.value = visit;
    formMode.value = 'update';
    showForm.value = true;
};

const handleFormSuccess = (message) => {
    showForm.value = false;
    selectedVisit.value = null;
    fetchVisits();
    emit('saved', message);
};

const handleFormCancel = () => {
    showForm.value = false;
    selectedVisit.value = null;
};

const handleDeleteVisit = (visitId) => {
    if (confirm('Are you sure you want to delete this visit log?')) {
        const routeName = props.visitableType === 'irrigation_scheme'
            ? 'irrigation.schemes.visits.destroy'
            : 'mhp.sites.visits.destroy';

        const params = props.visitableType === 'irrigation_scheme'
            ? { scheme: props.parentId, visit: visitId }
            : { site: props.parentId, visit: visitId };

        router.delete(route(routeName, params), {
            onSuccess: () => {
                emit('saved', 'Visit log deleted successfully!');
                fetchVisits();
            },
            onError: (errors) => {
                console.error('Error deleting visit:', errors);
            }
        });
    }
};

const closeModal = () => {
    emit('close');
};

const modalTitle = computed(() => {
    const prefix = props.projectName ? `[${props.projectName}] ` : '';
    if (showForm.value) {
        return formMode.value === 'create' ? `${prefix}Log Engineering/Field Visit` : `${prefix}Edit Engineering/Field Visit`;
    }
    return `${prefix}Manage Engineering & Field Visits`;
});
</script>

<template>
    <Modal :show="show" @close="closeModal" :maxWidth="'4xl'" :title="modalTitle">
        <div class="p-6 overflow-y-auto max-h-[85vh]">
            <div v-if="!showForm" class="space-y-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-bold text-gray-800">Visit History Log</h3>
                    <PrimaryButton @click="openCreateForm">
                        + Log New Visit
                    </PrimaryButton>
                </div>

                <div v-if="isLoadingVisits" class="text-center py-8 text-gray-500">
                    Loading visit history...
                </div>

                <div v-else-if="visits.length === 0" class="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
                    <span class="material-symbols-outlined text-4xl text-gray-300 block mb-2">directions_walk</span>
                    No field visits logged for this project yet.
                </div>

                <div v-else class="grid grid-cols-1 gap-4">
                    <div v-for="visit in visits" :key="visit.id" class="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm space-y-3">
                        <div class="flex justify-between items-start">
                            <div class="space-y-1">
                                <div class="flex items-center gap-2">
                                    <span class="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100">
                                        {{ visit.visit_type }}
                                    </span>
                                    <span class="text-gray-900 font-bold text-base">
                                        {{ visit.visitor_role }}
                                    </span>
                                </div>
                                <div class="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                    <span class="flex items-center gap-1 font-medium text-indigo-700">
                                        <span class="material-symbols-outlined text-[14px]">calendar_today</span>
                                        {{ formatDate(visit.visit_date) }}
                                    </span>
                                    <span v-if="visit.visitor_name" class="flex items-center gap-1">
                                        <span class="material-symbols-outlined text-[14px]">person</span>
                                        Visited by: {{ visit.visitor_name }}
                                    </span>
                                </div>
                            </div>
                            <div class="flex gap-2">
                                <button @click="openEditForm(visit)" class="inline-flex items-center justify-center p-1.5 bg-white text-gray-500 hover:text-indigo-600 rounded-md border border-gray-200 shadow-sm hover:shadow-md transition duration-150">
                                    <span class="material-symbols-outlined text-base">edit</span>
                                </button>
                                <button @click="handleDeleteVisit(visit.id)" class="inline-flex items-center justify-center p-1.5 bg-white text-gray-500 hover:text-red-600 rounded-md border border-gray-200 shadow-sm hover:shadow-md transition duration-150">
                                    <span class="material-symbols-outlined text-base">delete</span>
                                </button>
                            </div>
                        </div>

                        <div v-if="visit.remarks" class="text-sm text-gray-700 bg-white border border-gray-100 rounded-lg p-3 whitespace-pre-wrap leading-relaxed">
                            {{ visit.remarks }}
                        </div>

                        <div v-if="visit.attachments_frontend && visit.attachments_frontend.length" class="pt-2">
                            <span class="text-xs font-semibold text-gray-500 block mb-1.5">Visit Attachments</span>
                            <AttachmentViewer :attachments="visit.attachments_frontend" />
                        </div>
                    </div>
                </div>
            </div>

            <ProjectVisitForm
                v-else
                :parent-id="parentId"
                :visitable-type="visitableType"
                :visit="selectedVisit"
                :mode="formMode"
                @success="handleFormSuccess"
                @cancel="handleFormCancel"
            />
        </div>
    </Modal>
</template>

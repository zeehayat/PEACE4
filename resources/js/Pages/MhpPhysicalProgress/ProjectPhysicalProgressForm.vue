<script setup>
import { useForm, router } from '@inertiajs/vue3';
import { ref, watch, computed } from 'vue';
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';
import DatePicker from '@/Components/DatePicker.vue';

const props = defineProps({
    projectableId: { type: [Number, String], required: true },
    projectableType: { type: String, required: true },
    progress: { type: Object, default: null },
    mode: { type: String, default: 'create' },
});

const emit = defineEmits(['success', 'cancel']);

const progressTypes = ['Civil', 'T&D'];
const stepUpKvaOptions = [500, 750, 1000, 1250, 1500, 2000, 2500, 3000, 3500];
const stepDownKvaOptions = [25, 50, 75, 100, 150, 200];

const initializeTransformers = (transformersJson) => {
    if (Array.isArray(transformersJson)) {
        return transformersJson.map(item => ({ kva: item.kva, count: item.count || null }));
    }
    return [];
};

const form = useForm({
    _method: props.mode === 'edit' ? 'PUT' : 'POST',
    projectable_id: props.projectableId,
    projectable_type: props.projectableType,
    progress_percentage: props.progress?.progress_percentage ?? null,
    progress_date: props.progress?.progress_date || null,
    remarks: props.progress?.remarks || '',
    progress_type: props.progress?.progress_type || 'Civil',

    date_of_initiation_of_t_and_d_works: props.progress?.t_and_d_work?.date_of_initiation_of_t_and_d_works || null,
    step_up_transformers: initializeTransformers(props.progress?.t_and_d_work?.step_up_transformers),
    step_down_transformers: initializeTransformers(props.progress?.t_and_d_work?.step_down_transformers),
    ht_poles: props.progress?.t_and_d_work?.ht_poles ?? null,
    lt_poles: props.progress?.t_and_d_work?.lt_poles ?? null,
    ht_conductor_length_acsr_km: props.progress?.t_and_d_work?.ht_conductor_length_acsr_km ?? null,
    ht_conductor_dia: props.progress?.t_and_d_work?.ht_conductor_dia || '',
    uaac_lt_conductor_length_km: props.progress?.t_and_d_work?.uaac_lt_conductor_length_km ?? null,
    uaac_lt_conductor_dia: props.progress?.t_and_d_work?.uaac_lt_conductor_dia || '',

    attachments: [],
    removed_attachments: [],
});

const existingAttachments = ref(props.progress?.attachments || []);

watch(
    () => props.progress,
    (newProgress) => {
        if (props.mode === 'edit' && newProgress) {
            form.projectable_id = props.projectableId;
            form.projectable_type = props.projectableType;
            form.progress_percentage = newProgress.progress_percentage ?? null;
            form.progress_date = newProgress.progress_date || null;
            form.remarks = newProgress.remarks || '';
            form.progress_type = newProgress.progress_type || 'Civil';

            form.date_of_initiation_of_t_and_d_works = newProgress.t_and_d_work?.date_of_initiation_of_t_and_d_works || null;
            form.step_up_transformers = initializeTransformers(newProgress.t_and_d_work?.step_up_transformers);
            form.step_down_transformers = initializeTransformers(newProgress.t_and_d_work?.step_down_transformers);
            form.ht_poles = newProgress.t_and_d_work?.ht_poles ?? null;
            form.lt_poles = newProgress.t_and_d_work?.lt_poles ?? null;
            form.ht_conductor_length_acsr_km = newProgress.t_and_d_work?.ht_conductor_length_acsr_km ?? null;
            form.ht_conductor_dia = newProgress.t_and_d_work?.ht_conductor_dia || '';
            form.uaac_lt_conductor_length_km = newProgress.t_and_d_work?.uaac_lt_conductor_length_km ?? null;
            form.uaac_lt_conductor_dia = newProgress.t_and_d_work?.uaac_lt_conductor_dia || '';

            existingAttachments.value = newProgress.attachments || [];
            form.attachments = [];
            form.removed_attachments = [];
        } else if (props.mode === 'create') {
            form.reset();
            form.projectable_id = props.projectableId;
            form.projectable_type = props.projectableType;
            form.progress_type = 'Civil';
            form.attachments = [];
            form.removed_attachments = [];
            existingAttachments.value = [];
        }
    },
    { immediate: true, deep: true }
);

const handleRemoveExistingAttachment = (fileId) => {
    form.removed_attachments.push(fileId);
    existingAttachments.value = existingAttachments.value.filter(f => f.id !== fileId);
};

const addTransformer = (type) => {
    if (type === 'step_up') {
        form.step_up_transformers.push({ kva: null, count: null });
    } else if (type === 'step_down') {
        form.step_down_transformers.push({ kva: null, count: null });
    }
};

const removeTransformer = (type, index) => {
    if (type === 'step_up') {
        form.step_up_transformers.splice(index, 1);
    } else if (type === 'step_down') {
        form.step_down_transformers.splice(index, 1);
    }
};


const submitForm = () => {
    const url = props.mode === 'create'
        ? route('mhp.project-physical-progress.store')
        : route('mhp.project-physical-progress.update', props.progress.id);

    const formDataPayload = new FormData();

    for (const key in form.data()) {
        if (key === 'attachments' || key === 'removed_attachments') {
            continue;
        }
        if (['step_up_transformers', 'step_down_transformers'].includes(key)) {
            const filteredTransformers = form.data()[key].filter(t => t.kva && t.count);
            formDataPayload.append(key, JSON.stringify(filteredTransformers));
        } else {
            const value = form.data()[key];
            formDataPayload.append(key, value === null || value === undefined ? '' : value);
        }
    }

    if (props.mode === 'edit') {
        formDataPayload.append('_method', 'PUT');
    }

    form.attachments.forEach(file => {
        if (file instanceof File) {
            formDataPayload.append('attachments[]', file);
        } else {
            console.warn('Physical Progress Form: Skipping invalid new attachment:', file);
        }
    });

    form.removed_attachments.forEach(id => {
        formDataPayload.append('removed_attachments[]', id);
    });

    router.post(url, formDataPayload, {
        onSuccess: () => {
            emit('success', `Physical Progress ${props.mode === 'create' ? 'saved' : 'updated'} successfully!`);
        },
        onError: (errors) => {
            console.error('Physical Progress Form Submission Errors:', errors);
        },
    });
};

const cancelForm = () => {
    emit('cancel');
};
</script>

<template>
    <form @submit.prevent="submitForm" class="p-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
            <div class="col-span-full">
                <label class="block text-sm font-medium text-gray-700 mb-1">Project Context</label>
                <div class="input-compact bg-gray-100 text-gray-700 font-semibold cursor-not-allowed flex items-center h-[38px] px-3 py-1.5 rounded-lg">
                    {{ projectableType.includes('MhpSite') ? `MHP Site ID: ${projectableId}` : `Irrigation Scheme ID: ${projectableId}` }}
                </div>
                <input type="hidden" v-model="form.projectable_id" />
                <input type="hidden" v-model="form.projectable_type" />
            </div>

            <div>
                <label for="progress_percentage" class="block text-sm font-medium text-gray-700 mb-1">Progress Percentage (%)</label>
                <input type="number" step="0.01" id="progress_percentage" v-model.number="form.progress_percentage" class="input-compact" />
                <div v-if="form.errors.progress_percentage" class="text-red-500 text-xs mt-1">{{ form.errors.progress_percentage }}</div>
            </div>

            <div>
                <label for="progress_date" class="block text-sm font-medium text-gray-700 mb-1">Progress Date</label>
                <DatePicker v-model="form.progress_date" id="progress_date" class="input-compact" />
                <div v-if="form.errors.progress_date" class="text-red-500 text-xs mt-1">{{ form.errors.progress_date }}</div>
            </div>

            <div>
                <label for="remarks" class="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea id="remarks" v-model="form.remarks" rows="3" class="input-compact"></textarea>
                <div v-if="form.errors.remarks" class="text-red-500 text-xs mt-1">{{ form.errors.remarks }}</div>
            </div>

            <div>
                <label for="progress_type" class="block text-sm font-medium text-gray-700 mb-1">Progress Type</label>
                <select id="progress_type" v-model="form.progress_type" class="input-compact">
                    <option v-for="type in progressTypes" :key="type" :value="type">{{ type }}</option>
                </select>
                <div v-if="form.errors.progress_type" class="text-red-500 text-xs mt-1">{{ form.errors.progress_type }}</div>
            </div>
        </div> <hr class="my-6 border-gray-300" />

        <div v-if="form.progress_type === 'T&D'" class="mt-6 border-t pt-6 border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Transmission & Distribution Details</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                <div>
                    <label for="date_of_initiation_of_t_and_d_works" class="block text-sm font-medium text-gray-700 mb-1">Date of T&D Works Initiation</label>
                    <DatePicker v-model="form.date_of_initiation_of_t_and_d_works" id="date_of_initiation_of_t_and_d_works" class="input-compact" />
                    <div v-if="form.errors.date_of_initiation_of_t_and_d_works" class="text-red-500 text-xs mt-1">{{ form.errors.date_of_initiation_of_t_and_d_works }}</div>
                </div>

                <div class="col-span-full border-t pt-4 mt-4">
                    <h4 class="text-base font-medium text-gray-700 mb-2">Step Up Transformers</h4>
                    <div v-for="(tx, index) in form.step_up_transformers" :key="index" class="grid grid-cols-3 gap-2 items-end mb-2">
                        <div>
                            <label :for="`step_up_kva_${index}`" class="block text-xs font-medium text-gray-600 mb-1">KVA Rating</label>
                            <select :id="`step_up_kva_${index}`" v-model.number="tx.kva" class="input-compact">
                                <option value="">Select KVA</option>
                                <option v-for="kva in stepUpKvaOptions" :key="kva" :value="kva">{{ kva }} KVA</option>
                            </select>
                            <div v-if="form.errors[`step_up_transformers.${index}.kva`]" class="text-red-500 text-xs mt-1">{{ form.errors[`step_up_transformers.${index}.kva`] }}</div>
                        </div>
                        <div>
                            <label :for="`step_up_count_${index}`" class="block text-xs font-medium text-gray-600 mb-1">Count</label>
                            <input :id="`step_up_count_${index}`" v-model.number="tx.count" type="number" min="1" class="input-compact" />
                            <div v-if="form.errors[`step_up_transformers.${index}.count`]" class="text-red-500 text-xs mt-1">{{ form.errors[`step_up_transformers.${index}.count`] }}</div>
                        </div>
                        <div class="flex items-end">
                            <button type="button" @click="removeTransformer('step_up', index)" class="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">Remove</button>
                        </div>
                    </div>
                    <button type="button" @click="addTransformer('step_up')" class="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300">Add Step Up Transformer</button>
                </div>

                <div class="col-span-full border-t pt-4 mt-4">
                    <h4 class="text-base font-medium text-gray-700 mb-2">Step Down Transformers</h4>
                    <div v-for="(tx, index) in form.step_down_transformers" :key="index" class="grid grid-cols-3 gap-2 items-end mb-2">
                        <div>
                            <label :for="`step_down_kva_${index}`" class="block text-xs font-medium text-gray-600 mb-1">KVA Rating</label>
                            <select :id="`step_down_kva_${index}`" v-model.number="tx.kva" class="input-compact">
                                <option value="">Select KVA</option>
                                <option v-for="kva in stepDownKvaOptions" :key="kva" :value="kva">{{ kva }} KVA</option>
                            </select>
                            <div v-if="form.errors[`step_down_transformers.${index}.kva`]" class="text-red-500 text-xs mt-1">{{ form.errors[`step_down_transformers.${index}.kva`] }}</div>
                        </div>
                        <div>
                            <label :for="`step_down_count_${index}`" class="block text-xs font-medium text-gray-600 mb-1">Count</label>
                            <input :id="`step_down_count_${index}`" v-model.number="tx.count" type="number" min="1" class="input-compact" />
                            <div v-if="form.errors[`step_down_transformers.${index}.count`]" class="text-red-500 text-xs mt-1">{{ form.errors[`step_down_transformers.${index}.count`] }}</div>
                        </div>
                        <div class="flex items-end">
                            <button type="button" @click="removeTransformer('step_down', index)" class="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">Remove</button>
                        </div>
                    </div>
                    <button type="button" @click="addTransformer('step_down')" class="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300">Add Step Down Transformer</button>
                </div>

                <div class="col-span-full grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3 border-t pt-4 mt-4">
                    <div>
                        <label for="ht_poles" class="block text-sm font-medium text-gray-700 mb-1">No. of HT Poles</label>
                        <input type="number" id="ht_poles" v-model.number="form.ht_poles" class="input-compact" />
                        <div v-if="form.errors.ht_poles" class="text-red-500 text-xs mt-1">{{ form.errors.ht_poles }}</div>
                    </div>
                    <div>
                        <label for="lt_poles" class="block text-sm font-medium text-gray-700 mb-1">No. of LT Poles</label>
                        <input type="number" id="lt_poles" v-model.number="form.lt_poles" class="input-compact" />
                        <div v-if="form.errors.lt_poles" class="text-red-500 text-xs mt-1">{{ form.errors.lt_poles }}</div>
                    </div>
                    <div>
                        <label for="ht_conductor_length_acsr_km" class="block text-sm font-medium text-gray-700 mb-1">HT Conductor Length (ACSR) (KM)</label>
                        <input type="number" step="0.01" id="ht_conductor_length_acsr_km" v-model.number="form.ht_conductor_length_acsr_km" class="input-compact" />
                        <div v-if="form.errors.ht_conductor_length_acsr_km" class="text-red-500 text-xs mt-1">{{ form.errors.ht_conductor_length_acsr_km }}</div>
                    </div>
                    <div>
                        <label for="ht_conductor_dia" class="block text-sm font-medium text-gray-700 mb-1">HT Conductor Dia</label>
                        <input type="text" id="ht_conductor_dia" v-model="form.ht_conductor_dia" class="input-compact" />
                        <div v-if="form.errors.ht_conductor_dia" class="text-red-500 text-xs mt-1">{{ form.errors.ht_conductor_dia }}</div>
                    </div>
                    <div>
                        <label for="uaac_lt_conductor_length_km" class="block text-sm font-medium text-gray-700 mb-1">UAAC/LT Conductor Length (KM)</label>
                        <input type="number" step="0.01" id="uaac_lt_conductor_length_km" v-model.number="form.uaac_lt_conductor_length_km" class="input-compact" />
                        <div v-if="form.errors.uaac_lt_conductor_length_km" class="text-red-500 text-xs mt-1">{{ form.errors.uaac_lt_conductor_length_km }}</div>
                    </div>
                    <div>
                        <label for="uaac_lt_conductor_dia" class="block text-sm font-medium text-gray-700 mb-1">UAAC/LT Conductor Dia</label>
                        <input type="text" id="uaac_lt_conductor_dia" v-model="form.uaac_lt_conductor_dia" class="input-compact" />
                        <div v-if="form.errors.uaac_lt_conductor_dia" class="text-red-500 text-xs mt-1">{{ form.errors.uaac_lt_conductor_dia }}</div>
                    </div>
                </div>
            </div>

            <div class="mt-6">
                <label class="block text-sm font-medium text-gray-700 mb-1">Progress Attachments</label>
                <AttachmentUploader
                    v-model="newAttachments"
                    label="New Attachments"
                    :existing="existingAttachments"
                    @removeExisting="handleRemoveExistingAttachment"
                />
                <div v-if="form.errors['attachments.0']" class="text-red-500 text-xs mt-1">{{ form.errors['attachments.0'] }}</div>
            </div>

            <div class="flex justify-end mt-4 space-x-2">
                <button type="button" @click="cancelForm" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Cancel
                </button>
                <button type="submit" :disabled="form.processing" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {{ form.processing ? 'Saving...' : (mode === 'create' ? 'Add Progress' : 'Update Progress') }}
                </button>
            </div>
        </div>
    </form>
</template>

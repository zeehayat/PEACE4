<script setup>
import { ref, watch, computed } from 'vue'
import { useForm, router } from '@inertiajs/vue3'
import Modal from '@/Components/Modal.vue'
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue'

const props = defineProps({
    show: Boolean,
    site: Object, // The MhpSite object, now including physicalProgresses
    projectPhysicalProgress: Object, // Existing record if editing
    mode: { type: String, default: 'create' } // 'create' or 'edit'
})

const emit = defineEmits(['close', 'saved'])

const newAttachments = ref([])
const existingAttachments = ref([])
const attachmentsToRemove = ref([])

const form = useForm({
    projectable_id: props.site?.id,
    projectable_type: 'App\\Models\\MhpSite',
    progress_percentage: '',
    progress_date: '',
    remarks: '',
    project_type: 'MHP',
    reference_code: props.site?.cbo?.reference_code || '',
})

// Determine the next available milestone
const nextMilestone = computed(() => {
    if (props.mode === 'edit') {
        return form.progress_percentage; // In edit mode, retain current percentage
    }

    const existingPercentages = new Set(
        props.site.physicalProgresses?.map(p => p.progress_percentage) || []
    );
    const milestones = [25, 50, 75, 100];

    for (const milestone of milestones) {
        if (!existingPercentages.has(milestone)) {
            return milestone;
        }
    }
    return null; // All milestones recorded
});

// Watch for site changes to initialize form for create mode or reset for edit
watch(
    () => [props.site, props.projectPhysicalProgress],
    ([newSite, newProgress]) => {
        if (newProgress) { // Edit mode
            form.projectable_id = newProgress.projectable_id;
            form.projectable_type = newProgress.projectable_type;
            form.progress_percentage = newProgress.progress_percentage;
            form.progress_date = newProgress.progress_date;
            form.remarks = newProgress.remarks;
            form.project_type = newProgress.project_type;
            form.reference_code = newProgress.reference_code;
            existingAttachments.value = newProgress.attachments || [];
        } else if (newSite) { // Create mode, or reset after edit
            form.projectable_id = newSite.id;
            form.projectable_type = 'App\\Models\\MhpSite';
            form.progress_percentage = nextMilestone.value || ''; // Automatically set next milestone
            form.progress_date = '';
            form.remarks = '';
            form.project_type = 'MHP';
            form.reference_code = newSite.cbo?.reference_code || '';
            existingAttachments.value = [];
        }
        newAttachments.value = [];
        attachmentsToRemove.value = [];
    },
    { immediate: true, deep: true }
);

const removeExisting = (file) => {
    attachmentsToRemove.value.push(file.id)
    existingAttachments.value = existingAttachments.value.filter(f => f.id !== file.id)
}

const submit = () => {
    const data = new FormData()
    Object.entries(form.data()).forEach(([key, val]) => {
        data.append(key, val ?? '')
    })
    newAttachments.value.forEach(file => {
        data.append('attachments[]', file)
    })
    attachmentsToRemove.value.forEach(id => {
        data.append('removed_attachments[]', id)
    })

    const url = props.mode === 'create'
        ? '/mhp/project-physical-progress'
        : `/mhp/project-physical-progress/${props.projectPhysicalProgress.id}`

    if (props.mode === 'edit') {
        data.append('_method', 'PUT')
    }

    router.post(url, data, {
        forceFormData: true,
        onSuccess: () => {
            emit('saved', 'Physical progress saved successfully.')
            emit('close')
        },
        onError: (errors) => {
            console.error('Validation Errors:', errors)
        }
    })
}

// Display existing physical progresses for context (optional, but good for user)
const sortedPhysicalProgresses = computed(() => {
    return [...(props.site.physicalProgresses || [])].sort((a, b) => a.progress_percentage - b.progress_percentage);
});

const isMaxMilestoneReached = computed(() => {
    return nextMilestone.value === null && props.mode === 'create';
});
</script>

<template>
    <Modal :show="show" @close="emit('close')" :title="mode === 'create' ? 'Add Physical Progress' : 'Edit Physical Progress'">
        <div v-if="isMaxMilestoneReached" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong class="font-bold">All Milestones Recorded!</strong>
            <span class="block sm:inline">All physical progress milestones (25%, 50%, 75%, 100%) have already been recorded for this project.</span>
        </div>

        <div v-if="sortedPhysicalProgresses.length > 0" class="mb-4 p-3 bg-gray-50 rounded-md">
            <h4 class="text-sm font-semibold mb-2">Recorded Progress:</h4>
            <ul class="list-disc list-inside text-sm text-gray-700">
                <li v-for="p in sortedPhysicalProgresses" :key="p.id">
                    {{ p.progress_percentage }}% on {{ p.progress_date }} - {{ p.remarks || 'No remarks' }}
                </li>
            </ul>
        </div>


        <form @submit.prevent="submit" class="space-y-4" :class="{ 'opacity-50': isMaxMilestoneReached, 'pointer-events-none': isMaxMilestoneReached }">
            <div>
                <label class="block text-sm font-medium text-gray-700">Project Type</label>
                <input v-model="form.project_type" type="text" class="input bg-gray-100" readonly />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Reference Code</label>
                <input v-model="form.reference_code" type="text" class="input bg-gray-100" readonly />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Progress Percentage</label>
                <input v-model="form.progress_percentage" type="number" min="0" max="100" class="input bg-gray-100" readonly />
                <div v-if="form.errors.progress_percentage" class="text-red-500 text-xs mt-1">{{ form.errors.progress_percentage }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Progress Date</label>
                <input v-model="form.progress_date" type="date" class="input" />
                <div v-if="form.errors.progress_date" class="text-red-500 text-xs mt-1">{{ form.errors.progress_date }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Remarks</label>
                <textarea v-model="form.remarks" class="input"></textarea>
                <div v-if="form.errors.remarks" class="text-red-500 text-xs mt-1">{{ form.errors.remarks }}</div>
            </div>

            <AttachmentUploader
                v-model="newAttachments"
                :existing="existingAttachments"
                @removeExisting="removeExisting"
            />
            <div v-if="form.errors['attachments.0']" class="text-red-500 text-xs mt-1">{{ form.errors['attachments.0'] }}</div>


            <div class="text-right">
                <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" :disabled="form.processing || isMaxMilestoneReached">
                    {{ form.processing ? 'Saving...' : (mode === 'create' ? 'Save Progress' : 'Update Progress') }}
                </button>
            </div>
        </form>
    </Modal>
</template>

<style scoped>
.input {
    @apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm;
}
</style>

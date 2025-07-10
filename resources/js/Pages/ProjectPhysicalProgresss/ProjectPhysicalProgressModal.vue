<script setup>
import { ref, watch, computed } from 'vue'
import { useForm, router } from '@inertiajs/vue3'
import Modal from '@/Components/Modal.vue'
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue'

const props = defineProps({
    show: Boolean,
    site: Object, // The Site object (with physicalProgresses)
    projectPhysicalProgress: Object, // Existing record if editing
    mode: { type: String, default: 'create' }, // 'create' or 'edit'
    projectable_type: { type: String, default: 'App\\Models\\MhpSite' }, // default type
    project_type: { type: String, default: 'MHP' }, // default project type
})

const emit = defineEmits(['close', 'saved'])

const newAttachments = ref([])
const existingAttachments = ref([])
const attachmentsToRemove = ref([])
console.log(props.project_type, "In the Main")
// Remove hard-coded default project_type/projectable_type here
const form = useForm({
    projectable_id: null,
    projectable_type: null,
    progress_percentage: '',
    progress_date: '',
    remarks: '',
    project_type: '',
    reference_code: '',
})

// Calculate next available milestone in create mode
const nextMilestone = computed(() => {
    if (props.mode === 'edit') {
        return form.progress_percentage
    }

    const existingPercentages = new Set(
        props.site?.physicalProgresses?.map(p => p.progress_percentage) || []
    )

    const milestones = [25, 50, 75, 100]
    for (const milestone of milestones) {
        if (!existingPercentages.has(milestone)) {
            return milestone
        }
    }
    return null // All milestones recorded
})

// Properly update form values reactively when props change
watch(
    () => [props.site, props.projectPhysicalProgress, props.project_type, props.projectable_type],
    ([newSite, newProgress, newProjectType, newProjectableType]) => {
        const isEdit = !!newProgress

        form.projectable_id = isEdit ? newProgress.projectable_id : newSite?.id
        form.projectable_type = isEdit
            ? (newProgress.projectable_type || newProjectableType)
            : newProjectableType

        form.progress_percentage = isEdit
            ? newProgress.progress_percentage
            : (nextMilestone.value || '')
        form.progress_date = isEdit ? newProgress.progress_date : ''
        form.remarks = isEdit ? newProgress.remarks : ''

        form.project_type = isEdit
            ? (newProgress.project_type || newProjectType)
            : newProjectType

        form.reference_code = isEdit
            ? newProgress.reference_code
            : (newSite?.cbo?.reference_code || '')

        existingAttachments.value = isEdit ? (newProgress.attachments || []) : []
        newAttachments.value = []
        attachmentsToRemove.value = []

        console.log(`[watcher] form.project_type =`, props.project_type)
    },
    { immediate: true, deep: true }
)

// Remove an existing attachment
const removeExisting = (file) => {
    attachmentsToRemove.value.push(file.id)
    existingAttachments.value = existingAttachments.value.filter(f => f.id !== file.id)
}

// Submit form
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

const sortedPhysicalProgresses = computed(() => {
    return [...(props.site?.physicalProgresses || [])].sort((a, b) => a.progress_percentage - b.progress_percentage)
})

const isMaxMilestoneReached = computed(() => {
    return nextMilestone.value === null && props.mode === 'create'
})
</script>

<template>

    <Modal
        :show="show"
        @close="emit('close')"
        :title="mode === 'create' ? 'Add Physical Progress' : 'Edit Physical Progress'"
        class=""
    ><h1 class="text-4xl">Projectable Type {{projectable_type}}</h1>
        <!-- Milestone alert -->
        <div
            v-if="isMaxMilestoneReached"
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
        >
            <strong class="font-bold">All Milestones Recorded!</strong>
            <span class="block sm:inline">
        All physical progress milestones (25%, 50%, 75%, 100%) have already been recorded.
      </span>
        </div>

        <!-- Existing progress list -->
        <div v-if="sortedPhysicalProgresses.length > 0" class="mb-4 p-3 bg-gray-50 rounded-md">
            <h4 class="text-sm font-semibold mb-2">Recorded Progress:</h4>
            <ul class="list-disc list-inside text-sm text-gray-700">
                <li v-for="p in sortedPhysicalProgresses" :key="p.id">
                    {{ p.progress_percentage }}% on {{ p.progress_date }} - {{ p.remarks || 'No remarks' }}
                </li>
            </ul>
        </div>

        <!-- Form -->
        <form
            @submit.prevent="submit"
            class="space-y-4"
            :class="{ 'opacity-50': isMaxMilestoneReached, 'pointer-events-none': isMaxMilestoneReached }"
        >
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
                <div v-if="form.errors.progress_percentage" class="text-red-500 text-xs mt-1">
                    {{ form.errors.progress_percentage }}
                </div>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700">Progress Date</label>
                <input v-model="form.progress_date" type="date" class="input" />
                <div v-if="form.errors.progress_date" class="text-red-500 text-xs mt-1">
                    {{ form.errors.progress_date }}
                </div>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700">Remarks</label>
                <textarea v-model="form.remarks" class="input"></textarea>
                <div v-if="form.errors.remarks" class="text-red-500 text-xs mt-1">
                    {{ form.errors.remarks }}
                </div>
            </div>

            <!-- Attachments -->
            <AttachmentUploader
                v-model="newAttachments"
                :existing="existingAttachments"
                @removeExisting="removeExisting"
            />
            <div v-if="form.errors['attachments.0']" class="text-red-500 text-xs mt-1">
                {{ form.errors['attachments.0'] }}
            </div>

            <!-- Submit -->
            <div class="text-right">
                <button
                    type="submit"
                    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    :disabled="form.processing || isMaxMilestoneReached"
                >
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

<script setup>
import { ref, watch } from 'vue'
import { useForm, router } from '@inertiajs/vue3'
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue'

const props = defineProps({
    show: Boolean,
    action: { type: String, default: 'create' },
    mhpSiteId: { type: [String, Number], required: true },
    approval: { type: Object, default: null }
})

const emit = defineEmits(['close', 'updated'])

const statuses = {
    eu_approval_date: 'EU Approval Date',
    approved_cost: 'Approved Cost',
    revised_cost_1: 'Revised Cost 1',
    revised_cost_2: 'Revised Cost 2',
    revised_cost_3: 'Revised Cost 3',
    hpp_inauguration_date: 'HPP Inauguration Date',
    technical_survey_date: 'Technical Survey Date',
    date_design_psu_submission: 'Design PSU Submission',
    headoffice_review_submission_date: 'Head Office Review Submission',
    design_estimate_date: 'Design Estimate Date',
    eu_approval_submission_date: 'EU Approval Submission',
    opm_validation_date: 'OPM Validation Date'
}

const form = useForm({})
const newAttachments = ref([])
const existingAttachments = ref([]) // current existing attachments
const attachmentsToRemove = ref([]) // track removed attachments

const formatDate = (val) => {
    if (!val) return ''
    if (val.length >= 10) return val.substring(0, 10)
    return val
}

const initForm = () => {
    form.defaults({
        mhp_site_id: props.mhpSiteId,
        eu_approval_date: formatDate(props.approval?.eu_approval_date),
        approved_cost: props.approval?.approved_cost ?? '',
        revised_cost_1: props.approval?.revised_cost_1 ?? '',
        revised_cost_2: props.approval?.revised_cost_2 ?? '',
        revised_cost_3: props.approval?.revised_cost_3 ?? '',
        hpp_inauguration_date: formatDate(props.approval?.hpp_inauguration_date),
        technical_survey_date: formatDate(props.approval?.technical_survey_date),
        date_design_psu_submission: formatDate(props.approval?.date_design_psu_submission),
        headoffice_review_submission_date: formatDate(props.approval?.headoffice_review_submission_date),
        design_estimate_date: formatDate(props.approval?.design_estimate_date),
        eu_approval_submission_date: formatDate(props.approval?.eu_approval_submission_date),
        opm_validation_date: formatDate(props.approval?.opm_validation_date)
    })

    existingAttachments.value = props.approval?.attachments ?? []
    newAttachments.value = []
    attachmentsToRemove.value = []
}

watch(() => props.approval, initForm, { immediate: true, deep: true })

const removeExisting = (file) => {
    attachmentsToRemove.value.push(file.id)
    existingAttachments.value = existingAttachments.value.filter(f => f.id !== file.id)
}

const submit = () => {
    const route =
        props.action === 'create'
            ? '/mhp/mhp-admin-approvals'
            : `/mhp/mhp-admin-approvals/${props.approval.id}`

    const method = props.action === 'create' ? 'post' : 'post'

    const data = new FormData()
    Object.entries(form.data()).forEach(([key, val]) => {
        data.append(key, val ?? '')
    })

    newAttachments.value.forEach(file => {
        data.append('attachments[]', file)
    })

    attachmentsToRemove.value.forEach(id => {
        data.append('remove_attachments[]', id)
    })

    if (props.action === 'update') {
        data.append('_method', 'PUT')
    }

    router.post(route, data, {
        forceFormData: true,
        onSuccess: () => {
            emit('updated', props.action === 'create' ? 'Approval saved.' : 'Approval updated.')
            emit('close')
        }
    })
}
</script>

<template>
    <div v-if="show" class="fixed inset-0 z-50 bg-black bg-opacity-50 w-full flex items-center justify-center overflow-y-auto p-4">
        <div class="bg-white rounded-lg shadow-lg p-4 max-w-2xl w-full relative">
            <button @click="$emit('close')" class="absolute top-2 right-2 text-lg">✖</button>

            <h2 class="text-xl font-bold mb-4">
                {{ props.action === 'create' ? 'Add' : 'Edit' }} Admin Approval
            </h2>

            <form @submit.prevent="submit" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <template v-for="(label, field) in statuses" :key="field">
                    <div>
                        <label class="font-semibold">{{ label }}</label>
                        <input
                            v-model="form[field]"
                            :type="field.includes('date') ? 'date' : 'number'"
                            class="input"
                        />
                        <div v-if="form.errors[field]" class="text-red-500 text-xs">
                            {{ form.errors[field] }}
                        </div>
                    </div>
                </template>

                <div class="col-span-full">
                    <AttachmentUploader
                        v-model="newAttachments"
                        label="New Attachments"
                        :existing="existingAttachments"
                        @remove-existing="removeExisting"
                    />
                </div>

                <div class="col-span-full text-right mt-4">
                    <button
                        type="submit"
                        :disabled="form.processing"
                        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        {{ form.processing ? 'Saving…' : props.action === 'create' ? 'Save' : 'Update' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.input {
    @apply w-full border border-gray-300 rounded px-2 py-1 mt-1
    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-sm;
}
</style>

<script setup>
import { ref, watch } from 'vue'
import { router } from '@inertiajs/vue3'

const props = defineProps({
    action: { type: String, default: 'create' }, // create or update
    mhpSiteId: { type: [String, Number], required: true },
    approval: { type: Object, default: null },
    errors: Object,
})

const emit = defineEmits(['close'])

const form = ref({})

// formats date to YYYY-MM-DD
const formatDate = (val) => {
    if (!val) return ''
    if (val.length >= 10) return val.substring(0, 10)
    return val
}

// initialize form when mounted or approval changes
const initForm = () => {
    form.value = {
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
        opm_validation_date: formatDate(props.approval?.opm_validation_date),
    }
}

watch(() => props.approval, initForm, { immediate: true, deep: true })

const submit = () => {
    const url = props.action === 'create'
        ? '/mhp-admin-approvals'
        : `/mhp-admin-approvals/${props.approval.id}`

    const method = props.action === 'create' ? router.post : router.put

    method(url, form.value, {
        onSuccess: () => {
            emit('close')
            router.reload({ only: ['mhpSites', 'flash'] })
        }
    })
}
</script>

<template>
    <div class="bg-white rounded-lg shadow-lg p-4 max-w-2xl w-full relative">
        <button @click="$emit('close')" class="absolute top-2 right-2">✖</button>

        <h2 class="text-xl font-bold mb-4">
            {{ props.action === 'create' ? 'Add' : 'Edit' }} Admin Approval
        </h2>

        <form @submit.prevent="submit" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <template v-for="(field, label) in {
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
      }" :key="field">
                <div>
                    <label class="font-semibold">{{ label }}</label>
                    <input
                        v-model="form[field]"
                        :type="field.includes('date') ? 'date' : 'number'"
                        class="input"
                    />
                    <div v-if="errors?.[field]" class="text-red-500 text-xs">{{ errors[field] }}</div>
                </div>
            </template>

            <div class="col-span-full text-right mt-4">
                <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    {{ props.action === 'create' ? 'Save' : 'Update' }}
                </button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.input {
    @apply w-full border border-gray-300 rounded px-2 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-sm;
}
</style>

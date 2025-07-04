<script setup>
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import { CalendarDaysIcon, CurrencyDollarIcon, PencilIcon } from 'lucide-vue-next'
import FormError from '@/Components/FormError.vue'

const props = defineProps({
    action: { type: String, default: 'create' },
    mhpSiteId: { type: [String, Number], required: true },
    approval: { type: Object, default: null },
    errors: Object,
})

const form = ref({
    mhp_site_id: props.mhpSiteId,
    eu_approval_date: props.approval?.eu_approval_date ?? '',
    approved_cost: props.approval?.approved_cost ?? '',
    revised_cost_1: props.approval?.revised_cost_1 ?? '',
    revised_cost_2: props.approval?.revised_cost_2 ?? '',
    revised_cost_3: props.approval?.revised_cost_3 ?? '',
    hpp_inauguration_date: props.approval?.hpp_inauguration_date ?? '',
    technical_survey_date: props.approval?.technical_survey_date ?? '',
    date_design_psu_submission: props.approval?.date_design_psu_submission ?? '',
    headoffice_review_submission_date: props.approval?.headoffice_review_submission_date ?? '',
    design_estimate_date: props.approval?.design_estimate_date ?? '',
    eu_approval_submission_date: props.approval?.eu_approval_submission_date ?? '',
    opm_validation_date: props.approval?.opm_validation_date ?? ''
})

const submit = () => {
    if (props.action === 'create') {
        router.post('/mhp-admin-approvals', form.value)
    } else {
        router.put(`/mhp-admin-approvals/${props.approval.id}`, form.value)
    }
}
</script>

<template>
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
        <h2 class="text-xl font-bold text-gray-700 mb-4 border-b-blue-600 border-b-2">
            {{ props.action === 'create' ? '➕ Add' : '✏️ Edit' }} Admin Approval
        </h2>

        <form @submit.prevent="submit" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <!-- Example field with icon -->
                <div>
                    <label class="flex items-center gap-1">
                        <CalendarDaysIcon class="w-4 h-4 text-blue-500" /> EU Approval Date
                    </label>
                    <input v-model="form.eu_approval_date" type="date" class="input">
                    <FormError :error="props.errors?.eu_approval_date" />
                </div>

                <div>
                    <label class="flex items-center gap-1">
                        <CurrencyDollarIcon class="w-4 h-4 text-green-500" /> Approved Cost
                    </label>
                    <input v-model="form.approved_cost" type="number" class="input">
                    <FormError :error="props.errors?.approved_cost" />
                </div>

                <div>
                    <label><PencilIcon class="w-4 h-4 text-yellow-500 inline" /> Revised Cost 1</label>
                    <input v-model="form.revised_cost_1" type="number" class="input">
                    <FormError :error="props.errors?.revised_cost_1" />
                </div>

                <div>
                    <label><PencilIcon class="w-4 h-4 text-yellow-500 inline" /> Revised Cost 2</label>
                    <input v-model="form.revised_cost_2" type="number" class="input">
                    <FormError :error="props.errors?.revised_cost_2" />
                </div>

                <div>
                    <label><PencilIcon class="w-4 h-4 text-yellow-500 inline" /> Revised Cost 3</label>
                    <input v-model="form.revised_cost_3" type="number" class="input">
                    <FormError :error="props.errors?.revised_cost_3" />
                </div>

                <div>
                    <label><CalendarDaysIcon class="w-4 h-4 text-blue-500 inline" /> HPP Inauguration Date</label>
                    <input v-model="form.hpp_inauguration_date" type="date" class="input">
                    <FormError :error="props.errors?.hpp_inauguration_date" />
                </div>

                <div>
                    <label><CalendarDaysIcon class="w-4 h-4 text-blue-500 inline" /> Technical Survey Date</label>
                    <input v-model="form.technical_survey_date" type="date" class="input">
                    <FormError :error="props.errors?.technical_survey_date" />
                </div>

                <div>
                    <label><CalendarDaysIcon class="w-4 h-4 text-blue-500 inline" /> Design PSU Submission</label>
                    <input v-model="form.date_design_psu_submission" type="date" class="input">
                    <FormError :error="props.errors?.date_design_psu_submission" />
                </div>

                <div>
                    <label><CalendarDaysIcon class="w-4 h-4 text-blue-500 inline" /> Head Office Review Submission</label>
                    <input v-model="form.headoffice_review_submission_date" type="date" class="input">
                    <FormError :error="props.errors?.headoffice_review_submission_date" />
                </div>

                <div>
                    <label><CalendarDaysIcon class="w-4 h-4 text-blue-500 inline" /> Design Estimate Date</label>
                    <input v-model="form.design_estimate_date" type="date" class="input">
                    <FormError :error="props.errors?.design_estimate_date" />
                </div>

                <div>
                    <label><CalendarDaysIcon class="w-4 h-4 text-blue-500 inline" /> EU Approval Submission</label>
                    <input v-model="form.eu_approval_submission_date" type="date" class="input">
                    <FormError :error="props.errors?.eu_approval_submission_date" />
                </div>

                <div>
                    <label><CalendarDaysIcon class="w-4 h-4 text-blue-500 inline" /> OPM Validation Date</label>
                    <input v-model="form.opm_validation_date" type="date" class="input">
                    <FormError :error="props.errors?.opm_validation_date" />
                </div>
            </div>

            <div class="text-right">
                <button type="submit"
                        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    {{ props.action === 'create' ? '💾 Save' : '✅ Update' }}
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

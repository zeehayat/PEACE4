<script setup>
import { ref, watch, computed } from 'vue'
import { useForm, router } from '@inertiajs/vue3'
import Modal from '@/Components/Modal.vue'
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue'

const props = defineProps({
    show: Boolean,
    site: Object, // The MhpSite object, now including financialInstallments
    projectFinancialInstallment: Object, // Existing record if editing
    mode: { type: String, default: 'create' } // 'create' or 'edit'
})

const emit = defineEmits(['close', 'saved'])

const newAttachments = ref([])
const existingAttachments = ref([])
const attachmentsToRemove = ref([])

const form = useForm({
    projectable_id: props.site?.id,
    projectable_type: 'App\\Models\\MhpSite',
    installment_number: '',
    installment_date: '',
    installment_amount: '',
    category: 'general',
    remarks: '',
})

// Determine the next available installment number
const nextInstallmentNumber = computed(() => {
    if (props.mode === 'edit') {
        return form.installment_number; // In edit mode, retain current number
    }

    const existingNumbers = new Set(
        props.site.financialInstallments?.map(i => i.installment_number) || []
    );
    const maxInstallments = 10;

    for (let i = 1; i <= maxInstallments; i++) {
        if (!existingNumbers.has(i)) {
            return i;
        }
    }
    return null; // All installments recorded
});

// Watch for site changes to initialize form for create mode or reset for edit
watch(
    () => [props.site, props.projectFinancialInstallment],
    ([newSite, newInstallment]) => {
        if (newInstallment) { // Edit mode
            form.projectable_id = newInstallment.projectable_id;
            form.projectable_type = newInstallment.projectable_type;
            form.installment_number = newInstallment.installment_number;
            form.installment_date = newInstallment.installment_date;
            form.installment_amount = newInstallment.installment_amount;
            form.category = newInstallment.category;
            form.remarks = newInstallment.remarks;
            existingAttachments.value = newInstallment.attachments || [];
        } else if (newSite) { // Create mode, or reset after edit
            form.projectable_id = newSite.id;
            form.projectable_type = 'App\\Models\\MhpSite';
            form.installment_number = nextInstallmentNumber.value || ''; // Automatically set next installment
            form.installment_date = '';
            form.installment_amount = '';
            form.category = 'general';
            form.remarks = '';
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
        ? '/mhp/project-financial-installments'
        : `/mhp/project-financial-installments/${props.projectFinancialInstallment.id}`

    if (props.mode === 'edit') {
        data.append('_method', 'PUT')
    }

    router.post(url, data, {
        forceFormData: true,
        onSuccess: () => {
            emit('saved', 'Financial installment saved successfully.')
            emit('close')
        },
        onError: (errors) => {
            console.error('Validation Errors:', errors)
        }
    })
}

// Display existing financial installments for context (optional, but good for user)
const sortedFinancialInstallments = computed(() => {
    return [...(props.site.financialInstallments || [])].sort((a, b) => a.installment_number - b.installment_number);
});

const isMaxInstallmentsReached = computed(() => {
    return nextInstallmentNumber.value === null && props.mode === 'create';
});
</script>

<template>
    <Modal :show="show" @close="emit('close')" :title="mode === 'create' ? 'Add Financial Installment' : 'Edit Financial Installment'">
        <div v-if="isMaxInstallmentsReached" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong class="font-bold">All Installments Recorded!</strong>
            <span class="block sm:inline">All 10 financial installments have already been recorded for this project.</span>
        </div>

        <div v-if="sortedFinancialInstallments.length > 0" class="mb-4 p-3 bg-gray-50 rounded-md">
            <h4 class="text-sm font-semibold mb-2">Recorded Installments:</h4>
            <ul class="list-disc list-inside text-sm text-gray-700">
                <li v-for="i in sortedFinancialInstallments" :key="i.id">
                    Installment #{{ i.installment_number }} ({{ i.installment_date }}) - Amount: {{ i.installment_amount }} (Category: {{ i.category }})
                </li>
            </ul>
        </div>


        <form @submit.prevent="submit" class="space-y-4" :class="{ 'opacity-50': isMaxInstallmentsReached, 'pointer-events-none': isMaxInstallmentsReached }">
            <div>
                <label class="block text-sm font-medium text-gray-700">Project Type</label>
                <input :value="form.projectable_type === 'App\\Models\\MhpSite' ? 'MHP' : 'Irrigation'" type="text" class="input bg-gray-100" readonly />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Installment Number</label>
                <input v-model="form.installment_number" type="number" min="1" max="10" class="input bg-gray-100" readonly />
                <div v-if="form.errors.installment_number" class="text-red-500 text-xs mt-1">{{ form.errors.installment_number }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Installment Date</label>
                <input v-model="form.installment_date" type="date" class="input" />
                <div v-if="form.errors.installment_date" class="text-red-500 text-xs mt-1">{{ form.errors.installment_date }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Installment Amount</label>
                <input v-model="form.installment_amount" type="number" step="0.01" class="input" />
                <div v-if="form.errors.installment_amount" class="text-red-500 text-xs mt-1">{{ form.errors.installment_amount }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Category</label>
                <select v-model="form.category" class="input">
                    <option value="general">General</option>
                    <option value="eme">EME</option>
                    <option value="tnd">T&D</option>
                </select>
                <div v-if="form.errors.category" class="text-red-500 text-xs mt-1">{{ form.errors.category }}</div>
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
                <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" :disabled="form.processing || isMaxInstallmentsReached">
                    {{ form.processing ? 'Saving...' : (mode === 'create' ? 'Save Installment' : 'Update Installment') }}
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

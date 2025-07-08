<script setup>
import { ref, watch } from 'vue'
import { router } from '@inertiajs/vue3'
import axios from 'axios'
import Modal from '@/Components/Modal.vue'
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue'

const props = defineProps({
    show: Boolean,
    site: Object
})

const emits = defineEmits(['close'])

const costs = ref([])
const expenseTypes = ref([])
const form = ref({})
const editing = ref(false)
const loading = ref(false)

watch(() => props.show, (val) => {
    if (val) {
        fetchCosts()
        fetchExpenseTypes()
    }
})

function resetForm() {
    form.value = {
        mhp_site_id: props.site.id,
        cost_date: '',
        expense_type_id: '',
        amount: '',
        remarks: '',
        attachments: [],
        existingAttachments: []
    }
    editing.value = false
}

function fetchCosts() {
    loading.value = true
    axios.get(`/mhp/operational-costs?site_id=${props.site.id}`)
        .then(res => {
            costs.value = res.data
            resetForm()
        })
        .finally(() => { loading.value = false })
}

function fetchExpenseTypes() {
    axios.get(`/mhp/expense-types`) // assumes endpoint returns list
        .then(res => {
            expenseTypes.value = res.data
        })
}

function edit(cost) {
    form.value = { ...cost, mhp_site_id: props.site.id }
    form.value.attachments = []
    form.value.existingAttachments = (cost.media || []).map(m => ({
        id: m.id,
        name: m.file_name,
        url: m.original_url
    }))
    editing.value = true
}

function save() {
    const url = editing.value
        ? `/mhp/operational-costs/${form.value.id}`
        : `/mhp/operational-costs`

    if (!form.value.mhp_site_id) {
        form.value.mhp_site_id = props.site.id
    }

    const data = new FormData()
    Object.entries(form.value).forEach(([key, val]) => {
        if (key !== 'attachments' && key !== 'existingAttachments') {
            data.append(key, val)
        }
    })

    if (form.value.attachments) {
        for (let i = 0; i < form.value.attachments.length; i++) {
            data.append(`attachments[${i}]`, form.value.attachments[i])
        }
    }

    axios.post(url, data)
        .then(() => {
            fetchCosts()          // refresh the table
            resetForm()           // clear the form
            emits('close')        // close the modal
            showToast('Operational cost saved successfully!')
        })
        .catch(err => {
            console.error(err)
            alert('Failed to save.')
        })
}
function showToast(message) {
    // if you already have a global toast system
    // you can emit or set a prop
    alert(message)
    emits('saved', 'Operational cost saved successfully!')

}


function destroyRecord(id) {
    if (!confirm('Are you sure?')) return

    router.delete(`/mhp/operational-costs/${id}`, {
        onSuccess: () => {
            fetchCosts()
        }
    })
}

function removeExistingAttachment(file) {
    if (!confirm(`Remove ${file.name}?`)) return

    axios.delete(`/mhp/media/${file.id}`)
        .then(() => {
            fetchCosts()
        })
        .catch(() => {
            alert('Failed to remove file.')
        })
}
</script>

<template>
    <Modal :show="show" @close="$emit('close')">
        <template #title>
            <div class="text-xl font-semibold text-gray-800">
                Operational Costs - {{ props.site.name }}
            </div>
        </template>

        <div class="space-y-6 p-4">
            <div class="overflow-x-auto shadow-md rounded-lg">
                <table class="min-w-full bg-white">
                    <thead class="bg-gray-100 border-b border-gray-200">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expense Type</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                    <tr v-if="loading">
                        <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">Loading costs...</td>
                    </tr>
                    <tr v-else-if="costs.length === 0">
                        <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">No operational costs found.</td>
                    </tr>
                    <tr v-else v-for="c in costs" :key="c.id" class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ c.cost_date }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ c.expense_type_name }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ c.amount }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ c.remarks }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button @click="edit(c)" class="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                            <button @click="destroyRecord(c.id)" class="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
                <h4 class="text-lg font-semibold text-gray-700 mb-4">{{ editing ? 'Edit' : 'Add' }} Operational Cost</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="cost_date" class="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input id="cost_date" v-model="form.cost_date" type="date" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div>
                        <label for="expense_type" class="block text-sm font-medium text-gray-700 mb-1">Expense Type</label>
                        <select id="expense_type" v-model="form.expense_type_id" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option value="" disabled>Select Expense Type</option>
                            <option v-for="et in expenseTypes" :value="et.id" :key="et.id">
                                {{ et.name }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="amount" class="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                        <input id="amount" v-model="form.amount" type="number" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div class="md:col-span-2">
                        <label for="remarks" class="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                        <textarea id="remarks" v-model="form.remarks" rows="3" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                    </div>
                    <div class="md:col-span-2">
                        <AttachmentUploader
                            v-model="form.attachments"
                            :existing="form.existingAttachments"
                            @removeExisting="removeExistingAttachment"
                        />
                    </div>
                </div>

                <div class="mt-6 text-right">
                    <button @click="save" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Save
                    </button>
                    <button v-if="editing" @click="resetForm" class="ml-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Cancel Edit
                    </button>
                </div>
            </div>
        </div>
    </Modal>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { router } from '@inertiajs/vue3'
import axios from 'axios'
import Modal from '@/Components/Modal.vue'
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue'

const props = defineProps({
    show: Boolean,
    site: Object
})

const emits = defineEmits(['close'])

const activeTab = ref('physical')
const physical = ref([])
const financial = ref([])
const form = ref({})
const editing = ref(false)
const loading = ref(false)
const nextMilestone = ref('25')
const nextInstallment = ref(1)

const actualCost = ref(0)
const paidSoFar = ref(0)
const remainingFromBackend = ref(0)

const currentAmount = computed(() => Number(form.value.amount || 0))
const remainingAfterCurrent = computed(() => {
    return actualCost.value - (paidSoFar.value + currentAmount.value)
})

watch(() => props.show, (val) => {
    if (val) {
        fetchPhysical()
        fetchFinancial()
    }
})

function resetForm(tab = activeTab.value) {
    form.value = {
        mhp_site_id: props.site.id,
        attachments: [],
        existingAttachments: []
    }

    if (tab === 'physical') {
        form.value.milestone_percent = nextMilestone.value
        form.value.date = ''
        form.value.works = ''
        form.value.remarks = ''
    } else {
        form.value.installment_number = nextInstallment.value
        form.value.initiation_date = ''
        form.value.date = ''
        form.value.amount = ''
        form.value.cheque_no = ''
        form.value.remaining_amount = ''
    }

    editing.value = false
}


function fetchPhysical() {
    loading.value = true
    axios.get(`/mhp/mhp-eme-physical-progresses?site_id=${props.site.id}`)
        .then(res => {
            physical.value = res.data
            determineNextMilestone()
            resetForm('physical')
        })
        .finally(() => { loading.value = false })
}

function fetchFinancial() {
    loading.value = true
    axios.get(`/mhp/mhp-eme-financial-progresses?site_id=${props.site.id}`)
        .then(res => {
            financial.value = res.data.progresses
            actualCost.value = res.data.actual_cost
            paidSoFar.value = res.data.paid_so_far
            remainingFromBackend.value = res.data.remaining
            determineNextInstallment()
            resetForm('financial')
        })
        .finally(() => { loading.value = false })
}

function determineNextMilestone() {
    const existing = physical.value.map(p => parseInt(p.milestone_percent))
    const milestones = [25, 50, 75, 100]

    for (const m of milestones) {
        if (!existing.includes(m)) {
            nextMilestone.value = m.toString()
            return
        }
    }

    nextMilestone.value = null
}

function determineNextInstallment() {
    const existing = financial.value.map(f => parseInt(f.installment_number))
    const maxInstallments = 10

    for (let i = 1; i <= maxInstallments; i++) {
        if (!existing.includes(i)) {
            nextInstallment.value = i
            return
        }
    }

    nextInstallment.value = null
}

function edit(record) {
    form.value = { ...record, mhp_site_id: props.site.id }
    form.value.attachments = []
    form.value.existingAttachments = (record.media || []).map(m => ({
        id: m.id,
        name: m.file_name,
        url: m.original_url
    }))
    editing.value = true
}

function save() {
    if (!form.value.mhp_site_id) form.value.mhp_site_id = props.site.id
    if (activeTab.value === 'physical' && !form.value.milestone_percent) {
        form.value.milestone_percent = nextMilestone.value
    }
    if (activeTab.value === 'financial' && !form.value.installment_number) {
        form.value.installment_number = nextInstallment.value
    }

    const url =
        activeTab.value === 'physical'
            ? `/mhp/mhp-eme-physical-progresses${editing.value ? '/' + form.value.id : ''}`
            : `/mhp/mhp-eme-financial-progresses${editing.value ? '/' + form.value.id : ''}`

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

    console.log([...data.entries()])

    router.post(url, data, {
        onSuccess: () => {
            fetchPhysical()
            fetchFinancial()
            resetForm()
        }
    })
}


function destroyRecord(id) {
    if (!confirm('Are you sure?')) return

    const url =
        activeTab.value === 'physical'
            ? `/mhp/mhp-eme-physical-progresses/${id}`
            : `/mhp/mhp-eme-financial-progresses/${id}`

    router.delete(url, {
        onSuccess: () => {
            fetchPhysical()
            fetchFinancial()
        }
    })
}

function removeExistingAttachment(file) {
    if (!confirm(`Remove ${file.name}?`)) return

    axios.delete(`/mhp/media/${file.id}`)
        .then(() => {
            fetchPhysical()
            fetchFinancial()
        })
        .catch(() => {
            alert('Failed to remove file.')
        })
}
</script>

<template>
    <Modal :show="show" @close="$emit('close')">
        <template #title>
            <div class="text-xl font-semibold">
                EME Progress - {{ props.site.name }}
            </div>
        </template>

        <div class="space-y-4">
            <div class="flex space-x-4 border-b">
                <button
                    @click="activeTab = 'physical'"
                    :class="activeTab === 'physical' ? 'border-b-2 border-blue-500 font-bold' : ''"
                >
                    Physical
                </button>
                <button
                    @click="activeTab = 'financial'"
                    :class="activeTab === 'financial' ? 'border-b-2 border-blue-500 font-bold' : ''"
                >
                    Financial
                </button>
            </div>

            <!-- PHYSICAL TAB -->
            <div v-if="activeTab === 'physical'" class="space-y-4">
                <h3 class="text-lg font-medium">Physical Progress</h3>

                <table class="min-w-full bg-white border">
                    <thead>
                    <tr class="bg-gray-100">
                        <th>Milestone</th>
                        <th>Date</th>
                        <th>Works</th>
                        <th>Remarks</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="p in physical" :key="p.id" class="border-t">
                        <td>{{ p.milestone_percent }}%</td>
                        <td>{{ p.date }}</td>
                        <td>{{ p.works }}</td>
                        <td>{{ p.remarks }}</td>
                        <td>
                            <button @click="edit(p)">Edit</button>
                            <button @click="destroyRecord(p.id)">Delete</button>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div v-if="nextMilestone || editing" class="bg-gray-50 p-3 rounded">
                    <h4 class="font-semibold">{{ editing ? 'Edit' : 'Add' }} Physical Progress</h4>
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <label>Milestone %</label>
                            <div class="w-full px-2 py-1 border rounded bg-gray-100">
                                {{ form.milestone_percent }}%
                            </div>
                        </div>
                        <div>
                            <label>Date</label>
                            <input v-model="form.date" type="date" class="w-full" />
                        </div>
                        <div class="col-span-2">
                            <label>Works</label>
                            <textarea v-model="form.works" class="w-full"></textarea>
                        </div>
                        <div class="col-span-2">
                            <label>Remarks</label>
                            <textarea v-model="form.remarks" class="w-full"></textarea>
                        </div>
                        <div class="col-span-2">
                            <AttachmentUploader
                                v-model="form.attachments"
                                :existing="form.existingAttachments"
                                @removeExisting="removeExistingAttachment"
                            />
                        </div>
                    </div>
                    <div class="mt-2">
                        <button @click="save" class="bg-blue-600 text-white px-3 py-1 rounded">
                            Save
                        </button>
                    </div>
                </div>
                <div v-else class="text-red-600">
                    All milestones (25%, 50%, 75%, 100%) have already been recorded.
                </div>
            </div>

            <!-- FINANCIAL TAB -->
            <div v-if="activeTab === 'financial'" class="space-y-4">
                <h3 class="text-lg font-medium">Financial Progress</h3>

                <table class="min-w-full bg-white border">
                    <thead>
                    <tr class="bg-gray-100">
                        <th>Installment</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Cheque #</th>
                        <th>Remaining</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="f in financial" :key="f.id" class="border-t">
                        <td>{{ f.installment_number }}</td>
                        <td>{{ f.date }}</td>
                        <td>{{ f.amount }}</td>
                        <td>{{ f.cheque_no }}</td>
                        <td>{{ f.remaining_amount }}</td>
                        <td>
                            <button @click="edit(f)">Edit</button>
                            <button @click="destroyRecord(f.id)">Delete</button>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div v-if="nextInstallment || editing" class="bg-gray-50 p-3 rounded">
                    <h4 class="font-semibold">{{ editing ? 'Edit' : 'Add' }} Financial Progress</h4>
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <label>Installment #</label>
                            <div class="w-full px-2 py-1 border rounded bg-gray-100">
                                {{ form.installment_number }}
                            </div>
                        </div>
                        <div>
                            <label>Initiation Date</label>
                            <input v-model="form.initiation_date" type="date" class="w-full" />
                        </div>
                        <div>
                            <label>Date</label>
                            <input v-model="form.date" type="date" class="w-full" />
                        </div>
                        <div>
                            <label>Amount</label>
                            <input v-model="form.amount" type="number" class="w-full" />
                        </div>
                        <div>
                            <label>Cheque #</label>
                            <input v-model="form.cheque_no" type="text" class="w-full" />
                        </div>
                        <div>
                            <label>Remaining</label>
                            <div class="w-full px-2 py-1 border rounded bg-gray-100">
                                {{ remainingAfterCurrent }}
                            </div>
                        </div>
                        <div class="col-span-2">
                            <AttachmentUploader
                                v-model="form.attachments"
                                :existing="form.existingAttachments"
                                @removeExisting="removeExistingAttachment"
                            />
                        </div>
                    </div>
                    <div class="mt-2">
                        <button @click="save" class="bg-blue-600 text-white px-3 py-1 rounded">
                            Save
                        </button>
                    </div>
                </div>
                <div v-else class="text-red-600">
                    All 10 installments have already been recorded.
                </div>
            </div>
        </div>
    </Modal>
</template>

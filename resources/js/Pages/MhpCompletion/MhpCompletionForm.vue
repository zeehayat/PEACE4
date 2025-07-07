<script setup>
import { ref, watch } from 'vue'
import { useForm } from '@inertiajs/vue3'
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue'

const props = defineProps({
    show: Boolean,
    mode: { type: String, default: 'create' },   // create | edit
    site: { type: Object, required: true },      // MHP site
    mhpCompletion: { type: Object, default: null } // existing completion, optional
})

const emit = defineEmits(['close', 'saved'])

const newAttachments = ref([])
const existingAttachments = ref([])
const attachmentsToRemove = ref([])

const form = useForm({
    mhp_site_id: props.site.id,
    scheme_inauguration_date: '',
    testing_commissioning_date: '',
    handover_date: '',
    remarks: ''
})

watch(
    () => props.mhpCompletion,
    () => {
        if (props.mhpCompletion) {
            form.mhp_site_id = props.mhpCompletion.mhp_site_id
            form.scheme_inauguration_date = props.mhpCompletion.scheme_inauguration_date || ''
            form.testing_commissioning_date = props.mhpCompletion.testing_commissioning_date || ''
            form.handover_date = props.mhpCompletion.handover_date || ''
            form.remarks = props.mhpCompletion.remarks || ''
            existingAttachments.value = props.mhpCompletion.attachments || []
        } else {
            form.mhp_site_id = props.site.id
            form.scheme_inauguration_date = ''
            form.testing_commissioning_date = ''
            form.handover_date = ''
            form.remarks = ''
            existingAttachments.value = []
        }

        newAttachments.value = []
        attachmentsToRemove.value = []
    },
    { immediate: true }
)

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
        data.append('remove_attachments[]', id)
    })

    const routeUrl =
        props.mode === 'create'
            ? route('mhp.mhp-completion.store')
            : route('mhp-completions.update', props.mhpCompletion.id)

    if (props.mode === 'edit') {
        data.append('_method', 'PUT')
    }

    form.post(routeUrl, {
        data,
        forceFormData: true,
        onSuccess: () => {
            emit('saved')
            emit('close')
        }
    })
}
</script>

<template>
    <div v-if="show" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div class="bg-white p-6 rounded shadow max-w-lg w-full relative print:bg-white print:shadow-none print:max-w-full print:p-4">
            <button @click="emit('close')" class="absolute top-2 right-2 text-gray-500 print:hidden">✖</button>

            <h2 class="text-lg font-bold mb-4">
                {{ mode === 'create' ? 'Create' : mode === 'edit' ? 'Edit' : 'View' }} MHP Completion
            </h2>

            <!-- CREATE & EDIT -->
            <form v-if="mode !== 'view'" @submit.prevent="submit" class="space-y-3">
                <!-- Site ID -->
                <div>
                    <label class="block font-medium">MHP Site ID</label>
                    <input
                        type="text"
                        :value="form.mhp_site_id"
                        class="input bg-gray-100 text-gray-600"
                        disabled
                    />
                </div>

                <div>
                    <label class="block font-medium">Scheme Inauguration Date</label>
                    <input v-model="form.scheme_inauguration_date" type="date" class="input" />
                </div>

                <div>
                    <label class="block font-medium">Testing & Commissioning Date</label>
                    <input v-model="form.testing_commissioning_date" type="date" class="input" />
                </div>

                <div>
                    <label class="block font-medium">Handover Date</label>
                    <input v-model="form.handover_date" type="date" class="input" />
                </div>

                <div>
                    <label class="block font-medium">Remarks</label>
                    <textarea v-model="form.remarks" rows="3" class="input"></textarea>
                </div>

                <div>
                    <AttachmentUploader
                        v-model="newAttachments"
                        label="Attachments"
                        :existing="existingAttachments"
                        @remove-existing="removeExisting"
                    />
                </div>

                <div class="text-right">
                    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        {{ mode === 'create' ? 'Create' : 'Update' }}
                    </button>
                </div>
            </form>

            <!-- VIEW / REPORT -->
            <div v-else class="font-sans">
                <div class="bg-white p-8 md:p-12 shadow-lg rounded-lg max-w-4xl mx-auto print:shadow-none print:p-2">

                    <header class="text-center mb-10 border-b pb-4">
                        <h1 class="text-3xl font-bold text-gray-800">MHP Completion Report</h1>
                        <p class="text-sm text-gray-500 mt-1">Date Generated: {{ new Date().toLocaleDateString() }}</p>
                    </header>

                    <main class="space-y-6">

                        <div>
                            <h2 class="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Project Details</h2>
                            <div class="space-y-4">
                                <div>
                                    <label class="text-xs font-bold text-gray-500 uppercase tracking-wider">MHP Site ID</label>
                                    <p class="text-lg text-gray-900">{{ form.mhp_site_id }}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 class="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Project Milestones</h2>
                            <div class="grid md:grid-cols-3 gap-6">
                                <div>
                                    <label class="text-xs font-bold text-gray-500 uppercase tracking-wider">Scheme Inauguration Date</label>
                                    <p class="text-lg text-gray-900">{{ form.scheme_inauguration_date || '—' }}</p>
                                </div>

                                <div>
                                    <label class="text-xs font-bold text-gray-500 uppercase tracking-wider">Testing & Commissioning Date</label>
                                    <p class="text-lg text-gray-900">{{ form.testing_commissioning_date || '—' }}</p>
                                </div>

                                <div>
                                    <label class="text-xs font-bold text-gray-500 uppercase tracking-wider">Handover Date</label>
                                    <p class="text-lg text-gray-900">{{ form.handover_date || '—' }}</p>
                                </div>
                            </div>
                        </div>


                        <div>
                            <h2 class="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Remarks</h2>
                            <div class="prose max-w-none text-gray-800">
                                <p>{{ form.remarks || 'No remarks provided.' }}</p>
                            </div>
                        </div>

                        <div>
                            <h2 class="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Attachments</h2>
                            <div v-if="existingAttachments.length > 0">
                                <ul class="list-disc list-inside space-y-2">
                                    <li v-for="file in existingAttachments" :key="file.id">
                                        <a :href="file.url" target="_blank" class="text-blue-600 hover:underline">
                                            {{ file.name || file.file_name }}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div v-else class="text-gray-500 italic">
                                No attachments.
                            </div>
                        </div>

                    </main>

                    <footer class="mt-12 pt-6 border-t print:hidden">
                        <div class="text-right space-x-2">
                            <button @click="print" class="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Print
                            </button>
                            <button @click="emit('close')" class="px-5 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
                                Close
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.input {
    @apply w-full px-2 py-1 border rounded shadow-sm text-sm focus:outline-none focus:ring focus:ring-blue-200;
}
</style>

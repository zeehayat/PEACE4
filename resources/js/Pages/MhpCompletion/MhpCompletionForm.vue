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
        <div class="bg-white p-6 rounded shadow max-w-lg w-full relative">
            <button @click="emit('close')" class="absolute top-2 right-2 text-gray-500">✖</button>

            <h2 class="text-lg font-bold mb-4">
                {{ mode === 'create' ? 'Create' : 'Edit' }} MHP Completion
            </h2>

            <form @submit.prevent="submit" class="space-y-3">
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
        </div>
    </div>
</template>

<style scoped>
.input {
    @apply w-full px-2 py-1 border rounded shadow-sm text-sm focus:outline-none focus:ring focus:ring-blue-200;
}
</style>

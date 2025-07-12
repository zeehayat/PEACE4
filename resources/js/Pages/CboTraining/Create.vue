<script setup>
import { useForm, router } from '@inertiajs/vue3';
import { watch, ref } from 'vue';
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue';
import SearchableCboSelect from '@/Components/SearchableCboSelect.vue';
import DatePicker from '@/Components/DatePicker.vue';

const props = defineProps({
    cboId: {
        type: [Number, String],
        required: true,
    },
    training: {
        type: Object,
        default: null,
    },
    mode: {
        type: String,
        default: 'create',
    },
});

const emit = defineEmits(['success', 'cancel']);

const trainingTypes = [
    'O&M Training',
    'Electrical Appliance Training',
    'Community Mobilization',
    'Leadership Development',
    'Financial Management',
    'Technical Skills',
    'Other',
];

const form = useForm({
    _method: props.mode === 'edit' ? 'PUT' : 'POST',
    cbo_id: props.mode === 'edit' ? props.training?.cbo_id : props.cboId,
    training_type: props.training?.training_type || '',
    training_gender: props.training?.training_gender ? props.training.training_gender.toLowerCase() : '',
    date_of_training: props.training?.date_of_training || '',
    total_participants: props.training?.total_participants || '',
    remarks: props.training?.remarks || '',
});

const newAttachments = ref([]);
const existingAttachments = ref(props.training?.attachments || []);
const attachmentsToRemove = ref([]);

watch(
    () => props.training,
    (newTraining) => {
        if (props.mode === 'edit' && newTraining) {
            form.cbo_id = newTraining.cbo_id;
            form.training_type = newTraining.training_type;
            form.training_gender = newTraining.training_gender ? newTraining.training_gender.toLowerCase() : '';
            form.date_of_training = newTraining.date_of_training;
            form.total_participants = newTraining.total_participants;
            form.remarks = newTraining.remarks || '';
            existingAttachments.value = newTraining.attachments || [];
            newAttachments.value = [];
            attachmentsToRemove.value = [];
        } else if (props.mode === 'create') {
            form.reset();
            form.cbo_id = props.cboId;
            form.training_gender = '';
            existingAttachments.value = [];
            newAttachments.value = [];
            attachmentsToRemove.value = [];
        }
    },
    { immediate: true }
);

const removeExisting = (file) => {
    attachmentsToRemove.value.push(file.id);
    existingAttachments.value = existingAttachments.value.filter(f => f.id !== file.id);
};

const submit = () => {
    const submitData = new FormData();

    for (const key in form.data()) {
        if (key !== '_method') {
            submitData.append(key, form.data()[key] ?? '');
        }
    }

    newAttachments.value.forEach((file) => {
        submitData.append('attachments[]', file);
    });

    attachmentsToRemove.value.forEach((id) => {
        submitData.append('removed_attachments[]', id);
    });

    const url = props.mode === 'create'
        ? route('cbo.trainings.store')
        : route('cbo.trainings.update', props.training.id);

    form.post(url, {

        forceFormData: true,
        onSuccess: () => {
            emit('success', `Training ${props.mode === 'create' ? 'added' : 'updated'} successfully!`);
            emit('cancel');
            console.log(form.data())
        },
        onError: (errors) => {
            console.error('Training form errors:', errors);
        },
    });
};

const cancelForm = () => {
    emit('cancel');
};
</script>

<template>
    <form @submit.prevent="submit" class="p-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
            <div class="col-span-full">
                <label for="cbo_id" class="block text-sm font-medium text-gray-700 mb-1">CBO</label>
                <template v-if="mode === 'edit'">
                    <div class="input-compact bg-gray-100 text-gray-700 font-semibold cursor-not-allowed flex items-center h-[38px] px-3 py-1.5 rounded-lg">
                        {{ training?.cbo?.reference_code || training.cbo_id || 'N/A' }}
                    </div>
                    <input type="hidden" v-model="form.cbo_id" />
                </template>
                <template v-else>
                    <SearchableCboSelect
                        v-model:selected-cbo-id="form.cbo_id"
                        :initial-cbo-id="form.cbo_id"
                        :initial-cbo-object="training?.cbo"
                        class="input-compact"
                    />
                </template>
                <div v-if="form.errors.cbo_id" class="text-red-500 text-xs mt-1">{{ form.errors.cbo_id }}</div>
            </div>

            <div>
                <label for="training_type" class="block text-sm font-medium text-gray-700 mb-1">Training Type</label>
                <select id="training_type" v-model="form.training_type" class="input-compact">
                    <option value="">Select Training Type</option>
                    <option v-for="type in trainingTypes" :key="type" :value="type">{{ type }}</option>
                </select>
                <div v-if="form.errors.training_type" class="text-red-500 text-xs mt-1">{{ form.errors.training_type }}</div>
            </div>

            <div>
                <label for="training_gender" class="block text-sm font-medium text-gray-700 mb-1">Training Gender</label>
                <select id="training_gender" v-model="form.training_gender" class="input-compact">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="mixed">Mixed</option>
                </select>
                <div v-if="form.errors.training_gender" class="text-red-500 text-xs mt-1">{{ form.errors.training_gender }}</div>
            </div>

            <div>
                <label for="date_of_training" class="block text-sm font-medium text-gray-700 mb-1">Date of Training</label>
                <DatePicker v-model="form.date_of_training" id="date_of_training" class="input-compact" />
                <div v-if="form.errors.date_of_training" class="text-red-500 text-xs mt-1">{{ form.errors.date_of_training }}</div>
            </div>

            <div>
                <label for="total_participants" class="block text-sm font-medium text-gray-700 mb-1">Total Participants</label>
                <input type="number" id="total_participants" v-model="form.total_participants" class="input-compact" />
                <div v-if="form.errors.total_participants" class="text-red-500 text-xs mt-1">{{ form.errors.total_participants }}</div>
            </div>

            <div class="col-span-full">
                <label for="remarks" class="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea id="remarks" v-model="form.remarks" rows="3" class="input-compact"></textarea>
                <div v-if="form.errors.remarks" class="text-red-500 text-xs mt-1">{{ form.errors.remarks }}</div>
            </div>
        </div>

        <div class="mt-6">
            <AttachmentUploader
                v-model="newAttachments"
                :existing="existingAttachments"
                @removeExisting="removeExisting"
                label="Training Attachments"
            />
            <div v-if="form.errors['attachments.0']" class="text-red-500 text-xs mt-1">{{ form.errors['attachments.0'] }}</div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
            <button type="button" @click="cancelForm" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancel
            </button>
            <button type="submit" :disabled="form.processing" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {{ form.processing ? 'Saving...' : (mode === 'create' ? 'Add Training' : 'Update Training') }}
            </button>
        </div>
    </form>
</template>

<style scoped>
.input-compact {
    @apply appearance-none block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm;
}
label {
    margin-bottom: 0.25rem;
}
</style>

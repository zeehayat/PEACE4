<script setup>
import { useForm, router } from '@inertiajs/vue3'
import { watch, ref } from 'vue'
import AttachmentUploader from '@/Components/AttachmentComponent/AttachmentUploader.vue'
import SearchableCboSelect from '@/Components/SearchableCboSelect.vue'
import DatePicker from "@/Components/DatePicker.vue";

const props = defineProps({
    irrigationScheme: Object, // Will be null for create, object for edit
    mode: {
        type: String,
        default: 'create' // 'create' or 'edit'
    }
})

const emit = defineEmits(['saved', 'cancel'])

const form = useForm({
    _method: props.mode === 'edit' ? 'PUT' : 'POST',
    cbo_id: props.irrigationScheme?.cbo_id || '',
    status: props.irrigationScheme?.status || 'New', // Default from migration enum
    beneficiary_farmers: props.irrigationScheme?.beneficiary_farmers || '',
    channel_length_km: props.irrigationScheme?.channel_length_km || '',
    land_area_hectares: props.irrigationScheme?.land_area_hectares || '',
    // New fields from migrations
    month_year_establishment: props.irrigationScheme?.month_year_establishment || '',
    established_by: props.irrigationScheme?.established_by || '',
    date_technical_surveys: props.irrigationScheme?.date_technical_surveys || '',
    date_completion_civil_works: props.irrigationScheme?.date_completion_civil_works || '',
    handover_to_community_date: props.irrigationScheme?.handover_to_community_date || '',
    northening: props.irrigationScheme?.northening || '',
    easting: props.irrigationScheme?.easting || '',
    elevation: props.irrigationScheme?.elevation || '',
});

const newAttachments = ref([])
const existingAttachments = ref(props.irrigationScheme?.attachments || [])
const attachmentsToRemove = ref([])

watch(
    () => props.irrigationScheme,
    (newScheme) => {
        if (newScheme && props.mode === 'edit') {
            form.cbo_id = newScheme.cbo_id
            form.status = newScheme.status
            form.beneficiary_farmers = newScheme.beneficiary_farmers
            form.channel_length_km = newScheme.channel_length_km
            form.land_area_hectares = newScheme.land_area_hectares
            form.month_year_establishment = newScheme.month_year_establishment
            form.established_by = newScheme.established_by
            form.date_technical_surveys = newScheme.date_technical_surveys
            form.date_completion_civil_works = newScheme.date_completion_civil_works
            form.handover_to_community_date = newScheme.handover_to_community_date
            form.northening = newScheme.northening
            form.easting = newScheme.easting
            form.elevation = newScheme.elevation
            existingAttachments.value = newScheme.attachments || []
        } else if (props.mode === 'create') {
            form.reset()
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
        if (typeof val === 'number' || (typeof val === 'string' && val.match(/^\d+(\.\d+)?$/))) {
            data.append(key, val);
        } else {
            data.append(key, val ?? '');
        }
    })

    newAttachments.value.forEach(file => {
        data.append('attachments[]', file)
    })
    attachmentsToRemove.value.forEach(id => {
        data.append('removed_attachments[]', id)
    })

    const url = props.mode === 'create'
        ? '/irrigation/irrigation-schemes' // Route for store
        : `/irrigation/irrigation-schemes/${props.irrigationScheme.id}` // Route for update

    router.post(url, data, {
        forceFormData: true,
        onSuccess: () => {
            emit('saved', `Irrigation Scheme ${props.mode === 'create' ? 'created' : 'updated'} successfully.`)
            form.reset()
        },
        onError: (errors) => {
            console.error('Form Errors:', errors)
        }
    })
}
</script>

<template>
    <form @submit.prevent="submit" class="p-4">
        <!-- Grid Container -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

            <!-- CBO (full width) -->
            <div class="md:col-span-2">
                <label for="cbo_id" class="block text-sm font-medium text-gray-700 mb-1">CBO</label>
                <SearchableCboSelect v-model:selected-cbo-id="form.cbo_id" :initial-cbo-id="form.cbo_id" class="w-full" />
                <div v-if="form.errors.cbo_id" class="text-red-500 text-xs mt-1">{{ form.errors.cbo_id }}</div>
            </div>

            <!-- Status -->
            <div>
                <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select id="status" v-model="form.status" class="w-full">
                    <option value="New">New</option>
                    <option value="Rehabilitation">Rehabilitation</option>
                </select>
                <div v-if="form.errors.status" class="text-red-500 text-xs mt-1">{{ form.errors.status }}</div>
            </div>

            <!-- Beneficiary Farmers -->
            <div>
                <label for="beneficiary_farmers" class="block text-sm font-medium text-gray-700 mb-1">Beneficiary Farmers</label>
                <input type="number" id="beneficiary_farmers" v-model="form.beneficiary_farmers" class="w-full" />
                <div v-if="form.errors.beneficiary_farmers" class="text-red-500 text-xs mt-1">{{ form.errors.beneficiary_farmers }}</div>
            </div>

            <!-- Channel Length -->
            <div>
                <label for="channel_length_km" class="block text-sm font-medium text-gray-700 mb-1">Channel Length (km)</label>
                <input type="number" step="0.01" id="channel_length_km" v-model="form.channel_length_km" class="w-full" />
                <div v-if="form.errors.channel_length_km" class="text-red-500 text-xs mt-1">{{ form.errors.channel_length_km }}</div>
            </div>

            <!-- Land Area -->
            <div>
                <label for="land_area_hectares" class="block text-sm font-medium text-gray-700 mb-1">Land Area (Hectares)</label>
                <input type="number" step="0.01" id="land_area_hectares" v-model="form.land_area_hectares" class="w-full" />
                <div v-if="form.errors.land_area_hectares" class="text-red-500 text-xs mt-1">{{ form.errors.land_area_hectares }}</div>
            </div>

            <!-- Month/Year of Establishment -->
            <div>
                <label for="month_year_establishment" class="block text-sm font-medium text-gray-700 mb-1">Month/Year of Establishment</label>
                <DatePicker v-model="form.month_year_establishment" id="month_year_establishment" class="w-full" />
                <div v-if="form.errors.month_year_establishment" class="text-red-500 text-xs mt-1">{{ form.errors.month_year_establishment }}</div>
            </div>

            <!-- Established By -->
            <div>
                <label for="established_by" class="block text-sm font-medium text-gray-700 mb-1">Established By</label>
                <input type="text" id="established_by" v-model="form.established_by" class="w-full" />
                <div v-if="form.errors.established_by" class="text-red-500 text-xs mt-1">{{ form.errors.established_by }}</div>
            </div>

            <!-- Technical Surveys -->
            <div>
                <label for="date_technical_surveys" class="block text-sm font-medium text-gray-700 mb-1">Date of Technical Surveys</label>
                <DatePicker v-model="form.date_technical_surveys" id="date_technical_surveys" class="w-full" />
                <div v-if="form.errors.date_technical_surveys" class="text-red-500 text-xs mt-1">{{ form.errors.date_technical_surveys }}</div>
            </div>

            <!-- Completion Civil Works -->
            <div>
                <label for="date_completion_civil_works" class="block text-sm font-medium text-gray-700 mb-1">Date of Completion Civil Works</label>
                <DatePicker v-model="form.date_completion_civil_works" id="date_completion_civil_works" class="w-full" />
                <div v-if="form.errors.date_completion_civil_works" class="text-red-500 text-xs mt-1">{{ form.errors.date_completion_civil_works }}</div>
            </div>

            <!-- Handover Date -->
            <div>
                <label for="handover_to_community_date" class="block text-sm font-medium text-gray-700 mb-1">Handover to Community Date</label>
                <DatePicker v-model="form.handover_to_community_date" id="handover_to_community_date" class="w-full" />
                <div v-if="form.errors.handover_to_community_date" class="text-red-500 text-xs mt-1">{{ form.errors.handover_to_community_date }}</div>
            </div>

            <!-- Coordinates -->
            <div>
                <label for="northening" class="block text-sm font-medium text-gray-700 mb-1">Northening</label>
                <input type="number" step="0.01" id="northening" v-model="form.northening" class="w-full" />
                <div v-if="form.errors.northening" class="text-red-500 text-xs mt-1">{{ form.errors.northening }}</div>
            </div>

            <div>
                <label for="easting" class="block text-sm font-medium text-gray-700 mb-1">Easting</label>
                <input type="number" step="0.01" id="easting" v-model="form.easting" class="w-full" />
                <div v-if="form.errors.easting" class="text-red-500 text-xs mt-1">{{ form.errors.easting }}</div>
            </div>

            <div>
                <label for="elevation" class="block text-sm font-medium text-gray-700 mb-1">Elevation</label>
                <input type="number" step="0.01" id="elevation" v-model="form.elevation" class="w-full" />
                <div v-if="form.errors.elevation" class="text-red-500 text-xs mt-1">{{ form.errors.elevation }}</div>
            </div>
        </div>

        <!-- Attachments -->
        <div class="mt-6">
            <AttachmentUploader
                v-model="newAttachments"
                :existing="existingAttachments"
                @removeExisting="removeExisting"
                label="Scheme Attachments"
            />
            <div v-if="form.errors['attachments.0']" class="text-red-500 text-xs mt-1">{{ form.errors['attachments.0'] }}</div>
        </div>

        <!-- Actions -->
        <div class="mt-6 flex justify-end space-x-3">
            <button
                type="button"
                @click="emit('cancel')"
                class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Cancel
            </button>
            <button
                type="submit"
                :disabled="form.processing"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {{ form.processing ? 'Saving...' : (mode === 'create' ? 'Create Scheme' : 'Update Scheme') }}
            </button>
        </div>
    </form>

</template>

<style scoped>
.input-compact {
    @apply appearance-none block w-full px-3 py-1.5 border max-w-64  border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm;
}
label {
    margin-bottom: 0.25rem;
}
</style>

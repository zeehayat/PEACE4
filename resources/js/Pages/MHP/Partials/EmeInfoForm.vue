<script setup>
import { useForm } from '@inertiajs/vue3';
import { watch } from 'vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import InputError from '@/Components/InputError.vue';
import Checkbox from "@/Components/Checkbox.vue";

const props = defineProps({
    mhpSite: {
        type: Object,
        required: true,
    },
    emeInfo: {
        type: Object,
        default: null,
    },
});

const emit = defineEmits(['success', 'cancel']);

// **Initialize the form with all fields from the migration**
const form = useForm({
    turbine_capacity_kw: props.emeInfo?.turbine_capacity_kw ?? '',
    turbine_type: props.emeInfo?.turbine_type ?? '',
    turbine_no: props.emeInfo?.turbine_no ?? '',
    governor_type: props.emeInfo?.governor_type ?? '',
    governor_no: props.emeInfo?.governor_no ?? '',
    generator_alternator_capacity: props.emeInfo?.generator_alternator_capacity ?? '',
    stepup_transformer_capacity: props.emeInfo?.stepup_transformer_capacity ?? '',
    no_of_step_up_transformers: props.emeInfo?.no_of_step_up_transformers ?? '',
    scada_system: props.emeInfo?.scada_system === 1,

    scada_system_model: props.emeInfo?.scada_system_model ?? '',
    station_generator_capacity: props.emeInfo?.station_generator_capacity ?? '',
    penstock_pipe: props.emeInfo?.penstock_pipe ?? '',
    no_of_penstock_pipe: props.emeInfo?.no_of_penstock_pipe ?? '',
});

// **Watch for existing emeInfo and populate the form**
watch(() => props.emeInfo, (newEmeInfo) => {
    if (newEmeInfo) {
        form.defaults(newEmeInfo);
        form.reset();
    } else {
        form.reset();
    }
}, { immediate: true });

const submit = () => {
    form.post(route('mhp.sites.eme-info.store', props.mhpSite.id), {
        preserveScroll: true,
        onSuccess: () => {
            emit('success');
        },
    });
};
</script>

<template>
    <form @submit.prevent="submit" class="p-6 bg-white rounded-lg shadow-md space-y-8">
        <h3 class="text-xl font-semibold border-b pb-4 mb-6">E&M Profile</h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <InputLabel for="turbine_capacity_kw" value="Turbine Capacity (KW)" />
                <TextInput id="turbine_capacity_kw" v-model="form.turbine_capacity_kw" type="number" step="0.01" class="mt-1 block w-full" />
                <InputError :message="form.errors.turbine_capacity_kw" class="mt-2" />
            </div>
            <div>
                <InputLabel for="turbine_type" value="Turbine Type" />
                <TextInput id="turbine_type" v-model="form.turbine_type" type="text" class="mt-1 block w-full" />
                <InputError :message="form.errors.turbine_type" class="mt-2" />
            </div>
            <div>
                <InputLabel for="turbine_no" value="Turbine No" />
                <TextInput id="turbine_no" v-model="form.turbine_no" type="text" class="mt-1 block w-full" />
                <InputError :message="form.errors.turbine_no" class="mt-2" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <InputLabel for="governor_type" value="Governor Type" />
                <TextInput id="governor_type" v-model="form.governor_type" type="text" class="mt-1 block w-full" />
                <InputError :message="form.errors.governor_type" class="mt-2" />
            </div>
            <div>
                <InputLabel for="governor_no" value="Governor No" />
                <TextInput id="governor_no" v-model="form.governor_no" type="text" class="mt-1 block w-full" />
                <InputError :message="form.errors.governor_no" class="mt-2" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <InputLabel for="generator_alternator_capacity" value="Generator/Alternator Capacity" />
                <TextInput id="generator_alternator_capacity" v-model="form.generator_alternator_capacity" type="number" step="0.01" class="mt-1 block w-full" />
                <InputError :message="form.errors.generator_alternator_capacity" class="mt-2" />
            </div>
            <div>
                <InputLabel for="stepup_transformer_capacity" value="Step-up Transformer Capacity" />
                <TextInput id="stepup_transformer_capacity" v-model="form.stepup_transformer_capacity" type="number" step="0.01" class="mt-1 block w-full" />
                <InputError :message="form.errors.stepup_transformer_capacity" class="mt-2" />
            </div>
            <div>
                <InputLabel for="no_of_step_up_transformers" value="No. of Step-up Transformers" />
                <TextInput id="no_of_step_up_transformers" v-model="form.no_of_step_up_transformers" type="number" class="mt-1 block w-full" />
                <InputError :message="form.errors.no_of_step_up_transformers" class="mt-2" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div class="flex items-center gap-4 pt-6">
                <Checkbox id="scada_system" v-model="form.scada_system" :checked="form.scada_system" />
                <InputLabel for="scada_system" value="SCADA System?" />
                <InputError :message="form.errors.scada_system" class="mt-2" />
            </div>
            <div v-if="form.scada_system">
                <InputLabel for="scada_system_model" value="SCADA System Model" />
                <TextInput id="scada_system_model" v-model="form.scada_system_model" type="text" class="mt-1 block w-full" />
                <InputError :message="form.errors.scada_system_model" class="mt-2" />
            </div>
            <div>
                <InputLabel for="station_generator_capacity" value="Station Generator Capacity" />
                <TextInput id="station_generator_capacity" v-model="form.station_generator_capacity" type="number" step="0.01" class="mt-1 block w-full" />
                <InputError :message="form.errors.station_generator_capacity" class="mt-2" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <InputLabel for="penstock_pipe" value="Penstock Pipe" />
                <TextInput id="penstock_pipe" v-model="form.penstock_pipe" type="text" class="mt-1 block w-full" />
                <InputError :message="form.errors.penstock_pipe" class="mt-2" />
            </div>
            <div>
                <InputLabel for="no_of_penstock_pipe" value="No. of Penstock Pipes" />
                <TextInput id="no_of_penstock_pipe" v-model="form.no_of_penstock_pipe" type="number" class="mt-1 block w-full" />
                <InputError :message="form.errors.no_of_penstock_pipe" class="mt-2" />
            </div>
        </div>

        <div class="flex items-center justify-end mt-6 space-x-4">
            <button type="button" @click="$emit('cancel')" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
            <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                Save E&M Profile
            </PrimaryButton>
        </div>
    </form>
</template>

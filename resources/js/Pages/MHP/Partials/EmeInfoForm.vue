<script setup>
import { useForm } from '@inertiajs/vue3';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import InputError from '@/Components/InputError.vue';

const props = defineProps({
    mhpSite: {
        type: Object,
        required: true,
    },
    emeInfo: {
        type: Object,
        default: () => ({}),
    },
});

const form = useForm({
    turbine_capacity_kw: props.emeInfo?.turbine_capacity_kw ?? '',
    turbine_type: props.emeInfo?.turbine_type ?? '',
    turbine_no: props.emeInfo?.turbine_no ?? '',
    governor_type: props.emeInfo?.governor_type ?? '',
    governor_no: props.emeInfo?.governor_no ?? '',
    generator_alternator_capacity: props.emeInfo?.generator_alternator_capacity ?? '',
    stepup_transformer_capacity: props.emeInfo?.stepup_transformer_capacity ?? '',
    no_of_step_up_transformers: props.emeInfo?.no_of_step_up_transformers ?? '',
    scada_system: props.emeInfo?.scada_system ?? false,
    scada_system_model: props.emeInfo?.scada_system_model ?? '',
    station_generator_capacity: props.emeInfo?.station_generator_capacity ?? '',
    penstock_pipe: props.emeInfo?.penstock_pipe ?? '',
    no_of_penstock_pipe: props.emeInfo?.no_of_penstock_pipe ?? '',
});

const submit = () => {
    form.post(route('sites.eme-info.store', props.mhpSite.id), {
        preserveScroll: true,
        onSuccess: () => {
            // You can add a success toast notification here
            alert("Succesfully Stored")
        },
    });
};
</script>

<template>
    <form @submit.prevent="submit" class="p-6 bg-white rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-6">E&M Profile</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
                <InputLabel for="turbine_capacity_kw" value="Turbine Capacity (KW)" />
                <TextInput id="turbine_capacity_kw" v-model="form.turbine_capacity_kw" type="number" class="mt-1 block w-full" />
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

            <div>
                <InputLabel for="generator_alternator_capacity" value="Generator/Alternator Capacity" />
                <TextInput id="generator_alternator_capacity" v-model="form.generator_alternator_capacity" type="number" class="mt-1 block w-full" />
                <InputError :message="form.errors.generator_alternator_capacity" class="mt-2" />
            </div>

            <div class="flex items-center gap-4">
                <InputLabel for="scada_system" value="SCADA System?" />
                <input id="scada_system" v-model="form.scada_system" type="checkbox" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500" />
                <InputError :message="form.errors.scada_system" class="mt-2" />
            </div>

        </div>

        <div class="flex items-center justify-end mt-6">
            <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                Save E&M Profile
            </PrimaryButton>
        </div>
    </form>
</template>

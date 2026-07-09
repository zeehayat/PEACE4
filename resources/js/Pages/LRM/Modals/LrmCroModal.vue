<script setup>
import { computed } from 'vue';
import { useForm } from '@inertiajs/vue3';
import Modal from '@/Components/Modal.vue';
import InputLabel from '@/Components/InputLabel.vue';
import InputError from '@/Components/InputError.vue';
import TextInput from '@/Components/TextInput.vue';
import TextArea from '@/Components/TextArea.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';

const props = defineProps({
    show: Boolean,
    lrmCommitteeId: { type: [Number, String], required: true },
    cro: { type: Object, default: null },
});

const emit = defineEmits(['close', 'saved']);

const isEditMode = computed(() => !!props.cro);

function getInitialFormData(cro) {
    return {
        name: cro ? cro.name : '',
        village: cro ? cro.village : '',
        type: cro ? cro.type : '',
        male_members: cro ? cro.male_members : null,
        female_members: cro ? cro.female_members : null,
        total_members: cro ? cro.total_members : null,
        president_name: cro ? cro.president_name : '',
        president_contact: cro ? cro.president_contact : '',
        secretary_name: cro ? cro.secretary_name : '',
        secretary_contact: cro ? cro.secretary_contact : '',
        remarks: cro ? cro.remarks : '',
    };
}

const form = useForm(getInitialFormData(props.cro));

const submit = () => {
    const options = {
        preserveScroll: true,
        onSuccess: () => {
            emit('saved');
            emit('close');
        },
    };

    if (isEditMode.value) {
        form.put(route('lrm.committees.cros.update', [props.lrmCommitteeId, props.cro.id]), options);
    } else {
        form.post(route('lrm.committees.cros.store', props.lrmCommitteeId), options);
    }
};
</script>

<template>
    <Modal :show="show" @close="emit('close')" :maxWidth="'3xl'" :title="isEditMode ? 'Edit CRO' : 'Add CRO'">
        <form @submit.prevent="submit" class="p-6 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <InputLabel for="cro_name" value="CRO Name" />
                    <TextInput id="cro_name" v-model="form.name" type="text" class="mt-1 block w-full" :class="{ 'border-red-500': form.errors.name }" />
                    <InputError class="mt-2" :message="form.errors.name" />
                </div>

                <div>
                    <InputLabel for="cro_village" value="Village" />
                    <TextInput id="cro_village" v-model="form.village" type="text" class="mt-1 block w-full" />
                    <InputError class="mt-2" :message="form.errors.village" />
                </div>

                <div>
                    <InputLabel for="cro_type" value="Type (e.g. Mixed, Women-Led)" />
                    <TextInput id="cro_type" v-model="form.type" type="text" class="mt-1 block w-full" />
                    <InputError class="mt-2" :message="form.errors.type" />
                </div>

                <div class="grid grid-cols-3 gap-2">
                    <div>
                        <InputLabel for="cro_male_members" value="Male" />
                        <TextInput id="cro_male_members" v-model="form.male_members" type="number" min="0" class="mt-1 block w-full" />
                        <InputError class="mt-2" :message="form.errors.male_members" />
                    </div>
                    <div>
                        <InputLabel for="cro_female_members" value="Female" />
                        <TextInput id="cro_female_members" v-model="form.female_members" type="number" min="0" class="mt-1 block w-full" />
                        <InputError class="mt-2" :message="form.errors.female_members" />
                    </div>
                    <div>
                        <InputLabel for="cro_total_members" value="Total" />
                        <TextInput id="cro_total_members" v-model="form.total_members" type="number" min="0" class="mt-1 block w-full" />
                        <InputError class="mt-2" :message="form.errors.total_members" />
                    </div>
                </div>

                <div>
                    <InputLabel for="cro_president_name" value="President Name" />
                    <TextInput id="cro_president_name" v-model="form.president_name" type="text" class="mt-1 block w-full" />
                    <InputError class="mt-2" :message="form.errors.president_name" />
                </div>

                <div>
                    <InputLabel for="cro_president_contact" value="President Contact" />
                    <TextInput id="cro_president_contact" v-model="form.president_contact" type="text" class="mt-1 block w-full" />
                    <InputError class="mt-2" :message="form.errors.president_contact" />
                </div>

                <div>
                    <InputLabel for="cro_secretary_name" value="Secretary Name" />
                    <TextInput id="cro_secretary_name" v-model="form.secretary_name" type="text" class="mt-1 block w-full" />
                    <InputError class="mt-2" :message="form.errors.secretary_name" />
                </div>

                <div>
                    <InputLabel for="cro_secretary_contact" value="Secretary Contact" />
                    <TextInput id="cro_secretary_contact" v-model="form.secretary_contact" type="text" class="mt-1 block w-full" />
                    <InputError class="mt-2" :message="form.errors.secretary_contact" />
                </div>

                <div class="md:col-span-2">
                    <InputLabel for="cro_remarks" value="Remarks" />
                    <TextArea id="cro_remarks" v-model="form.remarks" class="mt-1 block w-full" />
                    <InputError class="mt-2" :message="form.errors.remarks" />
                </div>
            </div>

            <div class="flex justify-end mt-6">
                <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    {{ isEditMode ? 'Update CRO' : 'Add CRO' }}
                </PrimaryButton>
            </div>
        </form>
    </Modal>
</template>

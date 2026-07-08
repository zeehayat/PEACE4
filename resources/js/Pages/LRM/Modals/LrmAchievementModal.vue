<script setup>
import { computed, ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import Modal from '@/Components/Modal.vue';
import InputLabel from '@/Components/InputLabel.vue';
import InputError from '@/Components/InputError.vue';
import TextInput from '@/Components/TextInput.vue';
import TextArea from '@/Components/TextArea.vue';
import DatePicker from '@/Components/DatePicker.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';

const props = defineProps({
    show: Boolean,
    lrmCommitteeId: { type: [Number, String], required: true },
    achievement: { type: Object, default: null },
});

const emit = defineEmits(['close', 'saved']);

const isEditMode = computed(() => !!props.achievement);

function getInitialFormData(achievement) {
    return {
        date: achievement ? achievement.date : null,
        achieved_forest_area_value: achievement ? achievement.achieved_forest_area_value : null,
        achieved_forest_area_unit: achievement ? achievement.achieved_forest_area_unit : 'Kanal',
        achieved_fruit_area_value: achievement ? achievement.achieved_fruit_area_value : null,
        achieved_fruit_area_unit: achievement ? achievement.achieved_fruit_area_unit : 'Kanal',
        achieved_forest_plants_count: achievement ? achievement.achieved_forest_plants_count : null,
        achieved_fruit_plants_count: achievement ? achievement.achieved_fruit_plants_count : null,
        achieved_drr_training_persons: achievement ? achievement.achieved_drr_training_persons : null,
        achieved_check_dams_value: achievement ? achievement.achieved_check_dams_value : null,
        achieved_check_dams_unit: achievement ? achievement.achieved_check_dams_unit : 'CFT',
        achieved_greenbelt_lawn_value: achievement ? achievement.achieved_greenbelt_lawn_value : null,
        achieved_greenbelt_lawn_unit: achievement ? achievement.achieved_greenbelt_lawn_unit : 'Sft',
        achieved_composting_training_persons: achievement ? achievement.achieved_composting_training_persons : null,
        achieved_pest_control_training_persons: achievement ? achievement.achieved_pest_control_training_persons : null,
        achieved_pest_control_kits: achievement ? achievement.achieved_pest_control_kits : null,
        remarks: achievement ? achievement.remarks : '',
    };
}

const form = useForm(getInitialFormData(props.achievement));

const submit = () => {
    const options = {
        preserveScroll: true,
        onSuccess: () => {
            emit('saved');
            emit('close');
        },
    };

    if (isEditMode.value) {
        form.put(route('lrm.committees.achievements.update', [props.lrmCommitteeId, props.achievement.id]), options);
    } else {
        form.post(route('lrm.committees.achievements.store', props.lrmCommitteeId), options);
    }
};
</script>

<template>
    <Modal :show="show" @close="emit('close')" :maxWidth="'3xl'" :title="isEditMode ? 'Edit NRM Achievement' : 'Record NRM Achievement'">
        <form @submit.prevent="submit" class="p-6 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <InputLabel for="achievement_date" value="Date" />
                    <DatePicker id="achievement_date" v-model="form.date" placeholder="Select Date" :class="{ 'border-red-500': form.errors.date }" />
                    <InputError class="mt-2" :message="form.errors.date" />
                </div>

                <div class="flex gap-2 items-end">
                    <div class="flex-1">
                        <InputLabel for="achieved_forest_area_value" value="Forest Area Achieved" />
                        <TextInput id="achieved_forest_area_value" v-model="form.achieved_forest_area_value" type="number" step="0.01" min="0" class="mt-1 block w-full" />
                        <InputError class="mt-2" :message="form.errors.achieved_forest_area_value" />
                    </div>
                    <div class="w-20">
                        <InputLabel for="achieved_forest_area_unit" value="Unit" />
                        <TextInput id="achieved_forest_area_unit" v-model="form.achieved_forest_area_unit" type="text" class="mt-1 block w-full" />
                    </div>
                </div>

                <div class="flex gap-2 items-end">
                    <div class="flex-1">
                        <InputLabel for="achieved_fruit_area_value" value="Fruit Area Achieved" />
                        <TextInput id="achieved_fruit_area_value" v-model="form.achieved_fruit_area_value" type="number" step="0.01" min="0" class="mt-1 block w-full" />
                        <InputError class="mt-2" :message="form.errors.achieved_fruit_area_value" />
                    </div>
                    <div class="w-20">
                        <InputLabel for="achieved_fruit_area_unit" value="Unit" />
                        <TextInput id="achieved_fruit_area_unit" v-model="form.achieved_fruit_area_unit" type="text" class="mt-1 block w-full" />
                    </div>
                </div>

                <div>
                    <InputLabel for="achieved_forest_plants_count" value="Forest Plants Achieved" />
                    <TextInput id="achieved_forest_plants_count" v-model="form.achieved_forest_plants_count" type="number" min="0" class="mt-1 block w-full" />
                    <InputError class="mt-2" :message="form.errors.achieved_forest_plants_count" />
                </div>

                <div>
                    <InputLabel for="achieved_fruit_plants_count" value="Fruit Plants Achieved" />
                    <TextInput id="achieved_fruit_plants_count" v-model="form.achieved_fruit_plants_count" type="number" min="0" class="mt-1 block w-full" />
                    <InputError class="mt-2" :message="form.errors.achieved_fruit_plants_count" />
                </div>

                <div>
                    <InputLabel for="achieved_drr_training_persons" value="DRR Training Achieved (Persons)" />
                    <TextInput id="achieved_drr_training_persons" v-model="form.achieved_drr_training_persons" type="number" min="0" class="mt-1 block w-full" />
                    <InputError class="mt-2" :message="form.errors.achieved_drr_training_persons" />
                </div>

                <div>
                    <InputLabel for="achieved_composting_training_persons" value="Composting Training Achieved (Persons)" />
                    <TextInput id="achieved_composting_training_persons" v-model="form.achieved_composting_training_persons" type="number" min="0" class="mt-1 block w-full" />
                    <InputError class="mt-2" :message="form.errors.achieved_composting_training_persons" />
                </div>

                <div>
                    <InputLabel for="achieved_pest_control_training_persons" value="Pest Control Training Achieved (Persons)" />
                    <TextInput id="achieved_pest_control_training_persons" v-model="form.achieved_pest_control_training_persons" type="number" min="0" class="mt-1 block w-full" />
                    <InputError class="mt-2" :message="form.errors.achieved_pest_control_training_persons" />
                </div>

                <div>
                    <InputLabel for="achieved_pest_control_kits" value="Pest Control Kits Achieved" />
                    <TextInput id="achieved_pest_control_kits" v-model="form.achieved_pest_control_kits" type="number" min="0" class="mt-1 block w-full" />
                    <InputError class="mt-2" :message="form.errors.achieved_pest_control_kits" />
                </div>

                <div class="flex gap-2 items-end">
                    <div class="flex-1">
                        <InputLabel for="achieved_check_dams_value" value="Check Dams Achieved" />
                        <TextInput id="achieved_check_dams_value" v-model="form.achieved_check_dams_value" type="number" step="0.01" min="0" class="mt-1 block w-full" />
                        <InputError class="mt-2" :message="form.errors.achieved_check_dams_value" />
                    </div>
                    <div class="w-20">
                        <InputLabel for="achieved_check_dams_unit" value="Unit" />
                        <TextInput id="achieved_check_dams_unit" v-model="form.achieved_check_dams_unit" type="text" class="mt-1 block w-full" />
                    </div>
                </div>

                <div class="flex gap-2 items-end">
                    <div class="flex-1">
                        <InputLabel for="achieved_greenbelt_lawn_value" value="Green Belt / Lawn Achieved" />
                        <TextInput id="achieved_greenbelt_lawn_value" v-model="form.achieved_greenbelt_lawn_value" type="number" step="0.01" min="0" class="mt-1 block w-full" />
                        <InputError class="mt-2" :message="form.errors.achieved_greenbelt_lawn_value" />
                    </div>
                    <div class="w-20">
                        <InputLabel for="achieved_greenbelt_lawn_unit" value="Unit" />
                        <TextInput id="achieved_greenbelt_lawn_unit" v-model="form.achieved_greenbelt_lawn_unit" type="text" class="mt-1 block w-full" />
                    </div>
                </div>

                <div class="md:col-span-2">
                    <InputLabel for="achievement_remarks" value="Remarks" />
                    <TextArea id="achievement_remarks" v-model="form.remarks" class="mt-1 block w-full" />
                    <InputError class="mt-2" :message="form.errors.remarks" />
                </div>
            </div>

            <div class="flex justify-end mt-6">
                <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    {{ isEditMode ? 'Update Achievement' : 'Record Achievement' }}
                </PrimaryButton>
            </div>
        </form>
    </Modal>
</template>

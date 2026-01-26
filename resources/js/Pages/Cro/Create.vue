<script setup>
import { useForm } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import InputError from '@/Components/InputError.vue';
import SelectInput from '@/Components/SelectInput.vue';
import DatePicker from '@/Components/DatePicker.vue';
import { ref } from 'vue';

const props = defineProps({
    cro: Object,
    districts: Array, // Passed from controller: [{id: 1, name: 'Dir Upper'}, ...]
});

const isEditMode = !!props.cro;

const form = useForm({
    district: props.cro?.district || '',
    tehsil: props.cro?.tehsil || '',
    village_council: props.cro?.village_council || '',
    village: props.cro?.village || '',
    date_final_community_dialogue: props.cro?.date_final_community_dialogue || '',
    no_of_community_dialogues: props.cro?.no_of_community_dialogues || 0,
    dialogue_participants: props.cro?.dialogue_participants || 0,
    cro_name: props.cro?.cro_name || '',
    date_of_cro_formation: props.cro?.date_of_cro_formation || '',
    total_members: props.cro?.total_members || 0,
    gender: props.cro?.gender || 'Mixed',
    no_of_cro_members: props.cro?.no_of_cro_members || 0,
    president_name: props.cro?.president_name || '',
    president_contact: props.cro?.president_contact || '',
    secretary_name: props.cro?.secretary_name || '',
    secretary_contact: props.cro?.secretary_contact || '',
    date_exposure_visit: props.cro?.date_exposure_visit || '',
    exposure_visit_participants: props.cro?.exposure_visit_participants || 0,
    date_om_training: props.cro?.date_om_training || '',
    om_training_participants: props.cro?.om_training_participants || 0,
    date_electrical_training: props.cro?.date_electrical_training || '',
    electrical_training_participants: props.cro?.electrical_training_participants || 0,
    remarks: props.cro?.remarks || '',
});

const submit = () => {
    if (isEditMode) {
        form.put(route('cro.cros.update', props.cro.id));
    } else {
        form.post(route('cro.cros.store'));
    }
};

const genderOptions = ['Male', 'Female', 'Mixed'];
</script>

<template>
    <AppLayout :title="isEditMode ? 'Edit CRO' : 'Create CRO'">
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
                {{ isEditMode ? 'Edit CRO' : 'Create New CRO' }}
            </h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                    <form @submit.prevent="submit">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            
                            <!-- Location Details -->
                            <div class="col-span-1 md:col-span-2 lg:col-span-3">
                                <h3 class="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Location Details</h3>
                            </div>

                            <div>
                                <InputLabel for="district" value="District" />
                                <SelectInput
                                    id="district"
                                    v-model="form.district"
                                    :options="districts.map(d => d.name)" 
                                    class="mt-1 block w-full"
                                />
                                <!-- Note: The Enum returns ID/Name, but we store string District Name in DB. 
                                     So we map options to just Names or use the object if SelectInput supports it.
                                     Assuming SelectInput takes array of strings or objects. 
                                     Let's use simple string logic here to match the DB schema. 
                                     If the user selects 'Dir Upper', 'Dir Upper' is stored. -->
                                <InputError :message="form.errors.district" class="mt-2" />
                            </div>

                            <div>
                                <InputLabel for="tehsil" value="Tehsil" />
                                <TextInput id="tehsil" v-model="form.tehsil" type="text" class="mt-1 block w-full" required />
                                <InputError :message="form.errors.tehsil" class="mt-2" />
                            </div>

                            <div>
                                <InputLabel for="village_council" value="Village Council" />
                                <TextInput id="village_council" v-model="form.village_council" type="text" class="mt-1 block w-full" required />
                                <InputError :message="form.errors.village_council" class="mt-2" />
                            </div>

                            <div>
                                <InputLabel for="village" value="Village" />
                                <TextInput id="village" v-model="form.village" type="text" class="mt-1 block w-full" required />
                                <InputError :message="form.errors.village" class="mt-2" />
                            </div>

                             <!-- Formation Details -->
                             <div class="col-span-1 md:col-span-2 lg:col-span-3 mt-6">
                                <h3 class="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Formation Details</h3>
                            </div>

                            <div>
                                <InputLabel for="cro_name" value="Name of CRO" />
                                <TextInput id="cro_name" v-model="form.cro_name" type="text" class="mt-1 block w-full" required />
                                <InputError :message="form.errors.cro_name" class="mt-2" />
                            </div>

                             <div>
                                <InputLabel for="date_of_cro_formation" value="Date of CRO Formation" />
                                <DatePicker id="date_of_cro_formation" v-model="form.date_of_cro_formation" class="mt-1 block w-full" />
                                <InputError :message="form.errors.date_of_cro_formation" class="mt-2" />
                            </div>

                             <div>
                                <InputLabel for="date_final_community_dialogue" value="Date of Final Dialogue" />
                                <DatePicker id="date_final_community_dialogue" v-model="form.date_final_community_dialogue" class="mt-1 block w-full" />
                                <InputError :message="form.errors.date_final_community_dialogue" class="mt-2" />
                            </div>

                            <div>
                                <InputLabel for="no_of_community_dialogues" value="No. of Dialogues" />
                                <TextInput id="no_of_community_dialogues" v-model="form.no_of_community_dialogues" type="number" min="0" class="mt-1 block w-full" />
                                <InputError :message="form.errors.no_of_community_dialogues" class="mt-2" />
                            </div>

                             <div>
                                <InputLabel for="dialogue_participants" value="Dialogue Participants" />
                                <TextInput id="dialogue_participants" v-model="form.dialogue_participants" type="number" min="0" class="mt-1 block w-full" />
                                <InputError :message="form.errors.dialogue_participants" class="mt-2" />
                            </div>
                            
                            <div>
                                <InputLabel for="total_members" value="Total General Members" />
                                <TextInput id="total_members" v-model="form.total_members" type="number" min="0" class="mt-1 block w-full" />
                                <InputError :message="form.errors.total_members" class="mt-2" />
                            </div>

                             <div>
                                <InputLabel for="gender" value="Gender" />
                                <SelectInput id="gender" v-model="form.gender" :options="genderOptions" class="mt-1 block w-full" />
                                <InputError :message="form.errors.gender" class="mt-2" />
                            </div>

                            <div>
                                <InputLabel for="no_of_cro_members" value="No. of CRO Members" />
                                <TextInput id="no_of_cro_members" v-model="form.no_of_cro_members" type="number" min="0" class="mt-1 block w-full" />
                                <InputError :message="form.errors.no_of_cro_members" class="mt-2" />
                            </div>

                            <!-- Leadership -->
                            <div class="col-span-1 md:col-span-2 lg:col-span-3 mt-6">
                                <h3 class="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Leadership</h3>
                            </div>

                            <div>
                                <InputLabel for="president_name" value="President Name" />
                                <TextInput id="president_name" v-model="form.president_name" type="text" class="mt-1 block w-full" />
                                <InputError :message="form.errors.president_name" class="mt-2" />
                            </div>

                             <div>
                                <InputLabel for="president_contact" value="President Contact" />
                                <TextInput id="president_contact" v-model="form.president_contact" type="text" class="mt-1 block w-full" />
                                <InputError :message="form.errors.president_contact" class="mt-2" />
                            </div>

                            <div>
                                <InputLabel for="secretary_name" value="Secretary Name" />
                                <TextInput id="secretary_name" v-model="form.secretary_name" type="text" class="mt-1 block w-full" />
                                <InputError :message="form.errors.secretary_name" class="mt-2" />
                            </div>

                             <div>
                                <InputLabel for="secretary_contact" value="Secretary Contact" />
                                <TextInput id="secretary_contact" v-model="form.secretary_contact" type="text" class="mt-1 block w-full" />
                                <InputError :message="form.errors.secretary_contact" class="mt-2" />
                            </div>

                            <!-- Training & Exposure -->
                             <div class="col-span-1 md:col-span-2 lg:col-span-3 mt-6">
                                <h3 class="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Training & Exposure</h3>
                            </div>

                            <div>
                                <InputLabel for="date_exposure_visit" value="Date of Exposure Visit" />
                                <DatePicker id="date_exposure_visit" v-model="form.date_exposure_visit" class="mt-1 block w-full" />
                                <InputError :message="form.errors.date_exposure_visit" class="mt-2" />
                            </div>

                            <div>
                                <InputLabel for="exposure_visit_participants" value="Exposure Visit Participants" />
                                <TextInput id="exposure_visit_participants" v-model="form.exposure_visit_participants" type="number" min="0" class="mt-1 block w-full" />
                                <InputError :message="form.errors.exposure_visit_participants" class="mt-2" />
                            </div>

                             <div>
                                <InputLabel for="date_om_training" value="Date of O&M Training" />
                                <DatePicker id="date_om_training" v-model="form.date_om_training" class="mt-1 block w-full" />
                                <InputError :message="form.errors.date_om_training" class="mt-2" />
                            </div>

                            <div>
                                <InputLabel for="om_training_participants" value="O&M Training Participants" />
                                <TextInput id="om_training_participants" v-model="form.om_training_participants" type="number" min="0" class="mt-1 block w-full" />
                                <InputError :message="form.errors.om_training_participants" class="mt-2" />
                            </div>

                             <div>
                                <InputLabel for="date_electrical_training" value="Date of Electrical Training (Women)" />
                                <DatePicker id="date_electrical_training" v-model="form.date_electrical_training" class="mt-1 block w-full" />
                                <InputError :message="form.errors.date_electrical_training" class="mt-2" />
                            </div>

                            <div>
                                <InputLabel for="electrical_training_participants" value="Electrical Training Participants" />
                                <TextInput id="electrical_training_participants" v-model="form.electrical_training_participants" type="number" min="0" class="mt-1 block w-full" />
                                <InputError :message="form.errors.electrical_training_participants" class="mt-2" />
                            </div>

                             <!-- Remarks -->
                             <div class="col-span-1 md:col-span-2 lg:col-span-3 mt-6">
                                <InputLabel for="remarks" value="Remarks" />
                                <textarea
                                    id="remarks"
                                    v-model="form.remarks"
                                    class="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    rows="3"
                                ></textarea>
                                <InputError :message="form.errors.remarks" class="mt-2" />
                            </div>

                        </div>

                        <div class="flex items-center justify-end mt-6">
                            <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                                {{ isEditMode ? 'Update CRO' : 'Create CRO' }}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

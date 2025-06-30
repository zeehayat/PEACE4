<template>
    <form @submit.prevent="submit">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
                <label for="reference_code">Reference Code</label>
                <input v-model="form.reference_code" type="text" id="reference_code" class="input" />
                <div v-if="errors.reference_code" class="text-red-500 text-sm">{{ errors.reference_code }}</div>
            </div>

            <div>
                <label for="district">District</label>
                <select v-model="form.district" id="district" class="input">
                    <option value="">Select District</option>
                    <option v-for="d in districts" :key="d" :value="d">
                        {{ d }}
                    </option>
                </select>
                <div v-if="errors.district" class="text-red-500 text-sm">{{ errors.district }}</div>
            </div>

            <div>
                <label for="tehsil">Tehsil</label>
                <input v-model="form.tehsil" type="text" id="tehsil" class="input" />
                <div v-if="errors.tehsil" class="text-red-500 text-sm">{{ errors.tehsil }}</div>
            </div>

            <div>
                <label for="village_council">Village Council</label>
                <input v-model="form.village_council" type="text" id="village_council" class="input" />
                <div v-if="errors.village_council" class="text-red-500 text-sm">{{ errors.village_council }}</div>
            </div>

            <div>
                <label for="village">Village</label>
                <input v-model="form.village" type="text" id="village" class="input" />
                <div v-if="errors.village" class="text-red-500 text-sm">{{ errors.village }}</div>
            </div>

            <div>
                <label for="date_of_formation">Date of Formation</label>
                <input v-model="form.date_of_formation" type="date" id="date_of_formation" class="input" />
                <div v-if="errors.date_of_formation" class="text-red-500 text-sm">{{ errors.date_of_formation }}</div>
            </div>

            <div>
                <label for="total_members">Total Members</label>
                <input v-model="form.total_members" type="number" id="total_members" class="input" />
                <div v-if="errors.total_members" class="text-red-500 text-sm">{{ errors.total_members }}</div>
            </div>

            <div>
                <label for="gender">Gender</label>
                <select v-model="form.gender" id="gender" class="input">
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="mixed">Mixed</option>
                </select>
                <div v-if="errors.gender" class="text-red-500 text-sm">{{ errors.gender }}</div>
            </div>

            <div>
                <label for="num_cbo_members"># of CBO Members</label>
                <input v-model="form.num_cbo_members" type="number" id="num_cbo_members" class="input" />
                <div v-if="errors.num_cbo_members" class="text-red-500 text-sm">{{ errors.num_cbo_members }}</div>
            </div>

            <div>
                <label for="president_name">President Name</label>
                <input v-model="form.president_name" type="text" id="president_name" class="input" />
                <div v-if="errors.president_name" class="text-red-500 text-sm">{{ errors.president_name }}</div>
            </div>

            <div>
                <label for="president_contact">President Contact</label>
                <input v-model="form.president_contact" type="text" id="president_contact" class="input" />
                <div v-if="errors.president_contact" class="text-red-500 text-sm">{{ errors.president_contact }}</div>
            </div>

            <div>
                <label for="secretary_name">Secretary Name</label>
                <input v-model="form.secretary_name" type="text" id="secretary_name" class="input" />
                <div v-if="errors.secretary_name" class="text-red-500 text-sm">{{ errors.secretary_name }}</div>
            </div>

            <div>
                <label for="secretary_contact">Secretary Contact</label>
                <input v-model="form.secretary_contact" type="text" id="secretary_contact" class="input" />
                <div v-if="errors.secretary_contact" class="text-red-500 text-sm">{{ errors.secretary_contact }}</div>
            </div>
        </div>

        <div class="mt-6">
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" :disabled="form.processing">
                Submit
            </button>
        </div>
    </form>
</template>

<script setup>
const props = defineProps({
    form: Object,
    errors: Object,
    submit: Function,

})
const districts = [
    "Abbottabad", "Bannu", "Battagram", "Buner", "Charsadda", "Chitral Lower", "Chitral Upper",
    "Dera Ismail Khan", "Hangu", "Haripur", "Karak", "Khyber", "Kohat", "Kohistan Lower",
    "Kohistan Upper", "Kurram", "Lakki Marwat", "Malakand", "Mansehra", "Mardan", "Mohmand",
    "Nowshera", "Orakzai", "Peshawar", "Shangla", "South Waziristan", "Swabi", "Swat",
    "Tank", "Torghar", "North Waziristan"
]

</script>

<style scoped>
.input {
    @apply mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2;
}
</style>

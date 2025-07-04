<script setup>
import { ref, watch } from 'vue'
import { router } from '@inertiajs/vue3'
import MhpAdminApprovalForm from '@/Pages/MhpAdminApproval/MhpAdminApprovalForm.vue'

const props = defineProps({
    flash: Object,
    mhpSites: Object,
    filters: Object,
    errors: Object
})

// Modal & toast states
const showApprovalModal = ref(false)
const toastMessage = ref('')
const showToast = ref(false)

// Flash watcher
watch(() => props.flash?.success, (val) => {
    if (val) {
        showApprovalModal.value = false // close modal
        toastMessage.value = val
        showToast.value = true
        setTimeout(() => showToast.value = false, 3000)
    }
})

// Example filters
const cboFilter = ref(props.filters.cbo ?? '')
const statusFilter = ref(props.filters.status ?? '')

watch([cboFilter, statusFilter], () => {
    router.get('/mhp-sites', {
        cbo: cboFilter.value,
        status: statusFilter.value
    }, { preserveState: true, replace: true })
})

const destroy = (id) => {
    if (confirm('Are you sure you want to delete this site?')) {
        router.delete(`/mhp-sites/${id}`)
    }
}
</script>

<template>
    <div class="max-w-7xl mx-auto mt-6 space-y-4">
        <h1 class="text-3xl font-bold">MHP Sites</h1>

        <!-- ✅ Toast -->
        <transition name="fade">
            <div
                v-if="showToast"
                class="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50"
            >
                {{ toastMessage }}
            </div>
        </transition>

        <!-- Filters -->
        <div class="flex gap-2 flex-wrap">
            <input
                v-model="cboFilter"
                placeholder="Search by CBO reference"
                class="border rounded p-1"
            />
            <select v-model="statusFilter" class="border rounded p-1">
                <option value="">All Statuses</option>
                <option>New</option>
                <option>Rehab</option>
                <option>Upgradation</option>
            </select>
            <a
                href="/mhp-sites/create"
                class="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                + Add MHP Site
            </a>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white border">
                <thead>
                <tr class="bg-gray-100">
                    <th class="p-2 border">ID</th>
                    <th class="p-2 border">CBO</th>
                    <th class="p-2 border">Status</th>
                    <th class="p-2 border">Population</th>
                    <th class="p-2 border">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="site in mhpSites.data"
                    :key="site.id"
                    class="hover:bg-gray-50"
                >
                    <td class="p-2 border">{{ site.id }}</td>
                    <td class="p-2 border">{{ site.cbo?.reference_code ?? 'N/A' }}</td>
                    <td class="p-2 border">{{ site.status }}</td>
                    <td class="p-2 border">{{ site.population }}</td>
                    <td class="p-2 border space-x-1">
                        <a
                            :href="`/mhp-sites/${site.id}/edit`"
                            class="text-blue-600 hover:underline"
                        >Edit</a> |
                        <button
                            @click="destroy(site.id)"
                            class="text-red-600 hover:underline"
                        >Delete</button> |
                        <button
                            @click="showApprovalModal = true"
                            class="text-green-600 hover:underline"
                        >+ Add Approval</button>
                    </td>
                </tr>
                <tr v-if="mhpSites.data.length === 0">
                    <td colspan="5" class="text-center p-4 text-gray-500">
                        No MHP Sites found.
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal -->
        <transition name="fade">
            <div
                v-if="showApprovalModal"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
                <div class="bg-white rounded-lg shadow-lg p-4 relative max-w-2xl w-full">
                    <button
                        class="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                        @click="showApprovalModal = false"
                    >
                        ✖
                    </button>
                    <MhpAdminApprovalForm
                        action="create"
                        :mhp-site-id="mhpSites.data[0]?.id"
                        :errors="props.errors"
                    />
                </div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>

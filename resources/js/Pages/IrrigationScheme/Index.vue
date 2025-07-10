<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { router, Link } from '@inertiajs/vue3'

import SideBar from '@/Components/SideBar.vue'
import Toast from '@/Components/Toast.vue'
import IrrigationSchemeCreateModal from '@/Components/IrrigationComponents/IrrigationSchemeCreateModal.vue'
import IrrigationAdminApprovalModal from '@/Components/IrrigationComponents/IrrigationAdminApprovalModal.vue'
import IrrigationSchemeContractModal from '@/Components/IrrigationComponents/IrrigationSchemeContractManagerModal.vue'
import ProjectPhysicalProgressManagerModal from '@/Pages/ProjectPhysicalProgresss/ProjectPhysicalProgressManagerModal.vue'
import ProjectFinancialInstallmentManagerModal from '@/Pages/ProjectFinancialInstallment/ProjectFinancialInstallmentManagerModal.vue'
import IrrigationSchemeContractManagerModal
    from "@/Components/IrrigationComponents/IrrigationSchemeContractManagerModal.vue";

const props = defineProps({
    irrigationSchemes: Object,
    filters: Object,
    errors: Object
})
const projectType = ref('IRRIGATION')
const projectableType = ref('App\\Models\\IrrigationScheme');
const selectedScheme = ref(null)
const toastVisible = ref(false)
const toastMessage = ref('')
const toastType = ref('success')
const searchTerm = ref(props.filters.search || '')
const openActionMenuId = ref(null)
const menuPosition = ref({ top: '0px', left: '0px' })
const actionMenu = ref(null)

const showCreateSchemeModal = ref(false)
const showAdminApprovalModal = ref(false)
const adminApprovalMode = ref('create')
const showSchemeContractModal = ref(false)
const selectedSchemeContract = ref(null)
const schemeContractMode = ref('create')
const showProjectPhysicalProgressManagerModal = ref(false)
const showProjectFinancialInstallmentManagerModal = ref(false)

onMounted(() => {
    document.addEventListener('click', (e) => {
        if (openActionMenuId.value && !e.target.closest('.action-menu-container') && !e.target.closest('.action-menu-popup')) {
            openActionMenuId.value = null
            selectedScheme.value = null
        }
    })
})

function handleUpdated(message, updatedSchemeData = null) { // Accept optional updatedSchemeData
    toastMessage.value = message
    toastType.value = 'success'
    toastVisible.value = true
    setTimeout(() => (toastVisible.value = false), 3000)

    if (updatedSchemeData && selectedScheme.value) {
        // If specific data is provided, update the selectedScheme directly
        // Ensure you only update the parts that might have changed to prevent re-rendering issues
        // and also ensure physicalProgresses and financialInstallments are reactive.
        Object.assign(selectedScheme.value, updatedSchemeData);

        // Additionally, find and update the scheme in the main irrigationSchemes.data array
        const index = props.irrigationSchemes.data.findIndex(s => s.id === updatedSchemeData.id);
        if (index !== -1) {
            Object.assign(props.irrigationSchemes.data[index], updatedSchemeData);
        }

    } else {
        // Fallback: If no specific data, or if it's a create operation, reload the main list
        router.reload({ only: ['irrigationSchemes'] });
    }
}

const filteredSchemes = computed(() => {
    if (!searchTerm.value.trim()) return props.irrigationSchemes.data
    const term = searchTerm.value.trim().toLowerCase()
    return props.irrigationSchemes.data.filter(scheme =>
        (scheme.cbo?.reference_code || '').toLowerCase().includes(term) ||
        (scheme.status || '').toLowerCase().includes(term) ||
        (scheme.project_id || '').toLowerCase().includes(term) ||
        (scheme.cbo?.district || '').toLowerCase().includes(term)
    )
})

function getStatusClass(status) {
    switch (status) {
        case 'New': return 'bg-blue-100 text-blue-800 border border-blue-200'
        case 'Rehabilitation': return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
        default: return 'bg-gray-100 text-gray-800 border border-gray-200'
    }
}

function toggleActionMenu(schemeId, event) {
    if (openActionMenuId.value === schemeId) {
        openActionMenuId.value = null
        selectedScheme.value = null
        return
    }

    selectedScheme.value = props.irrigationSchemes.data.find(s => s.id === schemeId)
    openActionMenuId.value = schemeId

    nextTick(() => {
        const button = event.currentTarget
        const rect = button.getBoundingClientRect()
        const menuElement = actionMenu.value
        if (!menuElement) return

        let top = rect.bottom + window.scrollY
        let left = rect.left + window.scrollX

        const menuWidth = menuElement.offsetWidth
        const menuHeight = menuElement.offsetHeight

        if (left + menuWidth > window.innerWidth) {
            left = window.innerWidth - menuWidth - 20
        }
        if (top + menuHeight > window.innerHeight + window.scrollY) {
            top = rect.top + window.scrollY - menuHeight - 10
        }

        menuPosition.value = { top: `${top}px`, left: `${left}px` }
    })
}

function openNewSchemeModal() {
    showCreateSchemeModal.value = true
}

function openAdminApprovalModal(scheme, mode = 'create') {
    selectedScheme.value = scheme
    adminApprovalMode.value = mode
    showAdminApprovalModal.value = true
}

function openSchemeContractModal(scheme, mode = 'create') {
    selectedScheme.value = scheme
    selectedSchemeContract.value = scheme.irrigationSchemeContract
    schemeContractMode.value = mode
    showSchemeContractModal.value = true
}

function openProjectPhysicalProgressManager(scheme) {
    selectedScheme.value = scheme
    showProjectPhysicalProgressManagerModal.value = true
}

function openProjectFinancialInstallmentManager(scheme) {
    selectedScheme.value = scheme
    showProjectFinancialInstallmentManagerModal.value = true
}

function deleteScheme(schemeId) {
    if (confirm('Are you sure you want to delete this Irrigation Scheme?')) {
        router.delete(route('irrigation.irrigation-schemes.destroy', schemeId), {
            onSuccess: () => handleUpdated('Irrigation Scheme deleted successfully.'),
            onError: () => handleUpdated('Failed to delete Irrigation Scheme.')
        })
    }
}
</script>

<template>
    <SideBar />

    <div class="bg-gray-100 min-h-screen">
        <div class="max-w-screen-xl mx-auto px-4 py-10">
            <header class="mb-8 flex justify-between items-center">
                <div>
                    <h1 class="text-3xl font-bold text-gray-900">Irrigation Schemes</h1>
                    <p class="text-sm text-gray-600">Manage irrigation schemes and progress</p>
                </div>
                <div class="flex gap-3">
                    <input v-model="searchTerm" @input="router.get(route('irrigation.irrigation-schemes.index'), { search: searchTerm }, { preserveState: true, replace: true })" placeholder="Search..." class="border px-3 py-2 rounded shadow-sm" />
                    <button @click="openNewSchemeModal" class="bg-indigo-600 text-white px-4 py-2 rounded">+ New</button>
                </div>
            </header>

            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div v-for="scheme in filteredSchemes" :key="scheme.id" class="bg-white rounded shadow p-4 relative">
                    <div class="flex justify-between">
                        <div>
                            <p class="font-semibold">{{ scheme.cbo?.reference_code ?? 'N/A' }}</p>
                            <p class="text-xs text-gray-500">ID: {{ scheme.id }}</p>
                        </div>
                        <button @click.stop="toggleActionMenu(scheme.id, $event)" class="text-gray-500 hover:text-black">⋮</button>
                    </div>
                    <p :class="getStatusClass(scheme.status)" class="inline-block mt-2 px-2 py-1 text-xs rounded">{{ scheme.status ?? 'N/A' }}</p>
                </div>
            </div>

            <transition>
                <div v-if="openActionMenuId" ref="actionMenu" :style="menuPosition" class="action-menu-popup fixed bg-white shadow-lg rounded border text-sm z-50">
                    <div class="divide-y">
                        <a href="#" @click.prevent="openAdminApprovalModal(selectedScheme, selectedScheme.irrigationAdminApproval ? 'update' : 'create')" class="block px-4 py-2 hover:bg-gray-100">{{ selectedScheme?.irrigationAdminApproval ? 'Edit Approval' : '+ Add Approval' }}</a>
                        <a href="#" @click.prevent="openSchemeContractModal(selectedScheme, selectedScheme?.irrigationSchemeContract ? 'edit' : 'create')" class="block px-4 py-2 hover:bg-gray-100">{{ selectedScheme?.irrigationSchemeContract ? 'Edit Contract' : '+ Add Contract' }}</a>
                        <button @click="openProjectPhysicalProgressManager(selectedScheme)" class="block px-4 py-2 hover:bg-gray-100 w-full text-left">Manage Physical Progress</button>
                        <button @click="openProjectFinancialInstallmentManager(selectedScheme)" class="block px-4 py-2 hover:bg-gray-100 w-full text-left">Manage Financial Installment</button>
                        <button @click="deleteScheme(selectedScheme?.id)" class="block px-4 py-2 text-red-600 hover:bg-red-100 w-full text-left">Delete</button>
                    </div>
                </div>
            </transition>

            <Toast :show="toastVisible" :message="toastMessage" :type="toastType" @hide="toastVisible = false" />

            <IrrigationSchemeCreateModal :show="showCreateSchemeModal" :errors="props.errors" @close="showCreateSchemeModal = false" @saved="handleUpdated" />
            <IrrigationAdminApprovalModal v-if="selectedScheme" :show="showAdminApprovalModal" :scheme="selectedScheme" :approval="selectedScheme.irrigationAdminApproval" :mode="adminApprovalMode" @close="showAdminApprovalModal = false; selectedScheme = null" @updated="handleUpdated"  irrigation-scheme-id="scheme.id"/>
            <IrrigationSchemeContractManagerModal
                v-if="selectedScheme"
                :show="showSchemeContractModal"
                :scheme="selectedScheme"
                @close="showSchemeContractModal = false; selectedScheme = null"
                @saved="handleUpdated"
            />
            <ProjectPhysicalProgressManagerModal v-if="selectedScheme" :show="showProjectPhysicalProgressManagerModal" :site="selectedScheme"
                                                 @close="showProjectPhysicalProgressManagerModal = false" @saved="handleUpdated" :projectable_type="projectableType"
                                                 :project_type="projectType" />
            <ProjectFinancialInstallmentManagerModal v-if="selectedScheme"
                                                     :show="showProjectFinancialInstallmentManagerModal"
                                                     :site="selectedScheme" @close="showProjectFinancialInstallmentManagerModal = false" @saved="handleUpdated"
                                                     :projectable_type="projectableType"
                                                     :project_type="projectType"
            />
        </div>
    </div>
</template>

<style scoped>
button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>

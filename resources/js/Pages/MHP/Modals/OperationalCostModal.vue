<script setup>
import { ref, watch, computed } from 'vue';
import axios from 'axios';
import Modal from '@/Components/Modal.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import OperationalCostForm from '@/Pages/MHP/Forms/OperationalCostForm.vue';
import { getFileIcon } from '@/Utils/helpers'; // Assuming a helper function to get file icons based on your Index.vue file.

const props = defineProps({
    // Determines if the modal should be visible
    show: {
        type: Boolean,
        default: false,
    },
    // The MHP Site object for which to show the operational costs
    site: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close', 'saved']);

// Reactive state variables for the modal's internal logic
const isLoading = ref(true); // Tracks if we're fetching data from the API
const operationalCosts = ref([]); // Stores the list of operational costs for the site
const expenseTypes = ref([]); // Stores the list of available expense types
const showForm = ref(false); // Controls the visibility of the form component within the modal
const selectedCost = ref(null); // Holds the cost object when in 'update' mode
const formMode = ref('create'); // 'create' or 'update'

/**
 * Fetches all operational costs for the given MHP site and the list of expense types.
 * This is triggered whenever the `show` prop becomes `true`.
 */
const fetchOperationalCostsAndTypes = async () => {
    if (props.site && props.site.id) {
        isLoading.value = true;
        try {
            const [costsResponse, typesResponse] = await Promise.all([
                axios.get(route('mhp.operational-costs.index', { site_id: props.site.id })),
                axios.get(route('mhp.operational-costs.expense-types')),
            ]);
            operationalCosts.value = costsResponse.data;
            expenseTypes.value = typesResponse.data.map(type => ({
                value: type.id,
                label: type.name,
            }));
        } catch (error) {
            console.error('Failed to fetch operational costs or expense types:', error);
            // Handle error, e.g., show a toast message
        } finally {
            isLoading.value = false;
        }
    }
};

/**
 * Watcher for the 'show' prop.
 * When the modal is shown, it calls the fetch function to load data.
 */
watch(() => props.show, (newValue) => {
    if (newValue) {
        fetchOperationalCostsAndTypes();
    }
}, { immediate: true });

/**
 * Opens the form for creating a new operational cost.
 */
const handleAddCost = () => {
    selectedCost.value = null; // Ensure no cost is selected for creation mode
    formMode.value = 'create';
    showForm.value = true;
};

/**
 * Opens the form for editing an existing operational cost.
 * @param cost The operational cost object to be edited.
 */
const handleEditCost = (cost) => {
    selectedCost.value = cost;
    formMode.value = 'update';
    showForm.value = true;
};

/**
 * Deletes an operational cost record.
 * @param cost The operational cost object to be deleted.
 */
const handleDeleteCost = async (cost) => {
    if (confirm('Are you sure you want to delete this operational cost?')) {
        try {
            await axios.delete(route('operational-costs.destroy', cost.id));
            emit('saved', 'Operational Cost deleted successfully!');
            fetchOperationalCostsAndTypes(); // Reload the list after deletion
        } catch (error) {
            console.error('Failed to delete operational cost:', error);
            // Handle error, e.g., show a toast message
        }
    }
};

/**
 * Handles the form submission success event.
 * Reloads the cost list and closes the form.
 * @param message The success message from the form.
 */
const handleFormSuccess = (message) => {
    showForm.value = false;
    emit('saved', message);
    fetchOperationalCostsAndTypes();
};

/**
 * Handles the form cancellation event.
 * Simply hides the form.
 */
const handleFormCancel = () => {
    showForm.value = false;
};

/**
 * Emits the 'close' event to the parent component.
 */
const closeModal = () => {
    emit('close');
};

// Computed property to format the total costs for display
const totalCosts = computed(() => {
    return operationalCosts.value.reduce((sum, cost) => sum + parseFloat(cost.amount), 0).toFixed(2);
});
</script>

<template>
    <Modal :show="show" @close="closeModal" max-width="4xl">
        <div class="p-6">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-2xl font-semibold text-gray-800">Operational Costs for {{ site.name }}</h2>
                <div v-if="!showForm">
                    <SecondaryButton @click="handleAddCost">
                        + Add New Cost
                    </SecondaryButton>
                </div>
            </div>

            <div v-if="showForm">
                <OperationalCostForm
                    :site-id="site.id"
                    :cost="selectedCost"
                    :mode="formMode"
                    :expense-types="expenseTypes"
                    @success="handleFormSuccess"
                    @cancel="handleFormCancel"
                />
            </div>

            <div v-else>
                <div v-if="isLoading" class="text-center py-8 text-gray-500">
                    Loading operational costs...
                </div>

                <div v-else-if="operationalCosts.length === 0" class="text-center py-8 text-gray-500">
                    No operational costs found for this site.
                </div>

                <div v-else class="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expense Type</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (Rs)</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attachments</th>
                            <th scope="col" class="relative px-6 py-3"><span class="sr-only">Actions</span></th>
                        </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="cost in operationalCosts" :key="cost.id">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ new Date(cost.cost_date).toLocaleDateString() }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ cost.expense_type_name }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ cost.amount }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div v-if="cost.media && cost.media.length" class="flex items-center space-x-2">
                                    <a v-for="media in cost.media" :key="media.id" :href="media.url" target="_blank" class="text-indigo-600 hover:text-indigo-900" :title="media.name">
                                        {{ getFileIcon(media.name) }}
                                    </a>
                                </div>
                                <span v-else>—</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <a @click.prevent="handleEditCost(cost)" class="text-indigo-600 hover:text-indigo-900 cursor-pointer">Edit</a>
                                <a @click.prevent="handleDeleteCost(cost)" class="text-red-600 hover:text-red-900 cursor-pointer">Delete</a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="bg-gray-100 px-6 py-3 text-right font-bold text-gray-800">
                        Total: Rs. {{ totalCosts }}
                    </div>
                </div>
            </div>
        </div>
    </Modal>
</template>

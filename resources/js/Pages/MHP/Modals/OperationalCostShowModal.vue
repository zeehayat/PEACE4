<script setup>
import { ref, watch, computed } from 'vue';
import axios from 'axios';
import Modal from '@/Components/Modal.vue';
import { getFileIcon } from '@/Utils/helpers';

const props = defineProps({
    /**
     * Controls the visibility of the modal.
     */
    show: {
        type: Boolean,
        default: false,
    },
    /**
     * The MHP site object for which to show the operational costs.
     * This is required to fetch the correct data.
     */
    site: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close']);

const isLoading = ref(true); // Tracks loading state for the data fetch
const operationalCosts = ref([]); // Stores the list of operational costs

/**
 * Fetches the operational costs for the selected site from the backend API.
 * This function is called automatically when the modal is opened.
 */
const fetchOperationalCosts = async () => {
    if (!props.site || !props.site.id) {
        return;
    }

    isLoading.value = true;
    try {
        const response = await axios.get(route('mhp.operational-costs.index', { site_id: props.site.id }));
        operationalCosts.value = response.data;
    } catch (error) {
        console.error('Failed to fetch operational costs:', error);
        operationalCosts.value = [];
    } finally {
        isLoading.value = false;
    }
};

/**
 * A watcher that listens for changes to the `show` prop.
 * When `show` becomes true, it triggers the data fetch.
 */
watch(() => props.show, (newValue) => {
    if (newValue) {
        fetchOperationalCosts();
    }
});

/**
 * Computed property to calculate the total amount of all operational costs.
 * It iterates through the `operationalCosts` array and sums the `amount`.
 */
const totalCosts = computed(() => {
    return operationalCosts.value.reduce((sum, cost) => sum + parseFloat(cost.amount), 0).toFixed(2);
});

/**
 * Closes the modal and emits the 'close' event to the parent component.
 */
const closeModal = () => {
    emit('close');
};
</script>

<template>
    <Modal :show="show" @close="closeModal" max-width="4xl">
        <div class="p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Operational Costs for {{ site.name }}</h2>

            <!-- Loading State -->
            <div v-if="isLoading" class="text-center py-8 text-gray-500">
                Loading operational costs...
            </div>

            <!-- No Data State -->
            <div v-else-if="operationalCosts.length === 0" class="text-center py-8 text-gray-500">
                No operational costs found for this site.
            </div>

            <!-- Costs List Table -->
            <div v-else class="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expense Type</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (Rs)</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attachments</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
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
                        <td class="px-6 py-4 text-sm text-gray-500 truncate max-w-sm">{{ cost.remarks || 'N/A' }}</td>
                    </tr>
                    </tbody>
                </table>
                <!-- Total Costs -->
                <div class="bg-gray-100 px-6 py-3 text-right font-bold text-gray-800">
                    Total: Rs. {{ totalCosts }}
                </div>
            </div>

            <div class="mt-6 text-right">
                <button @click="closeModal" type="button" class="inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                    Close
                </button>
            </div>
        </div>
    </Modal>
</template>

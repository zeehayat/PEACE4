<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    show: Boolean,
    site: Object,
})

const emit = defineEmits(['close'])

const close = () => emit('close')

// Helper function to format keys (e.g., 'created_at' to 'Created At')
const formatKey = (key) =>
    key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

/**
 * Renders a section of the report by processing an object's properties.
 * It removes 'created_at' and 'updated_at' fields and formats other values.
 *
 * @param {Object} data The object to render (e.g., site, site.cbo, site.admin_approval).
 * @param {Array<string>} [keysToShow=[]] An optional array of specific keys to display.
 * If empty, all properties (except removed ones) will be displayed.
 * @returns {Array<{key: string, value: any}>} An array of objects, each with a formatted key and value.
 */
const renderSection = (data, keysToShow = []) => {
    if (!data) return []

    // Create a shallow copy to avoid mutating the original prop object
    const cleanedData = { ...data }

    // Remove unwanted timestamp fields from the current object
    delete cleanedData.created_at
    delete cleanedData.updated_at
    // Also remove 'modified_at' if it exists (as per previous request)
    delete cleanedData.modified_at

    // Determine which keys to iterate over.
    // If keysToShow is provided, use those; otherwise, use all remaining keys in cleanedData.
    const keys = keysToShow.length > 0 ? keysToShow : Object.keys(cleanedData)

    // Filter out keys that were explicitly deleted or are not present after cleaning
    const finalKeys = keys.filter(key => cleanedData.hasOwnProperty(key))

    return finalKeys.map(key => {
        let value = cleanedData[key]
        let formattedKey = formatKey(key)

        // Special handling for specific keys or data types
        if (typeof value === 'boolean') {
            value = value ? 'Yes' : 'No'
        } else if (value === null || value === undefined || value === '') {
            value = '-' // Display a dash for null, undefined, or empty string values
        } else if (key.includes('date') && typeof value === 'string') {
            // Attempt to format date strings like "YYYY-MM-DDTHH:MM:SS.000000Z"
            try {
                const date = new Date(value)
                // Check if the date is valid before formatting
                if (!isNaN(date.getTime())) {
                    value = date.toLocaleDateString() // e.g., "7/8/2025" or "07/08/2025" depending on locale
                }
            } catch (e) {
                // If date parsing fails, keep the original string value
            }
        } else if (Array.isArray(value)) {
            // Handle arrays, specifically 'attachments' and 'media'
            if (key === 'attachments' || key === 'media') {
                value = value.length > 0 ? `${value.length} file(s)` : 'None'
            } else if (value.every(item => typeof item === 'string' || typeof item === 'number')) {
                // For simple arrays of strings/numbers, join them
                value = value.join(', ')
            } else {
                // For complex arrays (e.g., array of objects), provide a generic indicator
                value = `[${value.length} item(s)]`
            }
        } else if (typeof value === 'object') {
            // If a nested object is encountered (e.g., 'cbo' or 'admin_approval' at the top level of 'site')
            // These are typically handled by separate renderSection calls in the template,
            // but if they appear here, we'll indicate them as objects.
            value = '[Object Data]'
        }

        return {
            key: formattedKey,
            value: value
        }
    })
}

const printReport = () => {
    const printable = document.getElementById('site-report').innerHTML
    const win = window.open('', '', 'width=800,height=600')
    win.document.write(`
    <html>
      <head>
        <title>MHP Site Report</title>
        <style>
          body { font-family: sans-serif; margin: 20px; color: #333; }
          h1 { color: #1a202c; text-align: center; margin-bottom: 20px; }
          h2 { color: #2d3748; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 15px; font-size: 1.25rem; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; table-layout: fixed; }
          td { padding: 8px 12px; border: 1px solid #e2e8f0; word-wrap: break-word; }
          .section-title { background: #f0f4f8; font-weight: bold; }
          .w-1-3 { width: 33.333333%; }
          /* Print-specific styles */
          @media print {
              .hidden-print {
                  display: none !important;
              }
              table {
                  border: 1px solid #ddd; /* Ensure table borders for print */
              }
              td {
                  border: 1px solid #eee; /* Lighter borders for cells in print */
                  padding: 6px 10px; /* Adjust padding for print */
              }
              .bg-gray-50 {
                  background-color: #f8f8f8 !important; /* Lighter background for keys in print */
              }
          }
        </style>
      </head>
      <body>${printable}</body>
    </html>`)
    win.document.close()
    win.print()
}

// Watcher for props.show (for debugging/logging, removed function calls causing errors)
watch(() => props.show, (val) => {
    if (val) {
        // This console log will show the raw site object whenever the modal opens
        console.log("Props site object:", props.site);
    }
});
</script>

<template>
    <transition name="fade">
        <div
            v-if="show"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
            <div
                class="bg-white rounded-lg shadow-2xl relative max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8"
            >
                <button
                    @click="close"
                    class="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
                    aria-label="Close"
                >
                    &times;
                </button>

                <div id="site-report" class="font-sans text-gray-800">
                    <h1 class="text-3xl font-extrabold text-center mb-6 text-blue-700">
                        🌟 MHP Site Report 🌟
                    </h1>

                    <section class="mb-8 p-4 border border-gray-200 rounded-lg shadow-sm">
                        <h2 class="text-xl font-semibold border-b-2 border-blue-400 pb-2 mb-4 text-blue-600">
                            General Information
                        </h2>
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="hidden-print">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">Field</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">Value</th>
                            </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="{key, value} in renderSection(site, [
                                    'id',
                                    'month_year_establishment',
                                    'established_by',
                                    'cbo_id',
                                    'population',
                                    'grid_status',
                                    'status',
                                    'existing_capacity_kw',
                                    'planned_capacity_kw',
                                    'head_ft',
                                    'design_discharge_cusecs',
                                    'channel_length_km',
                                    'tl_ht_km',
                                    'tl_lt_km',
                                    'transformers',
                                    'turbine_type',
                                    'alternator_type',
                                    'accessible',
                                    'domestic_units',
                                    'commercial_units',
                                    'estimated_cost',
                                    'per_kw_cost',
                                    'total_hh',
                                    'avg_hh_size',
                                    'cost_per_capita',
                                    'tentative_completion_date',
                                    'financial_initiation_date',
                                    'physical_completion_date',
                                    'remarks',
                                    'attachments',
                                    'project_id',
                                    'media'
                                ])" :key="key">
                                <td class="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700 bg-gray-50 w-1/3">
                                    {{ key }}
                                </td>
                                <td class="px-6 py-3 whitespace-normal text-sm text-gray-900">
                                    {{ value }}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </section>

                    <section v-if="site?.cbo" class="mb-8 p-4 border border-gray-200 rounded-lg shadow-sm">
                        <h2 class="text-xl font-semibold border-b-2 border-blue-400 pb-2 mb-4 text-blue-600">
                            CBO Information
                        </h2>
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="hidden-print">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">Field</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">Value</th>
                            </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="{key, value} in renderSection(site.cbo, [
                                    'reference_code',
                                    'district',
                                    'tehsil',
                                    'village_council',
                                    'village',
                                    'date_of_formation',
                                    'total_members',
                                    'gender',
                                    'num_cbo_members',
                                    'president_name',
                                    'president_contact',
                                    'secretary_name',
                                    'secretary_contact'
                                ])" :key="key">
                                <td class="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700 bg-gray-50 w-1/3">
                                    {{ key }}
                                </td>
                                <td class="px-6 py-3 whitespace-normal text-sm text-gray-900">
                                    {{ value }}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </section>

                    <section v-if="site?.admin_approval" class="mb-8 p-4 border border-gray-200 rounded-lg shadow-sm">
                        <h2 class="text-xl font-semibold border-b-2 border-blue-400 pb-2 mb-4 text-blue-600">
                            Admin Approval
                        </h2>
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="hidden-print">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">Field</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">Value</th>
                            </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="{key, value} in renderSection(site.admin_approval, [
                                    'technical_survey_date',
                                    'date_design_psu_submission',
                                    'headoffice_review_submission_date',
                                    'design_estimate_date',
                                    'eu_approval_submission_date',
                                    'opm_validation_date',
                                    'eu_approval_date',
                                    'approved_cost',
                                    'revised_cost_1',
                                    'revised_cost_2',
                                    'revised_cost_3',
                                    'hpp_inauguration_date',
                                    'civil_work_start_date',
                                    'mhp_inauguration_date',
                                    'attachments',
                                    'media'
                                ])" :key="key">
                                <td class="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700 bg-gray-50 w-1/3">
                                    {{ key }}
                                </td>
                                <td class="px-6 py-3 whitespace-normal text-sm text-gray-900">
                                    {{ value }}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </section>
                </div>

                <div class="mt-8 text-center">
                    <button
                        @click="printReport"
                        class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        <span class="mr-2">🖨️</span> Print Report
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
/* Existing fade transition styles */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* New print-specific styles */
@media print {
    .hidden-print {
        display: none !important;
    }
    table {
        border: 1px solid #ddd; /* Ensure table borders for print */
    }
    td {
        border: 1px solid #eee; /* Lighter borders for cells in print */
        padding: 6px 10px; /* Adjust padding for print */
    }
    .bg-gray-50 {
        background-color: #f8f8f8 !important; /* Lighter background for keys in print */
    }
}
</style>
